# English Language Requirement

## 🌍 Why English?

The [CouchCMS Documentation](https://github.com/CouchCMS/Documentation) is an **international open-source project**. Using English ensures:

✅ **Accessibility** - All contributors worldwide can understand
✅ **Maintainability** - Maintainers (like Kamran) can review easily
✅ **Collaboration** - Team members from different countries can contribute
✅ **Professionalism** - Standard practice for open-source projects

## 📝 What Must Be in English

### Always English:
- ✅ **PR descriptions** (when marking merged PRs)
- ✅ **Commit messages** (always use conventional commits)
- ✅ **Code comments** (in any code you write)
- ✅ **Documentation content** (all `.mdx` files)
- ✅ **GitHub PR titles and descriptions**
- ✅ **GitHub issues**
- ✅ **Code examples** (variable names, function names)

### Can Be Dutch:
- ✅ **Personal notes** (not committed to repo)
- ✅ **Local conversations** with Dutch team members
- ✅ **Private planning documents**

## 💬 PR Tracker Usage

### ✅ Good Examples (English)

```bash
pnpm run pr:mark-as-merged "Added comprehensive tag reference for core tags"
pnpm run pr:mark-as-merged "Fixed broken links in concepts section"
pnpm run pr:mark-as-merged "Updated tutorial with better examples"
```

### ❌ Bad Examples (Dutch)

```bash
pnpm run pr:mark-as-merged "Tag documentatie toegevoegd"
pnpm run pr:mark-as-merged "Links gerepareerd in concepts"
pnpm run pr:mark-as-merged "Tutorial bijgewerkt met voorbeelden"
```

## 🔄 Commit Message Examples

### ✅ Good (English + Conventional Commits)

```bash
git commit -m "docs: add dropdownfolders tag documentation"
git commit -m "fix: correct typos in nested pages guide"
git commit -m "feat: add search functionality examples"
git commit -m "docs(tags): update pages tag with new parameters"
```

### ❌ Bad (Dutch or Unclear)

```bash
git commit -m "tag documentatie toegevoegd"
git commit -m "updates"
git commit -m "fixes stuff"
```

## 📊 PR Tracker Reminder

The PR tracker will show a **warning** if you use non-English characters in your PR descriptions:

```bash
pnpm run pr:mark-as-merged "Tag documentatie toegevoegd"

⚠️  Reminder: Use English for PR descriptions
   This makes it readable for international contributors
```

## 🎯 Quick Reference

When in doubt, ask yourself:

**"Will Kamran (the maintainer) understand this?"**

If the answer is no → Use English! 🌍

## 📚 Resources

- [Conventional Commits](https://www.conventionalcommits.org/) - Standard commit message format
- [CouchCMS Forum](https://www.couchcms.com/forum/) - English-only community
- [GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) - Creating good PRs

---

**Remember:** English = Global collaboration! 🚀

