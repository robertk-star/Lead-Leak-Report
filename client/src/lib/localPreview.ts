import { getIndustryById, type IndustryConfig } from "@/data/industries";

export type PreviewFinding = {
  title: string;
  severity: "critical" | "warning" | "good";
  explanation: string;
  fix: string[];
  evidence?: string;
  category?: string;
};

export type PreviewCategory = {
  key: string;
  label: string;
  score: number;
  max: number;
  status: "strong" | "needs-review" | "critical";
  note: string;
};

export type PreviewResult = {
  inputUrl: string;
  normalizedUrl: string;
  cityState: string;
  email: string;
  industry: IndustryConfig;
  score: number;
  label: string;
  confidence: "Basic preview" | "Live homepage preview" | "Firecrawl homepage preview";
  scrapeSource?: string;
  firecrawlConfigured?: boolean;
  findings: PreviewFinding[];
  categories: PreviewCategory[];
  checkedAt: string;
  noSaleRecommended: boolean;
  paidRecommendation: "recommended" | "not-recommended" | "manual-review";
  criticalLeakTitle: string;
  summary: string;
  localSeoGaps: string[];
  webPersonChecklist: string[];
  nextBestAction: string;
};

const phonePattern = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;

function countMatches(content: string, keywords: string[]) {
  const lower = content.toLowerCase();
  return keywords.filter((keyword) => lower.includes(keyword.toLowerCase())).length;
}

function hasAny(content: string, keywords: string[]) {
  return countMatches(content, keywords) > 0;
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

function categoryStatus(score: number, max: number): PreviewCategory["status"] {
  const pct = score / max;
  if (pct >= 0.75) return "strong";
  if (pct >= 0.45) return "needs-review";
  return "critical";
}

function buildCategory(key: string, label: string, score: number, max: number, note: string): PreviewCategory {
  return { key, label, score, max, status: categoryStatus(score, max), note };
}

function paidRecommendationFrom(score: number, findings: PreviewFinding[], confidence: PreviewResult["confidence"]): PreviewResult["paidRecommendation"] {
  const criticalCount = findings.filter((finding) => finding.severity === "critical").length;
  const warningCount = findings.filter((finding) => finding.severity === "warning").length;
  if (criticalCount >= 1 || warningCount >= 3 || score < 78 || (warningCount >= 2 && score < 85)) return "recommended";
  if (confidence === "Basic preview") return "manual-review";
  return "not-recommended";
}

function recommendationText(rec: PreviewResult["paidRecommendation"], industry: IndustryConfig) {
  if (rec === "recommended") {
    return `This preview found enough possible issues to justify a deeper ${industry.label.toLowerCase()} Lead Leak Report if the business wants exact fixes.`;
  }
  if (rec === "manual-review") {
    return "The automated preview could not read enough of the site to make a confident paid-report recommendation. A manual review or Firecrawl scan should be used before charging.";
  }
  return "The preview did not find enough meaningful issues to confidently recommend a paid report. That no-sale rule protects trust.";
}

function topCriticalTitle(findings: PreviewFinding[]) {
  return findings.find((finding) => finding.severity === "critical")?.title || findings.find((finding) => finding.severity === "warning")?.title || "No critical leak found in the preview";
}

function commonWebPersonChecklist(industry: IndustryConfig) {
  return [
    "Make the main phone number click-to-call on mobile.",
    `Make the first headline clearly say ${industry.primaryKeywords[0]} and the main city/service area.`,
    `Add a clear ${industry.ctaKeywords[0]} button near the top of the page.`,
    "Add visible reviews, star ratings, or testimonials near the top.",
    "Add local project photos or service-area proof.",
    "Shorten forms to 4–5 fields where possible.",
  ];
}

export function buildFallbackPreview(params: {
  url: string;
  cityState: string;
  email: string;
  industryId: string;
}): PreviewResult {
  const industry = getIndustryById(params.industryId);
  const normalizedUrl = normalizeUrl(params.url);
  const findings: PreviewFinding[] = [
    {
      title: "Live homepage scan needed before charging",
      severity: "warning",
      category: "Preview Confidence",
      explanation:
        "This preview could not confirm enough website content from the browser flow. Before selling a paid report, the system should read the homepage with the server analyzer or Firecrawl.",
      evidence: "The fallback preview ran because the live site data was missing or blocked.",
      fix: [
        "Use the server-side analyzer first.",
        "Use Firecrawl in Build 2 for more reliable full-page reading.",
        "Do not recommend payment unless meaningful issues are confirmed.",
      ],
    },
    {
      title: `${industry.label} clarity should be verified`,
      severity: "warning",
      category: "5-Second Clarity",
      explanation: `The preview needs to confirm whether the homepage clearly says ${industry.label.toLowerCase()} and shows the service area quickly.`,
      fix: [
        `The first screen should clearly mention ${industry.primaryKeywords[0]}.`,
        "The first screen should mention the city or main service area.",
        "The homepage should avoid using only a brand slogan above the fold.",
      ],
    },
  ];

  const categories = [
    buildCategory("confidence", "Preview Confidence", 2, 10, "Live scan not confirmed."),
    buildCategory("call", "Call Readiness", 12, 25, "Phone and click-to-call need verification."),
    buildCategory("clarity", "5-Second Service Clarity", 12, 20, "Industry and city clarity need verification."),
    buildCategory("trust", "Trust Proof", 8, 20, "Reviews, certifications, and proof need verification."),
    buildCategory("path", "Request Path", 8, 15, "CTA and form friction need verification."),
    buildCategory("seo", "Local Visibility", 6, 10, "Basic local SEO signals need verification."),
    buildCategory("freshness", "Freshness", 5, 10, "Freshness signals need verification."),
  ];

  const paidRecommendation = paidRecommendationFrom(64, findings, "Basic preview");

  return {
    inputUrl: params.url,
    normalizedUrl,
    cityState: params.cityState,
    email: params.email,
    industry,
    score: 64,
    label: scoreLabel(64),
    confidence: "Basic preview",
    findings,
    categories,
    checkedAt: new Date().toISOString(),
    noSaleRecommended: paidRecommendation === "not-recommended",
    paidRecommendation,
    criticalLeakTitle: topCriticalTitle(findings),
    summary: recommendationText(paidRecommendation, industry),
    localSeoGaps: [
      "Confirm the homepage title/headline includes service + city.",
      "Confirm key service pages exist.",
      "Confirm service areas and local proof are visible.",
    ],
    webPersonChecklist: commonWebPersonChecklist(industry),
    nextBestAction: "Run a stronger live scan before asking this visitor to pay.",
  };
}

function stripHtmlForVisibleText(html = "") {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildPreviewFromScrape(params: {
  url: string;
  cityState: string;
  email: string;
  industryId: string;
  html: string;
  visibleText?: string;
  title?: string;
  description?: string;
  finalUrl?: string;
}): PreviewResult {
  const industry = getIndustryById(params.industryId);
  const normalizedUrl = params.finalUrl || normalizeUrl(params.url);
  const visibleContent = `${params.title || ""} ${params.description || ""} ${params.visibleText || stripHtmlForVisibleText(params.html)}`;
  const text = `${visibleContent} ${params.html}`;
  const lower = visibleContent.toLowerCase();
  const city = params.cityState.split(",")[0]?.trim().toLowerCase() || "";

  const hasPhoneVisible = phonePattern.test(visibleContent);
  const hasPhoneInHtml = phonePattern.test(params.html);
  const hasTelLink = /href=["']tel:/i.test(params.html);
  const hasPhone = hasPhoneVisible || (hasTelLink && hasPhoneInHtml) || hasPhoneInHtml;
  const phoneMayBeHidden = hasPhoneInHtml && !hasPhoneVisible;
  const primaryCount = countMatches(visibleContent, industry.primaryKeywords);
  const serviceCount = countMatches(visibleContent, industry.serviceKeywords);
  const urgentCount = countMatches(visibleContent, industry.urgentKeywords);
  const trustCount = countMatches(visibleContent, industry.trustKeywords);
  const strongCtaCount = countMatches(visibleContent, industry.ctaKeywords);
  const softCtaCount = countMatches(visibleContent, ["free consultation", "contact us", "contact", "learn more", "request information"]);
  const ctaCount = strongCtaCount + softCtaCount;
  const localSeoCount = countMatches(visibleContent, industry.localSeoKeywords);
  const hasCity = city.length > 1 && lower.includes(city);
  const hasCurrentYear = lower.includes("2026") || lower.includes("2025");
  const hasStaleYear = lower.includes("2020") || lower.includes("2021") || lower.includes("2022");
  const formFieldCount = (params.html.match(/<(input|textarea|select)\b/gi) || []).length;

  const hasBrokenCta = /href=["']\s*(#|<>|javascript:void\(0\)|javascript:;|\s*)["']/i.test(params.html);
  const hasStrongReviewProof = /(\d+[,+]?\s*(?:5[- ]?star|reviews?)|[45]\.\d\s*(?:\/5)?\s*(?:stars?|google)|google rating|star rating|best of)/i.test(visibleContent);
  const hasBasicReviewProof = hasStrongReviewProof || /(?:★\s*){4,5}|(?:⭐\s*){4,5}|read more reviews|client reviews|customer reviews|testimonial|testimonials/i.test(visibleContent);
  const hasCertificationProof = /(gaf|owens corning|certainteed|iko|tamko|master elite|select shinglemaster|preferred contractor|licensed|insured|bonded|warranty|guarantee|bbb\s*a\+)/i.test(visibleContent);
  const hasProjectProof = /(before\s*(?:&|and)?\s*after|recent projects?|project photos?|portfolio|our work|gallery)/i.test(visibleContent);
  const hasWeakReviewLinkOnly = /(client reviews|reviews|testimonials)/i.test(visibleContent) && !hasBasicReviewProof;
  const hasFamilyLocalProof = /(family owned|locally owned|local, family|years in business|since\s+\d{4}|serving .+ since)/i.test(visibleContent);

  let callScore = 0;
  if (hasPhone) callScore += 11;
  if (hasTelLink) callScore += 8;
  if (strongCtaCount > 0) callScore += 4;
  else if (softCtaCount > 0) callScore += 2;
  if (urgentCount > 0) callScore += 2;

  let clarityScore = 0;
  if (primaryCount > 0) clarityScore += 8;
  if (serviceCount >= 2) clarityScore += 6;
  else if (serviceCount === 1) clarityScore += 3;
  if (hasCity) clarityScore += 4;
  if (params.title && hasAny(params.title, industry.primaryKeywords)) clarityScore += 2;

  let trustScore = 0;
  if (hasStrongReviewProof) trustScore += 8;
  else if (hasBasicReviewProof) trustScore += 5;
  else if (hasWeakReviewLinkOnly) trustScore += 2;
  if (hasCertificationProof) trustScore += 6;
  if (hasProjectProof) trustScore += 3;
  if (hasFamilyLocalProof) trustScore += 2;
  if (trustCount >= 4) trustScore += 2;

  let requestScore = 0;
  if (strongCtaCount > 0) requestScore += 7;
  else if (softCtaCount > 0) requestScore += 4;
  if (/contact|form|quote|estimate|schedule|book|consultation/i.test(text)) requestScore += 3;
  if (formFieldCount > 0 && formFieldCount <= 6) requestScore += 3;
  if (formFieldCount === 0) requestScore += 1;
  if (formFieldCount > 6) requestScore -= 4;
  if (hasBrokenCta) requestScore = Math.min(requestScore, 5);

  let localSeoScore = 0;
  if (hasCity) localSeoScore += 3;
  if (localSeoCount >= 2) localSeoScore += 3;
  else if (localSeoCount === 1) localSeoScore += 1;
  if (serviceCount >= 3) localSeoScore += 2;
  if (/service area|areas served|nearby|county|neighborhood|zip|surrounding areas/i.test(text)) localSeoScore += 2;

  let freshnessScore = 5;
  if (hasCurrentYear) freshnessScore += 3;
  if (!hasStaleYear) freshnessScore += 2;
  if (!hasCurrentYear && hasStaleYear) freshnessScore -= 3;

  callScore = Math.max(0, Math.min(25, callScore));
  clarityScore = Math.max(0, Math.min(20, clarityScore));
  trustScore = Math.max(0, Math.min(20, trustScore));
  requestScore = Math.max(0, Math.min(15, requestScore));
  localSeoScore = Math.max(0, Math.min(10, localSeoScore));
  freshnessScore = Math.max(0, Math.min(10, freshnessScore));

  const categories = [
    buildCategory("call", "Call Readiness", callScore, 25, hasPhone ? (phoneMayBeHidden ? "Phone was found in page data, but may not be prominent in visible page text." : hasTelLink ? "Phone and click-to-call found." : "Phone found, but click-to-call was not confirmed.") : "Phone number not found in homepage content."),
    buildCategory("clarity", "5-Second Service Clarity", clarityScore, 20, primaryCount > 0 ? "Industry wording found." : "Main service wording was not confirmed."),
    buildCategory("trust", "Trust Proof", trustScore, 20, hasStrongReviewProof ? "Strong review proof was found." : hasBasicReviewProof || hasCertificationProof ? "Some trust proof was found, but the source/count may be limited." : "Trust proof appears thin, linked-only, or buried."),
    buildCategory("path", "Request Path", requestScore, 15, hasBrokenCta ? "A possible broken/placeholder link was detected." : formFieldCount > 6 ? `Form may be high-friction with ${formFieldCount} fields.` : strongCtaCount > 0 ? "Strong request path language found." : "Request path has basic or soft signals."),
    buildCategory("seo", "Local Visibility", localSeoScore, 10, hasCity ? "City/service-area signal found." : "City/service-area signal not confirmed."),
    buildCategory("freshness", "Freshness", freshnessScore, 10, hasCurrentYear ? "Current year signal found." : hasStaleYear ? "Older dates found without a current year signal." : "Freshness signal was limited."),
  ];

  const findings: PreviewFinding[] = [];

  if (!hasPhone) {
    findings.push({
      title: "Critical leak: phone number not found on the homepage",
      severity: "critical",
      category: "Call Readiness",
      explanation: `A local ${industry.label.toLowerCase()} customer should be able to call quickly. The scan did not find a phone number in the homepage content.`,
      evidence: "No standard U.S. phone number pattern was found in the homepage HTML/text.",
      fix: ["Add a phone number to the header.", "Make the number click-to-call.", "Add a mobile call button for urgent visitors."],
    });
  } else if (phoneMayBeHidden) {
    findings.push({
      title: "Phone number may not be prominent in the first-screen experience",
      severity: "warning",
      category: "Call Readiness",
      explanation: `A ${industry.label.toLowerCase()} site can have a phone number somewhere in the page data but still make visitors hunt for it. The preview found a phone signal, but it was not confirmed in the clean visible page text.`,
      evidence: "Phone pattern was found in page HTML/data, but not confirmed in the primary visible text extracted for the preview.",
      fix: ["Put the phone number in the main header.", "Add a mobile sticky Call Now button.", "Keep Request Estimate and Call Now visible together."],
    });
  } else if (!hasTelLink) {
    findings.push({
      title: "Phone found, but click-to-call was not confirmed",
      severity: "warning",
      category: "Call Readiness",
      explanation: "Mobile visitors may have to copy/paste or manually dial instead of tapping once to call.",
      evidence: "A phone number was found, but the scan did not find an href=\"tel:\" link.",
      fix: ["Add a tel: link to every visible phone number.", "Use a clear 'Call Now' button.", "Test it on iPhone and Android."],
    });
  }

  if (primaryCount === 0) {
    findings.push({
      title: `${industry.label} service clarity may be weak`,
      severity: "critical",
      category: "5-Second Service Clarity",
      explanation: `The scan did not find clear ${industry.label.toLowerCase()} wording in the homepage content. Visitors should know what you do within seconds.`,
      evidence: `Missing primary terms checked: ${industry.primaryKeywords.slice(0, 4).join(", ")}.`,
      fix: [`Add '${industry.primaryKeywords[0]}' to the main headline.`, "Avoid using only a brand slogan in the first screen.", "List your core services near the top."],
    });
  } else if (serviceCount < 2) {
    findings.push({
      title: "Core services may not be specific enough",
      severity: "warning",
      category: "5-Second Service Clarity",
      explanation: `The page mentions ${industry.label.toLowerCase()}, but the scan found limited specific service wording.`,
      evidence: `Only ${serviceCount} specific service keyword(s) were found from the preview list.`,
      fix: [`Mention services such as ${industry.serviceKeywords.slice(0, 3).join(", ")}.`, "Add links to dedicated service pages.", "Use customer-friendly service names."],
    });
  }

  if (!hasCity) {
    findings.push({
      title: "City or service area was not clearly confirmed",
      severity: "warning",
      category: "Local Visibility",
      explanation: "Local visitors and search engines should quickly understand where the business works.",
      evidence: city ? `The city '${city}' was not found in the scanned homepage content.` : "No city was parsed from the submitted location.",
      fix: ["Add the city to the homepage headline or intro.", "List nearby service areas.", "Add local project examples with city labels."],
    });
  }

  if (!hasBasicReviewProof && !hasCertificationProof) {
    findings.push({
      title: "Trust proof is not strongly visible in the preview",
      severity: "warning",
      category: "Trust Proof",
      explanation: "The scan did not confirm strong proof such as star ratings, review count, BBB/certification badges, warranty, licensing, or insurance language. A reviews link alone is weaker than proof visible on the page.",
      evidence: hasWeakReviewLinkOnly ? "Review/testimonial wording was found, but no star rating, review count, or certification proof was confirmed." : `Only ${trustCount} trust keyword(s) were found from the preview list.`,
      fix: ["Add a review or star-rating block near the top.", "Show licenses, insurance, warranties, or certifications.", "Add recent project proof or testimonials."],
    });
  } else if (hasBasicReviewProof && !hasStrongReviewProof) {
    findings.push({
      title: "Review proof is visible, but the source or count could be clearer",
      severity: "warning",
      category: "Trust Proof",
      explanation: "The scan found basic review proof such as stars, testimonial wording, or a review link. The stronger version would show the review source and count, such as Google rating and number of reviews.",
      evidence: "Basic review/testimonial signal was found, but a clear rating source or review count was not confirmed.",
      fix: ["Add a Google rating or review count near the first screen.", "Show where the reviews came from.", "Keep the Read More Reviews button, but add a stronger summary above it."],
    });
  }

  if (hasBrokenCta) {
    findings.push({
      title: "Possible broken or placeholder CTA link detected",
      severity: "critical",
      category: "Request Path",
      explanation: "A main action link that points nowhere can stop a ready visitor from contacting the business.",
      evidence: "The scan detected a placeholder link pattern such as href='#', href='', href='<>' or javascript:void(0).",
      fix: ["Test every button in the header and hero section.", "Send the main CTA to a real quote/contact form.", "Use a clear action such as 'Get a Free Estimate' or 'Schedule Service'."],
    });
  } else if (strongCtaCount === 0 && softCtaCount > 0) {
    findings.push({
      title: "CTA is present but could be more specific",
      severity: "warning",
      category: "Request Path",
      explanation: "The page has a contact/consultation path, but the wording may be softer than a direct service request. Specific action buttons usually make the next step clearer.",
      evidence: "Soft CTA wording was found, but the strongest industry-specific CTA terms were not confirmed.",
      fix: [`Use wording like '${industry.ctaKeywords[0]}' near the top.`, "Repeat the CTA after trust proof sections.", "Tell visitors what happens after they submit."],
    });
  } else if (ctaCount === 0) {
    findings.push({
      title: "No strong call-to-action found",
      severity: "warning",
      category: "Request Path",
      explanation: "The page should give ready-to-act visitors a clear next step, not just general information.",
      evidence: `No CTA terms were found from this industry list: ${industry.ctaKeywords.slice(0, 4).join(", ")}.`,
      fix: ["Add a clear CTA button near the top.", `Use wording like '${industry.ctaKeywords[0]}'.`, "Repeat the CTA after trust proof sections."],
    });
  }

  if (formFieldCount > 6) {
    findings.push({
      title: "Contact form may have too much friction",
      severity: "warning",
      category: "Request Path",
      explanation: `The scan found ${formFieldCount} form fields. Long forms can reduce quote or service requests, especially on mobile.`,
      evidence: `${formFieldCount} input/select/textarea fields were found in the homepage HTML.`,
      fix: ["Reduce the form to 4–5 key fields.", "Ask for more detail after the first contact.", "Add a clear 'what happens next' line under the form."],
    });
  }

  if (localSeoCount < 2) {
    findings.push({
      title: "Foundational local SEO signals may be light",
      severity: "warning",
      category: "Local Visibility",
      explanation: "The scan found limited local service keywords that help customers and search engines understand what you do.",
      evidence: `Only ${localSeoCount} foundational local visibility keyword(s) were found.`,
      fix: ["Add core service terms to the homepage.", "Create dedicated service pages.", "Add a short FAQ section for common local customer questions."],
    });
  }

  if (!hasCurrentYear && hasStaleYear) {
    findings.push({
      title: "Freshness signals may look stale",
      severity: "warning",
      category: "Freshness",
      explanation: "Older dates can make a business look less active, even if the company is still operating.",
      evidence: "Older year references were found, but no 2025/2026 freshness signal was confirmed.",
      fix: ["Update copyright and recent project sections.", "Remove outdated notices.", "Add a recent project or seasonal service update."],
    });
  }

  if (urgentCount === 0 && industry.id !== "landscaping") {
    findings.push({
      title: "Urgent-service language was not confirmed",
      severity: "warning",
      category: "Call Readiness",
      explanation: `For ${industry.label.toLowerCase()} businesses, urgent visitors often want to know if same-day or emergency help is available.`,
      evidence: `No urgent terms were found from this industry list: ${industry.urgentKeywords.slice(0, 4).join(", ")}.`,
      fix: ["Add emergency, same-day, or urgent-service wording only if you truly offer it.", "Place urgent-service wording near the phone number.", "Create a dedicated urgent-service page if it is a real service."],
    });
  }

  if (findings.length === 0) {
    findings.push({
      title: "No major preview leaks found",
      severity: "good",
      category: "Overall",
      explanation: "The basic scan found a clear service path, local signal, trust wording, and contact path. This site may not need a basic paid report.",
      evidence: "The homepage passed the main rule-based checks in this preview.",
      fix: ["Consider a deeper manual review only if you want a second opinion.", "Keep reviews, photos, and service pages current.", "Track call clicks and form submissions."],
    });
  }

  const rawScore = categories.reduce((sum, category) => sum + category.score, 0);
  let finalScore = Math.max(25, Math.min(99, rawScore));

  // Build 2B guardrails: do not let text-heavy pages score as elite unless they confirm the actual conversion basics.
  if (!hasPhone) finalScore = Math.min(finalScore, 69);
  if (hasPhone && !hasTelLink) finalScore = Math.min(finalScore, 79);
  if (hasBrokenCta) finalScore = Math.min(finalScore, 64);
  if (!hasBasicReviewProof) finalScore = Math.min(finalScore, 82);
  if (hasBasicReviewProof && !hasStrongReviewProof) finalScore = Math.min(finalScore, 86);
  if (phoneMayBeHidden) finalScore = Math.min(finalScore, 82);
  if (trustScore < 10) finalScore = Math.min(finalScore, 80);
  if (strongCtaCount === 0) finalScore = Math.min(finalScore, 82);
  if (trustScore < 10 && strongCtaCount === 0) finalScore = Math.min(finalScore, 78);

  const paidRecommendation = paidRecommendationFrom(finalScore, findings, "Live homepage preview");
  const localSeoGaps = [
    hasCity ? "City/service area was found in the scanned content." : "Add the main city or service area to the homepage headline or opening section.",
    localSeoCount >= 2 ? "Some foundational service keywords were found." : `Add service terms such as ${industry.localSeoKeywords.slice(0, 3).join(", ")}.`,
    serviceCount >= 3 ? "Multiple core services were found." : "Create or link to dedicated service pages for the top services.",
    /faq/i.test(text) ? "FAQ content appears to be present." : "Add a short FAQ section answering common local customer questions.",
  ];

  return {
    inputUrl: params.url,
    normalizedUrl,
    cityState: params.cityState,
    email: params.email,
    industry,
    score: finalScore,
    label: scoreLabel(finalScore),
    confidence: "Live homepage preview",
    findings: findings.slice(0, 5),
    categories,
    checkedAt: new Date().toISOString(),
    noSaleRecommended: paidRecommendation === "not-recommended",
    paidRecommendation,
    criticalLeakTitle: topCriticalTitle(findings),
    summary: recommendationText(paidRecommendation, industry),
    localSeoGaps,
    webPersonChecklist: commonWebPersonChecklist(industry),
    nextBestAction:
      paidRecommendation === "recommended"
        ? "Show the locked full report offer once payments are added."
        : paidRecommendation === "manual-review"
          ? "Run a deeper manual or Firecrawl review before charging."
          : "Do not push the paid report unless a deeper scan finds more meaningful issues.",
  };
}
