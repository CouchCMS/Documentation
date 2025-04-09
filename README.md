# CouchCMS Documentation

This repository contains the official documentation for CouchCMS, a user-friendly and flexible Content Management System.

## 🚀 Project Structure

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

## 🧞 Commands

All commands are run from the root of the project:

| Command                | Action                                     |
| :--------------------- | :----------------------------------------- |
| `pnpm install`         | Install dependencies                       |
| `pnpm dev`             | Start local dev server at `localhost:4321` |
| `pnpm build`           | Build production site to `./dist/`         |
| `pnpm preview`         | Preview build locally, before deploying    |
| `pnpm astro ...`       | Run CLI commands like `astro add`          |
| `pnpm astro -- --help` | Get help using the Astro CLI               |

## 📚 Contributing to Documentation

1. Fork this repository
2. Create a new branch for your changes
3. Add or modify documentation
4. Test locally with `pnpm dev`
5. Commit your changes
6. Open a Pull Request

## 🔗 Useful Links

- [CouchCMS Website](https://www.couchcms.com)
- [CouchCMS Forum](https://www.couchcms.com/forum/)
- [CouchCMS GitHub](https://github.com/CouchCMS/Couch)
