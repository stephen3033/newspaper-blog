# Headless Newspaper Stack

A static blog with a classic newspaper aesthetic, featuring SPA-like navigation via HTMX. Built with Bun, Eleventy, Tailwind CSS, and HTMX.

## Tech Stack

### Bun

Bun serves as both the JavaScript runtime and package manager for this project.

**Why Bun over npm/yarn/pnpm:**
- **Speed**: Bun's native bundler and transpiler (written in Zig) make installs and scripts significantly faster than Node.js-based tools
- **Native ES modules**: First-class support for ESM without configuration
- **All-in-one**: Replaces Node, npm, and bundler with a single tool
- **Simplicity**: One toolchain reduces complexity for a static site that doesn't need Node's ecosystem depth

### Eleventy (11ty)

Eleventy is the static site generator powering content compilation and templating.

**Why Eleventy over Next.js, Astro, or Hugo:**
- **Zero-client JS**: Eleventy outputs pure HTML by default—no hydration, no client bundle, no JavaScript unless you add it. Perfect for a content-focused blog.
- **Template agnostic**: Supports Nunjucks, Liquid, Handlebars, Markdown, and more. Pick what fits your mental model.
- **Minimal configuration**: No framework lock-in, no build-step complexity. It stays out of your way.
- **Flexible data cascade**: Content, frontmatter, directory-level data, and global data merge intuitively.
- **Not React-bound**: Unlike Next.js, Eleventy doesn't assume you're building a React app. For a newspaper-style blog, that's the right default.

Astro offers similar benefits but adds component islands complexity. Hugo is faster but requires learning Go templates. Eleventy hits the sweet spot of JavaScript-native simplicity with zero framework overhead.

### Tailwind CSS

Tailwind provides utility-first styling with the typography plugin for prose content.

**Why Tailwind over CSS-in-JS or traditional CSS:**
- **Design consistency**: Utility classes enforce a cohesive design system via the configured theme
- **Typography plugin**: `@tailwindcss/typography` provides drop-in prose styling (`prose`, `prose-serif`) that would require significant custom CSS otherwise
- **Production builds**: Purges unused CSS automatically, resulting in small stylesheets
- **Newspaper aesthetic**: Quick to iterate on columnar layouts, typography scale, and spacing without context-switching to separate CSS files

For a blog where visual design matters but isn't the primary focus, Tailwind's velocity advantage outweighs the learning curve.

### HTMX

HTMX enables SPA-like navigation without a client-side router or framework.

**Why HTMX over React Router, Vue Router, or Astro View Transitions:**
- **No build complexity**: HTMX is a 14KB script dropped in via CDN. No bundler config, no router setup, no state management.
- **HATEOAS-aligned**: Navigation requests return HTML fragments, not JSON. The server controls available actions, keeping the architecture RESTful.
- **Progressive enhancement**: Works without JavaScript (falls back to standard anchor links). The site remains functional even if HTMX fails to load.
- **Minimal footprint**: Compared to React + React Router (often 50KB+ gzipped), HTMX adds almost nothing to bundle size.
- **Simplicity for static sites**: For a blog where "pages" are just HTML files, HTMX provides the SPA feel without SPA architecture complexity

The HTMX pattern used here:
```html
<a href="/blog/" hx-get="/blog/" hx-push-url="/blog/" hx-target="main" hx-select="main" hx-swap="innerHTML">
  Blog
</a>
```
- `hx-get`: Fetch HTML from the server
- `hx-push-url`: Update browser URL
- `hx-target`/`hx-select`: Extract the `<main>` element from response
- `hx-swap`: Replace current `<main>` content

### Nunjucks

Nunjucks is the templating language for layouts and includes.

**Why Nunjucks over Liquid, Handlebars, or EJS:**
- **Template inheritance**: `{% extends "base.njk" %}` and `{% block %}` provide clean layout composition
- **Includes**: `{% include %}` for reusable partials
- **Eleventy-native**: First-class support in Eleventy with no extra configuration
- **Expressive**: Filters, macros, and control flow without the verbosity of Handlebars or the limitations of Liquid

## Key Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies (Eleventy, Tailwind, typography plugin) and build scripts |
| `eleventy.config.js` | Collections config (`blog`, `songs`), passthrough for assets, BrowserSync CSS watching |
| `tailwind.config.js` | Content paths for purge, typography plugin, dark mode disabled |
| `src/_includes/base.njk` | Main layout: HTML shell, HTMX script, navigation with HTMX attributes, active state management |

## Getting Started

```bash
# Install dependencies
bun install

# Development server with hot reload
bun run start

# Production build
bun run build

# Build CSS only
bun run build:css
```

## Features

- **SPA navigation**: HTMX-powered page transitions without full reloads; URL updates and browser history work normally
- **Collections**: `collections.blog` and `collections.songs` for content organization, sorted by date (newest first)
- **Newspaper typography**: Serif fonts, justified text, multi-column layouts via Tailwind's prose utilities
- **Responsive design**: Mobile-first with breakpoints for larger screens
- **Zero client-side framework**: No React, Vue, or client router. Just HTML and a 14KB HTMX script.