# Lead Leak Report

Phase: **Build 1B — Improved Multi-Niche Free Preview**

This is still a Vite/React prototype, not a Next.js app.

## What Build 1B includes

- Multi-niche landing page foundation.
- Business type selector.
- Industry landing pages:
  - `/roofers`
  - `/plumbers`
  - `/electricians`
  - `/hvac`
  - `/landscapers`
  - `/home-services`
- Preview page at `/preview`.
- Serverless analyzer route at `/api/analyze`.
- Basic rule-based homepage fetch and scan.
- Improved category scoring:
  - Call Readiness
  - 5-Second Service Clarity
  - Trust Proof
  - Request Path
  - Local Visibility
  - Freshness
- Stronger preview findings with evidence language.
- Paid-report recommendation logic:
  - Recommended
  - Manual review recommended
  - Paid report not recommended yet
- Foundational local SEO preview section.
- “Send This to Your Web Person” checklist preview.
- Fallback preview if the live site cannot be read.

## What this build does not include yet

- Firecrawl.
- Screenshot or mobile rendering checks.
- AI-generated full reports.
- Stripe payment.
- PDF generation.
- Supabase/database storage.
- Email delivery.
- User accounts.

## Vercel settings

Use these settings in Vercel:

```txt
Framework Preset: Vite
Root Directory: repo root where package.json is
Install Command: pnpm install
Build Command: pnpm build
Output Directory: dist/public
```

Do not use Next.js for this version.

## Environment variables

None required for Build 1B.

## SQL migration

None required for Build 1B.

## Local commands

```bash
pnpm install
pnpm check
pnpm build
pnpm dev
```

## Recommended next build

**Build 2 — Firecrawl + Better Site Reading**

Recommended scope:

- Add Firecrawl API key.
- Use Firecrawl for more reliable full-homepage scrape.
- Improve fallback handling for blocked sites.
- Add basic screenshot/mobile-first-screen check if practical.
- Keep Stripe/PDF/AI out until the preview analyzer feels reliable.
