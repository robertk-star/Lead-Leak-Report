# Lead Leak Report

Phase: **Build 3 — Firecrawl Screenshot + First-Screen Review**

This is still a Vite/React prototype, not a Next.js app.

Build 3 adds Firecrawl screenshot capture and first-screen review support. It still does not add payments, PDFs, databases, or AI. The goal is to make the preview easier to compare against what a real visitor sees above the fold before we start generating paid reports.

## What Build 3 includes

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
- Fixed form submission flow: the form runs `/api/analyze` before opening `/preview`.
- Analyzer results are stored in `sessionStorage` so `/preview` displays the real result instead of relying on query-string values.
- Direct visits to `/preview` now show a clean empty state instead of a fake fallback score.
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
- Fallback preview only after a real submitted site cannot be read.
- Stricter scoring guardrails so text-heavy pages do not score as elite unless they confirm real conversion basics.
- Better phone and click-to-call handling.
- Softer handling for sites that are decent but still missing first-screen trust proof.
- Stronger detection for weak trust proof, soft CTAs, placeholder links, and high-friction forms.
- Updated recommendation logic so a site with multiple meaningful warnings can still justify a paid report even if it is not critical.
- Better review/star detection, including star symbols and “Read More Reviews” style signals.
- Review proof is now separated into basic review proof vs. strong review proof with source/count.
- Phone numbers found only in page HTML/data are now treated as a possible prominence issue instead of a full call-readiness pass.
- The analyzer should no longer say reviews are missing when stars or testimonials are visible.
- Phone number prominence now outranks softer review-count/source findings.
- A phone found late in the extracted homepage content is treated as a weaker call path, not a full first-screen call path.
- Added a finding for “Estimate CTA is visible, but the call path is weaker.”

- Firecrawl scrape now requests a screenshot output when available.
- Preview page displays the rendered homepage screenshot if Firecrawl returns one.
- Added a **First-Screen / Screenshot Review** section.
- Added visual check statuses for:
  - Homepage screenshot capture
  - First-screen phone path
  - First-screen CTA
  - First-screen trust proof
- The confidence badge can now show **Firecrawl + screenshot preview**.
- Fixed a duplicate “Possible Fix” label in preview findings.

## What this build does not include yet

- Automated computer-vision interpretation of screenshots.
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

Recommended for Build 3:

```txt
FIRECRAWL_API_KEY=your_firecrawl_api_key
```

Optional fallback name also supported:

```txt
FIRECRAWL_API_TOKEN=your_firecrawl_api_key
```

If no Firecrawl key is set, the app still runs using the basic homepage fetch from Build 1B/2.

## SQL migration

None required for Build 3.

## Local commands

```bash
pnpm install
pnpm check
pnpm build
pnpm dev
```

## Recommended next build

**Build 4 — AI-Assisted Full Report Draft**

Recommended scope:

- Use the preview findings to generate a draft full report.
- Keep the report disabled if the preview says “paid report not recommended.”
- Generate copy/paste fixes, a local SEO gap section, and a web-person checklist.
- Keep Stripe, PDF generation, and database storage out until the report language is trusted.
