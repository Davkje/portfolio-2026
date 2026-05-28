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
--main-1: #b12424  (red — primary)
--main-2: #dcf3de  (cream — foreground/light)
--main-3: #18191c  (dark — background)
```

These map to Tailwind via `@theme inline` as `--color-background` and `--color-foreground`.

Fonts:

- `Geist` — body
- `Geist Mono` — monospace/CV details
- `Jomolhari` — display/decorative (loaded from Google Fonts in layout)

## Project data

All content lives in `src/data/portfolio.json`. This is the single source of truth for:

- **`personal`** — name, role, bio, about (who/what/where), location
- **`contact`** — email, phone, LinkedIn, GitHub
- **`skills`** — `code[]`, `toolbox[]`, `practices[]`, `upcoming[]`
- **`projects[]`** — `id`, `title`, `description`, `tags[]`, `liveUrl`, `githubUrl`, `featured`, `img`, `altImg`, `videoUrl`, `year`, `bg` (hex), `accent` (hex)
- **`education[]`** — school, degree, location, startYear, endYear, current
- **`experience[]`** — role, company, startYear, endYear, description

`ProjectCarousel.tsx` imports `portfolioData.projects` and casts to `Project[]` (type exported from `ProjectSlide.tsx`). The `PROJECTS` array in `page.tsx` is legacy/unused (from `ProjectCard` which is no longer rendered).

## Code conventions

- Components go in `src/components/`, pages in `src/app/`
- Client components get `"use client"` at top
- Use `next/image` for all images with `fill` + `object-cover` for full-bleed
- Inline `style` for dynamic/per-project colors (bg, accent); Tailwind classes for layout/spacing
- `forwardRef` pattern used in `ProjectSlide` — follow it for any scroll-tracked components
- Swedish comments are fine, keep them if present

## What's placeholder / needs real content

- `papercut` project description in `portfolio.json` — currently just "Papercut"
- Footer — just renders "Footer"
- `page.tsx` PROJECTS array + `ProjectCard.tsx` — unused, can be cleaned up
