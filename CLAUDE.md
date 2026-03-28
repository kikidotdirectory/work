# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server with hot reload
npm run istart     # Incremental dev server (faster rebuilds)
npm run build      # Production build → dist/
```

There are no lint or test commands — this is a static site project.

## Architecture

**Eleventy** static site generator. Input: `src/pages/`, output: `dist/`.

### Template engines
- Nunjucks (`.njk`) for most pages and layouts
- Base layouts: `src/_includes/layouts/base.njk` 

### CSS pipeline
CSS is compiled **before** Eleventy builds via `buildAllCss()` in `eleventy.config.mjs`. The pipeline is: `postcss-import-ext-glob` → `postcss-import` → `tailwindcss` → `autoprefixer`.

- `src/css/global/` — global styles (reset, variables, fonts, layout compositions, utilities)
- `src/css/local/` — page-specific CSS compiled separately
- `src/pages/<page>/<page>.css` — per-page styles, often inlined via Eleventy Bundles
- `src/_includes/css/global.css` — compiled global output (referenced by layouts)
- `dist/css/` — final CSS output

### Design tokens
JSON tokens in `src/design-tokens/` (colors, fonts, spacing, text sizes, viewports) drive both CSS custom properties and Tailwind config. `src/css-utils/clamp-generator.js` generates fluid `clamp()` values; `src/css-utils/tokens-to-tailwind.js` converts tokens to Tailwind theme. Tailwind is configured in `tailwind.config.cjs`.

### Data & content
`src/_data/` contains JS data files that generate content (e.g. `theChair.js` builds image path arrays). Pages use front matter for layout and metadata.

### Bundles (inline CSS/JS)
Pages use Eleventy Bundles to inline critical CSS directly into `<head>`. See `src/_includes/partials/head-stylesheet.vto` for how bundles are conditionally rendered.

### JavaScript
Client-side JS lives in `src/public/js/` and is passed through to `dist/` as-is. The carousel on "The Chair" page uses **Swiper** (`src/public/js/the-chair/carousel.js`).

### Eleventy config
`eleventy.config.mjs` — sets input/output dirs, registers plugins (RenderPlugin, VentoPlugin, Eleventy Bundles), runs CSS build, and configures passthrough copy for `src/assets/` and `src/public/`.
