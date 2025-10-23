# Documentation Scripts

Automation scripts for managing CouchCMS documentation AI configurations and validation.

## 🤖 AI Configuration Management

### Single Source of Truth

All AI editor configurations are generated from **DOCS-STANDARDS.md**.

```
DOCS-STANDARDS.md (Single Source)
        ↓
    pnpm run sync
        ↓
All AI Configurations Updated
```

### Generated Configurations

Running `pnpm run sync` generates:

1. **`.cursorrules`** - Cursor AI configuration
2. **`CLAUDE.md`** - Claude AI instructions
3. **`.windsurfrules`** - Windsurf AI configuration
4. **`.github/copilot-instructions.md`** - GitHub Copilot
5. **`.vscode/settings.json`** - VS Code settings
6. **`.tabnine/settings.json`** - Tabnine configuration
7. **`.codewhisperer/settings.json`** - Amazon CodeWhisperer
8. **`.editorconfig`** - Universal editor config
9. **`.cursor/AI-CONFIG-INDEX.md`** - Configuration index

## 📜 Available Scripts

### `pnpm run sync`
Generate all AI configurations from DOCS-STANDARDS.md

**When to use:**
- After editing DOCS-STANDARDS.md
- After git clone (runs automatically via postinstall)
- Before committing AI config changes

**Example:**
```bash
# Edit standards
vim DOCS-STANDARDS.md

# Sync all configurations
pnpm run sync

# Commit changes
git add .
git commit -m "Update documentation standards"
```

### `pnpm run validate`
Validate all documentation files against standards

**Checks:**
- ✅ Frontmatter presence and completeness
- ✅ Heading hierarchy (no skipped levels)
- ✅ Code block formatting
- ✅ Link structure (trailing slashes)
- ✅ English-only content
- ✅ Documentation quality

**Example:**
```bash
# Validate all docs
pnpm run validate

# Output example:
# 🔍 Validating CouchCMS Documentation...
#
# Found 150 documentation files
#
# 📊 Validation Summary
# Total files:    150
# Passed:         145 ✅
# With warnings:  5 ⚠️
# Errors:         0 ❌
```

### `pnpm run ai:update`
Sync AI configs AND validate documentation (combined)

**When to use:**
- Before deploying documentation
- After major documentation changes
- During CI/CD pipeline

**Example:**
```bash
pnpm run ai:update
```

## 🔄 Workflow Examples

### Updating Documentation Standards

```bash
# 1. Edit the single source of truth
vim DOCS-STANDARDS.md

# 2. Sync to all AI tools
pnpm run sync

# 3. Validate existing docs still comply
pnpm run validate

# 4. Commit if all passes
git add .
git commit -m "Update: stricter code block titles"
```

### Creating New Documentation

```bash
# 1. Use AI to create content
# @.cursor/prompts/convert-to-markdown.md
# Convert this content about [topic]

# 2. Validate the new file
pnpm run validate

# 3. Fix any issues reported
# 4. Re-validate
pnpm run validate
```

### Team Onboarding

```bash
# 1. Clone repository
git clone <repo>

# 2. Install dependencies (auto-syncs)
pnpm install

# 3. All AI tools are configured!
# Start using Cursor, Claude, Copilot, etc.
```

## 🎯 Script Details

### sync-ai-configs.js

**Purpose:** Generate all AI configurations from single source

**Input:** `DOCS-STANDARDS.md`

**Output:** 9 configuration files for different AI tools

**Process:**
1. Read DOCS-STANDARDS.md
2. Generate base rules content
3. Create tool-specific configurations
4. Write files with proper formatting
5. Report success/failures

**Error Handling:**
- Exits if DOCS-STANDARDS.md missing
- Creates directories if needed
- Reports each file generated
- Returns exit code 0 on success

### validate-docs.js

**Purpose:** Validate documentation quality and compliance

**Input:** All `.md` and `.mdx` files in `src/content/docs/`

**Output:** Validation report with errors and warnings

**Validators:**
1. **Frontmatter Validator**
   - Checks presence and format
   - Validates required fields
   - Checks title length (10-70 chars)
   - Checks description length (100-170 chars)

2. **Heading Hierarchy Validator**
   - Ensures no skipped levels
   - Reports H2→H4 skips

3. **Code Block Validator**
   - Checks for descriptive titles
   - Reports blocks without titles

4. **Link Validator**
   - Checks internal links have trailing slashes
   - Reports non-descriptive link text

5. **Language Validator**
   - Checks for Dutch words
   - Enforces English-only content

**Exit Codes:**
- `0` - All validations passed
- `1` - Errors found or no files found

## 🚨 Common Issues

### Issue: Sync script fails

**Cause:** DOCS-STANDARDS.md missing or invalid

**Solution:**
```bash
# Ensure file exists
ls -la DOCS-STANDARDS.md

# Check file content is valid
cat DOCS-STANDARDS.md
```

### Issue: Validation reports Dutch words

**Cause:** Non-English content detected

**Solution:**
1. Review reported words
2. Translate to English
3. Re-validate

### Issue: Missing trailing slashes

**Cause:** Internal links without `/` at end

**Solution:**
```markdown
❌ [Link](./page)
✅ [Link](./page/)
```

### Issue: Skipped heading levels

**Cause:** H2 followed by H4

**Solution:**
```markdown
❌ ## Section
   #### Subsection

✅ ## Section
   ### Subsection
```

## 🔧 Customization

### Adding New AI Tool

Edit `scripts/sync-ai-configs.js`:

```javascript
// Add new tool configuration
const newToolConfig = {
    "custom": "configuration",
    "instructions": baseRules
};

writeConfig(
    join(rootDir, '.newtool', 'config.json'),
    JSON.stringify(newToolConfig, null, 4),
    '.newtool/config.json (New Tool)'
);
```

### Adding New Validation

Edit `scripts/validate-docs.js`:

```javascript
// Add new validator function
function validateNewRule(content, file) {
    const issues = [];
    // Your validation logic
    return issues;
}

// Add to validateFile function
fileIssues.push(...validateNewRule(content, relativePath));
```

## 📊 CI/CD Integration

### GitHub Actions Example

```yaml
name: Validate Documentation

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm run validate
      - run: pnpm run build
```

## 🎓 Best Practices

1. **Always sync after editing standards**
   ```bash
   vim DOCS-STANDARDS.md
   pnpm run sync
   ```

2. **Validate before committing**
   ```bash
   pnpm run validate
   git add .
   git commit -m "Update docs"
   ```

3. **Use ai:update for comprehensive checks**
   ```bash
   pnpm run ai:update
   ```

4. **Never edit generated files directly**
   - Edit DOCS-STANDARDS.md
   - Run `pnpm run sync`
   - Generated files update automatically

5. **Check validation output**
   - Fix all errors (❌)
   - Address warnings (⚠️) when possible
   - Info messages (ℹ️) are optional

## 📝 Notes

- Scripts use ES Modules (Node.js 14+)
- Cross-platform compatible
- Safe to run multiple times
- Idempotent operations
- No external dependencies required

---

**For complete documentation system information, see [AI-TOOLKIT.md](../AI-TOOLKIT.md)**

