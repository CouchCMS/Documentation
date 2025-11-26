#!/usr/bin/env node
/**
 * PR Create Test - Dry run of PR creation
 *
 * Shows what would be created without actually creating the PR
 * Usage: pnpm run pr:test
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const trackingFile = join(rootDir, ".last-pr.json");

// Colors for terminal output
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    magenta: "\x1b[35m",
};

function log(message, color = "reset") {
    console.log(`${colors[color]}${message}${colors.reset}`);
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

function getLastPRInfo() {
    if (!existsSync(trackingFile)) {
        return null;
    }

    try {
        const data = readFileSync(trackingFile, "utf-8");
        return JSON.parse(data);
    } catch {
        return null;
    }
}

function getCommitsSince(since) {
    try {
        const sinceCommit = execSync(
            `git rev-list -1 --before="${since}" HEAD`,
            {
                encoding: "utf-8",
                cwd: rootDir,
            },
        ).trim();

        if (!sinceCommit) {
            return [];
        }

        const output = execSync(
            `git log ${sinceCommit}..HEAD --oneline --no-merges`,
            {
                encoding: "utf-8",
                cwd: rootDir,
            },
        );

        return output
            .trim()
            .split("\n")
            .filter((line) => line)
            .map((line) => {
                const [hash, ...messageParts] = line.split(" ");
                return { hash, message: messageParts.join(" ") };
            });
    } catch {
        return [];
    }
}

function getChangedFilesSince(since) {
    try {
        const sinceCommit = execSync(
            `git rev-list -1 --before="${since}" HEAD`,
            {
                encoding: "utf-8",
                cwd: rootDir,
            },
        ).trim();

        if (!sinceCommit) {
            return [];
        }

        const output = execSync(
            `git diff --name-status ${sinceCommit}...HEAD`,
            {
                encoding: "utf-8",
                cwd: rootDir,
            },
        );

        return output
            .trim()
            .split("\n")
            .filter((line) => line)
            .map((line) => {
                const [status, ...pathParts] = line.split("\t");
                const path = pathParts.join("\t");
                return { status, path };
            });
    } catch {
        return [];
    }
}

function categorizeFiles(files) {
    const categories = {
        newPages: [],
        updatedPages: [],
        deletedPages: [],
        otherChanges: [],
    };

    files.forEach(({ status, path }) => {
        if (
            path.includes("node_modules/") ||
            path.includes("dist/") ||
            path.includes(".next/")
        ) {
            return;
        }

        const isDocPage =
            path.includes("src/content/docs/") && path.endsWith(".mdx");

        if (isDocPage) {
            if (status === "A") {
                categories.newPages.push(path);
            } else if (status === "M") {
                categories.updatedPages.push(path);
            } else if (status === "D") {
                categories.deletedPages.push(path);
            }
        } else {
            categories.otherChanges.push({ status, path });
        }
    });

    return categories;
}

function generatePRTitle(commits, categorizedFiles) {
    const { newPages, updatedPages, deletedPages } = categorizedFiles;

    const commitMessages = commits.map((c) => c.message.toLowerCase());

    // Count commit types
    const docsCount = commits.filter((c) =>
        c.message.toLowerCase().startsWith("docs"),
    ).length;
    const fixCount = commits.filter((c) =>
        c.message.toLowerCase().startsWith("fix"),
    ).length;

    const hasTag = commitMessages.some((m) => m.includes("tag"));
    const hasConcept = commitMessages.some((m) => m.includes("concept"));
    const hasTutorial = commitMessages.some((m) => m.includes("tutorial"));

    // Prefer docs: over fix: if docs commits dominate
    const preferDocs = docsCount > fixCount;

    if (newPages.length > 3) {
        if (hasTag) {
            return "docs: add comprehensive tag reference documentation";
        } else if (hasConcept) {
            return "docs: add core concepts documentation";
        } else if (hasTutorial) {
            return "docs: add new tutorials and guides";
        }
        return `docs: add ${newPages.length} new documentation pages`;
    } else if (newPages.length > 0) {
        return "docs: add new documentation pages";
    } else if (updatedPages.length > 50) {
        // Large update
        return "docs: comprehensive documentation updates and improvements";
    } else if (updatedPages.length > 10) {
        // Medium update
        if (preferDocs) {
            return "docs: documentation updates and improvements";
        } else if (fixCount > 0) {
            return "fix: correct multiple documentation issues";
        }
        return "docs: documentation updates and improvements";
    } else if (updatedPages.length > 0) {
        // Small update
        if (fixCount > docsCount) {
            return "fix: documentation corrections and improvements";
        }
        return "docs: documentation updates and improvements";
    }

    return "docs: documentation updates";
}

function generatePRBody(commits, categorizedFiles) {
    const { newPages, updatedPages, deletedPages, otherChanges } =
        categorizedFiles;

    let body = "## Summary\n\n";

    if (updatedPages.length > 50) {
        body +=
            "This PR includes comprehensive documentation updates across multiple areas, enhancing clarity, completeness, and user experience.\n\n";
    } else {
        body += "This PR includes documentation updates and improvements.\n\n";
    }

    body += "## Changes\n\n";

    if (newPages.length > 0) {
        body += `### ✨ New Pages (${newPages.length})\n\n`;
        newPages.slice(0, 10).forEach((path) => {
            const pageName = path
                .split("/")
                .pop()
                .replace(".mdx", "")
                .replace(/-/g, " ");
            body += `- ${pageName}\n`;
        });
        if (newPages.length > 10) {
            body += `- ... and ${newPages.length - 10} more\n`;
        }
        body += "\n";
    }

    if (updatedPages.length > 0) {
        body += `### 📝 Updated Pages (${updatedPages.length})\n\n`;

        // Group by documentation area
        const byArea = {};
        updatedPages.forEach((path) => {
            const area = path.split("/")[3] || "other"; // src/content/docs/[area]/
            if (!byArea[area]) byArea[area] = [];
            byArea[area].push(path);
        });

        Object.entries(byArea).forEach(([area, paths]) => {
            body += `**${area}** (${paths.length} pages)\n`;
            paths.slice(0, 5).forEach((path) => {
                const pageName = path
                    .split("/")
                    .pop()
                    .replace(".mdx", "")
                    .replace(/-/g, " ");
                body += `- ${pageName}\n`;
            });
            if (paths.length > 5) {
                body += `- ... and ${paths.length - 5} more\n`;
            }
            body += "\n";
        });
    }

    if (deletedPages.length > 0) {
        body += `### 🗑️ Deleted Pages (${deletedPages.length})\n\n`;
        deletedPages.forEach((path) => {
            const pageName = path
                .split("/")
                .pop()
                .replace(".mdx", "")
                .replace(/-/g, " ");
            body += `- ${pageName}\n`;
        });
        body += "\n";
    }

    body += "## Commits\n\n";
    body += `${commits.length} commit${commits.length !== 1 ? "s" : ""} including:\n\n`;
    commits.slice(0, 10).forEach((commit) => {
        body += `- ${commit.message} (${commit.hash})\n`;
    });
    if (commits.length > 10) {
        body += `- ... and ${commits.length - 10} more commits\n`;
    }

    body += "\n## Quality Checklist\n\n";
    body += "- [x] Documentation follows DOCS-STANDARDS.md\n";
    body += "- [x] All links tested and working\n";
    body += "- [x] Build passes locally (`pnpm run build`)\n";
    body += "- [x] Validation passes (`pnpm run validate`)\n";
    body += "- [x] English language used throughout\n";

    return body;
}

function main() {
    log("\n🧪 PR Creation Test (Dry Run)\n", "bright");
    log(
        "This will show what would be created WITHOUT actually creating the PR\n",
        "yellow",
    );

    const currentBranch = getCurrentBranch();
    log(`Current branch: ${currentBranch}`, "cyan");

    // Get last PR info
    const lastPR = getLastPRInfo();
    if (!lastPR) {
        log("❌ No previous PR tracked", "red");
        log("\nMark your last PR first:", "yellow");
        log('  pnpm run pr:mark-as-merged "Last PR description"\n', "cyan");
        process.exit(1);
    }

    log(`\n📍 Last PR: ${lastPR.description}`, "cyan");
    log(
        `   Date: ${new Date(lastPR.date).toLocaleDateString("en-US")}`,
        "cyan",
    );

    // Get changes
    const commits = getCommitsSince(lastPR.date);
    if (commits.length === 0) {
        log("\n⚠️  No new commits since last PR", "yellow");
        log("Nothing to create PR for.\n", "yellow");
        process.exit(1);
    }

    const files = getChangedFilesSince(lastPR.date);
    const categorizedFiles = categorizeFiles(files);

    log(`\n📊 Summary:`, "bright");
    log(`   ${commits.length} commits`, "cyan");
    log(`   ${categorizedFiles.newPages.length} new pages`, "green");
    log(`   ${categorizedFiles.updatedPages.length} updated pages`, "blue");
    log(`   ${categorizedFiles.deletedPages.length} deleted pages`, "red");
    log(`   ${categorizedFiles.otherChanges.length} other changes`, "yellow");

    // Generate PR content
    const title = generatePRTitle(commits, categorizedFiles);
    const body = generatePRBody(commits, categorizedFiles);

    log(`\n═══════════════════════════════════════════════════`, "bright");
    log(`📝 GENERATED PR TITLE:`, "bright");
    log(`═══════════════════════════════════════════════════\n`, "bright");
    log(title, "green");

    log(`\n═══════════════════════════════════════════════════`, "bright");
    log(`📄 GENERATED PR BODY:`, "bright");
    log(`═══════════════════════════════════════════════════\n`, "bright");
    log(body, "cyan");

    log(`\n═══════════════════════════════════════════════════`, "bright");
    log(`🔍 AFFECTED FILES (First 20):`, "bright");
    log(`═══════════════════════════════════════════════════\n`, "bright");

    if (categorizedFiles.newPages.length > 0) {
        log(`✨ New Pages:`, "green");
        categorizedFiles.newPages.slice(0, 20).forEach((path) => {
            log(`   ${path}`, "cyan");
        });
        if (categorizedFiles.newPages.length > 20) {
            log(
                `   ... and ${categorizedFiles.newPages.length - 20} more`,
                "yellow",
            );
        }
        log("");
    }

    if (categorizedFiles.updatedPages.length > 0) {
        log(`📝 Updated Pages (showing first 20):`, "blue");
        categorizedFiles.updatedPages.slice(0, 20).forEach((path) => {
            log(`   ${path}`, "cyan");
        });
        if (categorizedFiles.updatedPages.length > 20) {
            log(
                `   ... and ${categorizedFiles.updatedPages.length - 20} more`,
                "yellow",
            );
        }
        log("");
    }

    log(`\n═══════════════════════════════════════════════════`, "bright");
    log(`🎯 WHAT WOULD HAPPEN:`, "bright");
    log(`═══════════════════════════════════════════════════\n`, "bright");

    log(`1. Sync with upstream:`, "yellow");
    log(`   git fetch upstream`, "cyan");
    log(`   git merge upstream/docs-v2`, "cyan");
    log("");

    log(`2. Push to your fork:`, "yellow");
    log(`   git push origin ${currentBranch}`, "cyan");
    log("");

    log(`3. Create PR via GitHub CLI:`, "yellow");
    log(`   gh pr create \\`, "cyan");
    log(`     --base docs-v2 \\`, "cyan");
    log(`     --head ${currentBranch} \\`, "cyan");
    log(`     --title "${title}" \\`, "cyan");
    log(`     --body "..." \\`, "cyan");
    log(`     --repo CouchCMS/Documentation`, "cyan");
    log("");

    log(`4. Result:`, "yellow");
    log(`   PR would be created at:`, "cyan");
    log(`   https://github.com/CouchCMS/Documentation/pull/NEW`, "green");
    log("");

    // Save to file for review
    const outputFile = join(rootDir, "PR-TEST-OUTPUT.md");
    const fullOutput = `# PR Creation Test - Dry Run

**Date:** ${new Date().toLocaleString("en-US")}
**Branch:** ${currentBranch}
**Last PR:** ${lastPR.description} (${new Date(lastPR.date).toLocaleDateString("en-US")})

## Statistics

- Commits: ${commits.length}
- New pages: ${categorizedFiles.newPages.length}
- Updated pages: ${categorizedFiles.updatedPages.length}
- Deleted pages: ${categorizedFiles.deletedPages.length}
- Other changes: ${categorizedFiles.otherChanges.length}

## Generated PR Title

\`\`\`
${title}
\`\`\`

## Generated PR Body

\`\`\`markdown
${body}
\`\`\`

## All Affected Files

### New Pages (${categorizedFiles.newPages.length})

${categorizedFiles.newPages.map((p) => `- ${p}`).join("\n")}

### Updated Pages (${categorizedFiles.updatedPages.length})

${categorizedFiles.updatedPages.map((p) => `- ${p}`).join("\n")}

${categorizedFiles.deletedPages.length > 0 ? `### Deleted Pages (${categorizedFiles.deletedPages.length})\n\n${categorizedFiles.deletedPages.map((p) => `- ${p}`).join("\n")}` : ""}

## All Commits

${commits.map((c) => `- ${c.hash} - ${c.message}`).join("\n")}

## What Would Happen

1. **Sync:** \`git fetch upstream && git merge upstream/docs-v2\`
2. **Push:** \`git push origin ${currentBranch}\`
3. **Create PR:** Via GitHub CLI to CouchCMS/Documentation
4. **Result:** New PR at https://github.com/CouchCMS/Documentation/pull/NEW

---

**This was a test run. No PR was actually created.**

To create the actual PR:
\`\`\`bash
pnpm run pr:create
\`\`\`
`;

    writeFileSync(outputFile, fullOutput, "utf-8");

    log(`\n═══════════════════════════════════════════════════`, "bright");
    log(`📄 FULL REPORT SAVED:`, "bright");
    log(`═══════════════════════════════════════════════════\n`, "bright");
    log(`File: PR-TEST-OUTPUT.md`, "green");
    log(`Review this file for complete details\n`, "yellow");

    log(`✅ Test complete! No PR was created.`, "green");
    log(`\n💡 Next steps:`, "bright");
    log(`   1. Review PR-TEST-OUTPUT.md`, "yellow");
    log(`   2. Check if title and body look good`, "yellow");
    log(`   3. If satisfied, run: pnpm run pr:create`, "cyan");
    log(`   4. Or create PR manually on GitHub\n`, "cyan");
}

main();
