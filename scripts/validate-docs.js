#!/usr/bin/env node
/**
 * CouchCMS Documentation Validator
 *
 * Validates documentation files against DOCS-STANDARDS.md requirements
 * Checks frontmatter, formatting, links, and quality standards
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const docsDir = join(rootDir, "src", "content", "docs");

console.log("🔍 Validating CouchCMS Documentation...\n");

let totalFiles = 0;
let passedFiles = 0;
let warnings = [];
let errors = [];

// Helper to get all MDX files
function getAllMdxFiles(dir, fileList = []) {
    const files = readdirSync(dir);

    files.forEach((file) => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
            getAllMdxFiles(filePath, fileList);
        } else if (file.endsWith(".mdx") || file.endsWith(".md")) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

// Validate frontmatter
function validateFrontmatter(content, file) {
    const issues = [];

    if (!content.startsWith("---")) {
        issues.push("❌ Missing frontmatter");
        return issues;
    }

    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
        issues.push("❌ Invalid frontmatter format");
        return issues;
    }

    const frontmatter = frontmatterMatch[1];

    // Check required fields
    const required = ["title", "description"];
    required.forEach((field) => {
        if (!frontmatter.includes(`${field}:`)) {
            issues.push(`⚠️  Missing frontmatter field: ${field}`);
        }
    });

    // Check title length (only maximum)
    const titleMatch = frontmatter.match(/title:\s*(.+)/);
    if (titleMatch) {
        const title = titleMatch[1].replace(/['"]/g, "").trim();
        if (title.length > 70) {
            issues.push(
                `⚠️  Title too long (${title.length} chars, maximum 70)`,
            );
        }
    }

    // Check description length
    const descMatch = frontmatter.match(/description:\s*["'](.+)["']/);
    if (descMatch) {
        const desc = descMatch[1];
        if (desc.length < 100) {
            issues.push(
                `⚠️  Description too short (${desc.length} chars, minimum 100)`,
            );
        } else if (desc.length > 170) {
            issues.push(
                `⚠️  Description too long (${desc.length} chars, maximum 170)`,
            );
        }
    }

    return issues;
}

// Validate heading hierarchy
function validateHeadings(content, file) {
    const issues = [];
    const lines = content.split("\n");
    const headings = [];

    // Skip frontmatter
    let inFrontmatter = false;
    let contentStarted = false;

    for (const line of lines) {
        if (line.trim() === "---") {
            if (!contentStarted) {
                inFrontmatter = !inFrontmatter;
                if (!inFrontmatter) contentStarted = true;
            }
            continue;
        }

        if (inFrontmatter || !contentStarted) continue;

        const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
        if (headingMatch) {
            const level = headingMatch[1].length;
            const text = headingMatch[2];
            headings.push({ level, text, line });
        }
    }

    // Check for skipped levels
    for (let i = 1; i < headings.length; i++) {
        const prev = headings[i - 1];
        const curr = headings[i];

        if (curr.level > prev.level + 1) {
            issues.push(
                `⚠️  Skipped heading level: H${prev.level} → H${curr.level} ("${curr.text}")`,
            );
        }
    }

    return issues;
}

// Validate code blocks
function validateCodeBlocks(content, file) {
    const issues = [];
    // Code blocks don't always need titles
    // Only add title when it's clear which file the code belongs to
    // This validation is intentionally minimal
    return issues;
}

// Validate links
function validateLinks(content, file) {
    const issues = [];

    // Check for links without trailing slashes (internal only)
    const internalLinkPattern = /\[([^\]]+)\]\(\.\.?\/[^)]+(?<!\/)\)/g;
    let match;

    while ((match = internalLinkPattern.exec(content)) !== null) {
        const linkText = match[1];
        issues.push(`⚠️  Internal link missing trailing slash: "${linkText}"`);
    }

    // Check for "click here" or "read more"
    const badLinkTextPattern = /\[(click here|read more|here)\]/gi;
    if (badLinkTextPattern.test(content)) {
        issues.push(
            '⚠️  Non-descriptive link text found ("click here" or "read more")',
        );
    }

    return issues;
}

// Validate formatting
function validateFormatting(content, file) {
    const issues = [];

    // Check for common Dutch words (should be English only)
    // Exclude common false positives that are valid English words
    const dutchWords = [
        "het",
        "een",
        "van",
        "de",
        "dit",
        "dat",
        "voor",
        "op",
        // "is" removed - also a common English word
        "zijn",
    ];
    const contentLower = content.toLowerCase();

    // Skip code blocks for this check
    const withoutCodeBlocks = content.replace(/```[\s\S]*?```/g, "");

    for (const word of dutchWords) {
        const pattern = new RegExp(`\\b${word}\\b`, "i");
        if (
            pattern.test(withoutCodeBlocks) &&
            !withoutCodeBlocks.includes(`\`${word}\``)
        ) {
            issues.push(
                `⚠️  Possible Dutch word detected: "${word}" (should be English only)`,
            );
            break; // Only report once per file
        }
    }

    return issues;
}

// Validate a single file
function validateFile(filePath) {
    totalFiles++;
    const relativePath = relative(rootDir, filePath);

    let content;
    try {
        content = readFileSync(filePath, "utf8");
    } catch (error) {
        errors.push(`❌ ${relativePath}: Cannot read file`);
        return;
    }

    const fileIssues = [];

    // Run all validators
    fileIssues.push(...validateFrontmatter(content, relativePath));
    fileIssues.push(...validateHeadings(content, relativePath));
    fileIssues.push(...validateCodeBlocks(content, relativePath));
    fileIssues.push(...validateLinks(content, relativePath));
    fileIssues.push(...validateFormatting(content, relativePath));

    if (fileIssues.length === 0) {
        passedFiles++;
    } else {
        console.log(`📄 ${relativePath}`);
        fileIssues.forEach((issue) => {
            console.log(`   ${issue}`);
            if (issue.startsWith("❌")) {
                errors.push(`${relativePath}: ${issue}`);
            } else {
                warnings.push(`${relativePath}: ${issue}`);
            }
        });
        console.log("");
    }
}

// Main validation
try {
    const mdxFiles = getAllMdxFiles(docsDir);

    if (mdxFiles.length === 0) {
        console.log("⚠️  No documentation files found in src/content/docs/\n");
        process.exit(1);
    }

    console.log(`Found ${mdxFiles.length} documentation files\n`);

    mdxFiles.forEach(validateFile);

    // Summary
    console.log("─────────────────────────────────────────────────────");
    console.log("📊 Validation Summary\n");
    console.log(`Total files:    ${totalFiles}`);
    console.log(`Passed:         ${passedFiles} ✅`);
    console.log(`With warnings:  ${totalFiles - passedFiles} ⚠️`);
    console.log(`Errors:         ${errors.length} ❌`);
    console.log(`Warnings:       ${warnings.length} ⚠️`);
    console.log("─────────────────────────────────────────────────────\n");

    if (errors.length > 0) {
        console.log("❌ Validation failed with errors");
        console.log("   Fix errors before deploying documentation\n");
        process.exit(1);
    } else if (warnings.length > 0) {
        console.log("⚠️  Validation passed with warnings");
        console.log("   Consider addressing warnings for better quality\n");
        process.exit(0);
    } else {
        console.log("✅ All documentation files valid!\n");
        process.exit(0);
    }
} catch (error) {
    console.error("❌ Validation error:", error.message);
    process.exit(1);
}
