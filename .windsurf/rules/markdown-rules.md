---
trigger: always_on
---

# CouchCMS Documentation Style Guide (Simplified)

This style guide outlines the essential rules for writing CouchCMS documentation, focusing on consistency, readability, maintainability, and accessibility.

## 1. Document Structure

### 1.1. Frontmatter

Each document **must** start with frontmatter:

```yaml
title: Document Title
description: "Short, clear description"
keywords:
    - keyword1
    - keyword2
    - keyword3
category: tag
subCategory: editable
author: First Last
lastUpdated: YYYY-MM-DD
sidebar:
    order: N
    badge:
        text: New|Beta|Deprecated
        variant: tip|caution|danger
```

**SEO Tips:**

* **Title:** 50-60 characters, main keyword included
* **Description:** 150-160 characters, clear and descriptive
* **Keywords:** 3-5 relevant terms

### 1.2. Layout

Documents should follow this order:

1. Frontmatter
2. Import statements (if needed)
3. Introduction
4. Main content
5. Related links
6. Horizontal rule (`---`)
7. Next chapter link (if applicable)

## 2. Formatting Guidelines

### 2.1. Text Styles

* **CouchCMS** for formal references, **Couch** in regular text
* **UI Elements:** Bold (e.g., **Save Changes**)
* **Code Elements:** Inline code style (e.g., `K_PRETTY_URLS`, `<cms:template>`, `config.php`)
* **Tags:** Bold and lowercase (e.g., [**editable**](../../tags-reference/core/editable/))

### 2.2. Quotes

* **Double quotes** for frontmatter, link titles, and Markdown attributes
* **Single quotes** in code examples (e.g., `<cms:template title='Home'>`)

### 2.3. Code Examples

* Use descriptive titles (e.g., `php title="config.php"`)
* Preserve exact content for diff blocks
* Use appropriate syntax highlighting
* Maintain original line breaks and indentation

## 3. Media and Links

### 3.1. Images

* Use **Astro** `<Image />` component in `.mdx`
* Use classic Markdown syntax in `.md`
* Include alt text and optional captions

### 3.2. Links

* Use relative paths for internal links
* Always use trailing slashes in markdown links
* Never use trailing slashes in frontmatter slugs or sidebar config

## 4. Quality and Accessibility

* Consistent spacing
* Clear image descriptions
* Valid, meaningful links
* Accessible content structure
* Proper heading hierarchy (no skipped levels)

## 5. Code Preservation

* Never modify code unless instructed
* Maintain exact formatting and spacing
* Use language-appropriate markers for partial code (e.g., `// ... existing code ...` for PHP)

## 6. Common Corrections

| Incorrect   | Correct      |
| :---------- | :----------- |
| neccessary  | necessary    |
| additionaly | additionally |
| permenantly | permanently  |
| seperate    | separate     |
