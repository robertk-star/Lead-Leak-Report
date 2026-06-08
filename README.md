# Lead Leak Report — Next.js Conversion Build

This build converts the prior Vite prototype into a Next.js App Router project.

## Current status

- Next.js App Router foundation
- Public static/SSR-compatible routes for SEO and AI discovery
- Industry landing pages:
  - `/roofers`
  - `/plumbers`
  - `/electricians`
  - `/hvac`
  - `/landscapers`
  - `/home-services`
- Content pages:
  - `/ai-visibility`
  - `/how-it-works`
  - `/sample-report`
  - `/pricing`
  - `/faq`
- Analyzer API moved to `/app/api/analyze/route.ts`
- Firecrawl support preserved
- `robots.txt`, `sitemap.xml`, and `llms.txt` preserved in `/public`

## Vercel settings

Framework Preset: Next.js
Install Command: `pnpm install`
Build Command: `pnpm build`
Output Directory: leave blank

## Environment variables

`FIRECRAWL_API_KEY=your_firecrawl_api_key`

Fallback supported:

`FIRECRAWL_API_TOKEN=your_firecrawl_api_key`

## SQL migration needed

No.

## Notes

This build does not add Stripe, PDFs, accounts, or a database yet.
