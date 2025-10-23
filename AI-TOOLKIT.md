# 🤖 CouchCMS Documentation AI Toolkit

Complete AI-assisted documentation development system for creating consistent, high-quality technical documentation.

## 🚀 Quick Start (30 Seconds)

### Convert Any Content to Markdown

```markdown
@.cursor/prompts/convert-to-markdown.md

Convert this content about editable regions:

[Paste your HTML, text, or notes]
```

### Create New Documentation

```markdown
@.cursor/prompts/convert-to-markdown.md

Create a new page about [topic] in the [section] section
```

### Check Formatting

```markdown
@.cursor/prompts/markdown-quick-reference.md

How do I format [element]?
```

---

## 📚 Documentation Structure

```
CouchCMS-Documentation/
│
├── AI-TOOLKIT.md              # ← You are here - Main entry point
├── STYLEGUIDE.md             # Complete formatting rules
│
└── .cursor/                   # AI toolkit directory
    ├── README.md             # Complete toolkit guide
    ├── QUICKSTART.md         # 30-second reference
    ├── INDEX.md              # Complete file overview
    │
    ├── rules/                # Auto-applied rules
    │   ├── markdown.mdc      # Formatting (auto-applied)
    │   ├── content-structure.mdc
    │   └── component-architecture.mdc
    │
    └── prompts/              # AI assistance
        ├── README.md
        ├── convert-to-markdown.md
        └── markdown-quick-reference.md
```

## 🎯 Choose Your Path

| I want to... | Go to... |
|--------------|----------|
| **Start immediately** | [QUICKSTART.md](.cursor/QUICKSTART.md) |
| **Understand the system** | [README.md](.cursor/README.md) |
| **Find a specific tool** | [INDEX.md](.cursor/INDEX.md) |
| **Reference formatting rules** | [STYLEGUIDE.md](STYLEGUIDE.md) |
| **Convert content** | [convert-to-markdown.md](.cursor/prompts/convert-to-markdown.md) |
| **Look up syntax** | [markdown-quick-reference.md](.cursor/prompts/markdown-quick-reference.md) |

## 🤖 How It Works

### 0. Single Source of Truth (Master Configuration)
**[DOCS-STANDARDS.md](DOCS-STANDARDS.md)** - Master configuration file

All AI editor configurations are automatically generated from this file:
```bash
# Update all AI tools from single source
pnpm run sync

# Validate documentation compliance
pnpm run validate

# Both sync and validate
pnpm run ai:update
```

💡 **The sync happens automatically** on `pnpm install` - all AI tools are instantly configured!

### 1. Automated Rules (Passive)
Located in `.cursor/rules/` - these automatically apply when you edit files:

- **[markdown.mdc](.cursor/rules/markdown.mdc)** - Complete formatting rules
- **[content-structure.mdc](.cursor/rules/content-structure.mdc)** - Content organization
- **[component-architecture.mdc](.cursor/rules/component-architecture.mdc)** - Component patterns

💡 **You don't need to do anything** - these work automatically!

### 2. AI Prompts (Active)
Located in `.cursor/prompts/` - use these explicitly when needed:

- **[convert-to-markdown.md](.cursor/prompts/convert-to-markdown.md)** - Convert any content
- **[markdown-quick-reference.md](.cursor/prompts/markdown-quick-reference.md)** - Quick syntax lookup

💡 **Reference these with `@` in your prompts**

### 3. Documentation (Reference)
- **[STYLEGUIDE.md](STYLEGUIDE.md)** - Complete authoritative rules
- **[README.md](.cursor/README.md)** - Full toolkit documentation
- **[Prompts README](.cursor/prompts/README.md)** - Detailed usage guide

## 📖 Common Use Cases

### Converting Existing Documentation

```markdown
@.cursor/prompts/convert-to-markdown.md

I have this HTML documentation about editable regions:

<html>
<h1>Editable Regions</h1>
<p>Content here...</p>
</html>
```

**Result:** Properly formatted MDX with:
- Valid frontmatter
- Correct heading hierarchy
- Formatted code examples
- Appropriate admonitions
- Related content links

### Creating Tag Reference

```markdown
@.cursor/prompts/convert-to-markdown.md

Create a tag reference page for <cms:pages>.

Include:
- Parameter documentation
- Usage examples
- Common patterns
- Related tags
```

### Tutorial Development

```markdown
@.cursor/prompts/convert-to-markdown.md

Create a tutorial for building a portfolio site.

Structure:
- Part 1: Setup
- Part 2: Templates
- Part 3: Content
```

### Quick Syntax Check

```markdown
@.cursor/prompts/markdown-quick-reference.md

Show me:
1. How to format tag references
2. How to create code blocks with filenames
3. How to add admonitions
```

## ✨ Key Features

### 🎯 Consistency
- All documentation follows the same patterns
- Automated rules enforce standards
- No manual formatting decisions needed
- **Single command updates all AI tools**: `pnpm run sync`

### ⚡ Speed
- Convert content in seconds
- Quick reference for common patterns
- Focus on content, not formatting
- **Auto-configuration on install** - zero setup time

### 📚 Quality
- SEO-optimized frontmatter
- WCAG 2.1 AA accessibility
- Complete, working code examples
- Proper link structure
- **Automated validation**: `pnpm run validate`

### 🔄 Maintainability
- **Single source of truth**: DOCS-STANDARDS.md
- **One-command sync**: Updates all AI editors instantly
- Easy to update standards
- Scalable for large documentation sets
- Version-controlled AI configurations

## 🎓 Learning Path

### For New Authors

1. **Read:** [QUICKSTART.md](.cursor/QUICKSTART.md) (5 minutes)
2. **Try:** Convert a simple piece of content
3. **Reference:** [markdown-quick-reference.md](.cursor/prompts/markdown-quick-reference.md) when needed
4. **Trust:** Let auto-rules handle formatting

### For Experienced Authors

1. **Skim:** [README.md](.cursor/README.md) for workflow options
2. **Use:** [convert-to-markdown.md](.cursor/prompts/convert-to-markdown.md) for scaffolding
3. **Consult:** [STYLEGUIDE.md](STYLEGUIDE.md) for edge cases
4. **Contribute:** Improve prompts based on experience

## 📊 Quality Standards

All documentation generated by this toolkit meets:

✅ **Content Structure**
- Valid frontmatter with SEO metadata
- Proper heading hierarchy
- Clear introduction and flow
- Document endings with next links

✅ **Text Formatting**
- Correct product terminology
- Technical terms in backticks
- UI elements in bold
- Proper tag and doc references

✅ **Code Examples**
- Descriptive titles
- Proper syntax highlighting
- Complete, working examples
- Preserved formatting

✅ **Accessibility**
- Semantic HTML5
- WCAG 2.1 AA compliance
- Descriptive links
- Image alt text

## 🔧 Essential Patterns

### Tag Reference
```markdown
[**editable**](../../tags-reference/core/editable/)
```

### Documentation Link
```markdown
[**Working with Templates**](../../concepts/templates/)
```

### Code Block
````markdown
```php title="config.php"
<?php
// Configuration code
?>
```
````

### Admonition
```markdown
:::tip[Best Practice]
Always use descriptive names for editable regions.
:::
```

## 🚦 Decision Matrix

| Task | Use | Effort |
|------|-----|--------|
| Convert HTML to markdown | [convert-to-markdown.md](.cursor/prompts/convert-to-markdown.md) | 30 sec |
| Create new doc page | [convert-to-markdown.md](.cursor/prompts/convert-to-markdown.md) | 1 min |
| Check syntax | [markdown-quick-reference.md](.cursor/prompts/markdown-quick-reference.md) | 10 sec |
| Edit existing page | Just edit (auto-rules apply) | Instant |
| Complex formatting question | [STYLEGUIDE.md](STYLEGUIDE.md) | 2 min |

## 💡 Pro Tips

1. **Trust the automation**
   - Auto-rules handle 90% of formatting
   - Focus on content accuracy
   - Let the system maintain consistency

2. **Use prompts strategically**
   - Scaffolding: convert-to-markdown.md
   - Quick lookups: markdown-quick-reference.md
   - Deep dives: STYLEGUIDE.md

3. **Review but don't overthink**
   - Check frontmatter completeness
   - Verify code examples work
   - Trust formatting is correct

## 📈 Benefits

### For You
- **Faster writing** - No formatting decisions
- **Higher quality** - Consistent standards
- **Less stress** - System handles details
- **More focus** - Concentrate on content

### For Readers
- **Better experience** - Consistent structure
- **Easier learning** - Predictable patterns
- **Working examples** - Verified code
- **Accessible** - WCAG 2.1 AA compliance

### For The Project
- **Scalable** - Easy to add content
- **Maintainable** - Single source of truth
- **Professional** - Enterprise quality
- **Future-proof** - Works with any AI

## 🎬 Get Started Now

1. **Choose your task** from the decision matrix above
2. **Use the recommended tool** with `@` reference
3. **Let automation handle the rest**
4. **Focus on creating great content**

---

**Everything you need for consistent, high-quality CouchCMS documentation - powered by AI, guided by standards, optimized for humans.**

---

## 🔧 System Management

### Update AI Configurations
```bash
# Edit the master configuration
vim DOCS-STANDARDS.md

# Sync to all AI tools (Cursor, Claude, Copilot, etc.)
pnpm run sync

# Validate documentation compliance
pnpm run validate

# Do both: sync and validate
pnpm run ai:update
```

### Supported AI Tools
The sync system generates configurations for:
- ✅ Cursor AI (`.cursorrules`)
- ✅ Claude AI (`CLAUDE.md`)
- ✅ Windsurf AI (`.windsurfrules`)
- ✅ GitHub Copilot (`.github/copilot-instructions.md`)
- ✅ VS Code (`.vscode/settings.json`)
- ✅ Tabnine (`.tabnine/settings.json`)
- ✅ Amazon CodeWhisperer (`.codewhisperer/settings.json`)
- ✅ Universal EditorConfig (`.editorconfig`)

**All from one file: DOCS-STANDARDS.md** 🎯

## 📞 Quick Reference

- **Stuck?** → [QUICKSTART.md](.cursor/QUICKSTART.md)
- **Need overview?** → [INDEX.md](.cursor/INDEX.md)
- **Want details?** → [README.md](.cursor/README.md)
- **Formatting rules?** → [STYLEGUIDE.md](STYLEGUIDE.md)
- **Master config?** → [DOCS-STANDARDS.md](DOCS-STANDARDS.md)
- **Sync AI tools?** → `pnpm run sync`
- **Validate docs?** → `pnpm run validate`
- **Convert content?** → `@.cursor/prompts/convert-to-markdown.md`
- **Check syntax?** → `@.cursor/prompts/markdown-quick-reference.md`

