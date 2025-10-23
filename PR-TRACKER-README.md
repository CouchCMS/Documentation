# 📋 PR Tracker - Quick Reference

Auto-generate comprehensive Pull Request descriptions for the CouchCMS Documentation project.

## 🚀 Quick Start

```bash
# 1. Generate draft from your changes
pnpm run pr:prepare

# 2. Edit DRAFT-PR.md - fill in descriptions

# 3. Finalize and validate
pnpm run pr:finalize

# 4. Copy PR-DESCRIPTION.md to GitHub
```

## 📚 Commands

| Command | Description |
| :---- | :---- |
| `pnpm run pr:prepare` | Generate draft PR documentation |
| `pnpm run pr:prepare origin/develop` | Compare with specific branch |
| `pnpm run pr:finalize` | Validate and create final version |
| `pnpm run pr:help` | Show help |

## 📝 What You Get

### Auto-Detected:
- ✨ New documentation pages (with titles)
- 📝 Updated pages
- 🗑️ Deleted pages
- 🔧 Code snippets & examples
- 🖼️ Assets & media changes
- ⚙️ Configuration changes

### Auto-Generated:
- 📊 Change statistics
- ✅ Quality checklist
- 🎯 Structured sections
- 📌 Template for notes

## ✅ Validation

The finalizer checks:

**Required (blocks finalization):**
- Summary is filled
- New pages have descriptions
- Updates have change descriptions

**Recommended (warnings only):**
- Reasons for changes explained
- Checklist items completed
- Breaking changes clarified

## 📂 Files

- `DRAFT-PR.md` - Your working draft (git ignored)
- `PR-DESCRIPTION.md` - Final version for GitHub (git ignored)
- `.github/pull_request_template.md` - GitHub template with instructions

## 💡 Pro Tips

1. **Commit first** - The tracker uses `git diff` to detect changes
2. **Edit incrementally** - Fill out the draft over multiple sessions
3. **Keep both files** - Useful for reference and future PRs
4. **Use base branch parameter** - For different target branches

## 🔧 Example Workflow

```bash
# Make changes
git add src/content/docs/tags-reference/core/my-tag.mdx
git commit -m "docs(tags): add my-tag documentation"

# Generate draft
pnpm run pr:prepare

# Edit DRAFT-PR.md:
# - Add description: "Documentation for the my-tag feature"
# - Add reason: "New feature in CouchCMS v2.3"
# - Check all checklist items

# Finalize
pnpm run pr:finalize
# ✅ All required fields completed!
# 📄 File: PR-DESCRIPTION.md

# Copy content to GitHub PR and submit!
```

## 📖 Full Documentation

See [PR-TRACKER-GUIDE.md](./docs/PR-TRACKER-GUIDE.md) for:
- Detailed workflow examples
- Troubleshooting
- Advanced usage
- Integration tips

## 🆘 Troubleshooting

### No changes detected?
```bash
git status  # Make sure you committed
git add .
git commit -m "your message"
pnpm run pr:prepare
```

### Validation failed?
1. Open `DRAFT-PR.md`
2. Find all `<!-- -->` comments
3. Replace with actual content
4. Check error messages for specifics

### Can't compare branches?
```bash
git fetch origin
pnpm run pr:prepare origin/main
```

## 🎯 Best Practices

1. ✅ **Commit often** - Easier to track changes
2. ✅ **Descriptive commits** - Helps you remember context
3. ✅ **Complete checklist** - Ensures quality
4. ✅ **Add screenshots** - For visual changes
5. ✅ **Explain why** - Not just what changed

---

**Need help?** Run `pnpm run pr:help` or check the full guide in `docs/PR-TRACKER-GUIDE.md`

