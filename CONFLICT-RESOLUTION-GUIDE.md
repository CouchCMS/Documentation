# Merge Conflict Resolution Guide

## 🎯 Your Recurring Merge Conflicts

When you run `git merge upstream/docs-v2`, you often get conflicts in these files:

### Typical Conflicts

1. **`.cursorrules`** - AI configuration
2. **`.windsurfrules`** - AI configuration
3. **`.giga/rules/`** - AI configuration files
4. **`package.json`** - Dependencies
5. **`pnpm-lock.yaml`** - Lock file
6. **Extended entities docs** - Documentation files

## 🚀 Quick Resolution Command

```bash
# Run this when you get conflicts
pnpm run conflicts:resolve
```

This script will:
- ✅ Analyze all conflicts
- ✅ Categorize them (dependencies, AI config, docs)
- ✅ Suggest safe auto-resolutions
- ✅ Show which need manual review
- ✅ Provide exact commands to run

## 🔧 Standard Resolution Strategy

### Auto-Resolve (Safe)

**AI Configuration Files** (Keep Yours):
```bash
git checkout --ours .cursorrules
git checkout --ours .windsurfrules
git checkout --ours .giga/rules/*
git add .
```

**Reason:** These are your local AI settings - you want to keep them.

**Dependencies** (Accept Theirs):
```bash
git checkout --theirs package.json
git checkout --theirs pnpm-lock.yaml
git add package.json pnpm-lock.yaml
pnpm install
```

**Reason:** Upstream has newer/tested versions - safer to use those.

**Deleted Files** (Accept Theirs):
```bash
# If you deleted a file but upstream modified it
git add path/to/file
```

**Reason:** Let upstream's version be restored.

### Manual Review (Careful)

**Documentation Files:**
```bash
# Open file and manually resolve
code src/content/docs/...
```

**Look for:**
```
<<<<<<< HEAD
Your changes (usually better formatted)
=======
Upstream changes (usually older content)
>>>>>>> upstream/docs-v2
```

**Strategy:** Usually keep YOUR version because:
- You've improved formatting
- You've enhanced descriptions
- You've fixed issues

## 📋 Complete Resolution Workflow

### Step 1: Run Conflict Resolver

```bash
pnpm run conflicts:resolve
```

Output shows:
- Which files have conflicts
- What type of conflict
- Suggested resolution
- Exact commands to run

### Step 2: Auto-Resolve Safe Conflicts

```bash
# Copy-paste from conflicts:resolve output
# Usually:
git checkout --ours .cursorrules
git checkout --ours .windsurfrules
git checkout --theirs pnpm-lock.yaml
git add .
```

### Step 3: Handle Documentation Conflicts

For docs conflicts, keep YOUR version (it's improved):

```bash
git checkout --ours src/content/docs/tags-reference/extended-entities/extended-comments.mdx
git checkout --ours src/content/docs/tags-reference/extended-entities/extended-folders.mdx
git add .
```

### Step 4: Complete the Merge

```bash
git commit -m "Merge upstream/docs-v2, resolved conflicts"
```

**Note:** If 1Password error occurs, make sure 1Password app is running.

### Step 5: Verify

```bash
git status
# Should be clean

pnpm install
# Reinstall dependencies

pnpm run build
# Verify everything works
```

## 🎯 Why These Conflicts Happen

### AI Config Files

You and upstream both modify:
- `.cursorrules` (Cursor AI settings)
- `.windsurfrules` (Windsurf AI settings)
- `.giga/rules/` (Giga AI settings)

**Solution:** Always keep YOUR version - these are personal preferences.

### Dependencies

You update packages, upstream updates packages:
- Both update `package.json`
- Both update `pnpm-lock.yaml`

**Solution:** Accept UPSTREAM version, then reinstall.

### Documentation

You improve formatting, upstream might update content:
- Both modify same `.mdx` files

**Solution:** Usually keep YOUR version (better formatting).

## 💡 Prevention Strategy

### Before Each Merge

```bash
# Commit your changes first
git status
git add .
git commit -m "your changes"

# Then merge
git fetch upstream
git merge upstream/docs-v2
```

### Alternative: Rebase

Instead of merge, you can rebase (applies your changes on top):

```bash
git fetch upstream
git rebase upstream/docs-v2
```

**Pros:** Cleaner history
**Cons:** More complex conflict resolution

## 🚨 Troubleshooting

### "1Password: Could not connect to socket"

**Problem:** Git signing requires 1Password
**Solutions:**

```bash
# Option 1: Make sure 1Password app is running

# Option 2: Disable GPG signing for this commit
git commit --no-gpg-sign -m "Merge upstream/docs-v2"

# Option 3: Skip signing temporarily
git config --global commit.gpgsign false
# (commit)
git config --global commit.gpgsign true
```

### "You are still merging"

**Problem:** Merge not completed
**Solution:**

```bash
# Check what's not staged
git status

# Add everything
git add .

# Complete merge
git commit -m "Merge upstream/docs-v2"
```

### "pnpm install fails"

**Problem:** Lock file issues
**Solution:**

```bash
# Remove lock file
rm pnpm-lock.yaml

# Reinstall
pnpm install

# Add new lock file
git add pnpm-lock.yaml
git commit --amend --no-edit
```

## 🎊 Quick Reference

**When you get conflicts:**

```bash
# 1. Analyze
pnpm run conflicts:resolve

# 2. Auto-resolve (from script output)
git checkout --ours .cursorrules .windsurfrules
git checkout --theirs pnpm-lock.yaml
git add .

# 3. Docs (keep yours - better formatting)
git checkout --ours src/content/docs/...
git add .

# 4. Complete
git commit -m "Merge upstream/docs-v2, resolved conflicts"

# 5. Reinstall
pnpm install

# 6. Verify
pnpm run build
```

---

**Save this guide - you'll need it every time you merge upstream!** 📌

