# Lead Leak Report — Build 5

This build is the current Next.js App Router version of Lead Leak Report.

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
- Analyzer API at `/app/api/analyze/route.ts`
- Firecrawl homepage/screenshot support
- AI Visibility Readiness score
- Lead Leak preview score
- AI-assisted full report draft section
- Rule-based full report draft fallback when OpenAI is not configured
- `robots.txt`, `sitemap.xml`, and `llms.txt` in `/public`

## Build 5 additions

Build 5 adds a full-report-style draft to the preview page.

When `OPENAI_API_KEY` is configured, `/api/analyze` uses OpenAI to draft:

- Executive Summary
- AI Visibility Summary
- Lead Leak Summary
- Local SEO Summary
- Top Recommendations
- Copy/Paste Fixes
- Google Business Profile Freshness Ideas
- 7-Day Fix Plan
- Web-Person Checklist

When `OPENAI_API_KEY` is not configured or the OpenAI call fails, the app uses a rule-based fallback draft so the preview still works.

## Vercel settings

Framework Preset: Next.js
Install Command: `pnpm install --no-frozen-lockfile`
Build Command: `pnpm build`
Output Directory: leave blank

## Environment variables

Required for best site reading:

`FIRECRAWL_API_KEY=your_firecrawl_api_key`

Fallback supported:

`FIRECRAWL_API_TOKEN=your_firecrawl_api_key`

Optional for AI-assisted full report drafting:

`OPENAI_API_KEY=your_openai_api_key`

Optional model override:

`OPENAI_MODEL=gpt-4o-mini`

## SQL migration needed

No.

## Notes

This build does not add Stripe, PDFs, accounts, report storage, or share links yet. The full report draft is visible in the preview so the language and usefulness can be tested before adding payment gating.
