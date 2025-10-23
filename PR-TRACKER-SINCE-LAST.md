# PR Tracker - Changes Since Last PR

## 🎯 Wat is Dit?

Een tool om bij te houden **wanneer** je laatste PR was gemerged naar de upstream repository ([CouchCMS/Documentation](https://github.com/CouchCMS/Documentation/tree/docs-v2)) en **wat er sindsdien is veranderd** op een high-level.

Dit helpt je om:
- ✅ Te zien hoeveel werk je hebt gedaan sinds de laatste PR
- ✅ Te bepalen wanneer het tijd is voor een nieuwe PR
- ✅ Een overview te krijgen van je recente wijzigingen

## 🚀 Quick Start

### Eerste Keer Setup

```bash
# Mark huidige staat als "laatste PR"
pnpm run pr:mark-as-merged "Description of the PR that was just merged"

# Voorbeeld:
pnpm run pr:mark-as-merged "Added dropdownfolders tag documentation"
```

### Dagelijks Gebruik

```bash
# Check wat er is veranderd sinds laatste PR
pnpm run pr:since-last
```

## 📊 Wat Krijg Je Te Zien?

### Scenario 1: Net Na PR Merge (Niets Nieuws)

```bash
$ pnpm run pr:since-last

📊 Changes Since Last PR

Current branch: docs-v2

📍 Last PR:
  Date: 23 oktober 2025 om 15:16
  Branch: docs-v2
  Description: Added dropdownfolders tag documentation
  Time elapsed: 0 days

✅ No changes since last PR
```

### Scenario 2: Na Wat Werk (Wijzigingen Gedetecteerd)

```bash
$ pnpm run pr:since-last

📊 Changes Since Last PR

Current branch: docs-v2

📍 Last PR:
  Date: 20 oktober 2025 om 10:30
  Branch: docs-v2
  Description: Added dropdownfolders tag documentation
  Time elapsed: 3 days

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
     pnpm run pr:prepare
```

## 🔄 Complete Workflow

### 1. Na Merge op GitHub

Zodra jouw PR is gemerged op [CouchCMS/Documentation](https://github.com/CouchCMS/Documentation/tree/docs-v2):

```bash
# Pull de merged changes
git pull upstream docs-v2

# Mark als laatste PR
pnpm run pr:mark-as-merged "Description from your GitHub PR"

# Voorbeeld:
pnpm run pr:mark-as-merged "Added comprehensive tag reference for core tags"
```

### 2. Tijdens Werk

Terwijl je werkt aan nieuwe features/docs:

```bash
# Regelmatig checken wat je hebt gedaan
pnpm run pr:since-last

# Output toont:
# - Aantal commits
# - Nieuwe/gewijzigde pagina's
# - Affected areas
# - Hoe lang geleden laatste PR was
```

### 3. Wanneer PR Tijd Is

Als je voldoende werk hebt gedaan:

```bash
# Check status
pnpm run pr:since-last
# Zie: 15 commits, 5 nieuwe pagina's, 3 dagen werk

# Genereer PR documentation
pnpm run pr:prepare

# Edit draft, finalize
pnpm run pr:finalize

# Push & create PR on GitHub
git push origin docs-v2
```

### 4. Na PR Merge (Cycle Herhaalt)

```bash
# Pull merged changes
git pull upstream docs-v2

# Mark nieuwe baseline
pnpm run pr:mark-as-merged "Your new PR description"

# Continue work...
```

## 💡 Pro Tips

### Tip 1: Descriptive PR Marks

```bash
# ✅ GOED: Beschrijvend
pnpm run pr:mark-as-merged "Added 5 new core tag references with examples"

# ❌ NIET GOED: Vaag
pnpm run pr:mark-as-merged "updates"
```

### Tip 2: Regelmatig Checken

```bash
# Voeg toe aan je routine
pnpm run pr:since-last

# Bij 10+ commits: overweeg PR
# Bij 3+ dagen werk: overweeg PR
# Bij 5+ nieuwe pagina's: overweeg PR
```

### Tip 3: Combineer Met PR Tools

```bash
# Workflow:
pnpm run pr:since-last       # Check je werk
pnpm run pr:prepare          # Genereer draft
pnpm run pr:finalize         # Valideer
# Create PR on GitHub
pnpm run pr:mark-as-merged   # Track voor volgende keer
```

### Tip 4: Team Sync

Als je in een team werkt:

```bash
# Na pull van upstream
git pull upstream docs-v2

# Mark de merged state
pnpm run pr:mark-as-merged "Team PR: Q4 documentation updates"

# Nu track je alleen JOUw work sinds team PR
```

## 📁 File Structure

De tracking wordt opgeslagen in `.last-pr.json`:

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

**Belangrijk:** Dit bestand is in `.gitignore` - het is lokaal!

## 🎯 Use Cases

### Use Case 1: Solo Developer

```bash
# Week 1: Werk aan features
git commit -m "docs: add tag A"
git commit -m "docs: add tag B"
git commit -m "docs: update concepts"

# Check status
pnpm run pr:since-last
# Output: 3 commits, 2 nieuwe pagina's

# Week 2: Meer werk
git commit -m "docs: add tutorial"
git commit -m "fix: broken links"

# Check again
pnpm run pr:since-last
# Output: 5 commits, 3 nieuwe pagina's
# Tijd voor PR!

# Create PR
pnpm run pr:prepare

# After merge
pnpm run pr:mark-as-merged "Added tags A, B and new tutorial"
```

### Use Case 2: Contributing to Upstream

```bash
# Fork is synced with upstream
git pull upstream docs-v2

# Mark current upstream state
pnpm run pr:mark-as-merged "Upstream: Latest merged PRs"

# Your work
git commit -m "docs: my contribution"

# Check what you're adding to upstream
pnpm run pr:since-last
# Shows only YOUR commits since upstream sync

# Create PR for upstream
pnpm run pr:prepare
# Shows only YOUR changes
```

### Use Case 3: Long Running Features

```bash
# Start feature branch
git checkout -b feature/advanced-guides

# Mark starting point
pnpm run pr:mark-as-merged "Starting advanced guides feature"

# Work over weeks
# ... many commits ...

# Periodically check progress
pnpm run pr:since-last
# Week 1: 5 commits, 2 pages
# Week 2: 12 commits, 5 pages
# Week 3: 20 commits, 8 pages - ready for PR!
```

## 🔍 What Gets Tracked?

### Tracked:
- ✅ Number of commits since last PR
- ✅ New documentation pages (`.mdx` in `src/content/docs/`)
- ✅ Updated pages
- ✅ Deleted pages
- ✅ Commit categories (docs/fix/feat/chore)
- ✅ Affected documentation areas
- ✅ Time elapsed since last PR

### Not Tracked (Detail):
- ❌ Specific line changes in files
- ❌ Binary file contents
- ❌ Node modules or build artifacts
- ❌ Individual code examples

This is **intentionally high-level**. For detailed PR descriptions, use `pnpm run pr:prepare`.

## 🆚 Verschil Met pr:prepare

| Feature | pr:since-last | pr:prepare |
| :--- | :--- | :--- |
| **Purpose** | Quick overview | Detailed PR draft |
| **Comparison** | Since last marked PR | Since remote branch |
| **Detail Level** | High-level summary | File-by-file details |
| **When to Use** | Daily status check | Creating PR |
| **Output** | Terminal only | DRAFT-PR.md file |
| **Requires Work** | No editing | Yes, edit draft |

### Typical Workflow:

```bash
# Daily: Quick check
pnpm run pr:since-last
# "15 commits, time for PR"

# PR Time: Detailed documentation
pnpm run pr:prepare
# Edit DRAFT-PR.md with descriptions

# After PR Merge
pnpm run pr:mark-as-merged "PR title"

# Repeat...
```

## 🚨 Troubleshooting

### "No previous PR tracked"

**Problem:** Je hebt nog nooit `pr:mark-as-merged` gedraaid.

**Solution:**
```bash
pnpm run pr:mark-as-merged "Initial baseline"
```

### Shows Too Many Changes

**Problem:** Je hebt lang geleden laatste PR gemarkeerd.

**Solution:** Mark een nieuwere state:
```bash
git pull upstream docs-v2
pnpm run pr:mark-as-merged "Sync with upstream"
```

### Shows Zero Changes (But You Have Work)

**Problem:** Je hebt uncommitted changes.

**Solution:**
```bash
git add .
git commit -m "your changes"
pnpm run pr:since-last
```

### Wrong Last PR Date

**Problem:** Je hebt verkeerde datum gemarkeerd.

**Solution:** Mark opnieuw:
```bash
pnpm run pr:mark-as-merged "Corrected: actual last PR"
```

## 🎊 Commands Overview

```bash
# Mark current state as last PR
pnpm run pr:mark-as-merged ["Optional description"]

# Show changes since last PR
pnpm run pr:since-last

# Show all PR commands
pnpm run pr:help
```

## 📚 Related Documentation

- `PR-TRACKER-README.md` - Main PR tracker guide
- `PR-TRACKER-DOCS-V2.md` - docs-v2 workflow
- `docs/PR-TRACKER-GUIDE.md` - Comprehensive guide

---

**Bottom Line:**

Deze tool geeft je een **bird's eye view** van je werk sinds de laatste PR. Geen details, geen file-by-file - just een quick "hoe ver ben ik?". Perfect voor dagelijks gebruik! 🚀

