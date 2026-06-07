# Lead Leak Report

Phase: **Build 1A — Multi-Niche Free Preview**

This is a Vite/React prototype for Lead Leak Report. It now supports multiple local service niches and a working free preview flow.

## What Build 1A includes

- Main landing page for local service businesses
- Niche landing pages:
  - `/roofers`
  - `/plumbers`
  - `/electricians`
  - `/hvac`
  - `/landscapers`
  - `/home-services`
- Business type selector on the lead check form
- Preview page at `/preview`
- Basic rule-based analyzer by industry
- Vercel serverless endpoint at `/api/analyze`
- Fallback preview if the live homepage fetch cannot read a site
- No payment, no database, no AI report generation, no PDF generation yet

## Build commands

```bash
pnpm install
pnpm check
pnpm build
```

## Vercel settings

This is a **Vite** app, not Next.js.

Use these Vercel settings:

- Framework Preset: `Vite`
- Root Directory: repo root where `package.json` is located
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Output Directory: `dist/public`

## Environment variables

None required for Build 1A.

## Notes

The current analyzer uses a basic server-side homepage fetch and rule checks. Some sites block fetch requests or render important content with JavaScript. When that happens, the preview page shows a clearly marked fallback result.

Recommended next build:

**Build 1B / 2 — Better analyzer reliability**

- Add Firecrawl for full-page scrape
- Add screenshot/mobile check
- Improve scoring evidence
- Save preview attempts later with Supabase

