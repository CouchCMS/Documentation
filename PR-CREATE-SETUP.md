# PR Create - Automated PR Creation Setup

## 🎯 Overview

The `pr:create` command **automatically creates a GitHub Pull Request** based on your tracked changes since the last upstream merge.

**What it does:**
1. ✅ Syncs with upstream automatically
2. ✅ Generates PR title from your commits
3. ✅ Creates PR body with summary of changes
4. ✅ Pushes to your fork
5. ✅ Creates PR on GitHub via API
6. ✅ Opens PR URL in your browser

## 📋 Prerequisites

### 1. GitHub CLI Installation

The automated PR creation requires **GitHub CLI** (`gh`).

#### macOS Installation

```bash
# Using Homebrew (recommended)
brew install gh

# Verify installation
gh --version
```

#### Linux Installation

```bash
# Debian/Ubuntu
sudo apt install gh

# Fedora/RHEL
sudo dnf install gh

# Arch
sudo pacman -S github-cli

# Verify installation
gh --version
```

#### Windows Installation

```bash
# Using winget
winget install GitHub.cli

# Using scoop
scoop install gh

# Verify installation
gh --version
```

**Alternative:** Download from [cli.github.com](https://cli.github.com/)

### 2. GitHub CLI Authentication

After installation, authenticate with your GitHub account:

```bash
# Start authentication flow
gh auth login

# Follow the prompts:
# 1. Choose: GitHub.com
# 2. Choose: HTTPS
# 3. Authenticate: Login via browser (recommended)
# 4. Follow browser instructions

# Verify authentication
gh auth status
```

You should see:
```
✓ Logged in to github.com as YOUR_USERNAME
✓ Git operations for github.com configured to use https protocol
```

### 3. Upstream Remote Setup

Make sure you have upstream configured:

```bash
# Check remotes
git remote -v

# Add upstream if not exists
git remote add upstream https://github.com/CouchCMS/Documentation.git

# Verify
git remote -v
```

## 🚀 Using pr:create

### Basic Usage

```bash
# Check your changes first
pnpm run pr:since-last
# Output: 15 commits, 5 new pages

# Create PR automatically
pnpm run pr:create

# The script will:
# 1. Sync with upstream
# 2. Generate PR title and body
# 3. Push to your fork
# 4. Create PR on GitHub
# 5. Show you the PR URL
```

### What It Generates

**PR Title Examples:**
- "docs: add comprehensive tag reference documentation" (many tag-related commits)
- "docs: add new documentation pages" (few new pages)
- "docs: update 10 documentation pages" (many updates)
- "fix: documentation corrections and improvements" (fix commits)

**PR Body Structure:**
```markdown
## Summary

This PR includes documentation updates and improvements.

## Changes

### ✨ New Pages (5)

- dropdownfolders
- comments
- pagination
- nested pages
- search

### 📝 Updated Pages (8)

- archives
- cloned pages
- ... and 6 more

## Commits

- docs: add dropdownfolders examples (abc1234)
- docs: update nested pages guide (def5678)
- fix: broken links in concepts (ghi9012)
... and 12 more commits

## Checklist

- [x] Documentation follows style guide
- [x] All links tested
- [x] Build passes locally
- [x] No linting errors
```

## 🔄 Complete Automated Workflow

### Step 1: Work on Documentation

```bash
# Make your changes
git add .
git commit -m "docs: add examples"

# Check progress
pnpm run pr:since-last
# "5 commits, 2 pages"
```

### Step 2: When Ready

```bash
# Final check
pnpm run pr:since-last
# "15 commits, 5 pages - ready!"

# Create PR automatically
pnpm run pr:create
```

### Step 3: What Happens

```bash
🚀 Automated PR Creation

Current branch: docs-v2

📍 Last PR: Added core concepts
   Date: October 20, 2025

📊 Summary:
   15 commits
   5 new pages
   8 updated pages
   0 deleted pages

📝 PR Title:
   docs: add comprehensive tag reference documentation

📄 PR Body Preview:
   ## Summary
   This PR includes documentation updates...
   ...

🔄 Syncing with upstream...
✅ Synced with upstream

📤 Pushing to your fork...
✅ Pushed to origin

🚀 Creating pull request...
✅ Pull request created!

https://github.com/CouchCMS/Documentation/pull/123

🎉 Done! Your PR is ready for review.

💡 Next steps:
   1. Review the PR on GitHub
   2. Add any additional context if needed
   3. Wait for review from maintainers
```

### Step 4: After PR is Merged

```bash
# Sync and mark as done
git fetch upstream
git merge upstream/docs-v2
git push origin docs-v2
pnpm run pr:mark-as-merged "Added comprehensive tag reference"

# Ready for next cycle!
```

## 🎯 Comparison: Manual vs Automated

### Manual Process (Old Way)

```bash
# 1. Sync
git fetch upstream
git merge upstream/docs-v2
git push origin docs-v2

# 2. Go to GitHub.com
# 3. Click "Compare & pull request"
# 4. Write title manually
# 5. Write description manually
# 6. Submit PR

# Total time: ~10 minutes
```

### Automated Process (New Way)

```bash
# 1. One command
pnpm run pr:create

# Everything else is automatic!

# Total time: ~30 seconds
```

## 🔧 Customization

### Custom PR Title

If you want to override the auto-generated title:

```bash
# Edit scripts/pr-create.js
# Modify the generatePRTitle() function
```

### Custom PR Body

Add more sections to the PR body:

```bash
# Edit scripts/pr-create.js
# Modify the generatePRBody() function
```

### Different Base Branch

By default, PRs are created to `docs-v2`. To change:

```bash
# Edit scripts/pr-create.js
# Change: --base docs-v2
# To:     --base your-branch
```

## 🚨 Troubleshooting

### "gh: command not found"

**Problem:** GitHub CLI not installed.

**Solution:**
```bash
# macOS
brew install gh

# Linux/Windows - see installation section above
```

### "gh auth status: authentication failed"

**Problem:** Not logged in to GitHub CLI.

**Solution:**
```bash
gh auth login
# Follow the browser authentication flow
```

### "fatal: refusing to merge unrelated histories"

**Problem:** Your fork is too far behind upstream.

**Solution:**
```bash
# Hard reset to upstream (careful!)
git fetch upstream
git reset --hard upstream/docs-v2
git push origin docs-v2 --force

# Or create a new fork
```

### "error creating pull request: A pull request already exists"

**Problem:** You already have an open PR.

**Solution:**
```bash
# Check existing PRs
gh pr list

# Close old PR or wait for it to merge
gh pr close NUMBER
```

### "No new commits since last PR"

**Problem:** Nothing to create PR for.

**Solution:**
```bash
# Make some changes first
git commit -m "docs: your updates"

# Or mark a different baseline
pnpm run pr:mark-as-merged "Different baseline"
```

## 🎨 Features

### Smart Title Generation

The script analyzes your commits to generate appropriate titles:

- **Tag commits** → "docs: add comprehensive tag reference"
- **Concept commits** → "docs: add core concepts documentation"
- **Tutorial commits** → "docs: add new tutorials and guides"
- **Fix commits** → "fix: documentation corrections"
- **Many new pages** → "docs: add 15 new documentation pages"

### Automatic Summary

Generates structured PR body with:
- ✨ New pages (up to 10 listed, then "... and X more")
- 📝 Updated pages (up to 10 listed)
- 🗑️ Deleted pages (all listed)
- 📋 Recent commits (up to 10)
- ✅ Pre-filled checklist

### Safety Checks

Before creating PR:
- ✅ Checks GitHub CLI is installed
- ✅ Verifies authentication
- ✅ Syncs with upstream first
- ✅ Pushes to your fork
- ✅ Only then creates PR

## 💡 Best Practices

### 1. Check Before Creating

```bash
# Always check first
pnpm run pr:since-last

# Only create if you have meaningful changes
# 10+ commits or 3+ new pages is usually good
```

### 2. Use Descriptive Commits

```bash
# ✅ Good - helps generate better PR title
git commit -m "docs: add pagination tag examples"
git commit -m "docs: update nested pages guide"

# ❌ Bad - results in generic PR title
git commit -m "updates"
git commit -m "fixes"
```

### 3. Review the Generated PR

```bash
# After running pr:create
# 1. Click the PR URL
# 2. Review title and description
# 3. Edit on GitHub if needed
# 4. Add screenshots or additional context
```

### 4. Test Before Creating

```bash
# Build locally
pnpm run build

# Validate
pnpm run validate

# Fix any errors before creating PR
```

## 🔐 Security Notes

### GitHub CLI Authentication

GitHub CLI uses OAuth tokens stored securely on your system:
- ✅ Tokens are stored in your system keychain
- ✅ Not committed to git
- ✅ Can be revoked anytime: `gh auth logout`
- ✅ Separate from git credentials

### Repository Permissions

The script creates PRs to `CouchCMS/Documentation`:
- ✅ You need a fork of the repository
- ✅ You need push access to your fork
- ✅ The upstream repo must allow PRs
- ✅ No special permissions required

## 🎊 Summary

With `pr:create`, you get:
- ✅ **Automatic PR creation** - One command
- ✅ **Smart title generation** - Based on commits
- ✅ **Structured body** - Professional format
- ✅ **Safety checks** - Won't break anything
- ✅ **Time savings** - 10 minutes → 30 seconds

**Requirements:**
- GitHub CLI (`gh`) installed and authenticated
- Upstream remote configured
- Previous PR marked with `pr:mark-as-merged`

**Usage:**
```bash
pnpm run pr:create
```

**That's it!** 🚀

---

For manual PR creation, see `GIT-WORKFLOW.md`
For setup help, see this file
For daily tracking, see `PR-TRACKER.md`

