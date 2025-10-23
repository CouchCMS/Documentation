# PR Creation Checklist

Use this checklist when creating a PR manually to avoid common mistakes.

## ✅ Before Starting

- [ ] All changes committed (`git status` is clean)
- [ ] On correct branch (`docs-v2`)
- [ ] Upstream remote configured (`git remote -v` shows upstream)
- [ ] Last PR marked (`pnpm run pr:since-last` works)

## ✅ Pre-PR Validation

- [ ] Run test: `pnpm run pr:test`
- [ ] Review: `PR-TEST-OUTPUT.md`
- [ ] Review: `PR-SUMMARY.md`
- [ ] Build passes: `pnpm run build`
- [ ] Validation passes: `pnpm run validate`

## ✅ Sync with Upstream

```bash
git fetch upstream
git merge upstream/docs-v2
```

- [ ] Fetch completed
- [ ] Merge completed (no conflicts)
- [ ] If conflicts: resolved and committed

## ✅ Push to Fork

```bash
git push origin docs-v2
```

- [ ] Push successful
- [ ] No errors

## ✅ Create PR on GitHub

1. Go to your fork: `https://github.com/YOUR_USERNAME/Documentation`
2. Click: "Compare & pull request" button

- [ ] Button appeared after push
- [ ] Clicked button

3. Verify base settings:
   - Base repository: `CouchCMS/Documentation`
   - Base branch: `docs-v2`
   - Head repository: `YOUR_USERNAME/Documentation`
   - Head branch: `docs-v2`

- [ ] Base repository correct
- [ ] Base branch correct
- [ ] Head repository correct
- [ ] Head branch correct

4. Add PR content:

**Title:** (copy from `PR-SUMMARY.md`)
```
docs: comprehensive documentation updates and improvements
```

- [ ] Title copied
- [ ] Title is in English
- [ ] Title follows conventional commits format

**Body:** (copy from `PR-SUMMARY.md` - "Suggested PR Description")

- [ ] Body copied
- [ ] Body reviewed for accuracy
- [ ] Body is in English
- [ ] Added any extra context if needed

5. Submit PR

- [ ] Clicked "Create pull request"
- [ ] PR created successfully
- [ ] PR URL noted

## ✅ After PR Creation

- [ ] Review PR on GitHub
- [ ] Check that all files are included
- [ ] Check that description looks good
- [ ] Add any screenshots if helpful
- [ ] Respond to automated checks if any

## ✅ After PR is Merged

```bash
git fetch upstream
git merge upstream/docs-v2
git push origin docs-v2
pnpm run pr:mark-as-merged "Your PR title"
```

- [ ] Pulled merged changes
- [ ] Pushed to fork
- [ ] Marked as baseline for next PR

---

## 🚨 Common Mistakes to Avoid

### ❌ Wrong Base Branch
**Problem:** PR created to wrong branch (main instead of docs-v2)
**Fix:** Close PR and create new one with correct base

### ❌ Uncommitted Changes
**Problem:** Local changes not in PR
**Fix:** Commit, push, update PR

### ❌ Not Synced with Upstream
**Problem:** Merge conflicts in PR
**Fix:** Sync locally, resolve conflicts, force push

### ❌ Dutch Language
**Problem:** PR description in Dutch
**Fix:** Edit PR description on GitHub, translate to English

### ❌ Forgot to Push
**Problem:** Can't create PR
**Fix:** `git push origin docs-v2`

---

## 💡 Quick Commands Reference

```bash
# Pre-checks
git status                    # Check uncommitted
git branch                    # Check branch
git remote -v                 # Check upstream

# Analysis
pnpm run pr:test             # Test PR creation

# Sync & Push
git fetch upstream           # Get latest
git merge upstream/docs-v2   # Merge it
git push origin docs-v2      # Push to fork

# After merge
pnpm run pr:mark-as-merged "Title"

# Or use guided mode
pnpm run pr:guided           # Interactive walkthrough
```

---

**Print this or keep it open while creating your PR!** 📋

