const industries = [
  {
    id: "roofing",
    label: "Roofing",
    pluralLabel: "Roofers",
    slug: "roofers",
    headline: "Is your roofing website leaking leads?",
    subheadline: "Find out if your roofing website is making it harder for homeowners to call, trust you, or request an estimate.",
    customerLabel: "homeowners",
    primaryKeywords: ["roofing", "roofer", "roof contractor", "roofing contractor"],
    serviceKeywords: ["roof repair", "roof replacement", "storm damage", "roof inspection", "commercial roofing", "residential roofing"],
    urgentKeywords: ["emergency roof", "storm damage", "leak repair", "hail damage", "24/7"],
    trustKeywords: ["gaf", "owens corning", "certainteed", "bbb", "licensed", "insured", "warranty", "reviews", "testimonials", "stars"],
    ctaKeywords: ["free estimate", "free inspection", "get a quote", "request a quote", "call now", "schedule inspection"],
    localSeoKeywords: ["roof repair", "roof replacement", "roofing contractor", "service area", "near me"],
    commonCriticalLeak: "No clear call or estimate path for urgent roofing visitors.",
    exampleFix: "Add a sticky mobile call button and a clear 'Get Free Roof Inspection' button near the top.",
  },
  {
    id: "plumbing",
    label: "Plumbing",
    pluralLabel: "Plumbers",
    slug: "plumbers",
    headline: "Is your plumbing website leaking service calls?",
    subheadline: "Find out if your plumbing website makes it easy for customers to call, book service, and trust you quickly.",
    customerLabel: "customers",
    primaryKeywords: ["plumbing", "plumber", "plumbing contractor"],
    serviceKeywords: ["drain cleaning", "water heater", "leak repair", "sewer", "toilet repair", "pipe repair"],
    urgentKeywords: ["emergency plumber", "24/7", "same day", "after hours", "burst pipe"],
    trustKeywords: ["licensed", "insured", "bbb", "upfront pricing", "warranty", "reviews", "testimonials", "stars", "guarantee"],
    ctaKeywords: ["schedule service", "book online", "call now", "request service", "free estimate", "same day service"],
    localSeoKeywords: ["plumber", "plumbing repair", "drain cleaning", "water heater", "service area"],
    commonCriticalLeak: "Emergency plumbing visitors do not see a fast call or schedule-service path.",
    exampleFix: "Add a prominent 'Call Now' button, same-day service language, and a short request-service form.",
  },
  {
    id: "electrical",
    label: "Electrical",
    pluralLabel: "Electricians",
    slug: "electricians",
    headline: "Is your electrical website making it harder for customers to call?",
    subheadline: "Find out if your electrician website clearly shows service, safety, licensing, and a quick request path.",
    customerLabel: "customers",
    primaryKeywords: ["electrician", "electrical", "electrical contractor"],
    serviceKeywords: ["panel upgrade", "ev charger", "lighting", "outlet", "generator", "electrical repair"],
    urgentKeywords: ["emergency electrician", "same day", "24/7", "power outage", "breaker"],
    trustKeywords: ["licensed", "insured", "certified", "bonded", "reviews", "testimonials", "stars", "safety"],
    ctaKeywords: ["schedule service", "call now", "request service", "get estimate", "book appointment"],
    localSeoKeywords: ["electrician", "electrical repair", "panel upgrade", "ev charger", "service area"],
    commonCriticalLeak: "Electrical service and licensing trust signals are not clear enough for a quick decision.",
    exampleFix: "Add licensed electrician language, a phone button, and a short list of key services near the top.",
  },
  {
    id: "hvac",
    label: "HVAC",
    pluralLabel: "HVAC Companies",
    slug: "hvac",
    headline: "Is your HVAC website losing repair and replacement leads?",
    subheadline: "Find out if your HVAC website makes AC, furnace, and emergency service customers comfortable enough to call.",
    customerLabel: "homeowners",
    primaryKeywords: ["hvac", "air conditioning", "heating", "furnace", "ac repair"],
    serviceKeywords: ["ac repair", "furnace repair", "hvac installation", "maintenance", "tune up", "heat pump"],
    urgentKeywords: ["emergency hvac", "same day", "24/7", "no heat", "no ac"],
    trustKeywords: ["licensed", "insured", "reviews", "testimonials", "stars", "financing", "warranty", "maintenance plan"],
    ctaKeywords: ["schedule service", "book online", "call now", "request service", "free estimate", "maintenance plan"],
    localSeoKeywords: ["ac repair", "furnace repair", "hvac contractor", "heating and cooling", "service area"],
    commonCriticalLeak: "Repair visitors do not see AC/furnace service and scheduling options quickly enough.",
    exampleFix: "Add AC repair, furnace repair, and 'Schedule Service' buttons near the top of the homepage.",
  },
  {
    id: "landscaping",
    label: "Landscaping",
    pluralLabel: "Landscapers",
    slug: "landscapers",
    headline: "Is your landscaping website losing quote requests?",
    subheadline: "Find out if your landscaping website shows enough project proof, local service clarity, and quote-request direction.",
    customerLabel: "property owners",
    primaryKeywords: ["landscaping", "landscaper", "lawn care", "landscape contractor"],
    serviceKeywords: ["landscape design", "lawn care", "hardscaping", "patio", "retaining wall", "maintenance"],
    urgentKeywords: ["seasonal", "weekly", "maintenance plan", "spring cleanup", "snow removal"],
    trustKeywords: ["reviews", "testimonials", "stars", "licensed", "insured", "portfolio", "before and after", "gallery"],
    ctaKeywords: ["free quote", "request quote", "schedule consultation", "call now", "get estimate"],
    localSeoKeywords: ["landscaping", "lawn care", "landscape design", "service area", "near me"],
    commonCriticalLeak: "Project photos and quote-request path are not clear enough to build trust quickly.",
    exampleFix: "Add before/after project photos, city labels, and a clear 'Request a Quote' button near the top.",
  },
  {
    id: "home-services",
    label: "Home Services",
    pluralLabel: "Home Service Businesses",
    slug: "home-services",
    headline: "Is your local service website leaking leads?",
    subheadline: "Find out if your website is making it harder for local customers to call, trust you, or request service.",
    customerLabel: "customers",
    primaryKeywords: ["service", "contractor", "repair", "installation", "maintenance"],
    serviceKeywords: ["free estimate", "repair", "installation", "maintenance", "service area"],
    urgentKeywords: ["emergency", "same day", "24/7", "fast service"],
    trustKeywords: ["licensed", "insured", "bbb", "reviews", "testimonials", "stars", "warranty", "guarantee"],
    ctaKeywords: ["call now", "free estimate", "request quote", "schedule service", "contact us"],
    localSeoKeywords: ["service area", "near me", "local", "repair", "contractor"],
    commonCriticalLeak: "Visitors may not see a clear reason to call or request service quickly.",
    exampleFix: "Add a clearer headline, visible phone number, trust proof, and short quote form near the top.",
  },
];

const phonePattern = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;

function getIndustryById(id) {
  return industries.find((industry) => industry.id === id) || industries[0];
}

function normalizeUrl(url) {
  const trimmed = String(url || "").trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function scoreLabel(score) {
  if (score >= 85) return "Strong lead path";
  if (score >= 70) return "Minor leaks found";
  if (score >= 50) return "Multiple lead leaks";
  return "Critical lead leaks";
}

function countMatches(content, keywords) {
  const lower = content.toLowerCase();
  return keywords.filter((keyword) => lower.includes(keyword.toLowerCase())).length;
}

function buildPreviewFromScrape({ url, cityState, email, industryId, html, title = "", description = "", finalUrl }) {
  const industry = getIndustryById(industryId);
  const normalizedUrl = finalUrl || normalizeUrl(url);
  const text = `${title} ${description} ${html}`;
  const lower = text.toLowerCase();
  const city = String(cityState || "").split(",")[0]?.trim().toLowerCase() || "";
  const hasPhone = phonePattern.test(text);
  const hasTelLink = /href=["']tel:/i.test(html);
  const primaryCount = countMatches(text, industry.primaryKeywords);
  const serviceCount = countMatches(text, industry.serviceKeywords);
  const urgentCount = countMatches(text, industry.urgentKeywords);
  const trustCount = countMatches(text, industry.trustKeywords);
  const ctaCount = countMatches(text, industry.ctaKeywords);
  const localSeoCount = countMatches(text, industry.localSeoKeywords);
  const hasCity = city.length > 1 && lower.includes(city);
  const hasCurrentYear = lower.includes("2026") || lower.includes("2025");
  const hasStaleYear = lower.includes("2020") || lower.includes("2021") || lower.includes("2022");
  const formFieldCount = (html.match(/<(input|textarea|select)\b/gi) || []).length;
  let score = 100;
  const findings = [];

  if (!hasPhone) {
    score -= 25;
    findings.push({ title: "Critical leak: phone number not found on the homepage", severity: "critical", explanation: `A local ${industry.label.toLowerCase()} customer should be able to call quickly. The scan did not find a phone number in the homepage content.`, fix: ["Add a phone number to the header.", "Make the number click-to-call.", "Add a mobile call button for urgent visitors."] });
  } else if (!hasTelLink) {
    score -= 12;
    findings.push({ title: "Phone number found, but click-to-call was not confirmed", severity: "warning", explanation: "Mobile visitors may have to copy/paste or manually dial instead of tapping once to call.", fix: ["Add a tel: link to every visible phone number.", "Use a clear 'Call Now' button.", "Test it on iPhone and Android."] });
  }

  if (primaryCount === 0) {
    score -= 18;
    findings.push({ title: `${industry.label} service clarity may be weak`, severity: "critical", explanation: `The scan did not find clear ${industry.label.toLowerCase()} wording in the homepage content. Visitors should know what you do within seconds.`, fix: [`Add '${industry.primaryKeywords[0]}' to the main headline.`, "Avoid using only a brand slogan in the first screen.", "List your core services near the top."] });
  } else if (serviceCount < 2) {
    score -= 8;
    findings.push({ title: "Core services may not be specific enough", severity: "warning", explanation: `The page mentions ${industry.label.toLowerCase()}, but the scan found limited specific service wording.`, fix: [`Mention services such as ${industry.serviceKeywords.slice(0, 3).join(", ")}.`, "Add links to dedicated service pages.", "Use customer-friendly service names."] });
  }

  if (!hasCity) {
    score -= 10;
    findings.push({ title: "City or service area was not clearly confirmed", severity: "warning", explanation: "Local visitors and search engines should quickly understand where the business works.", fix: ["Add the city to the homepage headline or intro.", "List nearby service areas.", "Add local project examples with city labels."] });
  }

  if (trustCount < 2) {
    score -= 16;
    findings.push({ title: "Trust proof appears thin or buried", severity: "warning", explanation: "The scan found limited reviews, certifications, warranty, licensing, or testimonial language on the homepage.", fix: ["Add a review or star-rating block near the top.", "Show licenses, insurance, warranties, or certifications.", "Add recent project proof or testimonials."] });
  }

  if (ctaCount === 0) {
    score -= 12;
    findings.push({ title: "No strong call-to-action found", severity: "warning", explanation: "The page should give ready-to-act visitors a clear next step, not just general information.", fix: ["Add a clear CTA button near the top.", `Use wording like '${industry.ctaKeywords[0]}'.`, "Repeat the CTA after trust proof sections."] });
  }

  if (formFieldCount > 6) {
    score -= 8;
    findings.push({ title: "Contact form may have too much friction", severity: "warning", explanation: `The scan found ${formFieldCount} form fields. Long forms can reduce quote or service requests, especially on mobile.`, fix: ["Reduce the form to 4–5 key fields.", "Ask for more detail after the first contact.", "Add a clear 'what happens next' line under the form."] });
  }

  if (localSeoCount < 2) {
    score -= 6;
    findings.push({ title: "Foundational local SEO signals may be light", severity: "warning", explanation: "The scan found limited local service keywords that help customers and search engines understand what you do.", fix: ["Add core service terms to the homepage.", "Create dedicated service pages.", "Add a short FAQ section for common local customer questions."] });
  }

  if (!hasCurrentYear && hasStaleYear) {
    score -= 8;
    findings.push({ title: "Freshness signals may look stale", severity: "warning", explanation: "Older dates can make a business look less active, even if the company is still operating.", fix: ["Update copyright and recent project sections.", "Remove outdated notices.", "Add a recent project or seasonal service update."] });
  }

  if (urgentCount === 0) score -= 3;

  if (findings.length === 0) {
    findings.push({ title: "No major preview leaks found", severity: "good", explanation: "The basic scan found a clear service path, local signal, trust wording, and contact path. This site may not need a basic paid report.", fix: ["Consider a deeper manual review only if you want a second opinion.", "Keep reviews, photos, and service pages current.", "Track call clicks and form submissions."] });
  }

  const finalScore = Math.max(25, Math.min(99, score));
  const strongOrMediumIssues = findings.filter((finding) => finding.severity !== "good").length;
  return {
    inputUrl: url,
    normalizedUrl,
    cityState,
    email,
    industry,
    score: finalScore,
    label: scoreLabel(finalScore),
    confidence: "Live homepage preview",
    findings: findings.slice(0, 4),
    checkedAt: new Date().toISOString(),
    noSaleRecommended: finalScore >= 85 && strongOrMediumIssues < 3,
    summary: finalScore >= 85 ? "The basic preview found a fairly strong lead path. A paid report should only be recommended if a deeper scan finds more meaningful issues." : "The basic preview found enough possible issues to justify a deeper paid report if the business wants exact fixes.",
  };
}

function extractMeta(html) {
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "";
  const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] || "";
  return { title, description };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { url, cityState, email, industryId } = req.body || {};
  if (!url || !cityState || !email) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const normalizedUrl = normalizeUrl(url);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 LeadLeakReportPreview/1.0",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      res.status(502).json({ error: `Could not fetch site. Status ${response.status}` });
      return;
    }

    const html = await response.text();
    const meta = extractMeta(html);
    const result = buildPreviewFromScrape({ url, cityState, email, industryId, html: html.slice(0, 300000), title: meta.title, description: meta.description, finalUrl: response.url });
    res.status(200).json(result);
  } catch (error) {
    clearTimeout(timeout);
    res.status(502).json({ error: "Could not read this website yet" });
  }
}
