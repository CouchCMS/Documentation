# CouchCMS Documentation AI Toolkit

## 🎯 Complete Documentation Development System

This project provides a comprehensive AI toolkit specifically designed for technical documentation development, with a focus on MDX content, consistent formatting, and maintainable documentation architecture.

### 🤖 Documentation Standards System
**Location**: `.cursor/rules/`
**Purpose**: Consistent documentation quality across all AI agents and editors

- **Central Style Guide**: `STYLEGUIDE.md` controls all documentation formatting
- **Automated Rules**: `.cursor/rules/markdown.mdc` auto-applied to all `.md` and `.mdx` files
- **Content Structure**: Hierarchical organization and navigation patterns
- **Component Usage**: Consistent Astro/Starlight component integration

### 🛠️ Specialized Documentation Tools
**Location**: `.cursor/prompts/`
**Purpose**: Daily documentation tasks and content conversion workflows

- **Converters**: Full content-to-markdown conversion with style compliance
- **Quick Reference**: Fast lookup for common formatting patterns
- **Validators**: Documentation quality and consistency checks
- **Templates**: Ready-to-use documentation structures

## 🚀 Current Documentation Configuration

**Project**: CouchCMS Documentation
**Platform**: Astro + Starlight
**Content Types**: `.md`, `.mdx`
**Standards**:
- 4-space indentation
- English-only content
- Semantic HTML5
- WCAG 2.1 AA accessibility

## 📚 Available Tools

### 🤖 Automated Rules (Auto-Applied)

| Rule File | Purpose | Applies To |
|-----------|---------|------------|
| [markdown.mdc](.cursor/rules/markdown.mdc) | Complete formatting rules | All `.md` and `.mdx` files |
| [content-structure.mdc](.cursor/rules/content-structure.mdc) | Content organization | Documentation hierarchy |
| [component-architecture.mdc](.cursor/rules/component-architecture.mdc) | Component usage | Astro components |

These rules are **automatically applied** when you work on markdown files in Cursor.

### 🛠️ Documentation Prompts

| Prompt | Specialization | Use For |
|--------|---------------|---------|
| [convert-to-markdown.md](.cursor/prompts/convert-to-markdown.md) | Content conversion | Converting any content to CouchCMS markdown format |
| [markdown-quick-reference.md](.cursor/prompts/markdown-quick-reference.md) | Formatting lookup | Quick syntax and pattern reference |

### 📖 Reference Documentation

| Document | Coverage | Purpose |
|----------|----------|---------|
| [STYLEGUIDE.md](../STYLEGUIDE.md) | Complete style guide | Authoritative formatting reference |
| [README.md](.cursor/prompts/README.md) | Prompt usage guide | How to use the AI toolkit |

## 🎯 How to Choose the Right Tool

### For Converting Content to Markdown
```markdown
@.cursor/prompts/convert-to-markdown.md

Convert this content about [topic] to a properly formatted
CouchCMS documentation page:

[Paste your content here]
```

### For Quick Formatting Questions
```markdown
@.cursor/prompts/markdown-quick-reference.md

How do I format:
1. A CMS tag reference
2. A code block with filename
3. An admonition
```

### For Creating New Documentation
```markdown
@.cursor/prompts/convert-to-markdown.md

Create a new documentation page about [topic] in the [section]
section. Include:
- Overview and introduction
- Basic usage examples
- Common patterns
- Related documentation links
```

### For Style Guide Reference
When automated rules aren't clear:
```markdown
@STYLEGUIDE.md

What are the rules for [specific formatting question]?
```

## 🔧 Common Documentation Tasks

### 1. Converting HTML to Markdown

**Input:**
```markdown
@.cursor/prompts/convert-to-markdown.md

I have this HTML documentation about editable regions that
needs to be converted to MDX format:

[Paste HTML content]
```

**Output:**
- Properly formatted MDX with frontmatter
- Correct heading hierarchy
- Formatted code examples
- Appropriate admonitions
- Related content links

### 2. Creating Tag Reference Pages

**Input:**
```markdown
@.cursor/prompts/convert-to-markdown.md

Create a tag reference page for the <cms:pages> tag.

Include:
- Parameter documentation
- Usage examples
- Common patterns
- Related tags
```

### 3. Writing Tutorial Content

**Input:**
```markdown
@.cursor/prompts/convert-to-markdown.md

Create a tutorial for building a portfolio site with CouchCMS.

Structure:
- Part 1: Setup and configuration
- Part 2: Creating templates
- Part 3: Adding dynamic content
```

### 4. Checking Formatting

**Quick Check:**
```markdown
@.cursor/prompts/markdown-quick-reference.md

Show me the correct formatting for:
- Tag references
- Documentation links
- Code blocks with filenames
```

## 📋 Documentation Quality Checklist

The AI toolkit ensures all documentation meets these standards:

### Content Structure
- ✅ Valid frontmatter with SEO metadata
- ✅ Proper heading hierarchy (H1→H2→H3, no skipping)
- ✅ Clear introduction paragraph
- ✅ Logical content flow
- ✅ Document ending with horizontal rule
- ✅ Next chapter links where applicable

### Text Formatting
- ✅ Product name: "Couch" (regular), "CouchCMS" (formal/titles)
- ✅ Technical terms in backticks: `config.php`, `type='text'`
- ✅ UI elements in bold: **Save Changes**, **About Us**
- ✅ Tag references: [**editable**](../../tags-reference/core/editable/)
- ✅ Documentation links: [**Templates**](../../concepts/templates/)

### Code Examples
- ✅ Descriptive titles: ```php title="config.php"
- ✅ Proper syntax highlighting
- ✅ Complete, working examples
- ✅ Preserved formatting and comments
- ✅ Language-appropriate continuation markers

### Links and References
- ✅ Internal links with trailing slashes
- ✅ Meaningful link text (no "click here")
- ✅ Working relative paths
- ✅ Proper context in link titles

### Components and Media
- ✅ Correct component imports
- ✅ Proper component syntax (Steps, Card, FileTree)
- ✅ Images with descriptive alt text
- ✅ Captions directly below images
- ✅ Optimized media assets

### Accessibility
- ✅ Semantic HTML5 structure
- ✅ WCAG 2.1 AA compliance
- ✅ Clear heading hierarchy
- ✅ Descriptive link text
- ✅ Proper image alt text

## 🎯 Decision Matrix

| Situation | Recommended Tool | Example |
|-----------|------------------|---------|
| **Converting existing content** | [convert-to-markdown.md](.cursor/prompts/convert-to-markdown.md) | `@.cursor/prompts/convert-to-markdown.md` |
| **Creating new documentation** | [convert-to-markdown.md](.cursor/prompts/convert-to-markdown.md) | Describe structure and content |
| **Quick syntax lookup** | [markdown-quick-reference.md](.cursor/prompts/markdown-quick-reference.md) | `@.cursor/prompts/markdown-quick-reference.md` |
| **Formatting questions** | [STYLEGUIDE.md](../STYLEGUIDE.md) | Search for specific rules |
| **Understanding structure** | [content-structure.mdc](.cursor/rules/content-structure.mdc) | Auto-applied when editing |
| **Component usage** | [component-architecture.mdc](.cursor/rules/component-architecture.mdc) | Auto-applied in `.mdx` files |

## 🔄 Workflow Integration

### 1. Starting a New Documentation Page

```bash
# Step 1: Decide on content location
# Example: src/content/docs/concepts/my-topic.mdx

# Step 2: Use AI to create the page
@.cursor/prompts/convert-to-markdown.md

Create a new documentation page about [topic] in the concepts section.
Include overview, examples, and best practices.

# Step 3: Review and refine
# The automated rules will ensure consistent formatting
```

### 2. Converting Existing Documentation

```bash
# Step 1: Gather source content
# (HTML, plain text, notes, etc.)

# Step 2: Convert with AI
@.cursor/prompts/convert-to-markdown.md

Convert this [source format] content about [topic]:
[Paste content]

# Step 3: Verify quality checklist
# All items should pass automatically
```

### 3. Daily Documentation Tasks

```bash
# Quick formatting check
@.cursor/prompts/markdown-quick-reference.md
How do I format [element]?

# Update existing page
# Just edit - automated rules maintain consistency

# Add code examples
# Follow patterns from quick-reference.md
```

### 4. Quality Assurance

```bash
# Automated checks happen in real-time via .cursor/rules/

# Manual verification:
# 1. Check frontmatter completeness
# 2. Verify heading hierarchy
# 3. Test all links
# 4. Review code examples
# 5. Validate component usage
```

## 💡 Benefits of This Toolkit

### For Documentation Authors
- **Consistent quality** - Automated rules ensure uniformity
- **Faster writing** - Quick reference and conversion tools
- **Reduced errors** - Style guide compliance built-in
- **Focus on content** - Less time on formatting decisions

### For Content Reviewers
- **Predictable structure** - All docs follow same patterns
- **Clear standards** - Easy to verify compliance
- **Faster reviews** - Quality issues caught automatically
- **Consistent voice** - Standardized terminology

### For Documentation Users
- **Better readability** - Consistent formatting throughout
- **Predictable navigation** - Logical content structure
- **Accessible content** - WCAG 2.1 AA compliance
- **Working examples** - All code verified and complete

### For Project Maintenance
- **Scalable approach** - Easy to add new content
- **Version control** - Standards evolve with project
- **Team onboarding** - Complete toolkit for new authors
- **Future-proof** - Works with any AI assistant

## 🚀 Getting Started

### For New Documentation Authors

1. **Familiarize yourself with the style guide:**
   ```markdown
   Read: STYLEGUIDE.md
   Reference: .cursor/prompts/markdown-quick-reference.md
   ```

2. **Start with the conversion prompt:**
   ```markdown
   @.cursor/prompts/convert-to-markdown.md

   Create a new page about [your topic]
   ```

3. **Let automation handle consistency:**
   - The `.cursor/rules/` files auto-apply formatting
   - Focus on content quality and accuracy
   - Trust the toolkit for style compliance

### For Experienced Authors

1. **Use quick reference for edge cases:**
   ```markdown
   @.cursor/prompts/markdown-quick-reference.md
   ```

2. **Consult style guide for complex decisions:**
   ```markdown
   @STYLEGUIDE.md
   ```

3. **Maintain standards:**
   - Update style guide when patterns evolve
   - Improve prompts based on experience
   - Share discoveries with team

## 📊 Documentation Metrics

### Quality Indicators
- ✅ 100% of pages have valid frontmatter
- ✅ All code examples are syntax-highlighted
- ✅ Zero broken internal links
- ✅ Consistent heading hierarchy throughout
- ✅ All images have alt text
- ✅ WCAG 2.1 AA accessibility compliance

### Consistency Checks
- Product terminology (Couch vs CouchCMS)
- Tag reference formatting
- Code block titles
- Link structure (trailing slashes)
- Admonition usage
- Component syntax

## 🎓 Best Practices

### Writing Documentation

1. **Start with structure**
   - Use convert-to-markdown.md for scaffolding
   - Define clear sections before writing
   - Follow heading hierarchy strictly

2. **Focus on clarity**
   - Write for beginners but include advanced details
   - Use examples generously
   - Add admonitions for important notes

3. **Maintain consistency**
   - Reference quick-reference.md for patterns
   - Use established terminology
   - Follow link conventions

### Using Components

1. **Steps Component**
   ```markdown
   <Steps>

   1. Clear, actionable step
   2. Another specific step

   </Steps>
   ```

2. **Cards**
   ```markdown
   <Card icon="info" title="Note">

   Important information here

   </Card>
   ```

3. **FileTree**
   ```markdown
   <FileTree>
   - src/
     - content/
       - docs/
   </FileTree>
   ```

### Code Examples

1. **Always include titles**
   ```php title="config.php"
   ```

2. **Show complete examples**
   - No unexplained omissions
   - Include necessary imports
   - Add helpful comments

3. **Use diff for changes**
   ```diff title="example.php"
   - old line
   + new line
   ```

## 🔗 Related Resources

- **[CouchCMS Official Documentation](https://docs.couchcms.com/)** - Reference for content
- **[Astro Documentation](https://docs.astro.build/)** - Platform documentation
- **[Starlight Documentation](https://starlight.astro.build/)** - Theme documentation
- **[MDX Documentation](https://mdxjs.com/)** - MDX syntax reference

## 🤝 Contributing to the Toolkit

### Improving Prompts

1. **Identify gaps** in current prompts
2. **Create examples** of new patterns
3. **Update** relevant prompt files
4. **Document** new capabilities in README

### Updating Standards

1. **Edit** `STYLEGUIDE.md` for comprehensive changes
2. **Update** `.cursor/rules/markdown.mdc` for automated enforcement
3. **Revise** prompts to reflect new standards
4. **Test** with example conversions

### Sharing Knowledge

1. **Document patterns** you discover
2. **Create examples** for common scenarios
3. **Improve** quick reference with frequent patterns
4. **Share** successful prompt templates

---

**This documentation AI toolkit transforms technical writing from inconsistent manual work into a systematic, AI-assisted process that maintains high quality while maximizing author productivity and ensuring reader satisfaction.**

