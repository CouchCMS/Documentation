# PR Tracker - Upstream Changes Monitor

Track what has changed in your local fork since the last merged PR to [CouchCMS/Documentation (docs-v2)](https://github.com/CouchCMS/Documentation/tree/docs-v2).

## 🎯 Purpose

Simple high-level overview of your work since the last upstream merge:
- ✅ How many commits you've made
- ✅ How many pages added/updated/deleted
- ✅ Which documentation areas are affected
- ✅ How much time has passed

Perfect for deciding: "Is it time to create a PR?"

## 🌍 Language Note

**Always use English** for all PR descriptions and commit messages. The CouchCMS Documentation project is an international open-source project, and English ensures all contributors and maintainers can understand your work.

## 🚀 Quick Start

### First Time Setup

After your first PR is merged to upstream:

```bash
# Pull the merged changes
git pull upstream docs-v2

# Mark this as your baseline (use English!)
pnpm run pr:mark-as-merged "Description of what was merged"

# Example:
pnpm run pr:mark-as-merged "Added dropdownfolders tag documentation"
```

**Important:** Always use English for descriptions to keep the project accessible to all contributors.

### Daily Usage

```bash
# Check what you've done since last upstream merge
pnpm run pr:since-last
```

## 📊 What You See

### Scenario 1: Just After Merge (Clean State)

```bash
$ pnpm run pr:since-last

📊 Changes Since Last PR

📍 Last PR:
  Date: October 23, 2025 at 03:16 PM
  Branch: docs-v2
  Description: Added dropdownfolders tag documentation
  Time elapsed: 0 days

✅ No changes since last PR
```

### Scenario 2: After Some Work

```bash
$ pnpm run pr:since-last

📊 Changes Since Last PR

📍 Last PR:
  Date: October 20, 2025 at 10:30 AM
  Description: Added core tag references
  Time elapsed: 5 days

📝 15 commits since last PR

📊 Summary:
  ✨ New pages: 5
  📝 Updated pages: 8
  🗑️  Deleted pages: 0
  🔧 Other changes: 3

💬 Commit breakdown:
  📚 Documentation: 12
  🐛 Fixes: 2
  🔧 Chores: 1

🔄 Recent commits:
  abc1234 - docs: add comments tag examples
  def5678 - docs: update pagination guide
  ghi9012 - docs: fix typos in concepts
  jkl3456 - fix: broken internal links
  mno7890 - docs: add search functionality guide
  ... and 10 more

📂 Affected documentation areas:
  • concepts
  • tags-reference
  • tutorials

💡 Next steps:
  📋 Consider creating a new PR:
     Create PR manually on GitHub
```

## 🔄 Complete Workflow

### 1. After PR Merge on GitHub Upstream

```bash
# Pull merged changes from upstream
git pull upstream docs-v2

# Mark this as your new baseline
pnpm run pr:mark-as-merged "Title of the merged PR"
```

### 2. During Development

```bash
# Work on your documentation
git commit -m "docs: add new examples"
git commit -m "docs: update concepts"

# Check your progress
pnpm run pr:since-last
```

### 3. When Ready for New PR

```bash
# Check final status
pnpm run pr:since-last
# Output shows: 15 commits, 5 new pages, 3 days work

# Create PR manually on GitHub
git push origin docs-v2
# Then create PR on GitHub UI
```

### 4. After New PR is Merged (Cycle Repeats)

```bash
git pull upstream docs-v2
pnpm run pr:mark-as-merged "New PR description"
```

## 💡 Commands

```bash
# Show changes since last upstream merge
pnpm run pr:since-last

# Mark current upstream state as baseline
pnpm run pr:mark-as-merged ["Optional description"]

# Show help
pnpm run pr:help
```

## 📁 How It Works

The tracker stores the last PR info in `.last-pr.json` (gitignored):

```json
{
  "date": "2025-10-23T13:16:13.000Z",
  "branch": "docs-v2",
  "description": "Added dropdownfolders tag documentation",
  "commit": {
    "hash": "054f943abc...",
    "message": "docs: add dropdownfolders examples"
  }
}
```

This file is **local only** - it tracks your personal progress.

## 🎯 Use Cases

### Use Case 1: Solo Contributor

```bash
# Week 1: Work on docs
git commit -m "docs: add tag A"
git commit -m "docs: add tag B"

pnpm run pr:since-last
# Output: 2 commits, 2 new pages

# Week 2: More work
git commit -m "docs: add tutorial"

pnpm run pr:since-last
# Output: 3 commits, 3 new pages
# Time to create PR!
```

### Use Case 2: Multiple Contributors

```bash
# After team member's PR is merged
git pull upstream docs-v2

# Mark their work as baseline
pnpm run pr:mark-as-merged "Team: Added authentication docs"

# Now your work
git commit -m "docs: my additions"

pnpm run pr:since-last
# Shows only YOUR work since team PR
```

### Use Case 3: Long-Running Feature

```bash
# Start feature
pnpm run pr:mark-as-merged "Starting advanced guides feature"

# Work over time
# ... many commits ...

# Check progress periodically
pnpm run pr:since-last
# Week 1: 5 commits
# Week 2: 12 commits
# Week 3: 20 commits - ready for PR!
```

## 🔍 What Gets Tracked

### Tracked:
- ✅ Number of commits since last PR
- ✅ New documentation pages
- ✅ Updated pages
- ✅ Deleted pages
- ✅ Commit categories (docs/fix/feat/chore)
- ✅ Affected documentation areas
- ✅ Time elapsed

### Not Tracked:
- ❌ Detailed line-by-line changes
- ❌ Binary file contents
- ❌ Build artifacts

This is **intentionally high-level** for quick decision making.

## 🚨 Troubleshooting

### "No previous PR tracked"

**Problem:** Never ran `pr:mark-as-merged`.

**Solution:**
```bash
pnpm run pr:mark-as-merged "Current baseline"
```

### Shows Too Many Changes

**Problem:** Haven't updated baseline in a long time.

**Solution:**
```bash
git pull upstream docs-v2
pnpm run pr:mark-as-merged "Sync with upstream"
```

### Shows Zero Changes

**Problem:** Changes not committed.

**Solution:**
```bash
git add .
git commit -m "your changes"
pnpm run pr:since-last
```

## 📚 Related Files

- **`PR-TRACKER-SINCE-LAST.md`** - Detailed documentation
- **`scripts/pr-since-last.js`** - Implementation
- **`scripts/pr-mark-merged.js`** - Implementation

---

**Simple. High-level. Decision-making tool.** 🚀

Just what you need to track progress without complexity.

