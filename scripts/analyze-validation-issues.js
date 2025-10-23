#!/usr/bin/env node
/**
 * Analyze validation issues and provide detailed report
 * Groups issues by type for easy fixing
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const docsDir = join(rootDir, "src", "content", "docs");

console.log("📊 Analyzing validation issues...\n");

const issuesByType = {
    shortDescription: [],
    missingTrailingSlash: [],
    nonDescriptiveLinks: [],
    skippedHeadings: [],
};

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

// Analyze a single file
function analyzeFile(filePath) {
    const relativePath = relative(rootDir, filePath);
    const content = readFileSync(filePath, "utf8");

    // Check frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];

        // Check description
        const descMatch = frontmatter.match(/description:\s*["'](.+)["']/);
        if (descMatch) {
            const desc = descMatch[1];
            if (desc.length < 100) {
                issuesByType.shortDescription.push({
                    file: relativePath,
                    current: desc,
                    length: desc.length,
                });
            }
        }
    }

    // Check for links without trailing slashes
    const internalLinkPattern = /\[([^\]]+)\]\((\.\.?\/[^)]+)(?<!\/)\)/g;
    let match;
    while ((match = internalLinkPattern.exec(content)) !== null) {
        issuesByType.missingTrailingSlash.push({
            file: relativePath,
            text: match[1],
            url: match[2],
            fullMatch: match[0],
        });
    }

    // Check for non-descriptive links
    const badLinkTextPattern = /\[(click here|read more|here)\]/gi;
    if (badLinkTextPattern.test(content)) {
        issuesByType.nonDescriptiveLinks.push({
            file: relativePath,
        });
    }

    // Check heading hierarchy
    const lines = content.split("\n");
    const headings = [];
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
            headings.push({
                level: headingMatch[1].length,
                text: headingMatch[2],
            });
        }
    }

    for (let i = 1; i < headings.length; i++) {
        const prev = headings[i - 1];
        const curr = headings[i];
        if (curr.level > prev.level + 1) {
            issuesByType.skippedHeadings.push({
                file: relativePath,
                from: `H${prev.level}`,
                to: `H${curr.level}`,
                heading: curr.text,
            });
        }
    }
}

// Analyze all files
const mdxFiles = getAllMdxFiles(docsDir);
mdxFiles.forEach(analyzeFile);

// Generate report
console.log("═══════════════════════════════════════════════════════════");
console.log("                    VALIDATION ISSUES REPORT                ");
console.log("═══════════════════════════════════════════════════════════\n");

// 1. Short descriptions
console.log(
    `\n📝 1. SHORT DESCRIPTIONS (${issuesByType.shortDescription.length} files)`,
);
console.log("   Impact: SEO - descriptions should be 100-170 characters");
console.log("   Fix: Expand descriptions to provide more detail\n");
if (issuesByType.shortDescription.length > 0) {
    console.log("   Top 10 shortest:");
    issuesByType.shortDescription
        .sort((a, b) => a.length - b.length)
        .slice(0, 10)
        .forEach((issue) => {
            console.log(`   • ${issue.file}`);
            console.log(
                `     Current (${issue.length} chars): "${issue.current}"`,
            );
            console.log(`     Needs: ${100 - issue.length} more characters\n`);
        });
}

// 2. Missing trailing slashes
console.log(
    `\n🔗 2. MISSING TRAILING SLASHES (${issuesByType.missingTrailingSlash.length} links)`,
);
console.log("   Impact: URL consistency and navigation");
console.log("   Fix: Can be automated with fix-links.js script\n");
if (issuesByType.missingTrailingSlash.length > 0) {
    console.log("   Examples:");
    issuesByType.missingTrailingSlash.slice(0, 5).forEach((issue) => {
        console.log(`   • ${issue.file}`);
        console.log(`     Link: [${issue.text}](${issue.url})`);
        console.log(`     Should be: [${issue.text}](${issue.url}/)\n`);
    });
}

// 3. Non-descriptive links
console.log(
    `\n📎 3. NON-DESCRIPTIVE LINK TEXT (${issuesByType.nonDescriptiveLinks.length} files)`,
);
console.log("   Impact: Accessibility and SEO");
console.log("   Fix: Replace with descriptive text about destination\n");
if (issuesByType.nonDescriptiveLinks.length > 0) {
    console.log("   Files with 'click here' or 'read more':");
    issuesByType.nonDescriptiveLinks.forEach((issue) => {
        console.log(`   • ${issue.file}`);
    });
}

// 4. Skipped headings
console.log(
    `\n📋 4. SKIPPED HEADING LEVELS (${issuesByType.skippedHeadings.length} instances)`,
);
console.log("   Impact: Document structure and accessibility");
console.log("   Fix: Add missing heading level or adjust hierarchy\n");
if (issuesByType.skippedHeadings.length > 0) {
    console.log("   Examples:");
    issuesByType.skippedHeadings.slice(0, 5).forEach((issue) => {
        console.log(`   • ${issue.file}`);
        console.log(`     Jump: ${issue.from} → ${issue.to}`);
        console.log(`     Heading: "${issue.heading}"\n`);
    });
}

// Summary and recommendations
console.log("\n═══════════════════════════════════════════════════════════");
console.log("                         SUMMARY                            ");
console.log("═══════════════════════════════════════════════════════════\n");

const totalIssues =
    issuesByType.shortDescription.length +
    issuesByType.missingTrailingSlash.length +
    issuesByType.nonDescriptiveLinks.length +
    issuesByType.skippedHeadings.length;

console.log(`Total issues found: ${totalIssues}\n`);
console.log("Issues by type:");
console.log(
    `  📝 Short descriptions:      ${issuesByType.shortDescription.length}`,
);
console.log(
    `  🔗 Missing trailing slashes: ${issuesByType.missingTrailingSlash.length}`,
);
console.log(
    `  📎 Non-descriptive links:    ${issuesByType.nonDescriptiveLinks.length}`,
);
console.log(
    `  📋 Skipped heading levels:   ${issuesByType.skippedHeadings.length}`,
);

console.log("\n═══════════════════════════════════════════════════════════");
console.log("                    RECOMMENDED ACTIONS                     ");
console.log("═══════════════════════════════════════════════════════════\n");

console.log("1. AUTO-FIX (Easy - can be automated):");
console.log("   • Missing trailing slashes → Run: pnpm run fix:links");
console.log("   • This will automatically add / to all internal links\n");

console.log("2. MANUAL FIX (Medium - needs review):");
console.log("   • Short descriptions → Expand to 100+ characters");
console.log(
    "   • Non-descriptive links → Replace 'click here' with actual destination",
);
console.log("   • Use editor search/replace for bulk changes\n");

console.log("3. STRUCTURAL FIX (Complex - needs careful review):");
console.log("   • Skipped heading levels → Adjust document structure");
console.log("   • Review each case individually\n");

console.log("═══════════════════════════════════════════════════════════\n");

// Export data for potential automated fixes
import { writeFileSync } from "fs";
writeFileSync(
    join(rootDir, "validation-issues.json"),
    JSON.stringify(issuesByType, null, 2),
);
console.log("📊 Detailed report saved to: validation-issues.json\n");
