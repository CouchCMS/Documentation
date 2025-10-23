# Quick Start - CouchCMS Documentation AI Toolkit

Get started with AI-assisted documentation in 30 seconds.

## 🚀 Most Common Tasks

### Convert Content to Markdown

```markdown
@.cursor/prompts/convert-to-markdown.md

Convert this content about [topic]:

[Paste your HTML, text, or notes here]
```

### Create New Documentation Page

```markdown
@.cursor/prompts/convert-to-markdown.md

Create a new documentation page about [topic] in the [section] section.

Include:
- Introduction
- Basic usage
- Examples
- Related links
```

### Check Formatting Syntax

```markdown
@.cursor/prompts/markdown-quick-reference.md

How do I format:
1. A CMS tag reference?
2. A code block with filename?
3. An admonition?
```

## 📝 Essential Patterns

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
// Code here
?>
```
````

### Admonition
```markdown
:::tip[Best Practice]
Use descriptive names for editable regions.
:::
```

## ✅ Quality Checklist

Before saving, verify:
- [ ] Frontmatter is complete
- [ ] Headings follow hierarchy (no skipped levels)
- [ ] Technical terms in backticks
- [ ] UI elements in bold
- [ ] Links have trailing slashes
- [ ] Code blocks have titles

## 🔗 Full Documentation

For complete information, see:
- **[Complete AI Toolkit README](.cursor/README.md)** - Full guide
- **[STYLEGUIDE.md](../STYLEGUIDE.md)** - Complete formatting rules
- **[Prompt README](.cursor/prompts/README.md)** - Detailed prompt usage

---

**That's it!** The automated rules in `.cursor/rules/` handle most formatting automatically. Focus on content quality and let the AI toolkit maintain consistency.

