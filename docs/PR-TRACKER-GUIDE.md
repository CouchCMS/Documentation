# PR Tracker Guide

The PR Tracker is a tool to help you create consistent, comprehensive Pull Request descriptions for the CouchCMS Documentation project.

## Quick Start

```bash
# 1. Make your changes and commit them
git add .
git commit -m "docs: update examples"

# 2. Generate draft PR documentation
pnpm run pr:prepare

# 3. Edit DRAFT-PR.md and fill in descriptions

# 4. Validate and finalize
pnpm run pr:finalize

# 5. Copy PR-DESCRIPTION.md to GitHub PR
```

## Commands

### `pnpm run pr:prepare [base-branch]`

Analyzes your git changes and generates `DRAFT-PR.md`.

**What it does:**
- Compares your branch with the base branch (default: `main`)
- Detects new, updated, and deleted files
- Categorizes changes (docs, snippets, assets, config)
- Generates structured draft with placeholders
- Extracts page titles from frontmatter

**Example:**
```bash
pnpm run pr:prepare               # Compare with origin/main
pnpm run pr:prepare origin/master # Compare with master
```

### `pnpm run pr:finalize`

Validates your `DRAFT-PR.md` and generates the final `PR-DESCRIPTION.md`.

**What it validates:**
- ✅ Summary section is filled
- ✅ All new pages have descriptions
- ✅ All changes have explanations
- ⚠️  Checklist items are checked (warning)
- ⚠️  Breaking changes section is clear (warning)

**Example:**
```bash
pnpm run pr:finalize
```

### `pnpm run pr:help`

Shows quick help for PR Tracker commands.

## Workflow Example

### Scenario: You added a new tag documentation page

1. **Make your changes:**
   ```bash
   # Create new file
   code src/content/docs/tags-reference/core/my-new-tag.mdx

   # Commit
   git add .
   git commit -m "docs(tags): add my-new-tag documentation"
   ```

2. **Generate draft:**
   ```bash
   pnpm run pr:prepare
   ```

   This creates `DRAFT-PR.md`:
   ```markdown
   ## ✨ New Documentation Pages

   ### My New Tag
   - **Path:** `src/content/docs/tags-reference/core/my-new-tag.mdx`
   - **Description:** <!-- Add description of what this page covers -->
   - **Reason:** <!-- Why was this page added? -->
   ```

3. **Fill in the details in DRAFT-PR.md:**
   ```markdown
   ## ✨ New Documentation Pages

   ### My New Tag
   - **Path:** `src/content/docs/tags-reference/core/my-new-tag.mdx`
   - **Description:** Documentation for the my-new-tag which allows users to create dynamic content sections
   - **Reason:** This tag was recently added to CouchCMS v2.3 and needed documentation
   ```

4. **Complete the checklist:**
   ```markdown
   ## ✅ Quality Checklist

   - [x] All new pages follow DOCS-STANDARDS.md guidelines
   - [x] Frontmatter is complete and correct
   - [x] Code examples are tested and working
   - [x] Links are valid (internal and external)
   - [x] Images have proper alt text
   - [x] Spelling and grammar checked
   - [x] Run `pnpm run validate` passes
   - [x] Build succeeds (`pnpm run build`)
   ```

5. **Finalize:**
   ```bash
   pnpm run pr:finalize
   ```

   Output:
   ```
   ✅ All required fields completed!
   📝 Generating final PR description...
   ✅ PR description ready!
   📄 File: PR-DESCRIPTION.md
   ```

6. **Create GitHub PR:**
   - Copy content from `PR-DESCRIPTION.md`
   - Paste into GitHub PR description
   - Submit for review!

## File Structure

```
CouchCMS-Documentation/
├── DRAFT-PR.md          # Your working draft (git ignored)
├── PR-DESCRIPTION.md    # Final version for GitHub (git ignored)
├── .github/
│   └── pull_request_template.md  # GitHub template with instructions
└── scripts/
    ├── pr-prepare.js    # Generate draft
    └── pr-finalize.js   # Validate and finalize
```

## Tips & Best Practices

### 1. Commit Often
The PR Tracker works best when you have committed your changes. It uses `git diff` to detect changes.

### 2. Descriptive Commits
While not required, descriptive commit messages help you remember what you did when filling out the draft.

### 3. Work in Sections
For large PRs, fill out the draft in multiple sessions:
- Day 1: Generate draft, fill in descriptions
- Day 2: Complete checklist, add notes
- Day 3: Finalize and submit

### 4. Keep Both Files
Don't delete `DRAFT-PR.md` after finalizing:
- Useful for reference if you need to update the PR
- Shows your thought process
- Can be reused for similar PRs

### 5. Use Base Branch Parameter
If you're working with a different base branch:
```bash
pnpm run pr:prepare develop          # For develop branch
pnpm run pr:prepare origin/v2        # For v2 branch
```

## What Gets Tracked?

### ✅ Tracked Changes

- **Documentation Pages** (`.mdx` files in `src/content/docs/`)
  - New pages
  - Updated pages
  - Deleted pages

- **Code Snippets** (files in `snippets/` or `components/`)
  - New snippets
  - Updated snippets

- **Assets** (images, videos)
  - New assets
  - Updated assets
  - Deleted assets

- **Configuration** (config files, scripts, GitHub workflows)

### ❌ Not Tracked

- `node_modules/`
- `dist/`
- `.next/`
- Other build artifacts

## Validation Rules

### Required (❌ Blocks finalization)

1. Summary must be filled
2. All new pages need descriptions
3. All updated pages need change descriptions

### Recommended (⚠️ Warnings only)

1. Explain reasons for changes
2. Complete the quality checklist
3. Clarify breaking changes section
4. Add additional notes if relevant

## Troubleshooting

### "No changes detected"

**Problem:** Script says no changes found.

**Solution:**
```bash
# Make sure you've committed your changes
git status
git add .
git commit -m "your message"

# Then try again
pnpm run pr:prepare
```

### "DRAFT-PR.md not found"

**Problem:** Running `pr:finalize` without draft.

**Solution:**
```bash
# Generate draft first
pnpm run pr:prepare
```

### "Validation Failed"

**Problem:** Draft is incomplete.

**Solution:**
1. Open `DRAFT-PR.md`
2. Find all `<!-- -->` comments
3. Replace them with actual content
4. Check the validation error messages for specifics

### Git Diff Issues

**Problem:** Script can't compare branches.

**Solution:**
```bash
# Fetch latest from remote
git fetch origin

# Try with explicit base
pnpm run pr:prepare origin/main
```

## Advanced Usage

### Custom Base Branch

For feature branches or releases:
```bash
# Compare with specific branch
pnpm run pr:prepare feature/new-design

# Compare with tag
pnpm run pr:prepare v2.0.0
```

### Manual Editing

You can manually edit `DRAFT-PR.md`:
- Add custom sections
- Reorder items
- Add screenshots
- Include links to issues/discussions

The finalizer will preserve your custom content while cleaning up placeholders.

### Reusing Drafts

For similar changes across multiple PRs:
```bash
# Generate draft
pnpm run pr:prepare

# Copy as template
cp DRAFT-PR.md TEMPLATE-PR.md

# For next PR
cp TEMPLATE-PR.md DRAFT-PR.md
# Edit and finalize
```

## Integration with GitHub

The project includes a GitHub PR template at `.github/pull_request_template.md` that:
- Reminds you to use the PR Tracker
- Provides fallback structure if you don't use it
- Maintains consistency across contributors

## Support

For issues or questions:
1. Check this guide first
2. Run `pnpm run pr:help` for quick reference
3. Review example PRs in the repository
4. Ask in project discussions

---

**Happy documenting! 📚**

