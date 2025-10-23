# 📊 PR Tracker - Documentation Hub

Complete PR tracking and automated PR creation system for [CouchCMS/Documentation](https://github.com/CouchCMS/Documentation/tree/docs-v2).

## 🎯 What is This?

A toolkit that helps you:
- ✅ Track your documentation work since last upstream PR
- ✅ Know when it's time to create a new PR
- ✅ Automatically create PRs with one command
- ✅ Ensure all PRs are in English
- ✅ Save 10+ minutes per PR

## ⚡ Quick Start

```bash
# Install GitHub CLI (optional, for automation)
brew install gh              # macOS
gh auth login               # Authenticate

# Setup
git remote add upstream https://github.com/CouchCMS/Documentation.git
pnpm run pr:mark-as-merged "Initial baseline"

# Daily usage
pnpm run pr:since-last      # Check progress
pnpm run pr:create          # Auto-create PR (or manual via GitHub)

# After PR merge
pnpm run pr:mark-as-merged "Your PR title"
```

## 📚 Documentation

### 🚀 Getting Started

- **[QUICK-START.md](./QUICK-START.md)** - 5-minute setup guide

### 📖 Main Guides

- **[PR-TRACKER.md](./PR-TRACKER.md)** ⭐ - Complete user guide (start here!)
- **[PR-CREATE-SETUP.md](./PR-CREATE-SETUP.md)** - Automated PR creation setup
- **[GIT-WORKFLOW.md](./GIT-WORKFLOW.md)** - Complete Git workflow guide

### 🌍 Guidelines

- **[ENGLISH-REMINDER.md](./ENGLISH-REMINDER.md)** - Why and how to use English

### 🔧 Technical

- **[PR-TRACKER-SINCE-LAST.md](./PR-TRACKER-SINCE-LAST.md)** - Implementation details
- **[PR-TRACKER-FINAL-OVERVIEW.md](./PR-TRACKER-FINAL-OVERVIEW.md)** - Complete system overview

### 📝 History

- **[CLEANUP-SUMMARY.md](./CLEANUP-SUMMARY.md)** - Simplification changes
- **[PR-TRACKER-ENGLISH-UPDATE.md](./PR-TRACKER-ENGLISH-UPDATE.md)** - English support

## 🎯 Choose Your Path

### Path 1: Fully Automated (Fastest)

**Setup:** Install GitHub CLI + authenticate
**Time:** 5 minutes one-time setup
**Usage:** One command creates PR
**Read:** QUICK-START.md → PR-CREATE-SETUP.md

### Path 2: Semi-Automated (Simple)

**Setup:** Git only
**Time:** 1 minute one-time setup
**Usage:** Check progress, create PR manually
**Read:** QUICK-START.md → GIT-WORKFLOW.md

### Path 3: Just Tracking (Minimal)

**Setup:** None
**Time:** 0 minutes
**Usage:** Just track progress, no PR help
**Read:** PR-TRACKER.md (sections 1-2 only)

## 📋 Available Commands

```bash
# Core commands
pnpm run pr:since-last       # Show changes since last PR
pnpm run pr:mark-as-merged   # Mark current state as baseline
pnpm run pr:create           # Auto-create GitHub PR
pnpm run pr:help             # Show help

# Related commands
pnpm run validate            # Validate documentation
pnpm run build               # Build the site
```

## 🌟 Key Features

### Progress Tracking

- ✅ Commit count since last PR
- ✅ New/updated/deleted pages
- ✅ Affected documentation areas
- ✅ Time elapsed
- ✅ Recent commits preview

### Automated PR Creation

- ✅ Smart title generation from commits
- ✅ Structured PR body with changes
- ✅ Automatic upstream sync
- ✅ One-command workflow
- ✅ Professional format

### English Language Support

- ✅ English date formatting
- ✅ Non-English character detection
- ✅ Helpful reminders
- ✅ Language guidelines

### Safety Features

- ✅ Sync validation before PR
- ✅ Authentication checks
- ✅ Conflict detection
- ✅ Clear error messages

## 🎊 What Makes This Special?

**Before PR Tracker:**
```
1. Manually track changes (error-prone)
2. Manually sync with upstream (easy to forget)
3. Write PR title and description from memory
4. Hope you didn't forget anything
Total time: ~15 minutes per PR
```

**With PR Tracker:**
```
1. pnpm run pr:since-last (automatic summary)
2. pnpm run pr:create (everything automated)
Total time: ~30 seconds per PR
```

## 🔗 Links

- **[CouchCMS Documentation](https://github.com/CouchCMS/Documentation)** - Upstream repository
- **[GitHub CLI](https://cli.github.com/)** - Installation guide
- **[Conventional Commits](https://www.conventionalcommits.org/)** - Commit message format

## 🆘 Need Help?

1. **Quick questions:** Run `pnpm run pr:help`
2. **Setup issues:** Read `QUICK-START.md`
3. **Git problems:** Check `GIT-WORKFLOW.md`
4. **Automation:** See `PR-CREATE-SETUP.md`
5. **Language:** Review `ENGLISH-REMINDER.md`

## 📞 Support

- Open an issue in the repository
- Check existing documentation
- Ask in CouchCMS Forum

---

## 🎯 Next Steps

**New user?**
1. Read `QUICK-START.md` (5 minutes)
2. Try `pnpm run pr:since-last`
3. When ready, try `pnpm run pr:create`

**Want automation?**
1. Read `PR-CREATE-SETUP.md`
2. Install GitHub CLI
3. Authenticate
4. Use `pnpm run pr:create`

**Just need tracking?**
1. Read `PR-TRACKER.md` (sections 1-3)
2. Use `pnpm run pr:since-last`
3. Create PRs manually on GitHub

---

**Ready? Start with:** [`QUICK-START.md`](./QUICK-START.md) 🚀

**The complete system is documented, tested, and ready to use!**

