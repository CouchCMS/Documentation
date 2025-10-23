#!/usr/bin/env node
/**
 * PR Preparation Script
 *
 * Analyzes git changes and generates a draft PR description
 * Usage: pnpm run pr:prepare [base-branch]
 */

import { execSync } from "child_process";
import { writeFileSync, existsSync, readFileSync } from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Colors for terminal output
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
};

function log(message, color = "reset") {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function getBaseBranch() {
    const args = process.argv.slice(2);
    if (args.length > 0) return args[0];

    // Try to detect base branch
    try {
        const currentBranch = getCurrentBranch();
        const branches = execSync("git branch -a", { encoding: "utf-8" });

        // Strategy 1: Use origin/HEAD if it points to a valid branch
        if (branches.includes("origin/HEAD")) {
            try {
                const head = execSync(
                    "git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null",
                    {
                        encoding: "utf-8",
                    },
                ).trim();
                if (head) {
                    const baseBranch = head.replace("refs/remotes/", "");
                    // Don't use current branch as base
                    if (!baseBranch.includes(currentBranch)) {
                        return baseBranch;
                    }
                }
            } catch {
                // Ignore errors
            }
        }

        // Strategy 2: Check for common branch patterns
        const branchPriority = [
            "remotes/origin/main",
            "remotes/origin/master",
            "remotes/origin/gh-pages",
            "remotes/origin/docs-v1", // For docs projects
            "main",
            "master",
            "gh-pages",
        ];

        for (const branch of branchPriority) {
            if (branches.includes(branch)) {
                const simpleName = branch
                    .replace("remotes/", "")
                    .replace("origin/", "");
                // Don't use current branch as base
                if (simpleName !== currentBranch) {
                    return branch.includes("remotes/")
                        ? branch.replace("remotes/", "")
                        : branch;
                }
            }
        }

        // Strategy 3: Get tracking branch of current branch
        try {
            const tracking = execSync(
                `git rev-parse --abbrev-ref ${currentBranch}@{upstream} 2>/dev/null`,
                {
                    encoding: "utf-8",
                },
            ).trim();
            if (tracking && tracking !== currentBranch) {
                return tracking;
            }
        } catch {
            // No tracking branch
        }

        // Last resort: use origin/main
        return "origin/main";
    } catch (error) {
        log(`⚠️  Could not detect base branch: ${error.message}`, "yellow");
        return "origin/main";
    }
}

function getCurrentBranch() {
    try {
        return execSync("git rev-parse --abbrev-ref HEAD", {
            encoding: "utf-8",
        }).trim();
    } catch {
        return "unknown";
    }
}

function getChangedFiles(baseBranch) {
    try {
        const output = execSync(`git diff --name-status ${baseBranch}...HEAD`, {
            encoding: "utf-8",
            cwd: rootDir,
        });

        const files = output
            .trim()
            .split("\n")
            .filter((line) => line)
            .map((line) => {
                const [status, ...pathParts] = line.split("\t");
                const path = pathParts.join("\t");
                return { status, path };
            });

        return files;
    } catch (error) {
        log(
            "⚠️  Could not get git diff. Make sure you have committed changes.",
            "yellow",
        );
        return [];
    }
}

function categorizeFiles(files) {
    const categories = {
        newPages: [],
        updatedPages: [],
        deletedPages: [],
        newSnippets: [],
        updatedSnippets: [],
        assets: [],
        config: [],
        other: [],
    };

    files.forEach(({ status, path }) => {
        // Skip non-documentation files
        if (
            path.includes("node_modules/") ||
            path.includes(".next/") ||
            path.includes("dist/")
        ) {
            return;
        }

        const isDocPage =
            path.includes("src/content/docs/") && path.endsWith(".mdx");
        const isSnippet =
            path.includes("snippets/") || path.includes("components/");
        const isAsset =
            path.match(/\.(png|jpg|jpeg|gif|svg|webp|mp4|webm)$/i) ||
            path.includes("assets/");
        const isConfig =
            path.match(/\.(json|yaml|yml|config\.|astro\.config)/) ||
            path.includes(".github/") ||
            path.includes("scripts/");

        if (isDocPage) {
            if (status === "A") {
                categories.newPages.push(path);
            } else if (status === "M") {
                categories.updatedPages.push(path);
            } else if (status === "D") {
                categories.deletedPages.push(path);
            }
        } else if (isSnippet) {
            if (status === "A") {
                categories.newSnippets.push(path);
            } else if (status === "M") {
                categories.updatedSnippets.push(path);
            }
        } else if (isAsset) {
            categories.assets.push({ status, path });
        } else if (isConfig) {
            categories.config.push({ status, path });
        } else {
            categories.other.push({ status, path });
        }
    });

    return categories;
}

function getPageTitle(filePath) {
    try {
        const fullPath = join(rootDir, filePath);
        if (!existsSync(fullPath)) return null;

        const content = readFileSync(fullPath, "utf-8");
        const titleMatch = content.match(/^title:\s*(.+)$/m);
        if (titleMatch) {
            return titleMatch[1].replace(/['"]/g, "").trim();
        }

        const h1Match = content.match(/^#\s+(.+)$/m);
        if (h1Match) {
            return h1Match[1].trim();
        }

        return null;
    } catch {
        return null;
    }
}

function formatPath(path) {
    // Convert file path to readable documentation path
    return path
        .replace("src/content/docs/", "")
        .replace(".mdx", "")
        .replace(/\//g, " › ");
}

function generateDraftPR(categories, currentBranch, baseBranch) {
    const date = new Date().toISOString().split("T")[0];
    let draft = `# Pull Request: ${currentBranch}\n\n`;
    draft += `**Base Branch:** ${baseBranch}\n`;
    draft += `**Date:** ${date}\n`;
    draft += `**Status:** 🟡 Draft - Needs Review\n\n`;

    draft += `---\n\n`;
    draft += `## 📝 Summary\n\n`;
    draft += `<!-- Add a brief summary of your changes here -->\n\n`;
    draft += `\n\n`;

    // Calculate totals
    const totalNew =
        categories.newPages.length +
        categories.newSnippets.length +
        categories.assets.filter((a) => a.status === "A").length;
    const totalUpdated =
        categories.updatedPages.length +
        categories.updatedSnippets.length +
        categories.assets.filter((a) => a.status === "M").length;
    const totalDeleted =
        categories.deletedPages.length +
        categories.assets.filter((a) => a.status === "D").length;

    draft += `## 📊 Change Statistics\n\n`;
    draft += `- ✨ **New:** ${totalNew} items\n`;
    draft += `- 📝 **Updated:** ${totalUpdated} items\n`;
    draft += `- 🗑️ **Deleted:** ${totalDeleted} items\n`;
    draft += `- **Total changes:** ${totalNew + totalUpdated + totalDeleted}\n\n`;

    draft += `---\n\n`;

    // New Pages
    if (categories.newPages.length > 0) {
        draft += `## ✨ New Documentation Pages\n\n`;
        categories.newPages.forEach((path) => {
            const title = getPageTitle(path);
            const formattedPath = formatPath(path);
            draft += `### ${title || formattedPath}\n`;
            draft += `- **Path:** \`${path}\`\n`;
            draft += `- **Description:** <!-- Add description of what this page covers -->\n`;
            draft += `- **Reason:** <!-- Why was this page added? -->\n\n`;
        });
        draft += `\n`;
    }

    // Updated Pages
    if (categories.updatedPages.length > 0) {
        draft += `## 📝 Updated Documentation Pages\n\n`;
        categories.updatedPages.forEach((path) => {
            const title = getPageTitle(path);
            const formattedPath = formatPath(path);
            draft += `### ${title || formattedPath}\n`;
            draft += `- **Path:** \`${path}\`\n`;
            draft += `- **Changes:** <!-- Describe what was changed -->\n`;
            draft += `- **Reason:** <!-- Why was this updated? -->\n\n`;
        });
        draft += `\n`;
    }

    // Deleted Pages
    if (categories.deletedPages.length > 0) {
        draft += `## 🗑️ Deleted Pages\n\n`;
        categories.deletedPages.forEach((path) => {
            const formattedPath = formatPath(path);
            draft += `- \`${path}\`\n`;
            draft += `  - **Reason:** <!-- Why was this removed? -->\n`;
        });
        draft += `\n`;
    }

    // Code/Snippet Changes
    if (
        categories.newSnippets.length > 0 ||
        categories.updatedSnippets.length > 0
    ) {
        draft += `## 🔧 Code Examples & Snippets\n\n`;

        if (categories.newSnippets.length > 0) {
            draft += `### New Snippets\n\n`;
            categories.newSnippets.forEach((path) => {
                draft += `- \`${path}\`\n`;
            });
            draft += `\n`;
        }

        if (categories.updatedSnippets.length > 0) {
            draft += `### Updated Snippets\n\n`;
            categories.updatedSnippets.forEach((path) => {
                draft += `- \`${path}\`\n`;
            });
            draft += `\n`;
        }
    }

    // Assets
    if (categories.assets.length > 0) {
        draft += `## 🖼️ Assets & Media\n\n`;
        categories.assets.forEach(({ status, path }) => {
            const statusIcon =
                status === "A" ? "✨" : status === "M" ? "📝" : "🗑️";
            draft += `- ${statusIcon} \`${path}\`\n`;
        });
        draft += `\n`;
    }

    draft += `---\n\n`;

    // Quality Checks
    draft += `## ✅ Quality Checklist\n\n`;
    draft += `Before submitting, please verify:\n\n`;
    draft += `- [ ] All new pages follow DOCS-STANDARDS.md guidelines\n`;
    draft += `- [ ] Frontmatter is complete and correct\n`;
    draft += `- [ ] Code examples are tested and working\n`;
    draft += `- [ ] Links are valid (internal and external)\n`;
    draft += `- [ ] Images have proper alt text\n`;
    draft += `- [ ] Spelling and grammar checked\n`;
    draft += `- [ ] Run \`pnpm run validate\` passes\n`;
    draft += `- [ ] Build succeeds (\`pnpm run build\`)\n\n`;

    // Breaking Changes
    draft += `## 🔴 Breaking Changes\n\n`;
    draft += `<!-- List any breaking changes or deprecations -->\n\n`;
    draft += `- None / Yes:\n\n`;

    // Additional Notes
    draft += `---\n\n`;
    draft += `## 📌 Additional Notes\n\n`;
    draft += `<!-- Any additional context, screenshots, or information -->\n\n`;

    draft += `---\n\n`;
    draft += `## 🎯 Ready for Review?\n\n`;
    draft += `When you've completed the checklist above:\n\n`;
    draft += `1. Run \`pnpm run pr:finalize\` to validate completeness\n`;
    draft += `2. Copy the content from \`PR-DESCRIPTION.md\` to your GitHub PR\n`;
    draft += `3. Request review from @KamranKashif or maintainers\n\n`;

    return draft;
}

function main() {
    log("\n📋 Preparing Pull Request Documentation...\n", "bright");

    const currentBranch = getCurrentBranch();
    log(`Current branch: ${currentBranch}`, "cyan");

    const baseBranch = getBaseBranch();
    log(`Base branch: ${baseBranch}`, "cyan");

    log("\n🔍 Analyzing changes...\n", "blue");

    const changedFiles = getChangedFiles(baseBranch);

    if (changedFiles.length === 0) {
        log("⚠️  No changes detected.", "yellow");
        log("Make sure you have committed your changes.", "yellow");
        process.exit(1);
    }

    const categories = categorizeFiles(changedFiles);

    const draft = generateDraftPR(categories, currentBranch, baseBranch);

    const outputPath = join(rootDir, "DRAFT-PR.md");
    writeFileSync(outputPath, draft, "utf-8");

    log("✅ Draft PR documentation generated!\n", "green");
    log(`📄 File: ${outputPath}`, "cyan");
    log("\n📝 Next steps:", "bright");
    log("  1. Review and edit DRAFT-PR.md", "yellow");
    log("     - Add descriptions for new pages", "yellow");
    log("     - Explain reasons for changes", "yellow");
    log("     - Complete the checklist", "yellow");
    log("  2. Run: pnpm run pr:finalize", "blue");
    log("  3. Copy content to GitHub PR\n", "blue");
}

main();
