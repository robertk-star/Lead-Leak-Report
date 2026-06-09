# Lead Leak Report — Build 6A

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
- Lead Leak preview score
- On-Site AI Readiness score
- Off-Site AI Visibility score
- Overall AI Visibility score
- AI-assisted full report draft section
- Rule-based full report draft fallback when OpenAI is not configured
- `robots.txt`, `sitemap.xml`, and `llms.txt` in `/public`

## Build 6A additions

Build 6 separates AI visibility into two parts:

1. **On-Site AI Readiness** — checks the website itself: business identity, service clarity, location clarity, trust proof, crawlable content, schema, and contact clarity.
2. **Off-Site AI Visibility** — checks whether the website exposes or links to external/entity signals that can help AI/search systems verify the business: Google Business Profile, review platforms, BBB/Facebook/Yelp/Angi, manufacturer/trade directories, awards, best-of citations, schema, and sameAs links.

It also adds an **Overall AI Visibility** score that weights off-site/entity consistency more heavily than on-site readiness because AI recommendations often rely on third-party verification, reviews, citations, and brand consistency.

## Important limitation

This build does **not** run live ChatGPT, Gemini, Copilot, Google AI, or Google ranking tests. It is a readiness and signal check. It does not guarantee AI recommendations, rankings, traffic, calls, leads, or revenue.


Build 6A adds:

- Clear separation between **On-Site AI Readiness**, **Off-Site AI Visibility**, and **Overall AI Visibility**.
- Conservative off-site scoring until Google Business Profile, review platforms, best-of/editorial citations, manufacturer/trade directories, schema/sameAs, and brand-name consistency are verified.
- Manual off-site checklist in the preview UI.
- Entity mismatch warnings when the website brand may not match off-site review/listing profiles.
- Off-site action plan items in the full report draft.

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
