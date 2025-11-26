# CouchCMS Documentation - AI Toolkit Index

Complete overview of all AI assistance tools for documentation development.

## 🎯 Quick Access

| Need | File | Use |
|------|------|-----|
| **Start Here** | [QUICKSTART.md](.cursor/QUICKSTART.md) | 30-second guide |
| **Complete Guide** | [README.md](.cursor/README.md) | Full toolkit documentation |
| **Convert Content** | [convert-to-markdown.md](.cursor/prompts/convert-to-markdown.md) | Content conversion |
| **Format Reference** | [markdown-quick-reference.md](.cursor/prompts/markdown-quick-reference.md) | Syntax lookup |
| **Style Rules** | [STYLEGUIDE.md](../STYLEGUIDE.md) | Complete formatting guide |

## 📂 Directory Structure

```
.cursor/
├── README.md                    # Complete AI toolkit guide
├── QUICKSTART.md               # 30-second start guide
├── INDEX.md                    # This file - complete overview
│
├── rules/                      # Auto-applied formatting rules
│   ├── markdown.mdc           # Complete formatting rules (auto-applied)
│   ├── content-structure.mdc  # Content organization patterns
│   └── component-architecture.mdc  # Component usage rules
│
└── prompts/                    # AI assistance prompts
    ├── README.md              # Prompt usage guide
    ├── convert-to-markdown.md # Content conversion prompt
    └── markdown-quick-reference.md  # Quick formatting reference
```

## 🤖 Automated Rules (Auto-Applied)

These rules automatically apply when you edit markdown files:

### 1. markdown.mdc
**Auto-applies to:** All `.md` and `.mdx` files
**Coverage:** Complete formatting rules from STYLEGUIDE.md
**Purpose:** Ensures consistent documentation quality

### 2. content-structure.mdc
**Auto-applies to:** Content collections and layouts
**Coverage:** Documentation hierarchy and navigation
**Purpose:** Maintains logical content organization

### 3. component-architecture.mdc
**Auto-applies to:** Component files and MDX
**Coverage:** Astro/Starlight component patterns
**Purpose:** Consistent component usage

## 🛠️ AI Prompts (Manual Use)

Use these prompts explicitly when needed:

### 1. convert-to-markdown.md
**Use for:**
- Converting any content to CouchCMS markdown format
- Creating new documentation pages from scratch
- Ensuring style guide compliance

**How to use:**
```markdown
@.cursor/prompts/convert-to-markdown.md

Convert this content about [topic]:
[Your content]
```

### 2. markdown-quick-reference.md
**Use for:**
- Quick syntax lookups
- Format pattern reference
- Validation examples

**How to use:**
```markdown
@.cursor/prompts/markdown-quick-reference.md

How do I format [element]?
```

## 📖 Reference Documentation

### 1. STYLEGUIDE.md (Root)
**Location:** `../STYLEGUIDE.md`
**Purpose:** Authoritative source for all formatting rules
**Coverage:**
- Document organization
- Content guidelines
- Technical standards
- Quality requirements
- Common patterns

### 2. Prompts README
**Location:** `.cursor/prompts/README.md`
**Purpose:** Detailed guide for using AI prompts
**Coverage:**
- Workflow recommendations
- Use case examples
- Best practices
- Quality assurance

## 🎯 Common Workflows

### Workflow 1: Converting Existing Content

1. **Gather** source content (HTML, text, notes)
2. **Use** convert-to-markdown.md prompt
3. **Review** generated markdown
4. **Refine** if needed (auto-rules maintain consistency)

### Workflow 2: Creating New Documentation

1. **Plan** structure and sections
2. **Use** convert-to-markdown.md to scaffold
3. **Write** content (auto-rules enforce formatting)
4. **Verify** quality checklist

### Workflow 3: Quick Formatting Check

1. **Reference** markdown-quick-reference.md
2. **Find** relevant pattern
3. **Apply** to your content

### Workflow 4: Style Guide Consultation

1. **Search** STYLEGUIDE.md for specific rule
2. **Apply** to complex formatting decisions
3. **Trust** auto-rules for standard patterns

## 📊 File Relationships

```
STYLEGUIDE.md (Root)
    ↓ (authoritative source)
.cursor/rules/markdown.mdc (Auto-applied rules)
    ↓ (enforces automatically)
[Your .md/.mdx files]
    ↓ (guides manually)
.cursor/prompts/convert-to-markdown.md (Conversion prompt)
    ↓ (quick reference)
.cursor/prompts/markdown-quick-reference.md (Syntax lookup)
```

## 🚦 Decision Tree

```
Need to work on documentation?
│
├─ Creating/Converting content?
│  └─ Use: convert-to-markdown.md
│
├─ Quick syntax question?
│  └─ Use: markdown-quick-reference.md
│
├─ Complex formatting decision?
│  └─ Consult: STYLEGUIDE.md
│
└─ Just editing?
   └─ Auto-rules handle it!
```

## 💡 Pro Tips

### For Maximum Efficiency

1. **Let automation work**
   - Auto-rules in `.cursor/rules/` handle most formatting
   - Focus on content quality
   - Trust the system

2. **Use prompts strategically**
   - convert-to-markdown.md for scaffolding
   - markdown-quick-reference.md for lookups
   - Don't reinvent patterns

3. **Reference the style guide**
   - For edge cases
   - For comprehensive rules
   - For team alignment

### For Best Results

1. **Be specific with prompts**
   - Include context and requirements
   - Provide complete source content
   - Describe desired structure

2. **Review AI output**
   - Check frontmatter completeness
   - Verify code examples
   - Test links

3. **Trust but verify**
   - Auto-rules are reliable
   - Double-check critical content
   - Use quality checklist

## 📈 Success Metrics

Your documentation should achieve:

- ✅ 100% valid frontmatter
- ✅ Consistent formatting throughout
- ✅ Zero broken links
- ✅ Complete code examples
- ✅ Proper component usage
- ✅ WCAG 2.1 AA compliance

## 🔄 Maintenance

### When to Update

- **Style guide evolves** → Update STYLEGUIDE.md, then sync to rules/prompts
- **New patterns emerge** → Add to markdown-quick-reference.md
- **Prompts improve** → Refine based on usage experience
- **Team feedback** → Incorporate into standards

### Update Process

1. Update authoritative source (STYLEGUIDE.md)
2. Sync changes to automated rules (markdown.mdc)
3. Update prompts to reflect new patterns
4. Update quick reference with new examples
5. Test with sample conversions

## 🆘 Troubleshooting

### Formatting Issues
→ Check STYLEGUIDE.md for specific rules
→ Verify auto-rules are applying (`.cursor/rules/`)
→ Use markdown-quick-reference.md for patterns

### Conversion Problems
→ Review convert-to-markdown.md prompt
→ Ensure source content is complete
→ Check quality checklist after conversion

### Component Issues
→ Consult component-architecture.mdc
→ Reference Starlight documentation
→ Check existing usage in codebase

## 🔗 External Resources

- **CouchCMS Docs:** https://docs.couchcms.com/
- **Astro Docs:** https://docs.astro.build/
- **Starlight Docs:** https://starlight.astro.build/
- **MDX Docs:** https://mdxjs.com/

## 📞 Getting Help

1. **Check this index** for quick navigation
2. **Consult QUICKSTART.md** for common tasks
3. **Review README.md** for comprehensive guide
4. **Reference STYLEGUIDE.md** for definitive rules
5. **Use prompts** for AI assistance

---

**Everything you need for consistent, high-quality CouchCMS documentation.**

