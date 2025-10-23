#!/usr/bin/env node
/**
 * CouchCMS Documentation AI Configuration Sync
 *
 * Generates all AI editor configurations from DOCS-STANDARDS.md
 * Single source of truth for Cursor, Claude, Windsurf, VS Code, and more
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Read the single source of truth
const STANDARDS_FILE = join(rootDir, "DOCS-STANDARDS.md");
const STYLEGUIDE_FILE = join(rootDir, "STYLEGUIDE.md");

console.log("🔄 Syncing AI configurations from DOCS-STANDARDS.md...\n");

// Helper to ensure directory exists
function ensureDir(filePath) {
    const dir = dirname(filePath);
    mkdirSync(dir, { recursive: true });
}

// Helper to write file with success message
function writeConfig(path, content, description) {
    try {
        ensureDir(path);
        writeFileSync(path, content, "utf8");
        console.log(`✅ Generated ${description}`);
        return true;
    } catch (error) {
        console.log(`⚠️  Skipped ${description} (${error.code || "error"})`);
        return false;
    }
}

// Read standards
let standards;
try {
    standards = readFileSync(STANDARDS_FILE, "utf8");
} catch (error) {
    console.error("❌ Error: DOCS-STANDARDS.md not found!");
    console.error("   This file is required as the single source of truth.");
    process.exit(1);
}

// Read styleguide reference
const styleguide = readFileSync(STYLEGUIDE_FILE, "utf8");

// Generate base rules content
const baseRules = `# CouchCMS Documentation Standards
# Auto-generated from DOCS-STANDARDS.md

**Critical: Always follow these documentation standards.**

## Project Context

- **Project**: CouchCMS Documentation
- **Type**: Technical Documentation
- **Platform**: Astro + Starlight
- **Content Format**: MDX (Markdown + JSX)
- **Standards**: English-only, 4-space indentation, WCAG 2.1 AA

## Core Principles

1. **Single Source of Truth**: STYLEGUIDE.md is authoritative
2. **Consistency First**: All documentation follows identical patterns
3. **Accessibility**: WCAG 2.1 AA compliance mandatory
4. **English Only**: All content, code, and comments in English
5. **Semantic Structure**: Proper heading hierarchy and HTML5

## Essential Formatting Rules

### Frontmatter (Required)
Every MDX file must start with:
\`\`\`yaml
---
title: [50-60 chars, include keyword]
description: "[150-160 chars]"
keywords: [keyword1, keyword2, keyword3]
category: [category]
author: [Author Name]
lastUpdated: YYYY-MM-DD
sidebar:
  order: [number]
---
\`\`\`

### Text Formatting

**Product Names:**
- Regular: "Couch"
- Formal: "CouchCMS"
- Never bold (except headers)

**Technical Terms (backticks):**
- Files: \`config.php\`, \`.htaccess\`
- Variables: \`my_variable\`
- Code: \`echo $value\`
- Booleans: \`true\`, \`false\`

**UI Elements (bold):**
- Pages: **About Us**
- Buttons: **Save Changes**
- Use Title Case

**Tag References:**
\`\`\`markdown
[**editable**](../../tags-reference/core/editable/)
\`\`\`

**Documentation Links:**
\`\`\`markdown
[**Working with Templates**](../../concepts/templates/)
\`\`\`

### Code Blocks

Always include descriptive titles:
\`\`\`\`markdown
\`\`\`php title="config.php"
<?php
// Code here
?>
\`\`\`
\`\`\`\`

### Components

**Steps:**
\`\`\`markdown
import { Steps } from "@astrojs/starlight/components";

<Steps>

1. First step
2. Second step

</Steps>
\`\`\`

**Card:**
\`\`\`markdown
<Card icon="info" title="Title">

Content

</Card>
\`\`\`

**FileTree (NO backticks!):**
\`\`\`markdown
<FileTree>
- src/
  - content/
</FileTree>
\`\`\`

### Links

- Internal links: ALWAYS use trailing slashes
- Meaningful text (no "click here")
- Relative paths for internal content

### Admonitions

\`\`\`markdown
:::note[Context]
Information
:::

:::tip[Best Practice]
Recommendation
:::

:::caution[Important]
Limitation
:::

:::danger[Warning]
Critical warning
:::
\`\`\`

## Quality Checklist

Before finalizing documentation:
- ✅ Valid frontmatter with SEO metadata
- ✅ Proper heading hierarchy (no skipping)
- ✅ Technical terms in backticks
- ✅ UI elements in bold
- ✅ Links with trailing slashes
- ✅ Code blocks with titles
- ✅ Complete examples
- ✅ Image alt text
- ✅ WCAG 2.1 AA compliance

## AI Tools Available

### Automated (Auto-Applied)
- \`.cursor/rules/markdown.mdc\` - Formatting rules
- \`.cursor/rules/content-structure.mdc\` - Content organization
- \`.cursor/rules/component-architecture.mdc\` - Components

### Manual (Explicit Use)
- \`@.cursor/prompts/convert-to-markdown.md\` - Convert content
- \`@.cursor/prompts/markdown-quick-reference.md\` - Quick syntax

### Reference Documentation
- **AI-TOOLKIT.md** - Complete toolkit guide
- **STYLEGUIDE.md** - Full formatting rules
- **.cursor/README.md** - Detailed documentation

## Common Patterns

### Introducing CMS Tags
\`\`\`markdown
The [**editable**](../../tags-reference/core/editable/) tag creates regions.

## Basic Usage

\`\`\`php title="example.php"
<cms:editable name='content' type='text' />
\`\`\`

:::tip[Best Practice]
Use descriptive names.
:::
\`\`\`

### Cross-References
\`\`\`markdown
See [**Working with Templates**](../../concepts/templates/).
\`\`\`

### Version Info
\`\`\`markdown
:::version[v2.0+]
Requires CouchCMS v2.0 or higher.
:::
\`\`\`

## Error Prevention

**Never:**
- ❌ Use non-English language
- ❌ Skip frontmatter
- ❌ Incorrect heading hierarchy
- ❌ Omit code block titles
- ❌ Forget trailing slashes

**Always:**
- ✅ Complete frontmatter
- ✅ Proper heading hierarchy
- ✅ Descriptive code titles
- ✅ Trailing slashes in links
- ✅ Correct tag formatting

---

**For complete rules, see STYLEGUIDE.md**
**For conversion help, use @.cursor/prompts/convert-to-markdown.md**
**Generated from DOCS-STANDARDS.md - Last updated: ${new Date().toISOString().split("T")[0]}**
`;

// 1. Generate .cursorrules (Cursor AI)
writeConfig(
    join(rootDir, ".cursorrules"),
    baseRules,
    ".cursorrules (Cursor AI)",
);

// 2. Generate CLAUDE.md (Claude AI)
writeConfig(join(rootDir, "CLAUDE.md"), baseRules, "CLAUDE.md (Claude AI)");

// 3. Generate .windsurfrules (Windsurf AI)
writeConfig(
    join(rootDir, ".windsurfrules"),
    baseRules,
    ".windsurfrules (Windsurf AI)",
);

// 4. Generate GitHub Copilot instructions
writeConfig(
    join(rootDir, ".github", "copilot-instructions.md"),
    baseRules,
    ".github/copilot-instructions.md (GitHub Copilot)",
);

// 5. Generate VS Code settings
const vscodeSettings = {
    "files.associations": {
        "*.mdx": "mdx",
        "*.mdc": "markdown",
    },
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[markdown]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.wordWrap": "on",
        "editor.quickSuggestions": {
            comments: "on",
            strings: "on",
            other: "on",
        },
    },
    "[mdx]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.wordWrap": "on",
    },
    "markdown.validate.enabled": true,
    "markdown.updateLinksOnFileMove.enabled": "always",
    "cSpell.enabled": true,
    "cSpell.language": "en",
    "cSpell.words": [
        "CouchCMS",
        "editable",
        "Starlight",
        "Astro",
        "mdx",
        "frontmatter",
    ],
};

writeConfig(
    join(rootDir, ".vscode", "settings.json"),
    JSON.stringify(vscodeSettings, null, 4),
    ".vscode/settings.json (VS Code)",
);

// 6. Generate Tabnine configuration
const tabnineConfig = {
    team_learning: false,
    local_mode: true,
    instructions: baseRules,
};

writeConfig(
    join(rootDir, ".tabnine", "settings.json"),
    JSON.stringify(tabnineConfig, null, 4),
    ".tabnine/settings.json (Tabnine)",
);

// 7. Generate CodeWhisperer configuration
const codewhispererConfig = {
    customizations: [
        {
            name: "CouchCMS Documentation Standards",
            description: "Documentation writing standards for CouchCMS",
            instructions: baseRules,
        },
    ],
};

writeConfig(
    join(rootDir, ".codewhisperer", "settings.json"),
    JSON.stringify(codewhispererConfig, null, 4),
    ".codewhisperer/settings.json (Amazon CodeWhisperer)",
);

// 8. Generate .editorconfig
const editorconfig = `# CouchCMS Documentation Editor Config
# Auto-generated from DOCS-STANDARDS.md

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 4

[*.{md,mdx}]
max_line_length = 80
trim_trailing_whitespace = true

[*.{json,yml,yaml}]
indent_size = 2

[*.{ts,js,mjs}]
indent_size = 2

[package.json]
indent_size = 2
`;

writeConfig(
    join(rootDir, ".editorconfig"),
    editorconfig,
    ".editorconfig (Universal Editor Config)",
);

// 9. Generate AI toolkit index
const aiToolkitIndex = `# AI Configuration Index
# Auto-generated from DOCS-STANDARDS.md

All AI editor configurations are automatically generated from **DOCS-STANDARDS.md**.

## Generated Files

### AI Assistants
- ✅ \`.cursorrules\` - Cursor AI configuration
- ✅ \`CLAUDE.md\` - Claude AI instructions
- ✅ \`.windsurfrules\` - Windsurf AI configuration
- ✅ \`.github/copilot-instructions.md\` - GitHub Copilot
- ✅ \`.tabnine/settings.json\` - Tabnine configuration
- ✅ \`.codewhisperer/settings.json\` - Amazon CodeWhisperer

### Editors
- ✅ \`.vscode/settings.json\` - VS Code settings
- ✅ \`.editorconfig\` - Universal editor config

## Single Source of Truth

**DOCS-STANDARDS.md** → All configurations above

To update all AI configurations:
\`\`\`bash
pnpm run sync
\`\`\`

## Manual Tools

These files are maintained manually:
- \`.cursor/rules/*.mdc\` - Auto-applied formatting rules
- \`.cursor/prompts/*.md\` - AI assistance prompts
- \`STYLEGUIDE.md\` - Complete style guide

## Last Sync

Generated: ${new Date().toISOString()}

---

**Never edit generated files directly. Edit DOCS-STANDARDS.md and run \`pnpm run sync\`.**
`;

writeConfig(
    join(rootDir, ".cursor", "AI-CONFIG-INDEX.md"),
    aiToolkitIndex,
    ".cursor/AI-CONFIG-INDEX.md (Configuration Index)",
);

console.log("\n✨ All AI configurations synced successfully!\n");
console.log("📝 Generated from: DOCS-STANDARDS.md");
console.log("📁 Files updated: 9 configurations");
console.log("🔄 Next steps:");
console.log("   - Review generated files");
console.log("   - Commit changes to version control");
console.log("   - Run `pnpm run sync` after editing DOCS-STANDARDS.md\n");
