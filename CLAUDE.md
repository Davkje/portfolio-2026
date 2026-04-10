@AGENTS.md

# Portfolio 2026 — Claude Guide

## What this project is
A personal web developer portfolio for David. High-polish, animation-heavy, dark aesthetic. Built to showcase real projects and link to CV/About.

## Tech stack
- **Next.js 16** (App Router) — check `node_modules/next/dist/docs/` for current API, don't assume old behavior
- **React 19** with React Compiler enabled (`reactCompiler: true` in next.config.ts)
- **Tailwind CSS v4** — uses `@import "tailwindcss"` and `@theme inline {}`, NOT the old `tailwind.config.js` approach
- **Framer Motion 12**
- **TypeScript** strict mode

## Design system
Three root color tokens (defined in `globals.css`):
```
--main-1: #b12424  (red — accent/danger/highlight)
--main-2: #dcf3de  (cream — foreground/light)
--main-3: #18191c  (dark — background)
```
These map to Tailwind via `@theme inline` as `--color-background` and `--color-foreground`.

Fonts:
- `Geist` — body
- `Geist Mono` — monospace/CV details
- `Jomolhari` — display/decorative (loaded from Google Fonts in layout)

## Project data
Projects live as inline arrays in `ProjectCarousel.tsx`. Each `Project` has `id`, `title`, `img`, `year`, `tags[]`, `bg` (hex), `accent` (hex). The `PROJECTS` array in `page.tsx` is legacy/unused (from `ProjectCard` which is no longer rendered).

## Code conventions
- Components go in `src/components/`, pages in `src/app/`
- Client components get `"use client"` at top
- Use `next/image` for all images with `fill` + `object-cover` for full-bleed
- Inline `style` for dynamic/per-project colors (bg, accent); Tailwind classes for layout/spacing
- `forwardRef` pattern used in `ProjectSlide` — follow it for any scroll-tracked components
- Swedish comments are fine, keep them if present

## What's placeholder / needs real content
- Project data in `ProjectCarousel.tsx` — fake project names and reused images
- CV page — placeholder employer names ("Företag X", "Byrå Y") and Swedish lorem
- About page — placeholder bio text
- Footer — just renders "Footer"
- `page.tsx` PROJECTS array + `ProjectCard.tsx` — unused, can be cleaned up
