# CouchCMS Documentation

This repository contains the official documentation for CouchCMS, a user-friendly and flexible Content Management System.

The documentation is built with [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/), providing a modern, fast, and user-friendly documentation experience.

## Project Structure

```
.
├── public/                         # Static files (favicons, robots.txt, etc.)
├── src/
│   ├── assets/                     # Images and media
│   │   ├── content/                # Markdown/MDX documentation files
│   │   │   ├── docs/               # Main documentation (MDX)
│   │   │   └── content.config.ts   # Configuration file for the documentation
│   │   └── img/                    # Image assets
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
```

- Documentation lives in `src/content/docs/` as `.mdx` files (Markdown + JSX).
- Images and media go in `src/assets/img/` and its subfolders.
- Static assets (not processed by Astro) go in `public/`.

---

## Getting Started

1. **Fork** this repository.
2. **Clone** your fork:
    ```sh
    git clone https://github.com/YOUR_USERNAME/CouchCMS-Documentation.git
    ```
3. **Install dependencies:**
    ```sh
    pnpm install
    ```
4. **Start the dev server:**
    ```sh
    pnpm dev
    ```
5. **Preview:**
   Visit [http://localhost:4321](http://localhost:4321) in your browser.

---

## Working with Documentation

- All docs are written in MDX (`.mdx` files in `src/content/docs/`).
- **Follow the [CouchCMS Documentation Style Guide](./STYLEGUIDE.md) for all formatting, code, and content rules.**
- Use clear, concise language and proper heading hierarchy.
- Add code examples and screenshots where relevant.
- Always include descriptive alt text for images and a caption if relevant.

---

## Image Usage in MDX

- **Never use classic Markdown image syntax in `.mdx` files.**
- Always use the Astro `<Image />` component.
- Place images in the correct subfolder under `src/assets/img/` (see style guide).
- The import path for images depends on the location of your MDX file relative to the asset. Adjust the path as needed.
- Captions must always be placed directly below the image using a `>` blockquote, as specified in the style guide.
- Example:

    ```js
    import { Image } from "astro:assets";
    import loginImg from "../assets/img/contents/login.png";
    // Adjust the path above depending on your MDX file location
    ```

    ```mdx
    <Image src={loginImg} alt="Login screen" />
    > Login screen of the application
    ```

---

## Making Changes

1. Create a new feature branch:
    ```sh
    git checkout -b my-feature
    ```
2. Make your changes and test locally (`pnpm dev`).
3. Commit your changes:
    ```sh
    git commit -m "Describe your changes"
    ```
4. Push your branch:
    ```sh
    git push origin my-feature
    ```
5. Open a Pull Request to the `gh-pages` branch.

---

## Useful Commands

| Command                | Action                                     |
| :--------------------- | :----------------------------------------- |
| `pnpm install`         | Install dependencies                       |
| `pnpm dev`             | Start local dev server at `localhost:4321` |
| `pnpm build`           | Build production site to `./dist/`         |
| `pnpm preview`         | Preview build locally before deploying     |
| `pnpm astro ...`       | Run Astro CLI commands                     |
| `pnpm astro -- --help` | Get help using the Astro CLI               |

---

## 🤖 AI-Assisted Documentation

This project includes a complete AI toolkit for documentation development:

**Quick Start:**
```markdown
@.cursor/prompts/convert-to-markdown.md
Convert this content to documentation format: [your content]
```

**Documentation:**
- **[AI-TOOLKIT.md](./AI-TOOLKIT.md)** - Main entry point and overview
- **[QUICKSTART.md](.cursor/QUICKSTART.md)** - 30-second reference guide
- **[Complete Guide](.cursor/README.md)** - Full toolkit documentation
- **[STYLEGUIDE.md](./STYLEGUIDE.md)** - Complete formatting rules

The AI toolkit provides:
- ✅ Automated formatting rules (applied automatically in Cursor)
- ✅ Content conversion prompts (HTML → Markdown)
- ✅ Quick reference guides for common patterns
- ✅ Quality assurance checklists
- ✅ Consistent documentation standards

See [AI-TOOLKIT.md](./AI-TOOLKIT.md) for complete details.

---

## Resources

- [CouchCMS Website](https://www.couchcms.com)
- [CouchCMS Forum](https://www.couchcms.com/forum/)
- [CouchCMS GitHub](https://github.com/CouchCMS/Couch)
- [Astro Documentation](https://docs.astro.build)
- [Starlight Documentation](https://starlight.astro.build)

---

## Need Help?

### Documentation & AI Toolkit
- 🎯 **[SYSTEM-OVERVIEW.md](./SYSTEM-OVERVIEW.md)** - Complete system architecture
- 🤖 **[AI-TOOLKIT.md](./AI-TOOLKIT.md)** - Main AI toolkit guide
- 📖 **[STYLEGUIDE.md](./STYLEGUIDE.md)** - Complete style guide
- ⚡ **[QUICKSTART.md](.cursor/QUICKSTART.md)** - 30-second quick start
- 🔧 **[Scripts Documentation](./scripts/README.md)** - Sync & validation tools

### CouchCMS Resources
- [CouchCMS Website](https://www.couchcms.com)
- [CouchCMS Forum](https://www.couchcms.com/forum/)
- [Starlight Authoring Guide](https://starlight.astro.build/guides/authoring-content/)

### Get Started
```bash
# All AI tools are configured automatically!
pnpm install

# Start writing documentation
pnpm dev

# Validate your work
pnpm run validate
```
