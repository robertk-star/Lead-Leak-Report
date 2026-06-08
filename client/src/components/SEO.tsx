import { useEffect } from "react";

const SITE_NAME = "Lead Leak Report";
const DEFAULT_ORIGIN = "https://www.leadleakreport.com";

type SEOProps = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

export function SEO({ title, description, path = "/", type = "website", jsonLd }: SEOProps) {
  useEffect(() => {
    const origin = window.location.origin || DEFAULT_ORIGIN;
    const canonical = `${origin}${path}`;
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    setMeta("description", description);
    setMeta("robots", "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1");
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:url", canonical, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setLink("canonical", canonical);

    document.querySelectorAll("script[data-lead-leak-jsonld]").forEach((node) => node.remove());
    const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    blocks.forEach((block) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-lead-leak-jsonld", "true");
      script.text = JSON.stringify(block);
      document.head.appendChild(script);
    });
  }, [title, description, path, type, jsonLd]);

  return null;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: DEFAULT_ORIGIN,
    potentialAction: {
      "@type": "SearchAction",
      target: `${DEFAULT_ORIGIN}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: DEFAULT_ORIGIN,
    description:
      "AI visibility readiness and website lead leak reports for local service businesses.",
  };
}

export function softwareJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Checks whether local service business websites have clear AI visibility signals, local SEO basics, and conversion paths for calls and estimate requests.",
    offers: {
      "@type": "Offer",
      price: "29",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
