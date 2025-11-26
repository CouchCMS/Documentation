# PR Tracker - English Language Update

## ✅ What Changed

The PR Tracker system now fully supports and encourages **English language** for all PR descriptions and documentation.

## 🌍 English Language Features

### 1. Date Formatting (Changed)

**Before:** Dutch dates
```
Date: 23 oktober 2025 om 15:16
```

**Now:** English dates
```
Date: October 23, 2025 at 03:16 PM
```

### 2. Smart Warning System (New)

Detects non-English characters and warns you:

```bash
$ pnpm run pr:mark-as-merged "Documentatie toegëvoegd"

✅ Successfully marked as last PR!
📍 Details:
  Date: October 23, 2025 at 03:24 PM
  Description: Documentatie toegëvoegd

⚠️  Reminder: Use English for PR descriptions
   Non-English characters detected. This project uses English for international collaboration.
```

No warning for proper English:

```bash
$ pnpm run pr:mark-as-merged "Added comprehensive documentation"

✅ Successfully marked as last PR!
📍 Details:
  Date: October 23, 2025 at 03:24 PM
  Description: Added comprehensive documentation

💡 To see changes since this PR:
  pnpm run pr:since-last
```

### 3. Documentation Updates

**New Files:**
- ✅ `ENGLISH-REMINDER.md` - Complete English language guidelines
- ✅ Updated `PR-TRACKER.md` with language notes

**Language sections added:**
- 🌍 Why English is important
- ✅ Good examples (English)
- ❌ Bad examples (Dutch)
- 📝 Commit message guidelines

## 🎯 Why English?

The [CouchCMS Documentation](https://github.com/CouchCMS/Documentation) project is **international**:

✅ **Maintainer** (Kamran) can review
✅ **Contributors** worldwide can understand
✅ **Community** is English-speaking
✅ **Standard** for open-source projects

## 📚 Quick Reference

### ✅ Always English

- PR descriptions
- Commit messages
- Code comments
- Documentation content
- GitHub issues/PRs

### ❌ Detection Triggers

Characters like: `ë`, `ï`, `ö`, `ü`, `ñ`, etc.

### 💡 Examples

**Good:**
```bash
pnpm run pr:mark-as-merged "Added core tag reference"
pnpm run pr:mark-as-merged "Fixed broken links in concepts"
pnpm run pr:mark-as-merged "Updated tutorial with examples"
```

**Bad (triggers warning):**
```bash
pnpm run pr:mark-as-merged "Tag documentatie toegëvoegd"
pnpm run pr:mark-as-merged "Links gereparëerd"
pnpm run pr:mark-as-merged "Tutoriäl bijgewerkt"
```

## 🔧 Technical Implementation

### Scripts Updated

1. **`pr-mark-merged.js`**
   - English date formatting (`en-US`)
   - Non-ASCII character detection (`/[^\x00-\x7F]/`)
   - Yellow warning message
   - Added yellow color to colors object

2. **`pr-since-last.js`**
   - English date formatting (`en-US`)
   - Consistent with mark-merged formatting

### Documentation Updated

1. **`PR-TRACKER.md`**
   - Added "Language Note" section
   - English examples throughout
   - Updated all sample outputs

2. **`ENGLISH-REMINDER.md`** (New)
   - Comprehensive language guidelines
   - Examples for all scenarios
   - Conventional commits reference

## 🧪 Testing Results

All scenarios tested and working:

✅ English description - no warning
✅ Dutch with special characters - warning
✅ Dutch without special characters - no warning (ASCII only)
✅ Date formatting in English
✅ Color formatting correct

## 📋 Files Changed

```
Modified:
├── scripts/pr-mark-merged.js     (English dates + warning)
├── scripts/pr-since-last.js      (English dates)
├── PR-TRACKER.md                 (Language notes)
└── PR-TRACKER-SINCE-LAST.md      (Updated intro)

New:
└── ENGLISH-REMINDER.md           (Complete guidelines)
```

## 🎊 Summary

The PR Tracker now:

- ✅ Uses English dates everywhere
- ✅ Warns about non-English characters
- ✅ Provides clear guidelines
- ✅ Maintains international standards
- ✅ Helps you write better PRs

**Remember:** English = International collaboration! 🌍

---

**Update Date:** October 23, 2025
**Status:** ✅ Complete and Tested
**Language:** English (en-US)

