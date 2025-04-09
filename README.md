# CouchCMS Documentation

This repository contains the official documentation for CouchCMS, a user-friendly and flexible Content Management System.

The documentation is built with [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/), providing a modern, fast, and user-friendly documentation experience.

## Project Structure

The documentation is built with Astro + Starlight and has the following structure:

```
.
├── public/          # Static files like images
├── src/
│   ├── assets/     # Documentation images and media
│   ├── content/    # Markdown/MDX documentation files
│   │   ├── docs/   # Main documentation
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

The documentation consists of `.mdx` files in the `src/content/docs/` directory. Each file is converted to a route based on its filename.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets like favicons can be placed in the `public/` directory.

## Commands

All commands are run from the root of the project:

| Command                | Action                                     |
| :--------------------- | :----------------------------------------- |
| `pnpm install`         | Install dependencies                       |
| `pnpm dev`             | Start local dev server at `localhost:4321` |
| `pnpm build`           | Build production site to `./dist/`         |
| `pnpm preview`         | Preview build locally, before deploying    |
| `pnpm astro ...`       | Run CLI commands like `astro add`          |
| `pnpm astro -- --help` | Get help using the Astro CLI               |

## Contributing to Documentation

### Getting Started

1. Fork this repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/CouchCMS-Documentation.git`
3. Install dependencies: `pnpm install`
4. Start the dev server: `pnpm dev`
5. Visit `http://localhost:4321` to preview the documentation

### Making Changes

- All documentation files are in `src/content/docs/`
- Files are written in MDX format (Markdown + JSX)
- Images should be placed in `src/assets/img/`
- Follow the [Starlight Markdown guidelines](https://starlight.astro.build/guides/authoring-content/) for formatting

### Style Guidelines

- Use clear, concise language
- Include code examples where relevant
- Add screenshots for UI-related features
- Keep paragraphs short and focused
- Use proper heading hierarchy
- Include alt text for images

### Submitting Changes

1. Make your changes
2. Test locally with `pnpm dev`
3. Commit your changes: `git commit -m "Description of changes"`
4. Push to your fork: `git push origin gh-pages`
5. Open a Pull Request from your fork to the `gh-pages` branch of the main repository

### Need Help?

- Check the [Starlight documentation](https://starlight.astro.build)
- Visit the [CouchCMS Forum](https://www.couchcms.com/forum/)
- Open an issue in this repository

## Useful Links

### Project Links
- [CouchCMS Website](https://www.couchcms.com)
- [CouchCMS Forum](https://www.couchcms.com/forum/)
- [CouchCMS GitHub](https://github.com/CouchCMS/Couch)

### Technology
- [Astro Documentation](https://docs.astro.build)
- [Starlight Documentation](https://starlight.astro.build)
- [Starlight on GitHub](https://github.com/withastro/starlight)
