import LeadCheckForm from "@/components/LeadCheckForm";
import PageFooter from "@/components/PageFooter";
import { SEO, faqJsonLd, organizationJsonLd, softwareJsonLd, websiteJsonLd } from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import { Card } from "@/components/ui/card";
import { CheckCircle2, FileText, Search, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { Link } from "wouter";

type InfoPageProps = {
  kind: "how-it-works" | "ai-visibility" | "sample-report" | "pricing" | "faq";
};

const faqItems = [
  {
    question: "What is an AI Visibility Report?",
    answer:
      "An AI Visibility Report checks whether a local service business website gives AI search tools clear business, service, location, trust, crawlability, and contact signals. It does not guarantee that ChatGPT, Gemini, Copilot, or Google AI will recommend the business.",
  },
  {
    question: "Is Lead Leak Report an SEO audit?",
    answer:
      "No. It is a conversion-first and AI-visibility-readiness report with foundational local SEO checks included. It focuses on calls, estimate requests, trust signals, local clarity, and crawlable business information.",
  },
  {
    question: "Can this guarantee more leads or AI mentions?",
    answer:
      "No. The report identifies likely friction points and readiness gaps. Results depend on the website, market, traffic, third-party footprint, and whether the recommended fixes are implemented.",
  },
  {
    question: "Who is this built for?",
    answer:
      "Lead Leak Report is built for local service businesses such as roofers, plumbers, electricians, HVAC companies, landscapers, and similar home service contractors.",
  },
];

const pageMeta = {
  "how-it-works": {
    title: "How Lead Leak Report Works",
    description:
      "Learn how Lead Leak Report checks local service business websites for AI visibility readiness, local SEO basics, and lead conversion leaks.",
    heading: "How Lead Leak Report works",
    path: "/how-it-works",
  },
  "ai-visibility": {
    title: "AI Visibility Readiness for Local Service Businesses",
    description:
      "See what local service businesses should make clear for AI search tools: business identity, services, location, trust, crawlability, and contact paths.",
    heading: "AI visibility readiness for local service businesses",
    path: "/ai-visibility",
  },
  "sample-report": {
    title: "Sample AI Visibility and Lead Leak Report",
    description:
      "Preview the sections included in a Lead Leak Report, including AI visibility readiness, lead leak score, local SEO gaps, and web-person checklist.",
    heading: "Sample Lead Leak Report",
    path: "/sample-report",
  },
  pricing: {
    title: "Pricing for Lead Leak Report",
    description:
      "Simple early-access pricing for AI visibility readiness and website lead leak reports for local service businesses.",
    heading: "Simple pricing",
    path: "/pricing",
  },
  faq: {
    title: "Lead Leak Report FAQ",
    description:
      "Answers about AI visibility readiness, local SEO checks, website lead leaks, guarantees, and supported local service industries.",
    heading: "Frequently asked questions",
    path: "/faq",
  },
};

function CheckList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex gap-2 text-sm text-[#374151]">
          <CheckCircle2 className="text-green-600 shrink-0 mt-0.5" size={18} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function ContentPage({ kind }: InfoPageProps) {
  const meta = pageMeta[kind];
  const jsonLd: Record<string, unknown>[] = [websiteJsonLd(), organizationJsonLd(), softwareJsonLd()];
  if (kind === "faq") jsonLd.push(faqJsonLd(faqItems));

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <SEO title={meta.title} description={meta.description} path={meta.path} jsonLd={jsonLd} />
      <SiteHeader />
      <section className="bg-white border-b-4 border-[#d97706] py-16 md:py-20">
        <div className="container max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-wide text-[#d97706] mb-3">Lead Leak Report</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a2332] leading-tight mb-5">{meta.heading}</h1>
          <p className="text-lg text-[#374151] max-w-3xl">{meta.description}</p>
        </div>
      </section>

      {kind === "how-it-works" && (
        <main className="py-16">
          <div className="container grid lg:grid-cols-3 gap-6">
            {[
              [Search, "1. Read the site", "The preview reads the homepage with Firecrawl when available and falls back to a basic reader when needed."],
              [ShieldCheck, "2. Score readiness", "The app checks AI visibility signals, foundational local SEO, call readiness, trust proof, and request paths."],
              [Wrench, "3. Show practical fixes", "The paid report will turn the findings into plain-English fixes and a checklist to send to a web person."],
            ].map(([Icon, title, text]) => {
              const PageIcon = Icon as LucideIcon;
              return (
                <Card key={String(title)} className="p-6 border border-[#e5e7eb] bg-white">
                  <PageIcon className="text-[#d97706] mb-4" size={32} />
                  <h2 className="text-xl font-bold text-[#1a2332] mb-2">{title as string}</h2>
                  <p className="text-[#374151] text-sm">{text as string}</p>
                </Card>
              );
            })}
          </div>
          <div className="container mt-10 grid lg:grid-cols-2 gap-8 items-start">
            <Card className="p-6 border border-[#e5e7eb] bg-white">
              <h2 className="text-2xl font-bold text-[#1a2332] mb-4">What the preview checks</h2>
              <CheckList items={["Business identity and service clarity", "City, state, and service-area clarity", "Phone/call path and estimate request path", "Reviews, certifications, warranties, and project proof", "Crawlable content and basic local SEO signals"]} />
            </Card>
            <LeadCheckForm defaultIndustryId="roofing" compact />
          </div>
        </main>
      )}

      {kind === "ai-visibility" && (
        <main className="py-16">
          <div className="container grid lg:grid-cols-2 gap-8 items-start">
            <Card className="p-6 border border-[#e5e7eb] bg-white">
              <h2 className="text-2xl font-bold text-[#1a2332] mb-4">What AI search tools need to understand</h2>
              <CheckList items={["Who the business is", "What services it provides", "Where it works", "Why customers should trust it", "How customers contact it", "Whether the important information is crawlable text"]} />
            </Card>
            <Card className="p-6 border border-[#e5e7eb] bg-white">
              <h2 className="text-2xl font-bold text-[#1a2332] mb-4">What we do not claim</h2>
              <CheckList items={["We do not guarantee ChatGPT will recommend a business", "We do not claim to know every AI ranking factor", "We do not replace full SEO platforms", "We check readiness signals that can be improved"]} />
            </Card>
          </div>
        </main>
      )}

      {kind === "sample-report" && (
        <main className="py-16">
          <div className="container grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
            <Card className="p-6 md:p-8 border border-[#e5e7eb] bg-white">
              <p className="text-xs font-bold uppercase text-[#6b7280] mb-2">Sample report sections</p>
              <h2 className="text-3xl font-bold text-[#1a2332] mb-6">AI Visibility + Lead Leak Report</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {["AI Visibility Readiness Score", "Website Lead Leak Score", "Top 5 Lead Leaks", "Foundational Local SEO Gaps", "Copy/Paste Fixes", "Send This to Your Web Person Checklist"].map((item) => (
                  <div key={item} className="rounded-lg bg-[#f9fafb] border border-[#e5e7eb] p-4 font-semibold text-[#1a2332]">{item}</div>
                ))}
              </div>
            </Card>
            <Card className="p-6 border-l-4 border-[#d97706] bg-white">
              <FileText className="text-[#d97706] mb-4" size={32} />
              <h2 className="text-xl font-bold text-[#1a2332] mb-2">Built to be forwarded</h2>
              <p className="text-sm text-[#374151]">The report is designed so a business owner can send the checklist to their current web person, designer, agency, or office manager.</p>
            </Card>
          </div>
        </main>
      )}

      {kind === "pricing" && (
        <main className="py-16">
          <div className="container max-w-4xl">
            <Card className="p-8 border-2 border-[#d97706] bg-white shadow-md">
              <p className="text-sm font-bold uppercase text-[#d97706] mb-3">Early access</p>
              <h2 className="text-3xl font-bold text-[#1a2332] mb-2">Lead Leak Report — $29</h2>
              <p className="text-[#374151] mb-6">The paid report flow is not live yet. This page is being prepared for launch after the preview and report generator are validated.</p>
              <CheckList items={["Free preview first", "AI visibility readiness check", "Website lead leak score", "Foundational local SEO gaps", "Copy/paste fixes", "Web-person checklist", "No sales call required"]} />
              <div className="mt-8">
                <Link href="/#check" className="inline-flex rounded-md bg-[#d97706] px-5 py-3 font-bold text-white hover:bg-[#b45309] transition">Check My Website</Link>
              </div>
            </Card>
          </div>
        </main>
      )}

      {kind === "faq" && (
        <main className="py-16">
          <div className="container max-w-4xl grid gap-4">
            {faqItems.map((item) => (
              <Card key={item.question} className="p-6 border border-[#e5e7eb] bg-white">
                <h2 className="text-xl font-bold text-[#1a2332] mb-2">{item.question}</h2>
                <p className="text-[#374151]">{item.answer}</p>
              </Card>
            ))}
          </div>
        </main>
      )}

      <PageFooter />
    </div>
  );
}
