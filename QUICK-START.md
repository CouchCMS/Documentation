# PR Tracker - Quick Start

Everything you need to start using the PR Tracker in 5 minutes.

## ⚡ 30-Second Overview

Track your documentation changes since last upstream PR and create PRs automatically.

```bash
pnpm run pr:since-last      # Check progress
pnpm run pr:create          # Create PR automatically
```

## 🚀 First Time Setup (5 minutes)

### 1. Install GitHub CLI (Optional - for automated PRs)

```bash
# macOS
brew install gh

# Ubuntu/Debian
sudo apt install gh
```

### 2. Authenticate GitHub CLI

```bash
gh auth login
# Follow browser authentication
```

### 3. Setup Git Upstream

```bash
git remote add upstream https://github.com/CouchCMS/Documentation.git
```

### 4. Mark Current State

```bash
git fetch upstream
git merge upstream/docs-v2
pnpm run pr:mark-as-merged "Initial baseline"
```

## 🎯 Daily Usage

### Check Your Progress

```bash
pnpm run pr:since-last
```

Output shows:
- Commits since last PR
- New/updated/deleted pages
- Time elapsed
- Affected areas

### Create PR When Ready

```bash
# Option 1: Automated (requires GitHub CLI)
pnpm run pr:create
# Done! PR created automatically

# Option 2: Manual
git push origin docs-v2
# Then create PR on GitHub UI
```

### After PR Merge

```bash
git fetch upstream
git merge upstream/docs-v2
pnpm run pr:mark-as-merged "Your PR title in English"
```

## 📊 Complete Cycle

```
1. Work → 2. Check → 3. Create PR → 4. Merge → Repeat
   ↓         ↓          ↓             ↓
 commit   pr:since  pr:create   pr:mark-as
          -last                 -merged
```

## ℹ️ Getting Help

```bash
# Show available commands
pnpm run pr:help

# For detailed documentation:
# - PR-TRACKER.md (main guide)
# - PR-CREATE-SETUP.md (automated PR setup)
# - GIT-WORKFLOW.md (Git workflow)
# - ENGLISH-REMINDER.md (language guidelines)
```

## 🎊 That's It!

You're ready to use the PR Tracker. Start with:

```bash
pnpm run pr:since-last
```

**Happy contributing!** 🚀

