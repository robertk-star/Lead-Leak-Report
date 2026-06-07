import { getIndustryById, type IndustryConfig } from "@/data/industries";

export type PreviewFinding = {
  title: string;
  severity: "critical" | "warning" | "good";
  explanation: string;
  fix: string[];
};

export type PreviewResult = {
  inputUrl: string;
  normalizedUrl: string;
  cityState: string;
  email: string;
  industry: IndustryConfig;
  score: number;
  label: string;
  confidence: "Basic preview" | "Live homepage preview";
  findings: PreviewFinding[];
  checkedAt: string;
  noSaleRecommended: boolean;
  summary: string;
};

const phonePattern = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;

function countMatches(content: string, keywords: string[]) {
  const lower = content.toLowerCase();
  return keywords.filter((keyword) => lower.includes(keyword.toLowerCase())).length;
}

export function scoreLabel(score: number) {
  if (score >= 85) return "Strong lead path";
  if (score >= 70) return "Minor leaks found";
  if (score >= 50) return "Multiple lead leaks";
  return "Critical lead leaks";
}

export function normalizeUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function buildFallbackPreview(params: {
  url: string;
  cityState: string;
  email: string;
  industryId: string;
}): PreviewResult {
  const industry = getIndustryById(params.industryId);
  const normalizedUrl = normalizeUrl(params.url);
  const content = `${params.url} ${params.cityState} ${industry.label}`.toLowerCase();
  const city = params.cityState.split(",")[0]?.trim().toLowerCase() || "";
  const hasIndustrySignal = countMatches(content, industry.primaryKeywords) > 0;
  const hasCitySignal = city.length > 1 && content.includes(city);

  const findings: PreviewFinding[] = [];
  let score = 72;

  if (!hasIndustrySignal) {
    score -= 10;
    findings.push({
      title: `${industry.label} clarity needs to be checked`,
      severity: "warning",
      explanation: `The preview could not confirm from the submitted URL alone that the homepage clearly says ${industry.label.toLowerCase()} near the top.`,
      fix: [
        `Make the first headline clearly say ${industry.primaryKeywords[0]}.`,
        "Use plain service language instead of only a brand slogan.",
        "Put the main service and city in the first screen.",
      ],
    });
  }

  if (!hasCitySignal) {
    score -= 8;
    findings.push({
      title: "Local service area needs to be checked",
      severity: "warning",
      explanation:
        "The preview could not confirm that the homepage clearly shows the city or service area in the first screen.",
      fix: [
        "Add your city and primary service area to the homepage headline or intro.",
        "List nearby towns or neighborhoods served.",
        "Add local project examples when possible.",
      ],
    });
  }

  findings.push({
    title: "Live homepage scan needed",
    severity: "warning",
    explanation:
      "This Build 1A preview is set up for the full flow. If the live scan cannot read a site, it gives a basic preview and marks the confidence level clearly.",
    fix: [
      "Run the full report when available.",
      "Check phone visibility, click-to-call, trust proof, forms, and local SEO basics.",
      "Do not buy a paid report unless the preview finds meaningful issues.",
    ],
  });

  return {
    inputUrl: params.url,
    normalizedUrl,
    cityState: params.cityState,
    email: params.email,
    industry,
    score: Math.max(45, score),
    label: scoreLabel(Math.max(45, score)),
    confidence: "Basic preview",
    findings,
    checkedAt: new Date().toISOString(),
    noSaleRecommended: false,
    summary:
      "This is a basic preview because live scraping is not connected in the browser. The production analyzer should use a server-side endpoint, Firecrawl, or a screenshot tool for a deeper review.",
  };
}

export function buildPreviewFromScrape(params: {
  url: string;
  cityState: string;
  email: string;
  industryId: string;
  html: string;
  title?: string;
  description?: string;
  finalUrl?: string;
}): PreviewResult {
  const industry = getIndustryById(params.industryId);
  const normalizedUrl = params.finalUrl || normalizeUrl(params.url);
  const text = `${params.title || ""} ${params.description || ""} ${params.html}`;
  const lower = text.toLowerCase();
  const city = params.cityState.split(",")[0]?.trim().toLowerCase() || "";

  const hasPhone = phonePattern.test(text);
  const hasTelLink = /href=["']tel:/i.test(params.html);
  const primaryCount = countMatches(text, industry.primaryKeywords);
  const serviceCount = countMatches(text, industry.serviceKeywords);
  const urgentCount = countMatches(text, industry.urgentKeywords);
  const trustCount = countMatches(text, industry.trustKeywords);
  const ctaCount = countMatches(text, industry.ctaKeywords);
  const localSeoCount = countMatches(text, industry.localSeoKeywords);
  const hasCity = city.length > 1 && lower.includes(city);
  const hasCurrentYear = lower.includes("2026") || lower.includes("2025");
  const hasStaleYear = lower.includes("2020") || lower.includes("2021") || lower.includes("2022");
  const formFieldCount = (params.html.match(/<(input|textarea|select)\b/gi) || []).length;

  let score = 100;
  const findings: PreviewFinding[] = [];

  if (!hasPhone) {
    score -= 25;
    findings.push({
      title: "Critical leak: phone number not found on the homepage",
      severity: "critical",
      explanation: `A local ${industry.label.toLowerCase()} customer should be able to call quickly. The scan did not find a phone number in the homepage content.`,
      fix: ["Add a phone number to the header.", "Make the number click-to-call.", "Add a mobile call button for urgent visitors."],
    });
  } else if (!hasTelLink) {
    score -= 12;
    findings.push({
      title: "Phone number found, but click-to-call was not confirmed",
      severity: "warning",
      explanation: "Mobile visitors may have to copy/paste or manually dial instead of tapping once to call.",
      fix: ["Add a tel: link to every visible phone number.", "Use a clear 'Call Now' button.", "Test it on iPhone and Android."],
    });
  }

  if (primaryCount === 0) {
    score -= 18;
    findings.push({
      title: `${industry.label} service clarity may be weak`,
      severity: "critical",
      explanation: `The scan did not find clear ${industry.label.toLowerCase()} wording in the homepage content. Visitors should know what you do within seconds.`,
      fix: [
        `Add '${industry.primaryKeywords[0]}' to the main headline.`,
        "Avoid using only a brand slogan in the first screen.",
        "List your core services near the top.",
      ],
    });
  } else if (serviceCount < 2) {
    score -= 8;
    findings.push({
      title: "Core services may not be specific enough",
      severity: "warning",
      explanation: `The page mentions ${industry.label.toLowerCase()}, but the scan found limited specific service wording.`,
      fix: [
        `Mention services such as ${industry.serviceKeywords.slice(0, 3).join(", ")}.`,
        "Add links to dedicated service pages.",
        "Use homeowner/customer-friendly service names.",
      ],
    });
  }

  if (!hasCity) {
    score -= 10;
    findings.push({
      title: "City or service area was not clearly confirmed",
      severity: "warning",
      explanation:
        "Local visitors and search engines should quickly understand where the business works.",
      fix: ["Add the city to the homepage headline or intro.", "List nearby service areas.", "Add local project examples with city labels."],
    });
  }

  if (trustCount < 2) {
    score -= 16;
    findings.push({
      title: "Trust proof appears thin or buried",
      severity: "warning",
      explanation:
        "The scan found limited reviews, certifications, warranty, licensing, or testimonial language on the homepage.",
      fix: ["Add a review or star-rating block near the top.", "Show licenses, insurance, warranties, or certifications.", "Add recent project proof or testimonials."],
    });
  }

  if (ctaCount === 0) {
    score -= 12;
    findings.push({
      title: "No strong call-to-action found",
      severity: "warning",
      explanation:
        "The page should give ready-to-act visitors a clear next step, not just general information.",
      fix: ["Add a clear CTA button near the top.", `Use wording like '${industry.ctaKeywords[0]}'.`, "Repeat the CTA after trust proof sections."],
    });
  }

  if (formFieldCount > 6) {
    score -= 8;
    findings.push({
      title: "Contact form may have too much friction",
      severity: "warning",
      explanation: `The scan found ${formFieldCount} form fields. Long forms can reduce quote or service requests, especially on mobile.`,
      fix: ["Reduce the form to 4–5 key fields.", "Ask for more detail after the first contact.", "Add a clear 'what happens next' line under the form."],
    });
  }

  if (localSeoCount < 2) {
    score -= 6;
    findings.push({
      title: "Foundational local SEO signals may be light",
      severity: "warning",
      explanation:
        "The scan found limited local service keywords that help customers and search engines understand what you do.",
      fix: ["Add core service terms to the homepage.", "Create dedicated service pages.", "Add a short FAQ section for common local customer questions."],
    });
  }

  if (!hasCurrentYear && hasStaleYear) {
    score -= 8;
    findings.push({
      title: "Freshness signals may look stale",
      severity: "warning",
      explanation:
        "Older dates can make a business look less active, even if the company is still operating.",
      fix: ["Update copyright and recent project sections.", "Remove outdated notices.", "Add a recent project or seasonal service update."],
    });
  }

  if (urgentCount === 0) {
    score -= 3;
  }

  if (findings.length === 0) {
    findings.push({
      title: "No major preview leaks found",
      severity: "good",
      explanation:
        "The basic scan found a clear service path, local signal, trust wording, and contact path. This site may not need a basic paid report.",
      fix: ["Consider a deeper manual review only if you want a second opinion.", "Keep reviews, photos, and service pages current.", "Track call clicks and form submissions."],
    });
  }

  const finalScore = Math.max(25, Math.min(99, score));
  const strongOrMediumIssues = findings.filter((finding) => finding.severity !== "good").length;

  return {
    inputUrl: params.url,
    normalizedUrl,
    cityState: params.cityState,
    email: params.email,
    industry,
    score: finalScore,
    label: scoreLabel(finalScore),
    confidence: "Live homepage preview",
    findings: findings.slice(0, 4),
    checkedAt: new Date().toISOString(),
    noSaleRecommended: finalScore >= 85 && strongOrMediumIssues < 3,
    summary:
      finalScore >= 85
        ? "The basic preview found a fairly strong lead path. A paid report should only be recommended if a deeper scan finds more meaningful issues."
        : "The basic preview found enough possible issues to justify a deeper paid report if the business wants exact fixes.",
  };
}
