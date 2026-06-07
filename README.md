# Lead Leak Report

Phase: **Build 2 — Firecrawl-Ready Site Reading**

This is still a Vite/React prototype, not a Next.js app.

## What Build 2 includes

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
- **Firecrawl-first homepage reading when `FIRECRAWL_API_KEY` is available.**
- Basic fetch fallback if Firecrawl is not configured or temporarily fails.
- Rule-based category scoring:
  - Call Readiness
  - 5-Second Service Clarity
  - Trust Proof
  - Request Path
  - Local Visibility
  - Freshness
- Evidence-based preview findings.
- Paid-report recommendation logic:
  - Recommended
  - Manual review recommended
  - Paid report not recommended yet
- Foundational local SEO preview section.
- “Send This to Your Web Person” checklist preview.
- Fallback preview if the live site cannot be read.

## What this build does not include yet

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

Recommended for Build 2:

```txt
FIRECRAWL_API_KEY=your_firecrawl_api_key
```

Optional fallback name also supported:

```txt
FIRECRAWL_API_TOKEN=your_firecrawl_api_key
```

If no Firecrawl key is set, the app still runs using the basic homepage fetch from Build 1B.

## SQL migration

None required for Build 2.

## Local commands

```bash
pnpm install
pnpm check
pnpm build
pnpm dev
```

## Recommended next build

**Build 3 — Screenshot + Mobile First-Screen Checks**

Recommended scope:

- Add a screenshot/mobile-render check.
- Check whether phone/CTA/trust proof appear in the first screen.
- Detect broken-looking images where practical.
- Keep Stripe/PDF/AI out until the preview analyzer feels reliable.
