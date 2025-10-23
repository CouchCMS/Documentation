#!/usr/bin/env node
/**
 * Automatically fix missing trailing slashes in internal links
 * This is a safe automated fix
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const docsDir = join(rootDir, "src", "content", "docs");

console.log("🔧 Fixing internal links - adding trailing slashes...\n");

let totalFiles = 0;
let fixedFiles = 0;
let totalFixes = 0;

// Get all MDX files
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

// Fix links in a single file
function fixLinksInFile(filePath) {
    totalFiles++;
    const relativePath = relative(rootDir, filePath);
    const content = readFileSync(filePath, "utf8");

    // Pattern: [text](../path) or [text](./path) without trailing slash
    // Must not already end with /
    const linkPattern = /\[([^\]]+)\]\((\.\.?\/[^)]+?)(?<!\/)\)/g;

    let fixCount = 0;
    const newContent = content.replace(linkPattern, (match, text, url) => {
        // Skip if URL contains an anchor (#) - don't add / before anchors
        if (url.includes("#")) {
            return match; // Return unchanged
        }
        fixCount++;
        return `[${text}](${url}/)`;
    });

    if (fixCount > 0) {
        writeFileSync(filePath, newContent, "utf8");
        fixedFiles++;
        totalFixes += fixCount;
        console.log(`✅ ${relativePath}`);
        console.log(`   Fixed ${fixCount} link${fixCount > 1 ? "s" : ""}\n`);
    }
}

// Process all files
const mdxFiles = getAllMdxFiles(docsDir);
mdxFiles.forEach(fixLinksInFile);

// Summary
console.log("═══════════════════════════════════════════════════════════");
console.log("                      FIX SUMMARY                          ");
console.log("═══════════════════════════════════════════════════════════\n");
console.log(`Total files processed:  ${totalFiles}`);
console.log(`Files modified:         ${fixedFiles}`);
console.log(`Total links fixed:      ${totalFixes}\n`);

if (totalFixes > 0) {
    console.log("✨ Links fixed successfully!");
    console.log("   Run 'pnpm run validate' to verify the fixes.\n");
} else {
    console.log(
        "✓ No issues found - all links already have trailing slashes.\n",
    );
}
