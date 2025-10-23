#!/usr/bin/env node
/**
 * Conflict Resolver - Helper for resolving merge conflicts
 *
 * Analyzes conflicts and provides smart resolution strategies
 * Usage: pnpm run conflicts:resolve
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Colors
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
};

function log(message, color = "reset") {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function getConflicts() {
    try {
        const output = execSync("git diff --name-only --diff-filter=U", {
            encoding: "utf-8",
            cwd: rootDir,
        });
        return output
            .trim()
            .split("\n")
            .filter((f) => f);
    } catch {
        return [];
    }
}

function getConflictType(file) {
    // Check if it's a modify/delete conflict
    try {
        const status = execSync(`git status --short ${file}`, {
            encoding: "utf-8",
            cwd: rootDir,
        });
        if (status.includes("DU")) return "deleted-by-us";
        if (status.includes("UD")) return "deleted-by-them";
        return "modified-both";
    } catch {
        return "unknown";
    }
}

function categorizeFile(file) {
    if (file.includes("package.json") || file.includes("pnpm-lock.yaml")) {
        return "dependency";
    }
    if (
        file.includes(".cursorrules") ||
        file.includes(".windsurfrules") ||
        file.includes(".giga") ||
        file.includes("rules/")
    ) {
        return "ai-config";
    }
    if (file.includes("src/content/docs/") && file.endsWith(".mdx")) {
        return "documentation";
    }
    return "other";
}

function getSuggestion(file, category, conflictType) {
    if (conflictType === "deleted-by-us") {
        return {
            action: "accept-theirs",
            reason: "You deleted this file locally, but upstream modified it",
            command: `git add ${file}`,
            safe: true,
        };
    }

    if (conflictType === "deleted-by-them") {
        return {
            action: "accept-ours",
            reason: "Upstream deleted this, keep your version",
            command: `git rm ${file}`,
            safe: false,
        };
    }

    switch (category) {
        case "dependency":
            return {
                action: "accept-theirs",
                reason: "Dependencies: prefer upstream version, then reinstall",
                command: `git checkout --theirs ${file} && git add ${file}`,
                post: "pnpm install",
                safe: true,
            };

        case "ai-config":
            return {
                action: "accept-ours",
                reason: "AI config: keep your local configuration",
                command: `git checkout --ours ${file} && git add ${file}`,
                safe: true,
            };

        case "documentation":
            return {
                action: "manual",
                reason: "Documentation: needs manual review",
                command: `code ${file}`,
                safe: false,
            };

        default:
            return {
                action: "manual",
                reason: "Unknown file type: manual review needed",
                command: `code ${file}`,
                safe: false,
            };
    }
}

function main() {
    log("\n🔧 Merge Conflict Resolver\n", "bright");

    const conflicts = getConflicts();

    if (conflicts.length === 0) {
        log("✅ No merge conflicts detected!\n", "green");
        log(
            "If you expected conflicts, make sure you're in a merge state.\n",
            "yellow",
        );
        return;
    }

    log(
        `Found ${conflicts.length} conflicted file${conflicts.length !== 1 ? "s" : ""}\n`,
        "red",
    );

    const byCategory = {
        dependency: [],
        "ai-config": [],
        documentation: [],
        other: [],
    };

    conflicts.forEach((file) => {
        const category = categorizeFile(file);
        const conflictType = getConflictType(file);
        const suggestion = getSuggestion(file, category, conflictType);

        byCategory[category].push({
            file,
            conflictType,
            suggestion,
        });
    });

    // Show dependency conflicts first
    if (byCategory.dependency.length > 0) {
        log("═══════════════════════════════════════════════════", "blue");
        log("📦 DEPENDENCY CONFLICTS (Safe Auto-Resolve)", "bright");
        log("═══════════════════════════════════════════════════\n", "blue");

        byCategory.dependency.forEach(({ file, suggestion }) => {
            log(`File: ${file}`, "yellow");
            log(`Action: ${suggestion.action}`, "cyan");
            log(`Reason: ${suggestion.reason}`, "cyan");
            log(`Command: ${suggestion.command}`, "green");
            if (suggestion.post) {
                log(`Then run: ${suggestion.post}`, "green");
            }
            log("");
        });

        log("✅ These are safe to auto-resolve\n", "green");
    }

    // Show AI config conflicts
    if (byCategory["ai-config"].length > 0) {
        log("═══════════════════════════════════════════════════", "blue");
        log("🤖 AI CONFIGURATION CONFLICTS (Safe - Keep Yours)", "bright");
        log("═══════════════════════════════════════════════════\n", "blue");

        byCategory["ai-config"].forEach(
            ({ file, suggestion, conflictType }) => {
                log(`File: ${file}`, "yellow");
                log(`Type: ${conflictType}`, "cyan");
                log(`Action: ${suggestion.action}`, "cyan");
                log(`Reason: ${suggestion.reason}`, "cyan");
                log(`Command: ${suggestion.command}`, "green");
                log("");
            },
        );

        log(
            "✅ These are your local AI configs - safe to keep yours\n",
            "green",
        );
    }

    // Show documentation conflicts
    if (byCategory.documentation.length > 0) {
        log("═══════════════════════════════════════════════════", "blue");
        log("📝 DOCUMENTATION CONFLICTS (Needs Manual Review)", "bright");
        log("═══════════════════════════════════════════════════\n", "blue");

        byCategory.documentation.forEach(({ file, suggestion }) => {
            log(`File: ${file}`, "yellow");
            log(`Action: ${suggestion.action}`, "red");
            log(`Reason: ${suggestion.reason}`, "cyan");
            log(`Command: ${suggestion.command}`, "green");
            log("");
        });

        log(
            "⚠️  These need manual review - both versions have changes\n",
            "yellow",
        );
    }

    // Show other conflicts
    if (byCategory.other.length > 0) {
        log("═══════════════════════════════════════════════════", "blue");
        log("🔍 OTHER CONFLICTS", "bright");
        log("═══════════════════════════════════════════════════\n", "blue");

        byCategory.other.forEach(({ file, suggestion }) => {
            log(`File: ${file}`, "yellow");
            log(`Action: ${suggestion.action}`, "cyan");
            log(`Command: ${suggestion.command}`, "green");
            log("");
        });
    }

    // Summary and quick resolve
    log("═══════════════════════════════════════════════════", "bright");
    log("🚀 QUICK RESOLVE COMMANDS", "bright");
    log("═══════════════════════════════════════════════════\n", "bright");

    const safeCommands = [];
    const manualFiles = [];

    Object.values(byCategory)
        .flat()
        .forEach(({ file, suggestion }) => {
            if (suggestion.safe) {
                safeCommands.push(suggestion.command);
                if (suggestion.post) {
                    safeCommands.push(suggestion.post);
                }
            } else {
                manualFiles.push(file);
            }
        });

    if (safeCommands.length > 0) {
        log("Safe auto-resolve (run these):", "green");
        log("```bash", "cyan");
        safeCommands.forEach((cmd) => log(cmd, "cyan"));
        log("```\n", "cyan");
    }

    if (manualFiles.length > 0) {
        log("Manual review needed:", "yellow");
        manualFiles.forEach((file) => {
            log(`  - ${file}`, "yellow");
        });
        log("\nOpen each file and look for:", "cyan");
        log("  <<<<<<< HEAD", "red");
        log("  Your changes", "cyan");
        log("  =======", "yellow");
        log("  Upstream changes", "cyan");
        log("  >>>>>>> upstream/docs-v2", "blue");
        log("\nKeep the correct version and remove conflict markers\n", "cyan");
    }

    log("After resolving all conflicts:", "bright");
    log("  git add .", "green");
    log(
        "  git commit -m 'Merge upstream/docs-v2, resolved conflicts'",
        "green",
    );
    log("  git push origin docs-v2\n", "green");
}

main();
