# CouchCMS Documentation Prompts

This directory contains specialized prompts for working with CouchCMS documentation.

## Available Prompts

### 📝 convert-to-markdown.md
**Primary conversion prompt for creating new documentation**

Use this comprehensive prompt when you need to:
- Convert existing content to markdown format
- Create new documentation pages from scratch
- Ensure compliance with CouchCMS style guide
- Structure complex documentation with proper formatting

**How to use:**
1. Read the prompt file
2. Provide your source content (text, HTML, or notes)
3. The AI will convert it to properly formatted markdown

**Example:**
```
Using @convert-to-markdown.md, convert the following content about
editable regions to a proper documentation page:

[Your content here]
```

### 🔍 markdown-quick-reference.md
**Quick lookup guide for common formatting patterns**

Use this when you need to:
- Quickly check formatting syntax
- Reference common patterns
- Verify specific elements
- Get formatting examples

**How to use:**
Simply reference it when you need a quick reminder:
```
@markdown-quick-reference.md How do I format a tag reference?
```

## Workflow Recommendations

### Creating New Documentation

1. **Start with the full prompt:**
   ```
   @convert-to-markdown.md Please convert this content about
   [topic] into a documentation page
   ```

2. **Review and refine:**
   Check the output against the quality checklist

3. **Quick fixes:**
   ```
   @markdown-quick-reference.md How should I format this [element]?
   ```

### Converting Existing Content

1. **Provide context:**
   ```
   @convert-to-markdown.md I need to convert this HTML page to markdown
   for the CouchCMS docs. The content is about [topic].

   [Paste HTML or text here]
   ```

2. **The AI will:**
   - Create proper frontmatter
   - Format all text elements correctly
   - Preserve code examples
   - Add appropriate admonitions
   - Structure with proper headings
   - Add document ending

### Quick Formatting Checks

```
@markdown-quick-reference.md Show me the correct way to:
- Reference a CMS tag
- Format a code block
- Create an admonition
```

## Style Guide Integration

Both prompts are derived from and strictly follow:
- **[STYLEGUIDE.md](../STYLEGUIDE.md)** - Complete CouchCMS documentation style guide
- **[markdown.mdc](../.cursor/rules/markdown.mdc)** - Automated formatting rules (auto-applied)
- **[content-structure.mdc](../.cursor/rules/content-structure.mdc)** - Content organization
- **[component-architecture.mdc](../.cursor/rules/component-architecture.mdc)** - Component usage

**Tip:** The [markdown.mdc](../.cursor/rules/markdown.mdc) file contains the authoritative, complete formatting rules and is automatically applied to all `.md` and `.mdx` files

## Common Use Cases

### 1. New Concept Documentation

```
@convert-to-markdown.md Create documentation for the concept of
"Custom Routes" in CouchCMS. Include:
- Basic introduction
- Usage examples
- Common patterns
- Related documentation links
```

### 2. Tag Reference Page

```
@convert-to-markdown.md Create a tag reference page for the
<cms:pages> tag. Include parameters, examples, and common use cases.
```

### 3. Tutorial Conversion

```
@convert-to-markdown.md Convert this tutorial into proper markdown
format following the CouchCMS style guide:

[Paste tutorial content]
```

### 4. Quick Format Fix

```
@markdown-quick-reference.md I need to know:
1. How to format code blocks with filenames
2. How to link to other documentation pages
3. How to create a proper document ending
```

## Tips for Best Results

### Be Specific
❌ "Convert this to markdown"
✅ "@convert-to-markdown.md Convert this HTML content about editable regions"

### Provide Context
Include information about:
- What the content is about
- Where it fits in the documentation structure
- Any specific requirements

### Use Both Prompts
- Use `convert-to-markdown.md` for comprehensive conversions
- Use `markdown-quick-reference.md` for quick lookups and syntax checks

### Review Output
Always review the generated markdown for:
- Accurate frontmatter
- Proper technical term formatting
- Correct links with trailing slashes
- Appropriate admonition usage

## Examples

### Example 1: Converting Tutorial Content

```
@convert-to-markdown.md

I need to convert this tutorial content about creating a blog in
CouchCMS. It should be part of the tutorials/portfolio-site section
and should be ordered as step 3.

Content:
[paste content here]
```

### Example 2: Quick Syntax Check

```
@markdown-quick-reference.md

How do I properly format:
1. A reference to the cms:editable tag
2. A filename like config.php
3. A UI element name like "Save Changes" button
```

### Example 3: Creating from Scratch

```
@convert-to-markdown.md

Create a new documentation page about "Databound Forms" in the
concepts section. Include:
- Overview of what databound forms are
- Basic setup example
- Common use cases
- Related tags (form, editable, etc.)
- Links to relevant tutorials
```

## Quality Assurance

All generated documentation should pass this checklist:
- ✅ Valid frontmatter with proper metadata
- ✅ Correct heading hierarchy (no skipped levels)
- ✅ Technical terms in backticks
- ✅ UI elements in bold
- ✅ Proper tag and documentation references
- ✅ Code blocks with descriptive titles
- ✅ Appropriate admonitions
- ✅ Document ending with horizontal rule
- ✅ Next chapter link (if applicable)

## Updating These Prompts

When the style guide changes:
1. Update `STYLEGUIDE.md`
2. Update `.cursor/rules/markdown.mdc`
3. Update these prompts to reflect changes
4. Test with sample conversions

## Questions or Issues?

If you encounter:
- Formatting inconsistencies
- Missing style rules
- Unclear instructions

Update the relevant files:
- `STYLEGUIDE.md` for comprehensive rules
- `.cursor/rules/*.mdc` for automated enforcement
- These prompt files for AI-assisted conversion

