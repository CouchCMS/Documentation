# Git Workflow for CouchCMS Documentation

Complete guide for working with the upstream [CouchCMS/Documentation](https://github.com/CouchCMS/Documentation) repository.

## 🎯 Overview

You work on a **fork** of the CouchCMS Documentation. This guide shows how to:
- ✅ Set up upstream remote
- ✅ Sync with upstream changes
- ✅ Create pull requests
- ✅ Track your progress with PR Tracker

## 🔧 Initial Setup (One Time)

### 1. Check Your Remotes

```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/Documentation.git (fetch)
origin  https://github.com/YOUR_USERNAME/Documentation.git (push)
```

### 2. Add Upstream Remote

Add the official CouchCMS Documentation repository:

```bash
git remote add upstream https://github.com/CouchCMS/Documentation.git
```

### 3. Verify Setup

```bash
git remote -v
```

Should now show:
```
origin    https://github.com/YOUR_USERNAME/Documentation.git (fetch)
origin    https://github.com/YOUR_USERNAME/Documentation.git (push)
upstream  https://github.com/CouchCMS/Documentation.git (fetch)
upstream  https://github.com/CouchCMS/Documentation.git (push)
```

## 🔄 New Improved Workflow (No More Conflicts!)

### 🎯 Key Insight: Don't Merge Upstream Before PR!

**Old way (causing conflicts):**
```
1. You work on docs-v2
2. You merge upstream/docs-v2 ← CONFLICTS!
3. You create PR
```

**New way (no conflicts):**
```
1. You work on docs-v2
2. You push directly to your fork
3. You create PR
4. GitHub handles conflicts automatically when Kamran merges
```

### Step 1: Start New Work Session

```bash
# Make sure you're on docs-v2
git checkout docs-v2

# Start working immediately - no upstream sync needed!
```

### Step 2: Work on Documentation

```bash
# Edit documentation files
code src/content/docs/...

# Commit your changes (use English!)
git add .
git commit -m "docs: add examples for dropdownfolders tag"

# Check your progress anytime
pnpm run pr:since-last
```

### Step 3: Create Pull Request (No Upstream Merge!)

```bash
# Check what you've done
pnpm run pr:since-last
# Output: 15 commits, 5 new pages

# Push directly to your fork (no upstream merge needed!)
git push origin docs-v2

# Create PR automatically
pnpm run pr:create

# Or create manually on GitHub (see below)
```

#### Manual PR Creation on GitHub

1. **Go to your fork:** `https://github.com/YOUR_USERNAME/Documentation`
2. **Click:** "Compare & pull request" button (appears after push)
3. **Set base and compare:**
   - Base repository: `CouchCMS/Documentation`
   - Base branch: `docs-v2`
   - Head repository: `YOUR_USERNAME/Documentation`
   - Compare branch: `docs-v2`
4. **Fill in PR details (in English!):**
   - Title: Clear, descriptive (e.g., "Add comprehensive tag reference for core tags")
   - Description: What you changed and why
   - Reference any issues if applicable
5. **Create pull request**

### Step 4: After PR is Merged

```bash
# Your PR was merged! Celebrate 🎉

# ONLY AFTER your PR is merged by Kamran:
git fetch upstream
git pull upstream/docs-v2

# Mark this as new baseline
pnpm run pr:mark-as-merged "Added comprehensive tag reference for core tags"

# Start next work session...
```

**Why These Steps Matter:**

This step is crucial for two reasons:

1. **Keep Your Local Branch in Sync**
   - Your merged PR is now in `CouchCMS/Documentation/docs-v2`
   - Your local branch still has the "pre-merge" state
   - `git pull upstream/docs-v2` updates your local branch to match

2. **Reset the Progress Tracker**
   - `pr:mark-as-merged` tells the tracker: "Start counting from here"
   - Without this, `pr:since-last` shows old (already merged) changes
   - Example: You'll see "25 commits" when you've only made 3 new ones

**If You Skip This Step:**
- ❌ Your local branch falls behind
- ❌ PR tracker shows incorrect progress
- ❌ Next PR will include old, already-merged changes

## 🚨 Common Scenarios

### Scenario 1: Merge Conflicts (Should Be Rare!)

With the new workflow, conflicts should be minimal. If you still get them:

```bash
# Use the automated conflict resolver
pnpm run conflicts:resolve

# Or manually resolve:
# Accept your version for config files
git checkout --ours .cursorrules .windsurfrules package.json

# Accept upstream for dependencies
git checkout --theirs pnpm-lock.yaml

# Manual review for docs files
git status
# Edit conflicted files manually
git add .
git commit -m "Resolve merge conflicts"
```

### Scenario 2: Your Fork is Behind (Don't Worry!)

With the new workflow, this is normal and expected:

```bash
# This is OK! GitHub will handle it when Kamran merges your PR
# No need to sync before creating PR

# Only sync AFTER your PR is merged:
git fetch upstream
git pull upstream/docs-v2
```

### Scenario 3: Multiple PRs in Progress

If you want to work on multiple features:

```bash
# For each new feature, create a branch
git checkout docs-v2
git pull upstream docs-v2
git checkout -b feature/my-new-feature

# Work on your feature
git commit -m "docs: add feature"

# Push to your fork
git push origin feature/my-new-feature

# Create PR from feature/my-new-feature to upstream docs-v2

# Use PR Tracker on main docs-v2 branch only
git checkout docs-v2
pnpm run pr:since-last
```

### Scenario 4: Accidentally Committed to Wrong Branch

If you committed to `main` instead of `docs-v2`:

```bash
# Check which branch you're on
git branch

# If on wrong branch, create correct branch from here
git checkout -b docs-v2

# Push to correct branch
git push origin docs-v2

# Switch back and reset wrong branch
git checkout main
git reset --hard upstream/main
```

## 📊 Integration with PR Tracker

The PR Tracker complements this Git workflow:

### When to Mark PRs

```bash
# ✅ MARK: After syncing with upstream
git merge upstream/docs-v2
pnpm run pr:mark-as-merged "Synced with upstream"

# ✅ MARK: After your PR is merged
git merge upstream/docs-v2
pnpm run pr:mark-as-merged "Added tag documentation"

# ❌ DON'T MARK: After every commit (too granular)
```

### When to Check Status

```bash
# ✅ CHECK: Before deciding to create PR
pnpm run pr:since-last
# "15 commits, time for PR!"

# ✅ CHECK: Daily standup
pnpm run pr:since-last
# "Progress update: 5 commits this week"

# ❌ DON'T CHECK: After every single commit (overkill)
```

## 🎯 Best Practices

### 1. Sync Frequently

```bash
# At start of work session
git fetch upstream
git merge upstream/docs-v2

# Before creating PR
git fetch upstream
git merge upstream/docs-v2

# After your PR is merged
git fetch upstream
git merge upstream/docs-v2
```

### 2. Use English Everywhere

```bash
# ✅ Good commits
git commit -m "docs: add pagination examples"
git commit -m "fix: broken links in concepts"

# ❌ Bad commits
git commit -m "docs: paginatie voorbeelden toegevoegd"
```

### 3. Keep Your Fork Clean

```bash
# Work only on docs-v2 branch
git checkout docs-v2

# Don't create unnecessary branches unless needed
# Keep it simple: fork → docs-v2 → upstream docs-v2
```

### 4. Test Before PR

```bash
# Build the docs locally
pnpm run build

# Check for errors
pnpm run validate

# Review your changes
git diff upstream/docs-v2
```

## 🔍 Troubleshooting

### "fatal: 'upstream' does not appear to be a git repository"

**Problem:** Upstream remote not added.

**Solution:**
```bash
git remote add upstream https://github.com/CouchCMS/Documentation.git
```

### "Your branch and 'origin/docs-v2' have diverged"

**Problem:** Your fork and local branch are out of sync.

**Solution:**
```bash
# Force push if you're sure (careful!)
git push origin docs-v2 --force

# Or merge origin's version
git pull origin docs-v2
```

### "Automatic merge failed; fix conflicts"

**Problem:** Merge conflicts between your changes and upstream.

**Solution:**
```bash
# Open conflicted files and resolve
# Look for <<<<<<< markers
# Keep the correct version
# Remove markers

git add .
git commit -m "Merge upstream, resolved conflicts"
```

## 📚 Quick Reference

```bash
# Daily workflow
git fetch upstream                    # Get latest
git merge upstream/docs-v2           # Merge it
git push origin docs-v2              # Update fork

# Work and commit
git add .
git commit -m "docs: your changes"
git push origin docs-v2

# Check progress
pnpm run pr:since-last

# Create PR on GitHub UI

# After merge
git fetch upstream
git merge upstream/docs-v2
pnpm run pr:mark-as-merged "PR title"
```

## 🆘 Need Help?

- **Git Issues:** [Git Documentation](https://git-scm.com/doc)
- **GitHub PRs:** [GitHub Docs](https://docs.github.com/en/pull-requests)
- **CouchCMS Forum:** [CouchCMS Community](https://www.couchcms.com/forum/)

---

**Remember:**
- 🔄 Sync often with upstream
- 🌍 Use English everywhere
- ✅ Test before creating PR
- 📊 Track progress with PR Tracker

**Happy contributing!** 🚀

