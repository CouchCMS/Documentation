# CouchCMS Documentation Standards
# Single Source of Truth for All AI Configurations

## Project Configuration

```yaml
project:
  name: CouchCMS Documentation
  type: documentation
  description: Official CouchCMS documentation built with Astro and Starlight

platform:
  framework: Astro
  theme: Starlight
  content_format: MDX

languages:
  primary: markdown
  supported: [mdx, typescript, css]

standards:
  indentation: 4 spaces
  language: English only
  line_length: 80 characters (content), 120 characters (code)
  accessibility: WCAG 2.1 AA
```

## Core Principles

1. **Single Source of Truth**: STYLEGUIDE.md is the authoritative reference
2. **Consistency First**: All documentation follows identical patterns
3. **Accessibility**: WCAG 2.1 AA compliance is mandatory
4. **Semantic Structure**: Proper heading hierarchy and HTML5
5. **English Only**: All content, code, and comments must be in English

## Documentation Standards

### Frontmatter Requirements

Every MDX file must start with valid frontmatter:

```yaml
---
title: [50-60 characters, include main keyword]
description: "[150-160 characters]"
keywords: [keyword1, keyword2, keyword3]
category: [main category]
author: [Author Name]
lastUpdated: YYYY-MM-DD
sidebar:
  order: [number]
---
```

### Text Formatting Rules

#### Product Names
- Regular text: "Couch"
- Formal/titles: "CouchCMS"
- Never bold product names (except headers)

#### Technical Terms (use backticks)
- File names: `config.php`, `.htaccess`
- Variables: `my_variable`
- Parameters: `type='text'`
- Code snippets: `echo $value`
- Boolean values: `true`, `false`

#### UI Elements (use bold)
- Page names: **About Us**
- Sections: **Portfolio**
- Buttons: **Save Changes**
- Use Title Case without hyphens

#### Tag References (bold + lowercase + link)
```markdown
[**editable**](../../tags-reference/core/editable/)
```

#### Documentation Links (bold + Title Case + link)
```markdown
[**Working with Templates**](../../concepts/templates/)
```

### Code Block Standards

#### With Filename
````markdown
```php title="config.php"
<?php
// Configuration code
?>
```
````

#### URL Examples
````markdown
```txt title="Default URL"
https://example.com/page.php
```
````

#### Diff Blocks
````markdown
```diff title="Changes"
- old line
+ new line
  unchanged line
```
````

### Link Requirements

- Internal links: ALWAYS use trailing slashes
- Meaningful link text (no "click here")
- Relative paths for internal content
- Context in link titles where helpful

### Component Usage

#### Steps Component
```markdown
import { Steps } from "@astrojs/starlight/components";

<Steps>

1. First step
2. Second step

</Steps>
```

#### Card Component
```markdown
<Card icon="download" title="Download">

Content here

</Card>
```

#### FileTree Component (NO backticks!)
```markdown
<FileTree>
- src/
  - content/
    - docs/
</FileTree>
```

### Image Handling

#### For MDX Files
```mdx
import { Image } from "astro:assets";
import img1 from "./img/example.png";

<Image src={img1} alt="Description" />

> Caption directly below
```

#### For MD Files
```markdown
![Description](./img/example.png)

> Caption directly below
```

### Admonition Types

```markdown
:::note[Context]
Background information
:::

:::tip[Best Practice]
Recommended approach
:::

:::caution[Important]
Limitations or version requirements
:::

:::danger[Warning]
Critical warnings
:::

:::version[v2.0+]
Version-specific information
:::
```

## Quality Standards

All documentation must meet:

### Structure
- ✅ Valid frontmatter with SEO metadata
- ✅ Proper heading hierarchy (H1→H2→H3, no skipping)
- ✅ Clear introduction paragraph
- ✅ Logical content flow
- ✅ Document ending with `---`
- ✅ Next chapter links where applicable

### Formatting
- ✅ Technical terms in backticks
- ✅ UI elements in bold
- ✅ Tag references formatted correctly
- ✅ Links with trailing slashes
- ✅ Code blocks with titles
- ✅ Proper component syntax

### Code Examples
- ✅ Complete, working examples
- ✅ Proper syntax highlighting
- ✅ Descriptive titles
- ✅ Helpful comments
- ✅ No placeholders or omissions

### Accessibility
- ✅ Semantic HTML5
- ✅ WCAG 2.1 AA compliance
- ✅ Descriptive link text
- ✅ Image alt text
- ✅ Proper heading hierarchy

## AI Configuration

### Automated Rules
Files in `.cursor/rules/` are automatically applied:
- `markdown.mdc` - Complete formatting rules
- `content-structure.mdc` - Content organization
- `component-architecture.mdc` - Component patterns

### Manual Prompts
Files in `.cursor/prompts/` are used explicitly:
- `convert-to-markdown.md` - Content conversion
- `markdown-quick-reference.md` - Quick syntax lookup

## Technology Stack

### Primary Technologies
- **Astro**: Static site generator
- **Starlight**: Documentation theme
- **MDX**: Markdown + JSX components
- **TypeScript**: Type-safe configuration
- **PNPM**: Package management

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Astro DevTools**: Development utilities

## File Organization

```
src/
├── content/
│   └── docs/           # All documentation content
│       ├── concepts/   # Conceptual documentation
│       ├── tutorials/  # Step-by-step guides
│       ├── tags-reference/  # Tag documentation
│       └── getting-started/ # Getting started guides
├── assets/
│   └── img/           # Image assets
└── components/        # Custom Astro components
```

## Development Workflow

1. **Create/Edit Content**
   - Use `.cursor/prompts/convert-to-markdown.md` for scaffolding
   - Write in MDX format
   - Follow style guide standards

2. **Automated Quality**
   - `.cursor/rules/` files enforce formatting
   - Focus on content accuracy
   - Trust automation for consistency

3. **Review & Verify**
   - Check frontmatter completeness
   - Verify code examples work
   - Test all links
   - Validate component usage

4. **Build & Deploy**
   - Run `pnpm build` to compile
   - Test with `pnpm preview`
   - Deploy to GitHub Pages

## Common Patterns

### Introducing a CMS Tag
```markdown
The [**editable**](../../tags-reference/core/editable/) tag creates editable regions.

## Basic Usage

```php title="example.php"
<cms:editable name='content' type='text' />
```

:::tip[Best Practice]
Use descriptive names for editable regions.
:::
```

### Cross-Referencing
```markdown
For more information, see [**Working with Templates**](../../concepts/templates/).
```

### Version-Specific Features
```markdown
:::version[v2.0+]
This feature requires CouchCMS v2.0 or higher.
:::
```

## Error Prevention

### Never Do
- ❌ Use Dutch or any language other than English
- ❌ Skip frontmatter
- ❌ Use incorrect heading hierarchy
- ❌ Omit code block titles
- ❌ Forget trailing slashes in links
- ❌ Use backticks in FileTree component
- ❌ Modify code examples without reason

### Always Do
- ✅ Include complete frontmatter
- ✅ Use proper heading hierarchy
- ✅ Add descriptive code block titles
- ✅ Use trailing slashes in internal links
- ✅ Format tag references correctly
- ✅ Include image alt text
- ✅ Add helpful admonitions

## Spelling Corrections

Common mistakes to fix:

| Incorrect   | Correct      |
|-------------|--------------|
| neccessary  | necessary    |
| additionaly | additionally |
| permenantly | permanently  |
| seperate    | separate     |
| occured     | occurred     |

## AI Agent Behavior

When generating documentation:

1. **Always Start With Structure**
   - Create valid frontmatter first
   - Plan heading hierarchy
   - Identify sections and subsections

2. **Focus on Clarity**
   - Write for beginners but include advanced details
   - Use examples generously
   - Add admonitions for important information

3. **Maintain Consistency**
   - Follow established patterns
   - Use correct terminology
   - Apply formatting rules strictly

4. **Preserve Quality**
   - Include complete code examples
   - Verify all links work
   - Ensure accessibility compliance
   - Test component usage

## Version Information

- Documentation Version: 2.0
- Style Guide Version: 1.0
- Last Updated: 2025-01-23
- Maintained By: CouchCMS Documentation Team

---

**This file is the single source of truth for all AI configurations. Changes here automatically propagate to all AI editor configurations via `pnpm run sync`.**

