// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
    site: "https://docs.couchcms.com",
    base: "/",
    outDir: "./dist",
    trailingSlash: "always",
    build: {
        format: "directory",
    },
    integrations: [
        starlight({
            plugins: [
                starlightLinksValidator({
                    errorOnRelativeLinks: false,
                }),
            ],
            title: "CouchCMS Documentation",
            customCss: ["./src/assets/styles/custom.css"],
            logo: {
                light: "./src/assets/img/couchcms-primary-logo-black-gradient.svg",
                dark: "./src/assets/img/couchcms-primary-logo-white-gradient.svg",
                replacesTitle: true,
            },
            editLink: {
                baseUrl:
                    "https://github.com/CouchCMS/Documentation/edit/docs-v2/",
            },
            social: [
                {
                    icon: "github",
                    label: "GitHub",
                    href: "https://github.com/CouchCMS/Documentation/tree/docs-v2",
                },
            ],
            tableOfContents: {
                minHeadingLevel: 2,
                maxHeadingLevel: 5,
            },
            sidebar: [
                {
                    label: "Getting Started",
                    collapsed: true,
                    items: [
                        "getting-started/about-couch",
                        "getting-started/requirements",
                        "getting-started/installation",
                        "getting-started/upgrade",
                        "getting-started/localizing",
                        "getting-started/rebranding",
                        "getting-started/changelog",
                    ],
                },
                {
                    label: "Concepts",
                    collapsed: false,
                    autogenerate: { directory: "concepts" },
                },
                {
                    label: "Tags Reference",
                    collapsed: true,
                    // autogenerate: { directory: "tags-reference" },
                    items: [
                        {
                            label: "Core",
                            collapsed: true,
                            autogenerate: { directory: "tags-reference/core" },
                        },
                        {
                            label: "Sub-Templates",
                            collapsed: true,
                            badge: {
                                text: "New",
                                variant: "tip",
                            },
                            autogenerate: {
                                directory: "tags-reference/sub-templates",
                            },
                        },
                        {
                            label: "Template Inheritance",
                            collapsed: true,
                            badge: {
                                text: "New",
                                variant: "tip",
                            },
                            autogenerate: {
                                directory:
                                    "tags-reference/template-inheritance",
                            },
                        },
                        {
                            label: "Custom Routes",
                            collapsed: true,
                            badge: {
                                text: "New",
                                variant: "tip",
                            },
                            autogenerate: {
                                directory: "tags-reference/custom-routes",
                            },
                        },
                        {
                            label: "Extended Entities",
                            collapsed: true,
                            badge: {
                                text: "New",
                                variant: "tip",
                            },
                            autogenerate: {
                                directory: "tags-reference/extended-entities",
                            },
                        },
                    ],
                },
                {
                    label: "Add-Ons",
                    collapsed: true,
                    autogenerate: {
                        directory: "addons",
                    },
                },
                {
                    label: "Miscellaneous",
                    collapsed: true,
                    autogenerate: { directory: "miscellaneous" },
                },
                {
                    label: "Tutorials",
                    collapsed: true,
                    items: [
                        {
                            label: "Building a Real-World Site",
                            collapsed: true,
                            autogenerate: {
                                directory: "tutorials/portfolio-site",
                            },
                        },
                        // {
                        // 	label: 'Advanced Tutorial',
                        // 	autogenerate: { directory: 'tutorials/advanced-tutorial' }
                        // },
                        {
                            label: "Advanced Tutorial",
                            collapsed: true,
                            items: [
                                "tutorials/advanced-tutorial",
                                "tutorials/advanced-tutorial/installing-the-application",
                                {
                                    label: "Code Walkthrough",
                                    collapsed: true,
                                    items: [
                                        "tutorials/advanced-tutorial/code-walkthrough",
                                        {
                                            label: "Notes",
                                            collapsed: true,
                                            items: [
                                                "tutorials/advanced-tutorial/notes",
                                                "tutorials/advanced-tutorial/routes",
                                                "tutorials/advanced-tutorial/filters",
                                                "tutorials/advanced-tutorial/controller",
                                                {
                                                    label: "Views",
                                                    collapsed: true,
                                                    items: [
                                                        "tutorials/advanced-tutorial/views",
                                                        "tutorials/advanced-tutorial/list-view",
                                                        "tutorials/advanced-tutorial/page-view",
                                                        "tutorials/advanced-tutorial/create-view",
                                                        "tutorials/advanced-tutorial/create-view-with-pad",
                                                        "tutorials/advanced-tutorial/edit-view",
                                                        "tutorials/advanced-tutorial/delete-view",
                                                    ],
                                                },
                                            ],
                                        },
                                        "tutorials/advanced-tutorial/pads",
                                        "tutorials/advanced-tutorial/users",
                                    ],
                                },
                                "tutorials/advanced-tutorial/wrapping-up",
                                // 'tutorials/advanced-tutorial/tags-reference',
                            ],
                        },
                        {
                            label: "Building a Shopping Cart",
                            collapsed: true,
                            autogenerate: {
                                directory: "tutorials/shopping-cart",
                            },
                        },
                        {
                            label: "Page Builder",
                            collapsed: true,
                            autogenerate: {
                                directory: "tutorials/page-builder",
                            },
                        },
                        {
                            label: "Admin Panel",
                            collapsed: true,
                            autogenerate: {
                                directory: "tutorials/admin-panel",
                            },
                        },
                        {
                            label: "On-Page Editing",
                            link: "tutorials/on-page-editing",
                        },
                        {
                            label: "Building a Job Application Form",
                            link: "tutorials/job-application-form",
                        },
                    ],
                },
            ],
        }),
    ],
    // Add aliases for easier imports
    vite: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "@components": path.resolve(__dirname, "./src/components"),
                "@assets": path.resolve(__dirname, "./src/assets"),
                "@layouts": path.resolve(__dirname, "./src/layouts"),
                "@utils": path.resolve(__dirname, "./src/utils"),
                "@content": path.resolve(__dirname, "./src/content"),
            },
        },
    },
});
