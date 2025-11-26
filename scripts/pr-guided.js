#!/usr/bin/env node
/**
 * PR Guided Creation - Interactive step-by-step PR creation
 *
 * Guides you through the entire PR process with validation at each step
 * Usage: pnpm run pr:guided
 */

import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as readline from "readline";

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

function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(`${colors.cyan}${question}${colors.reset} `, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
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

function hasUncommittedChanges() {
    try {
        const status = execSync("git status --porcelain", {
            encoding: "utf-8",
        });
        return status.trim().length > 0;
    } catch {
        return false;
    }
}

function hasUnpushedCommits() {
    try {
        const branch = getCurrentBranch();
        const local = execSync("git rev-parse HEAD", {
            encoding: "utf-8",
        }).trim();
        const remote = execSync(
            `git rev-parse origin/${branch} 2>/dev/null || echo "none"`,
            {
                encoding: "utf-8",
            },
        ).trim();
        return local !== remote && remote !== "none";
    } catch {
        return false;
    }
}

function checkUpstreamRemote() {
    try {
        const remotes = execSync("git remote -v", { encoding: "utf-8" });
        return remotes.includes("upstream");
    } catch {
        return false;
    }
}

function checkGitHubCLI() {
    try {
        execSync("gh --version", { encoding: "utf-8", stdio: "pipe" });
        return true;
    } catch {
        return false;
    }
}

function getLastPRInfo() {
    if (!existsSync(trackingFile)) {
        return null;
    }
    try {
        return JSON.parse(readFileSync(trackingFile, "utf-8"));
    } catch {
        return null;
    }
}

async function main() {
    log(
        "\n╔════════════════════════════════════════════════════════╗",
        "bright",
    );
    log("║      🚀 Guided PR Creation for CouchCMS Docs         ║", "bright");
    log(
        "╚════════════════════════════════════════════════════════╝\n",
        "bright",
    );

    log("I'll guide you through creating a PR step-by-step.", "cyan");
    log("At each step, I'll validate and help prevent errors.\n", "cyan");

    const answer = await ask("Ready to start? (yes/no):");
    if (answer.toLowerCase() !== "yes" && answer.toLowerCase() !== "y") {
        log("\nOkay, run this again when you're ready!\n", "yellow");
        process.exit(0);
    }

    log("\n" + "─".repeat(60) + "\n", "blue");
    log("STEP 1: Pre-flight Checks", "bright");
    log("─".repeat(60) + "\n", "blue");

    // Check 1: Branch
    const branch = getCurrentBranch();
    log(
        `✓ Current branch: ${branch}`,
        branch === "docs-v2" ? "green" : "yellow",
    );
    if (branch !== "docs-v2") {
        log("  ⚠️  You're not on docs-v2. This is unusual.", "yellow");
        const cont = await ask("  Continue anyway? (yes/no):");
        if (cont.toLowerCase() !== "yes" && cont.toLowerCase() !== "y") {
            log("\nSwitch to docs-v2 first: git checkout docs-v2\n", "cyan");
            process.exit(0);
        }
    }

    // Check 2: Uncommitted changes
    const hasUncommitted = hasUncommittedChanges();
    if (hasUncommitted) {
        log("✗ You have uncommitted changes!", "red");
        log("  Run: git status", "yellow");
        log("\n  You must commit or stash them first.", "yellow");
        log("  git add . && git commit -m 'your message'\n", "cyan");
        process.exit(1);
    } else {
        log("✓ No uncommitted changes", "green");
    }

    // Check 3: Upstream remote
    const hasUpstream = checkUpstreamRemote();
    if (!hasUpstream) {
        log("✗ Upstream remote not configured!", "red");
        log("\n  Add it first:", "yellow");
        log(
            "  git remote add upstream https://github.com/CouchCMS/Documentation.git\n",
            "cyan",
        );
        process.exit(1);
    } else {
        log("✓ Upstream remote configured", "green");
    }

    // Check 4: Last PR tracking
    const lastPR = getLastPRInfo();
    if (!lastPR) {
        log("✗ No previous PR tracked", "red");
        log("\n  Mark your baseline first:", "yellow");
        log('  pnpm run pr:mark-as-merged "Your last PR"\n', "cyan");
        process.exit(1);
    } else {
        log(
            `✓ Last PR tracked: ${new Date(lastPR.date).toLocaleDateString("en-US")}`,
            "green",
        );
        log(`  "${lastPR.description}"`, "cyan");
    }

    log("\n✅ All pre-flight checks passed!\n", "green");

    // Step 2: Review changes
    log("─".repeat(60) + "\n", "blue");
    log("STEP 2: Review Your Changes", "bright");
    log("─".repeat(60) + "\n", "blue");

    log("Running analysis...\n", "cyan");
    try {
        execSync("pnpm run pr:test", { stdio: "inherit" });
    } catch (error) {
        log("\n✗ Analysis failed", "red");
        process.exit(1);
    }

    log("\n📄 Review the files:", "bright");
    log("  - PR-TEST-OUTPUT.md (auto-generated content)", "cyan");
    log("  - PR-SUMMARY.md (hand-crafted recommendation)", "cyan");
    log("  - PR-TEST-ANALYSIS.md (detailed analysis)\n", "cyan");

    const reviewed = await ask("Have you reviewed the PR content? (yes/no):");
    if (reviewed.toLowerCase() !== "yes" && reviewed.toLowerCase() !== "y") {
        log(
            "\nPlease review the files first, then run this again.\n",
            "yellow",
        );
        process.exit(0);
    }

    // Step 3: Choose PR method
    log("\n" + "─".repeat(60) + "\n", "blue");
    log("STEP 3: Choose PR Creation Method", "bright");
    log("─".repeat(60) + "\n", "blue");

    const hasGH = checkGitHubCLI();

    log("You have two options:\n", "cyan");
    log("1. Automated (requires GitHub CLI)", hasGH ? "green" : "yellow");
    if (!hasGH) {
        log("   ⚠️  GitHub CLI not installed", "yellow");
    }
    log("2. Manual (via GitHub.com UI)", "green");
    log("");

    const method = await ask("Choose method (1 for automated, 2 for manual):");

    if (method === "1") {
        await automatedFlow(hasGH);
    } else if (method === "2") {
        await manualFlow();
    } else {
        log("\nInvalid choice. Run again and choose 1 or 2.\n", "red");
        process.exit(1);
    }
}

async function automatedFlow(hasGH) {
    log("\n" + "─".repeat(60) + "\n", "blue");
    log("AUTOMATED PR CREATION", "bright");
    log("─".repeat(60) + "\n", "blue");

    if (!hasGH) {
        log("✗ GitHub CLI is not installed!", "red");
        log("\nInstall it first:", "yellow");
        log("  brew install gh", "cyan");
        log("  gh auth login\n", "cyan");
        process.exit(1);
    }

    log("The script will:\n", "cyan");
    log("  1. Push to your fork (no upstream sync needed!)", "yellow");
    log("  2. Create PR on GitHub", "yellow");
    log("  3. Open PR URL\n", "yellow");

    const proceed = await ask("Proceed with automated creation? (yes/no):");
    if (proceed.toLowerCase() !== "yes" && proceed.toLowerCase() !== "y") {
        log("\nCancelled. No PR was created.\n", "yellow");
        process.exit(0);
    }

    log("\n🚀 Creating PR...\n", "green");
    try {
        execSync("pnpm run pr:create", { stdio: "inherit" });
        log("\n✅ PR created successfully!\n", "green");
        await postPRInstructions();
    } catch (error) {
        log("\n✗ PR creation failed", "red");
        log("You can create the PR manually instead.\n", "yellow");
        process.exit(1);
    }
}

async function manualFlow() {
    log("\n" + "─".repeat(60) + "\n", "blue");
    log("MANUAL PR CREATION", "bright");
    log("─".repeat(60) + "\n", "blue");

    // Step 1: Push to fork (no upstream sync needed!)
    log("Step 1: Push to your fork\n", "bright");
    log("⚠️  IMPORTANT: Don't sync with upstream before PR!\n", "yellow");
    log(
        "The new workflow prevents conflicts by letting GitHub handle them.\n",
        "cyan",
    );
    log("Run this command:\n", "cyan");
    log(`  git push origin ${getCurrentBranch()}\n`, "yellow");

    const pushed = await ask("Have you pushed to your fork? (yes/no):");
    if (pushed.toLowerCase() !== "yes" && pushed.toLowerCase() !== "y") {
        log("\nPush first, then run this again.\n", "yellow");
        process.exit(0);
    }

    // Step 2: Get GitHub username
    log("\nStep 2: Get your GitHub username\n", "bright");
    try {
        const origin = execSync("git config --get remote.origin.url", {
            encoding: "utf-8",
        }).trim();
        const match = origin.match(/github\.com[:/]([^/]+)\//);
        if (match) {
            const username = match[1];
            log(`✓ Detected GitHub username: ${username}\n`, "green");
            log(`Your PR URL will be:`, "cyan");
            log(
                `https://github.com/${username}/Documentation/compare/docs-v2\n`,
                "yellow",
            );
        }
    } catch {
        log("Could not detect username automatically.\n", "yellow");
    }

    // Step 3: Create PR on GitHub
    log("Step 3: Create PR on GitHub.com\n", "bright");
    log("1. Go to your fork on GitHub.com", "yellow");
    log('2. Click the "Compare & pull request" button', "yellow");
    log("3. Make sure base is set to:", "yellow");
    log("   Base repository: CouchCMS/Documentation", "cyan");
    log("   Base branch: docs-v2", "cyan");
    log("4. Copy the PR content:\n", "yellow");

    log("═══════════════════════════════════════════════════", "bright");
    log("COPY THIS TITLE:", "bright");
    log("═══════════════════════════════════════════════════\n", "bright");
    log(
        "docs: comprehensive documentation updates and improvements\n",
        "green",
    );

    log("═══════════════════════════════════════════════════", "bright");
    log("COPY THIS BODY:", "bright");
    log("═══════════════════════════════════════════════════\n", "bright");
    log(
        "Open PR-SUMMARY.md and copy the 'Suggested PR Description' section",
        "yellow",
    );
    log("Or use the auto-generated content from PR-TEST-OUTPUT.md\n", "yellow");

    const created = await ask("Have you created the PR on GitHub? (yes/no):");
    if (created.toLowerCase() !== "yes" && created.toLowerCase() !== "y") {
        log(
            "\nCreate the PR first, then run this again for post-PR steps.\n",
            "yellow",
        );
        process.exit(0);
    }

    await postPRInstructions();
}

async function postPRInstructions() {
    log("\n" + "─".repeat(60) + "\n", "blue");
    log("AFTER PR IS CREATED", "bright");
    log("─".repeat(60) + "\n", "blue");

    log("✅ Your PR is now created!\n", "green");

    log("Next steps:\n", "bright");
    log("1. Review the PR on GitHub", "yellow");
    log("   - Check title and description", "cyan");
    log("   - Add any screenshots if needed", "cyan");
    log("   - Respond to any immediate feedback\n", "cyan");

    log("2. Wait for review from maintainers", "yellow");
    log("   - Kamran or other maintainers will review", "cyan");
    log("   - Respond to feedback if requested", "cyan");
    log("   - Be patient - reviews can take time\n", "cyan");

    log("3. After your PR is merged:", "yellow");
    log("   git fetch upstream", "cyan");
    log("   git pull upstream/docs-v2", "cyan");
    log('   pnpm run pr:mark-as-merged "Your PR title"\n', "cyan");

    log("🎊 Congratulations on your contribution!\n", "green");
}

main().catch((error) => {
    log(`\n✗ Error: ${error.message}\n`, "red");
    process.exit(1);
});
