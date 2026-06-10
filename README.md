# Lead Leak Report — Build 7F

This build is the current Next.js App Router version of Lead Leak Report.

## Build 7F additions

Build 7F keeps the email unlock flow and tightens the free preview so it does not give away the full report value before the visitor enters an email.

Build 7F changes:

- The free preview still shows what was checked.
- The first “What we found around the web” item can show details.
- The rest of the around-the-web details are locked until email submit.
- Off-site detail cards show “Locked” before email submit instead of showing Found/Needs Review details.
- After the visitor enters an email, the full details show on-screen and the report email route is called.

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

Optional for report email delivery:

`RESEND_API_KEY=your_resend_api_key`

Optional sender email:

`REPORT_FROM_EMAIL="Lead Leak Report <reports@yourdomain.com>"`

## SQL migration needed

No.
