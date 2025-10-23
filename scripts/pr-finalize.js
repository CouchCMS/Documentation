#!/usr/bin/env node
/**
 * PR Finalize Script
 *
 * Validates the DRAFT-PR.md for completeness and generates final PR-DESCRIPTION.md
 * Usage: pnpm run pr:finalize
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
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
    red: "\x1b[31m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
};

function log(message, color = "reset") {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateDraft(content) {
    const issues = [];
    const warnings = [];

    // Check if summary is filled
    if (content.includes("<!-- Add a brief summary of your changes here -->")) {
        issues.push("❌ Summary section is empty");
    }

    // Check for incomplete descriptions
    const incompleteDescriptions = (
        content.match(/<!-- Add description of what this page covers -->/g) ||
        []
    ).length;
    if (incompleteDescriptions > 0) {
        issues.push(
            `❌ ${incompleteDescriptions} new page(s) missing descriptions`,
        );
    }

    // Check for incomplete reasons
    const incompleteReasons = (
        content.match(
            /<!-- Why was this (page added|updated|removed)\? -->/g,
        ) || []
    ).length;
    if (incompleteReasons > 0) {
        warnings.push(
            `⚠️  ${incompleteReasons} item(s) missing reason explanations`,
        );
    }

    // Check for incomplete changes
    const incompleteChanges = (
        content.match(/<!-- Describe what was changed -->/g) || []
    ).length;
    if (incompleteChanges > 0) {
        issues.push(
            `❌ ${incompleteChanges} updated page(s) missing change descriptions`,
        );
    }

    // Check if checklist items are checked
    const uncheckedItems = (content.match(/- \[ \]/g) || []).length;
    if (uncheckedItems > 0) {
        warnings.push(`⚠️  ${uncheckedItems} checklist item(s) not completed`);
    }

    // Check if breaking changes section is filled
    if (content.includes("- None / Yes:")) {
        warnings.push("⚠️  Breaking changes section needs clarification");
    }

    // Check if additional notes section is empty
    if (
        content.includes(
            "<!-- Any additional context, screenshots, or information -->",
        )
    ) {
        warnings.push("⚠️  Additional notes section is empty (optional)");
    }

    return { issues, warnings };
}

function cleanupDraft(content) {
    // Remove all HTML comments
    let cleaned = content.replace(/<!--[\s\S]*?-->/g, "");

    // Remove "Ready for Review" section
    cleaned = cleaned.replace(/---\n\n## 🎯 Ready for Review\?[\s\S]*$/, "---");

    // Remove empty lines (more than 2 consecutive)
    cleaned = cleaned.replace(/\n{3,}/g, "\n\n");

    // Add footer
    cleaned += `\n\n---\n\n`;
    cleaned += `**Generated with:** CouchCMS Documentation PR Tracker\n`;
    cleaned += `**Ready for review** ✅\n`;

    return cleaned.trim() + "\n";
}

function generateSummary(content) {
    const stats = {
        newPages: (content.match(/## ✨ New Documentation Pages/g) || [])
            .length,
        updatedPages: (
            content.match(/## 📝 Updated Documentation Pages/g) || []
        ).length,
        deletedPages: (content.match(/## 🗑️ Deleted Pages/g) || []).length,
        snippets: (content.match(/## 🔧 Code Examples & Snippets/g) || [])
            .length,
        assets: (content.match(/## 🖼️ Assets & Media/g) || []).length,
    };

    let summary = "\n📊 PR Summary:\n";
    if (stats.newPages > 0)
        summary += `  ✨ ${stats.newPages} section(s) with new pages\n`;
    if (stats.updatedPages > 0)
        summary += `  📝 ${stats.updatedPages} section(s) with updates\n`;
    if (stats.deletedPages > 0)
        summary += `  🗑️  ${stats.deletedPages} section(s) with deletions\n`;
    if (stats.snippets > 0)
        summary += `  🔧 ${stats.snippets} section(s) with code changes\n`;
    if (stats.assets > 0)
        summary += `  🖼️  ${stats.assets} section(s) with asset changes\n`;

    return summary;
}

function main() {
    log("\n🔍 Finalizing Pull Request Documentation...\n", "bright");

    const draftPath = join(rootDir, "DRAFT-PR.md");
    const outputPath = join(rootDir, "PR-DESCRIPTION.md");

    // Check if draft exists
    if (!existsSync(draftPath)) {
        log("❌ DRAFT-PR.md not found!", "red");
        log("\nRun this command first:", "yellow");
        log("  pnpm run pr:prepare\n", "cyan");
        process.exit(1);
    }

    // Read draft
    const content = readFileSync(draftPath, "utf-8");

    // Validate
    log("📋 Validating completeness...\n", "blue");
    const { issues, warnings } = validateDraft(content);

    // Show results
    if (issues.length > 0) {
        log("❌ Validation Failed!\n", "red");
        issues.forEach((issue) => log(issue, "red"));
        log("\n💡 Please complete DRAFT-PR.md before finalizing.\n", "yellow");
        process.exit(1);
    }

    if (warnings.length > 0) {
        log("⚠️  Warnings (optional to fix):\n", "yellow");
        warnings.forEach((warning) => log(warning, "yellow"));
        log("");
    }

    if (issues.length === 0 && warnings.length === 0) {
        log("✅ All required fields completed!\n", "green");
    }

    // Generate final version
    log("📝 Generating final PR description...\n", "blue");
    const finalContent = cleanupDraft(content);
    writeFileSync(outputPath, finalContent, "utf-8");

    log("✅ PR description ready!\n", "green");
    log(`📄 File: ${outputPath}`, "cyan");

    // Show summary
    log(generateSummary(content), "blue");

    log("\n📋 Next steps:", "bright");
    log("  1. Review PR-DESCRIPTION.md", "green");
    log("  2. Copy the entire content", "green");
    log("  3. Paste it into your GitHub PR description", "green");
    log("  4. Submit for review! 🚀\n", "green");

    log("💡 Pro tip: Keep both files for reference", "cyan");
    log("   - DRAFT-PR.md = your working draft", "cyan");
    log("   - PR-DESCRIPTION.md = final version for GitHub\n", "cyan");
}

main();
