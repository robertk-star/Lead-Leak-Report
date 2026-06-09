# Lead Leak Report — Build 7

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
- SerpAPI live off-site search evidence when configured
- AI-assisted full report draft section
- Rule-based full report draft fallback when OpenAI is not configured
- `robots.txt`, `sitemap.xml`, and `llms.txt` in `/public`

## Build 7 additions

Build 7 adds a live off-site search layer using SerpAPI.

When `SERPAPI_API_KEY` is configured, the analyzer searches Google-style results for:

- `[Business Name] [City]`
- `[Business Name] reviews`
- `[Business Name] BBB Facebook Angi Yelp`
- `best [industry] in [city]`
- `[Business Name] [official domain]`

The off-site score now considers live evidence for:

- Google Business Profile / local-pack style signals
- Review platforms and review consistency
- Third-party citation footprint
- Editorial / best-of citations
- Manufacturer or trade directory presence
- Brand/entity consistency
- AI-repeatable differentiators

If SerpAPI is not configured or returns no usable results, the app keeps the conservative Build 6A off-site readiness scoring and shows that live search was not completed.

## Important limitation

This build does **not** run live ChatGPT, Gemini, Copilot, or Google AI answer tests. It uses website data plus optional live Google search evidence. It does not guarantee AI recommendations, rankings, traffic, calls, leads, or revenue.

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

Optional for live off-site search evidence:

`SERPAPI_API_KEY=your_serpapi_key`

Optional for AI-assisted full report drafting:

`OPENAI_API_KEY=your_openai_api_key`

Optional model override:

`OPENAI_MODEL=gpt-4o-mini`

## SQL migration needed

No.

## Notes

This build does not add Stripe, PDFs, accounts, report storage, or share links yet. The full report draft is visible in the preview so the language and usefulness can be tested before adding payment gating.
