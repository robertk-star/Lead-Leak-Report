# Lead Leak Report

Phase: **Build 4 — AI Visibility Readiness Layer**

This is still a Vite/React prototype with a serverless analyzer endpoint. Build 4 adds an **AI Visibility Readiness** layer on top of the existing Lead Leak preview.

The product positioning is now:

> AI Visibility + Lead Leak Report for local service businesses.

It checks whether a local service website gives AI/search systems and customers the clear signals they need to understand, trust, and contact the business.

## What Build 4 includes

- Multi-niche landing pages:
  - `/roofers`
  - `/plumbers`
  - `/electricians`
  - `/hvac`
  - `/landscapers`
  - `/home-services`
- Business type selector.
- Firecrawl-enabled homepage reader.
- Firecrawl screenshot capture when available.
- Rule-based Lead Leak Score.
- Rule-based AI Visibility Readiness Score.
- AI visibility signals:
  - Entity clarity
  - Service clarity
  - Trust and citation readiness
  - Crawlable content
  - Local footprint
- Foundational local SEO preview.
- Web-person checklist preview.
- Paid-report recommendation guardrails.

## What Build 4 does not include yet

- No Stripe/payment flow.
- No PDF generation.
- No Supabase/database.
- No login/accounts.
- No live ranking test in ChatGPT, Gemini, Copilot, or Google AI.
- No guarantee of AI recommendations, rankings, traffic, calls, or revenue.

The AI Visibility Readiness score is a readiness check. It does not claim to know exactly how AI platforms rank or recommend businesses.

## Vercel settings

Use Vite settings, not Next.js.

```txt
Framework Preset: Vite
Install Command: pnpm install
Build Command: pnpm build
Output Directory: dist/public
```

## Vercel environment variables

Recommended:

```txt
FIRECRAWL_API_KEY=your_firecrawl_api_key
```

Fallback supported:

```txt
FIRECRAWL_API_TOKEN=your_firecrawl_api_key
```

If no Firecrawl key is set, the app still runs using the basic homepage fetch, but the preview is less reliable.

## SQL migration needed

No.

## Suggested next build

**Build 5 — AI-assisted full report draft**

Recommended next items:

- Add OpenAI or Claude API report drafting from analyzer findings.
- Generate draft sections for:
  - AI Visibility Readiness
  - Top Lead Leaks
  - Copy/paste fixes
  - Local SEO gaps
  - Web-person checklist
- Keep Stripe/PDF/database for a later build after report language is trusted.
