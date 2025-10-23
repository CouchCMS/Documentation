# CouchCMS Documentation Standards
# Auto-generated from DOCS-STANDARDS.md

**Critical: Always follow these documentation standards.**

## Project Context

- **Project**: CouchCMS Documentation
- **Type**: Technical Documentation
- **Platform**: Astro + Starlight
- **Content Format**: MDX (Markdown + JSX)
- **Standards**: English-only, 4-space indentation, WCAG 2.1 AA

## Core Principles

1. **Single Source of Truth**: STYLEGUIDE.md is authoritative
2. **Consistency First**: All documentation follows identical patterns
3. **Accessibility**: WCAG 2.1 AA compliance mandatory
4. **English Only**: All content, code, and comments in English
5. **Semantic Structure**: Proper heading hierarchy and HTML5

## Essential Formatting Rules

### Frontmatter (Required)
Every MDX file must start with:
```yaml
---
title: [50-60 chars, include keyword]
description: "[150-160 chars]"
keywords: [keyword1, keyword2, keyword3]
category: [category]
author: [Author Name]
lastUpdated: YYYY-MM-DD
sidebar:
  order: [number]
---
```

### Text Formatting

**Product Names:**
- Regular: "Couch"
- Formal: "CouchCMS"
- Never bold (except headers)

**Technical Terms (backticks):**
- Files: `config.php`, `.htaccess`
- Variables: `my_variable`
- Code: `echo $value`
- Booleans: `true`, `false`

**UI Elements (bold):**
- Pages: **About Us**
- Buttons: **Save Changes**
- Use Title Case

**Tag References:**
```markdown
[**editable**](../../tags-reference/core/editable/)
```

**Documentation Links:**
```markdown
[**Working with Templates**](../../concepts/templates/)
```

### Code Blocks

Always include descriptive titles:
````markdown
```php title="config.php"
<?php
// Code here
?>
```
````

### Components

**Steps:**
```markdown
import { Steps } from "@astrojs/starlight/components";

<Steps>

1. First step
2. Second step

</Steps>
```

**Card:**
```markdown
<Card icon="info" title="Title">

Content

</Card>
```

**FileTree (NO backticks!):**
```markdown
<FileTree>
- src/
  - content/
</FileTree>
```

### Links

- Internal links: ALWAYS use trailing slashes
- Meaningful text (no "click here")
- Relative paths for internal content

### Admonitions

```markdown
:::note[Context]
Information
:::

:::tip[Best Practice]
Recommendation
:::

:::caution[Important]
Limitation
:::

:::danger[Warning]
Critical warning
:::
```

## Quality Checklist

Before finalizing documentation:
- ✅ Valid frontmatter with SEO metadata
- ✅ Proper heading hierarchy (no skipping)
- ✅ Technical terms in backticks
- ✅ UI elements in bold
- ✅ Links with trailing slashes
- ✅ Code blocks with titles
- ✅ Complete examples
- ✅ Image alt text
- ✅ WCAG 2.1 AA compliance

## AI Tools Available

### Automated (Auto-Applied)
- `.cursor/rules/markdown.mdc` - Formatting rules
- `.cursor/rules/content-structure.mdc` - Content organization
- `.cursor/rules/component-architecture.mdc` - Components

### Manual (Explicit Use)
- `@.cursor/prompts/convert-to-markdown.md` - Convert content
- `@.cursor/prompts/markdown-quick-reference.md` - Quick syntax

### Reference Documentation
- **AI-TOOLKIT.md** - Complete toolkit guide
- **STYLEGUIDE.md** - Full formatting rules
- **.cursor/README.md** - Detailed documentation

## Common Patterns

### Introducing CMS Tags
```markdown
The [**editable**](../../tags-reference/core/editable/) tag creates regions.

## Basic Usage

```php title="example.php"
<cms:editable name='content' type='text' />
```

:::tip[Best Practice]
Use descriptive names.
:::
```

### Cross-References
```markdown
See [**Working with Templates**](../../concepts/templates/).
```

### Version Info
```markdown
:::version[v2.0+]
Requires CouchCMS v2.0 or higher.
:::
```

## Error Prevention

**Never:**
- ❌ Use non-English language
- ❌ Skip frontmatter
- ❌ Incorrect heading hierarchy
- ❌ Omit code block titles
- ❌ Forget trailing slashes

**Always:**
- ✅ Complete frontmatter
- ✅ Proper heading hierarchy
- ✅ Descriptive code titles
- ✅ Trailing slashes in links
- ✅ Correct tag formatting

---

**For complete rules, see STYLEGUIDE.md**
**For conversion help, use @.cursor/prompts/convert-to-markdown.md**
**Generated from DOCS-STANDARDS.md - Last updated: 2025-10-23**
