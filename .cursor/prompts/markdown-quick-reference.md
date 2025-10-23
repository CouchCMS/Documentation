# CouchCMS Markdown Quick Reference

Quick lookup for common formatting patterns in CouchCMS documentation.

**Reference:** All rules are defined in [markdown.mdc](../.cursor/rules/markdown.mdc) and [STYLEGUIDE.md](../STYLEGUIDE.md)

## Frontmatter (Always Required)

```yaml
---
title: Your Title Here
description: "Clear description between 150-160 characters"
keywords:
    - keyword1
    - keyword2
    - keyword3
category: concepts
subCategory: templates
author: Your Name
lastUpdated: 2025-01-23
sidebar:
    order: 1
---
```

## Text Formatting Cheatsheet

| Element | Format | Example |
| :------ | :----- | :------ |
| Product (regular) | Plain text | Couch provides many features |
| Product (formal) | Plain text | Welcome to CouchCMS Documentation |
| File name | Backticks | `config.php`, `.htaccess` |
| Variable | Backticks | `my_variable` |
| Parameter | Backticks | `type`, `name` |
| Boolean | Backticks | `true`, `false` |
| UI Element | Bold | **Save Changes**, **About Us** |
| Page Name | Bold | **Portfolio** page |
| Tag Reference | Bold + lowercase + link | [**editable**](../../tags-reference/core/editable/) |
| Doc Reference | Bold + Title Case + link | [**Variables in Views**](../../concepts/variables-in-views/) |
| Output Value | Italic | _Rental_ |
| Emphasis | Italic | _important_ |

## Code Blocks

### With filename
```php title="config.php"
<?php
// Code here
```

### URLs
```txt title="Default URL"
https://example.com/page.php?id=1
```

### Diff
```diff title="Changes"
- old line
+ new line
  unchanged
```

### Partial code
```php
// ... existing code ...
<cms:editable name='title' type='text' />
// ... existing code ...
```

## Links

```markdown
✅ Internal (with trailing slash)
[Link Text](../folder/)

❌ Internal (without trailing slash)
[Link Text](../folder)

✅ With description
[User Guide](../guide/ "Complete user guide")

✅ Tag reference
[**editable**](../../tags-reference/core/editable/)

✅ Doc reference
[**Templates**](../../concepts/templates/)
```

## Admonitions

```markdown
:::note[Context]
Background info
:::

:::tip[Best Practice]
Recommended approach
:::

:::caution[Important]
Limitation or version requirement
:::

:::danger[Warning]
Critical warning
:::

:::version[v2.0+]
Feature version info
:::
```

## Components

### Steps
```markdown
import { Steps } from "@astrojs/starlight/components";

<Steps>

1. First step
2. Second step

</Steps>
```

### Card
```markdown
<Card icon="download" title="Download">

Content here

</Card>
```

### FileTree (no backticks!)
```markdown
<FileTree>
- couch/
- css/
- index.php
</FileTree>
```

## Images

### MDX files
```mdx
import { Image } from "astro:assets";
import img1 from "./img/example.png";

<Image src={img1} alt="Description" />

> Caption here
```

### MD files
```markdown
![Description](./img/example.png)

> Caption here
```

## Lists

```markdown
- Unordered list
    - Nested item (4 spaces)
        - Sub-nested (8 spaces)

1. Ordered list
    - Can mix with unordered
2. Second item
```

## Tables

```markdown
| Left | Center | Right |
| :--- | :----: | ----: |
| A    |   B    |     C |
```

## Document Structure

```markdown
---
[frontmatter]
---

[imports if needed]

Brief introduction paragraph

## Main Section

Content here

### Subsection

More content

## Another Section

Content

---

[Next Chapter: **Title**](../next/)
```

## Spacing Rules

- 2 blank lines between H2 sections
- 1 blank line between H3/H4 sections
- 1 blank line before/after code blocks
- 1 blank line before/after admonitions
- 1 blank line before/after lists
- 4 spaces for indentation (never tabs)

## Common Patterns

### Introducing a CMS tag
```markdown
The [**editable**](../../tags-reference/core/editable/) tag creates editable regions in your templates.

## Basic Usage

```php title="example.php"
<cms:editable name='content' type='text' />
```

:::tip[Best Practice]
Use descriptive names for your editable regions.
:::
```

### Cross-referencing
```markdown
For more information about templates, see [**Working with Templates**](../../concepts/templates/).
```

### Version-specific feature
```markdown
:::version[v2.0+]
This feature requires CouchCMS v2.0 or higher.
:::
```

### Code with explanation
```markdown
Add the following to your template:

```php title="blog.php"
<cms:template title='Blog' clonable='1' />
```

This defines a clonable template for blog posts.
```

## Quick Validation

Before saving, check:
- ✅ Frontmatter present and valid
- ✅ No skipped heading levels (H1→H2→H3, not H1→H3)
- ✅ Technical terms in backticks
- ✅ UI elements in bold
- ✅ Links have trailing slashes
- ✅ Code blocks have titles
- ✅ Document ends with `---`

