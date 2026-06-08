# Lead Leak Report — Build 4A

Build 4A adds the SEO and AI-crawl foundation for the public product site.

## What this build includes

- AI Visibility + Lead Leak positioning from Build 4.
- Public content pages:
  - `/ai-visibility`
  - `/how-it-works`
  - `/sample-report`
  - `/pricing`
  - `/faq`
- Updated header and footer internal links.
- Client-side page metadata updates for public pages.
- JSON-LD structured data helpers for Organization, WebSite, SoftwareApplication, and FAQPage.
- Public crawl files:
  - `/robots.txt`
  - `/sitemap.xml`
  - `/llms.txt`
- Baseline HTML meta tags in `client/index.html`.
- Existing Firecrawl-based preview flow remains in place.

## Vercel settings

Framework Preset: `Vite`

Install Command:

```bash
pnpm install
```

Build Command:

```bash
pnpm build
```

Output Directory:

```bash
dist/public
```

## Environment variables

Required for Firecrawl-enhanced analysis:

```bash
FIRECRAWL_API_KEY=your_firecrawl_api_key
```

Fallback name also supported:

```bash
FIRECRAWL_API_TOKEN=your_firecrawl_api_key
```

## SQL migration

No SQL migration is needed for Build 4A.

## Notes

This is still a Vite/React prototype. Public metadata is improved, but a future Next.js conversion would be stronger for true server-rendered SEO at scale.
