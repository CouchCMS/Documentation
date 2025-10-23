#!/usr/bin/env node
/**
 * PR Mark as Merged
 *
 * Marks the current state as the last merged PR
 * Usage: pnpm run pr:mark-as-merged ["Optional PR description"]
 */

import { writeFileSync } from "fs";
import { execSync } from "child_process";
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
    cyan: "\x1b[36m",
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

function getLatestCommit() {
    try {
        const hash = execSync("git rev-parse HEAD", {
            encoding: "utf-8",
        }).trim();

        const message = execSync("git log -1 --pretty=%B", {
            encoding: "utf-8",
        }).trim();

        return { hash, message };
    } catch {
        return null;
    }
}

function main() {
    log("\n✅ Marking Current State as Last PR\n", "bright");

    const description = process.argv[2] || "";
    const branch = getCurrentBranch();
    const commit = getLatestCommit();

    const prInfo = {
        date: new Date().toISOString(),
        branch: branch,
        description: description,
        commit: commit
            ? {
                  hash: commit.hash,
                  message: commit.message,
              }
            : null,
    };

    writeFileSync(trackingFile, JSON.stringify(prInfo, null, 2), "utf-8");

    log("✅ Successfully marked as last PR!", "green");
    log(`\n📍 Details:`, "bright");
    log(`  Date: ${new Date(prInfo.date).toLocaleString("nl-NL")}`, "cyan");
    log(`  Branch: ${branch}`, "cyan");
    if (description) {
        log(`  Description: ${description}`, "cyan");
    }
    if (commit) {
        log(`  Commit: ${commit.hash.substring(0, 7)}`, "cyan");
        log(`  Message: ${commit.message.split("\n")[0]}`, "cyan");
    }

    log("\n💡 To see changes since this PR:", "bright");
    log("  pnpm run pr:since-last\n", "cyan");
}

main();
