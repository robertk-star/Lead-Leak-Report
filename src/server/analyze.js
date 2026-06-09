const industries = [
  { id: "roofing", label: "Roofing", pluralLabel: "Roofers", slug: "roofers", headline: "Is your roofing website leaking leads?", subheadline: "Find out if your roofing website is making it harder for homeowners to call, trust you, or request an estimate.", customerLabel: "homeowners", primaryKeywords: ["roofing", "roofer", "roof contractor", "roofing contractor"], serviceKeywords: ["roof repair", "roof replacement", "storm damage", "roof inspection", "commercial roofing", "residential roofing"], urgentKeywords: ["emergency roof", "storm damage", "leak repair", "hail damage", "24/7"], trustKeywords: ["gaf", "owens corning", "certainteed", "bbb", "licensed", "insured", "warranty", "reviews", "testimonials", "stars"], ctaKeywords: ["free estimate", "free inspection", "get a quote", "request a quote", "call now", "schedule inspection"], localSeoKeywords: ["roof repair", "roof replacement", "roofing contractor", "service area", "near me"], commonCriticalLeak: "No clear call or estimate path for urgent roofing visitors.", exampleFix: "Add a sticky mobile call button and a clear 'Get Free Roof Inspection' button near the top." },
  { id: "plumbing", label: "Plumbing", pluralLabel: "Plumbers", slug: "plumbers", headline: "Is your plumbing website leaking service calls?", subheadline: "Find out if your plumbing website makes it easy for customers to call, book service, and trust you quickly.", customerLabel: "customers", primaryKeywords: ["plumbing", "plumber", "plumbing contractor"], serviceKeywords: ["drain cleaning", "water heater", "leak repair", "sewer", "toilet repair", "pipe repair"], urgentKeywords: ["emergency plumber", "24/7", "same day", "after hours", "burst pipe"], trustKeywords: ["licensed", "insured", "bbb", "upfront pricing", "warranty", "reviews", "testimonials", "stars", "guarantee"], ctaKeywords: ["schedule service", "book online", "call now", "request service", "free estimate", "same day service"], localSeoKeywords: ["plumber", "plumbing repair", "drain cleaning", "water heater", "service area"], commonCriticalLeak: "Emergency plumbing visitors do not see a fast call or schedule-service path.", exampleFix: "Add a prominent 'Call Now' button, same-day service language, and a short request-service form." },
  { id: "electrical", label: "Electrical", pluralLabel: "Electricians", slug: "electricians", headline: "Is your electrical website making it harder for customers to call?", subheadline: "Find out if your electrician website clearly shows service, safety, licensing, and a quick request path.", customerLabel: "customers", primaryKeywords: ["electrician", "electrical", "electrical contractor"], serviceKeywords: ["panel upgrade", "ev charger", "lighting", "outlet", "generator", "electrical repair"], urgentKeywords: ["emergency electrician", "same day", "24/7", "power outage", "breaker"], trustKeywords: ["licensed", "insured", "certified", "bonded", "reviews", "testimonials", "stars", "safety"], ctaKeywords: ["schedule service", "call now", "request service", "get estimate", "book appointment"], localSeoKeywords: ["electrician", "electrical repair", "panel upgrade", "ev charger", "service area"], commonCriticalLeak: "Electrical service and licensing trust signals are not clear enough for a quick decision.", exampleFix: "Add licensed electrician language, a phone button, and a short list of key services near the top." },
  { id: "hvac", label: "HVAC", pluralLabel: "HVAC Companies", slug: "hvac", headline: "Is your HVAC website losing repair and replacement leads?", subheadline: "Find out if your HVAC website makes AC, furnace, and emergency service customers comfortable enough to call.", customerLabel: "homeowners", primaryKeywords: ["hvac", "air conditioning", "heating", "furnace", "ac repair"], serviceKeywords: ["ac repair", "furnace repair", "hvac installation", "maintenance", "tune up", "heat pump"], urgentKeywords: ["emergency hvac", "same day", "24/7", "no heat", "no ac"], trustKeywords: ["licensed", "insured", "reviews", "testimonials", "stars", "financing", "warranty", "maintenance plan"], ctaKeywords: ["schedule service", "book online", "call now", "request service", "free estimate", "maintenance plan"], localSeoKeywords: ["ac repair", "furnace repair", "hvac contractor", "heating and cooling", "service area"], commonCriticalLeak: "Repair visitors do not see AC/furnace service and scheduling options quickly enough.", exampleFix: "Add AC repair, furnace repair, and 'Schedule Service' buttons near the top of the homepage." },
  { id: "landscaping", label: "Landscaping", pluralLabel: "Landscapers", slug: "landscapers", headline: "Is your landscaping website losing quote requests?", subheadline: "Find out if your landscaping website shows enough project proof, local service clarity, and quote-request direction.", customerLabel: "property owners", primaryKeywords: ["landscaping", "landscaper", "lawn care", "landscape contractor"], serviceKeywords: ["landscape design", "lawn care", "hardscaping", "patio", "retaining wall", "maintenance"], urgentKeywords: ["seasonal", "weekly", "maintenance plan", "spring cleanup", "snow removal"], trustKeywords: ["reviews", "testimonials", "stars", "licensed", "insured", "portfolio", "before and after", "gallery"], ctaKeywords: ["free quote", "request quote", "schedule consultation", "call now", "get estimate"], localSeoKeywords: ["landscaping", "lawn care", "landscape design", "service area", "near me"], commonCriticalLeak: "Project photos and quote-request path are not clear enough to build trust quickly.", exampleFix: "Add before/after project photos, city labels, and a clear 'Request a Quote' button near the top." },
  { id: "home-services", label: "Home Services", pluralLabel: "Home Service Businesses", slug: "home-services", headline: "Is your local service website leaking leads?", subheadline: "Find out if your website is making it harder for local customers to call, trust you, or request service.", customerLabel: "customers", primaryKeywords: ["service", "contractor", "repair", "installation", "maintenance"], serviceKeywords: ["free estimate", "repair", "installation", "maintenance", "service area"], urgentKeywords: ["emergency", "same day", "24/7", "fast service"], trustKeywords: ["licensed", "insured", "bbb", "reviews", "testimonials", "stars", "warranty", "guarantee"], ctaKeywords: ["call now", "free estimate", "request quote", "schedule service", "contact us"], localSeoKeywords: ["service area", "near me", "local", "repair", "contractor"], commonCriticalLeak: "Visitors may not see a clear reason to call or request service quickly.", exampleFix: "Add a clearer headline, visible phone number, trust proof, and short quote form near the top." },
];

const phonePattern = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;
const getIndustryById = (id) => industries.find((industry) => industry.id === id) || industries[0];
const normalizeUrl = (url) => /^https?:\/\//i.test(String(url || "").trim()) ? String(url).trim() : `https://${String(url || "").trim()}`;
const scoreLabel = (score) => score >= 85 ? "Strong lead path" : score >= 70 ? "Minor leaks found" : score >= 50 ? "Multiple lead leaks" : "Critical lead leaks";
const countMatches = (content, keywords) => keywords.filter((keyword) => content.toLowerCase().includes(keyword.toLowerCase())).length;
const hasAny = (content, keywords) => countMatches(content, keywords) > 0;
const status = (score, max) => score / max >= 0.75 ? "strong" : score / max >= 0.45 ? "needs-review" : "critical";
const category = (key, label, score, max, note) => ({ key, label, score, max, status: status(score, max), note });
const topCriticalTitle = (findings) => findings.find((f) => f.severity === "critical")?.title || findings.find((f) => f.severity === "warning")?.title || "No critical leak found in the preview";
const paidRecommendationFrom = (score, findings, confidence) => {
  const criticalCount = findings.filter((finding) => finding.severity === "critical").length;
  const warningCount = findings.filter((finding) => finding.severity === "warning").length;
  if (criticalCount >= 1 || warningCount >= 3 || score < 78 || (warningCount >= 2 && score < 85)) return "recommended";
  if (confidence === "Basic preview") return "manual-review";
  return "not-recommended";
};
const recommendationText = (rec, industry) => rec === "recommended" ? `This preview found enough possible issues to justify a deeper ${industry.label.toLowerCase()} Lead Leak Report if the business wants exact fixes.` : rec === "manual-review" ? "The preview could not read enough of the website to confidently recommend a paid report. A manual review or stronger website scan should be used before charging." : "The preview did not find enough meaningful issues to confidently recommend a paid report. That no-sale rule protects trust.";
const checklist = (industry) => ["Make the main phone number click-to-call on mobile.", `Make the first headline clearly say ${industry.primaryKeywords[0]} and the main city/service area.`, `Add a clear ${industry.ctaKeywords[0]} button near the top of the page.`, "Add visible reviews, star ratings, or testimonials near the top.", "Add local project photos or service-area proof.", "Shorten forms to 4–5 fields where possible."];


const aiVisibilityLabel = (score) => score >= 85 ? "On-site AI readiness strong" : score >= 70 ? "On-site AI readiness mostly strong" : score >= 50 ? "On-site AI readiness gaps found" : "Major on-site AI readiness gaps";
const offsiteVisibilityLabel = (score) => score >= 85 ? "Off-site AI visibility verified strong" : score >= 70 ? "Off-site signals found — verify manually" : score >= 50 ? "Off-site visibility gaps found" : "Manual off-site verification needed";
const aiSignal = (label, status, note, fix) => ({ label, status, note, fix });

const safeUrlHost = (value = "") => {
  try {
    return new URL(value).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
};

const extractBusinessNameFromTitle = (title = "", domain = "") => {
  const cleaned = String(title || "")
    .split(/\s[-|•–—:]\s/)[0]
    .replace(/\b(home|homepage|official site|website)\b/gi, "")
    .trim();
  if (cleaned.length >= 3 && cleaned.length <= 80) return cleaned;
  const host = String(domain || "").replace(/^www\./, "").split(".")[0] || "Business";
  return host.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const compactSearchResult = (item = {}) => ({
  title: String(item.title || item.name || "").slice(0, 180),
  link: String(item.link || item.website || item.place_id || "").slice(0, 260),
  source: safeUrlHost(item.link || item.website || ""),
  snippet: String(item.snippet || item.description || item.address || "").slice(0, 280),
  rating: item.rating || item.reviews || item.reviews_original || null,
});

async function runSerpApiSearches({ businessName, cityState, industry, websiteUrl }) {
  const apiKey = process.env.SERPAPI_API_KEY || process.env.SERP_API_KEY;
  const configured = Boolean(apiKey);
  if (!configured) {
    return {
      configured: false,
      used: false,
      provider: "serpapi",
      queries: [],
      results: [],
      error: "SERPAPI_API_KEY is not configured.",
    };
  }

  const city = String(cityState || "").split(",")[0]?.trim() || cityState || "";
  const domain = safeUrlHost(websiteUrl);
  const industryQuery = industry.id === "home-services" ? "home service company" : industry.pluralLabel || industry.label;
  const rawQueries = [
    `${businessName} ${cityState}`,
    `${businessName} reviews`,
    `${businessName} BBB Facebook Angi Yelp`,
    `best ${industryQuery} in ${city || cityState}`,
    `${businessName} ${domain}`,
  ];
  const queries = [...new Set(rawQueries.map((query) => query.replace(/\s+/g, " ").trim()).filter(Boolean))].slice(0, 5);
  const results = [];
  const errors = [];

  for (const query of queries) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 14000);
    try {
      const params = new URLSearchParams({
        engine: "google",
        q: query,
        api_key: apiKey,
        num: "10",
      });
      const response = await fetch(`https://serpapi.com/search.json?${params.toString()}`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`SerpAPI returned ${response.status}: ${text.slice(0, 120)}`);
      }
      const payload = await response.json();
      const organic = Array.isArray(payload.organic_results) ? payload.organic_results.slice(0, 8).map(compactSearchResult) : [];
      const local = Array.isArray(payload.local_results?.places) ? payload.local_results.places.slice(0, 5).map(compactSearchResult) : [];
      const place = payload.place_results ? [compactSearchResult(payload.place_results)] : [];
      const knowledge = payload.knowledge_graph ? [compactSearchResult(payload.knowledge_graph)] : [];
      results.push({ query, organic, local, place, knowledge });
    } catch (error) {
      errors.push(`${query}: ${error instanceof Error ? error.message : "Search failed"}`);
    } finally {
      clearTimeout(timeout);
    }
  }

  return {
    configured: true,
    used: results.length > 0,
    provider: "serpapi",
    queries,
    results,
    error: errors.slice(0, 3).join(" | "),
  };
}

function evaluateSearchEvidence({ searchData, businessName, cityState, industry, websiteUrl }) {
  const domain = safeUrlHost(websiteUrl);
  const businessTokens = String(businessName || "").toLowerCase().split(/\s+/).filter((token) => token.length > 2).slice(0, 4);
  const allResults = (searchData.results || []).flatMap((group) => [
    ...(group.place || []).map((item) => ({ ...item, query: group.query, kind: "place" })),
    ...(group.local || []).map((item) => ({ ...item, query: group.query, kind: "local" })),
    ...(group.knowledge || []).map((item) => ({ ...item, query: group.query, kind: "knowledge" })),
    ...(group.organic || []).map((item) => ({ ...item, query: group.query, kind: "organic" })),
  ]);
  const haystack = allResults.map((item) => `${item.title} ${item.source} ${item.snippet} ${item.link}`).join("\n").toLowerCase();
  const resultMatchesBrand = (item) => {
    const text = `${item.title} ${item.snippet} ${item.link}`.toLowerCase();
    return businessTokens.length ? businessTokens.some((token) => text.includes(token)) : false;
  };
  const domainResults = allResults.filter((item) => domain && (item.source === domain || item.link.toLowerCase().includes(domain)));
  const brandResults = allResults.filter(resultMatchesBrand);
  const googleBusinessFound = allResults.some((item) => ["place", "local", "knowledge"].includes(item.kind) && resultMatchesBrand(item));
  const reviewSources = [
    ["Google/local result", googleBusinessFound],
    ["BBB", /bbb\.org|better business bureau/i.test(haystack)],
    ["Facebook", /facebook\.com/i.test(haystack)],
    ["Angi/HomeAdvisor/Thumbtack", /angi\.com|homeadvisor\.com|thumbtack\.com/i.test(haystack)],
    ["Yelp", /yelp\.com/i.test(haystack)],
    ["BirdEye", /birdeye\.com/i.test(haystack)],
  ].filter(([, found]) => found).map(([label]) => label);
  const editorialSources = allResults.filter((item) => /expertise\.com|cityview|best of|top .* in|best .* in|forbes|this old house|angi\.com\/articles/i.test(`${item.title} ${item.source} ${item.snippet}`));
  const manufacturerSources = allResults.filter((item) => /gaf\.com|owenscorning\.com|certainteed\.com|iko\.com|tamko\.com/i.test(`${item.link} ${item.source} ${item.snippet}`));
  const entityMismatchTerms = ["construction", "exteriors", "remodeling", "siding"];
  const mismatchHits = brandResults.filter((item) => entityMismatchTerms.some((term) => `${item.title} ${item.snippet}`.toLowerCase().includes(term)) && industry.id === "roofing" && !String(businessName).toLowerCase().includes("construction"));
  const differentiatorRegex = /(one[- ]day|same[- ]day|24\/7|top 1%|platinum|master elite|select shinglemaster|\d+\+? years|thousands of|award[- ]winning|best of|family owned|locally owned)/i;
  const differentiatorFound = allResults.find((item) => differentiatorRegex.test(`${item.title} ${item.snippet}`));

  let gbpScore = googleBusinessFound ? 24 : 0;
  let reviewScore = Math.min(24, reviewSources.length * 5 + (googleBusinessFound ? 6 : 0));
  let citationScore = Math.min(18, brandResults.length * 2 + domainResults.length * 2 + reviewSources.length * 2);
  let editorialScore = Math.min(16, editorialSources.length * 8);
  let manufacturerScore = Math.min(8, manufacturerSources.length * 4);
  let entityScore = Math.min(10, (domainResults.length ? 5 : 0) + (brandResults.length >= 3 ? 3 : brandResults.length ? 1 : 0) + (mismatchHits.length ? -4 : 2));
  let differentiatorScore = differentiatorFound ? 8 : 0;

  let score = Math.max(0, Math.min(100, gbpScore + reviewScore + citationScore + editorialScore + manufacturerScore + entityScore + differentiatorScore));
  if (!googleBusinessFound) score = Math.min(score, 58);
  if (!reviewSources.length) score = Math.min(score, 54);
  if (!domainResults.length) score = Math.min(score, 72);
  if (mismatchHits.length) score = Math.min(score, 52);

  const evidence = [
    {
      label: "Search queries run",
      status: searchData.used ? "found" : "not-found",
      detail: (searchData.queries || []).join(" | "),
    },
    {
      label: "Google Business Profile / local pack",
      status: googleBusinessFound ? "found" : "not-found",
      detail: googleBusinessFound ? "A matching local/knowledge result appeared in the live search results." : "No matching local/knowledge result was confirmed from the live search results.",
    },
    {
      label: "Review platforms found",
      status: reviewSources.length ? "found" : "not-found",
      detail: reviewSources.length ? reviewSources.join(", ") : "No major review platform result was confirmed from the live search results.",
    },
    {
      label: "Editorial / best-of mentions",
      status: editorialSources.length ? "found" : "needs-review",
      detail: editorialSources.length ? editorialSources.slice(0, 3).map((item) => item.title || item.source).join(" | ") : "No best-of/editorial result was confirmed in the live search results.",
    },
    {
      label: "Brand/business name consistency",
      status: mismatchHits.length ? "needs-review" : domainResults.length || brandResults.length ? "found" : "not-found",
      detail: mismatchHits.length ? `Possible name/entity mismatch in search results: ${mismatchHits.slice(0, 2).map((item) => item.title).join(" | ")}` : domainResults.length ? `Official domain found in ${domainResults.length} result(s).` : "Official domain was not confirmed in the live search result set.",
    },
    {
      label: "Manufacturer / trade directory presence",
      status: manufacturerSources.length ? "found" : "needs-review",
      detail: manufacturerSources.length ? manufacturerSources.slice(0, 3).map((item) => item.source || item.title).join(" | ") : "No manufacturer/trade directory result was confirmed in the live search results.",
    },
    {
      label: "Clear reason to choose this company",
      status: differentiatorFound ? "found" : "needs-review",
      detail: differentiatorFound ? `${differentiatorFound.title}: ${differentiatorFound.snippet}`.slice(0, 260) : "No clear proof-based differentiator was confirmed in live search snippets.",
    },
  ];

  const signals = [
    aiSignal("Google Business Profile visibility", googleBusinessFound ? "strong" : "missing", googleBusinessFound ? "Live search found a matching local/knowledge result." : "Live search did not confirm a matching Google Business Profile/local result.", "Verify the Google Business Profile exists under the same business name, points to this website, and has visible reviews."),
    aiSignal("Review platform consistency", reviewSources.length >= 3 && !mismatchHits.length ? "strong" : reviewSources.length ? "needs-review" : "missing", reviewSources.length ? `Live search found: ${reviewSources.join(", ")}.` : "Live search did not confirm major review-platform results.", "Make sure Google, BBB, Facebook, Angi, Yelp, BirdEye, and other review profiles use the same business name, phone, website, and service area."),
    aiSignal("Editorial / best-of citations", editorialSources.length ? "strong" : "missing", editorialSources.length ? "Live search found editorial/best-of style mentions." : "No editorial/best-of mention was confirmed in live search results.", `Pursue credible local best-of lists, trade directories, awards, and “best ${industry.pluralLabel || industry.label} in ${String(cityState).split(",")[0] || "your city"}” pages that AI tools may cite.`),
    aiSignal("Third-party citation footprint", brandResults.length >= 6 ? "strong" : brandResults.length >= 2 ? "needs-review" : "missing", `Live search found ${brandResults.length} brand-related result(s) and ${domainResults.length} official-domain result(s).`, "Build and link trusted profiles such as Google Business Profile, BBB, Facebook, Yelp, Angi/HomeAdvisor/Thumbtack, manufacturer directories, and local chamber/trade listings."),
    aiSignal("Schema / sameAs entity alignment", "needs-review", "Live search helps confirm outside sources; schema/sameAs must still be checked on the site.", "Add LocalBusiness/ProfessionalService schema with sameAs links to official review, social, and directory profiles."),
    aiSignal("Clear reason to choose this company", differentiatorFound ? "strong" : "needs-review", differentiatorFound ? "Live search found a proof-style differentiator in search snippets." : "Live search did not confirm a concise differentiator AI tools could repeat.", "State one clear proof-based differentiator in website text that search and AI tools can read and reinforce it across Google Business Profile, reviews, directories, and editorial sources."),
  ];

  const gaps = signals.filter((signal) => signal.status !== "strong").map((signal) => signal.fix);
  if (mismatchHits.length) gaps.unshift("Possible entity mismatch: search results may associate reviews or profiles with a different business name. Consolidate listings under one entity.");
  if (!googleBusinessFound) gaps.unshift("Verify or create a Google Business Profile under the exact same business name used on the website.");

  return {
    score,
    label: offsiteVisibilityLabel(score),
    summary: searchData.used
      ? "We checked outside websites for signs that confirm this business, including Google Business Profile, review sites, trusted mentions, awards or best-company lists, business name consistency, and clear reasons customers might choose this company."
      : "Outside-web checking did not return enough usable information. A manual check of Google Business Profile, reviews, trusted websites, and business name consistency is still needed.",
    signals,
    gaps: gaps.slice(0, 7),
    note: "This is still an AI and online visibility score. It uses live search evidence, but it does not guarantee ChatGPT, Gemini, Copilot, Google AI, rankings, traffic, calls, leads, or revenue.",
    evidence,
    searchProvider: "serpapi",
    searchQueries: searchData.queries || [],
    liveChecked: true,
    configured: true,
  };
}

function mergeOffsiteWithSearch(result, searchData) {
  result.serpapiConfigured = Boolean(searchData.configured);
  result.serpapiUsed = Boolean(searchData.used);
  if (searchData.error) result.serpapiError = searchData.error;

  if (!searchData.used) {
    result.offsiteVisibility = {
      ...(result.offsiteVisibility || {}),
      evidence: [
        {
          label: "Outside-web check status",
          status: searchData.configured ? "needs-review" : "not-found",
          detail: searchData.configured ? `The outside-web check returned no usable results. ${searchData.error || ""}` : "Outside-web checks are not enabled yet, so Google Business Profile, reviews, and trusted website mentions were not fully checked.",
        },
      ],
      searchProvider: "serpapi",
      searchQueries: searchData.queries || [],
      liveChecked: false,
      configured: Boolean(searchData.configured),
    };
    result.overallAiVisibility = {
      ...(result.overallAiVisibility || {}),
      summary: `${result.overallAiVisibility?.summary || ""} Outside-web checking was not completed for this run.`.trim(),
    };
    return result;
  }

  const domain = safeUrlHost(result.normalizedUrl || result.inputUrl || "");
  const businessName = extractBusinessNameFromTitle(result.siteTitle || "", domain);
  const liveOffsite = evaluateSearchEvidence({
    searchData,
    businessName,
    cityState: result.cityState,
    industry: result.industry,
    websiteUrl: result.normalizedUrl || result.inputUrl,
  });

  result.offsiteVisibility = liveOffsite;
  let overallAiVisibilityScore = Math.round((Number(result.aiVisibility?.score || 0) * 0.35) + (liveOffsite.score * 0.65));
  if (liveOffsite.score < 65) overallAiVisibilityScore = Math.min(overallAiVisibilityScore, 68);
  if (liveOffsite.score < 50) overallAiVisibilityScore = Math.min(overallAiVisibilityScore, 58);
  result.overallAiVisibility = {
    score: overallAiVisibilityScore,
    label: overallAiVisibilityScore >= 85 ? "Overall AI visibility verified strong" : overallAiVisibilityScore >= 70 ? "Overall AI visibility mostly ready" : overallAiVisibilityScore >= 50 ? "Overall AI visibility gaps found" : "Major overall AI visibility gaps",
    summary: "This combines what the website says with what trusted outside websites appear to confirm. Outside proof matters because AI and search tools often rely on Google Business Profile, reviews, trusted mentions, awards, and consistent business information.",
  };

  const offsiteFindings = [];
  const gbp = liveOffsite.evidence.find((item) => item.label.includes("Google Business"));
  const entity = liveOffsite.evidence.find((item) => item.label.includes("Brand/entity"));
  const editorial = liveOffsite.evidence.find((item) => item.label.includes("Editorial"));
  if (gbp?.status === "not-found") {
    offsiteFindings.push({
      title: "Live search did not confirm a Google Business Profile",
      severity: "warning",
      category: "Online Reputation & AI Visibility",
      explanation: "AI/search systems often rely on local profile and review signals when recommending service businesses.",
      evidence: gbp.detail,
      fix: ["Verify the Google Business Profile exists under the same business name.", "Make sure the profile links to the website.", "Build reviews under the same entity name."],
    });
  }
  if (entity?.status === "needs-review") {
    offsiteFindings.push({
      title: "Possible brand/business name consistency issue found in live search",
      severity: "warning",
      category: "Online Reputation & AI Visibility",
      explanation: "If reviews or citations are attached to a different business name, AI tools may not connect them to the website cleanly.",
      evidence: entity.detail,
      fix: ["Consolidate public profiles under one business name.", "Use the same website, phone, and service area across profiles.", "Add sameAs schema links to official profiles."],
    });
  }
  if (editorial?.status !== "found") {
    offsiteFindings.push({
      title: "No best-of/editorial citation confirmed in live search",
      severity: "warning",
      category: "Online Reputation & AI Visibility",
      explanation: "Editorial and best-of pages can be cited by AI answer engines when users ask who to hire.",
      evidence: editorial?.detail || "No editorial result found.",
      fix: ["Pitch local best-of lists and awards.", "Build manufacturer/trade directory listings.", "Create proof-based content that makes the business easier to cite."],
    });
  }

  result.findings = [...offsiteFindings, ...(result.findings || [])].slice(0, 6);
  result.criticalLeakTitle = topCriticalTitle(result.findings);
  return result;
}
function buildAiVisibilityReadiness({ industry, visibleContent, html, text, title, description, city, hasCity, hasPhone, hasTelLink, primaryCount, serviceCount, urgentCount, localSeoCount, hasBasicReviewProof, hasStrongReviewProof, hasCertificationProof, hasProjectProof, hasFamilyLocalProof, hasCurrentYear, hasStaleYear }) {
  const lowerText = `${visibleContent} ${html}`.toLowerCase();
  const hasTitleOrMeta = String(title || description || "").trim().length > 20;
  const hasAboutLink = /href=["'][^"']*about|>\s*about\s*</i.test(html) || /\babout us\b/i.test(visibleContent);
  const hasContactLink = /href=["'][^"']*contact|>\s*contact\s*</i.test(html) || /\bcontact us\b/i.test(visibleContent);
  const hasFaq = /\bfaq\b|frequently asked/i.test(text);
  const hasSchema = /application\/ld\+json|schema\.org|LocalBusiness|Organization|ProfessionalService|HomeAndConstructionBusiness|RoofingContractor|Plumber|Electrician|HVACBusiness/i.test(html);
  const hasSitemapOrRobotsLink = /sitemap\.xml|robots\.txt/i.test(html);
  const thirdPartyMatches = lowerText.match(/(google\.com\/maps|g\.page|maps\.app\.goo\.gl|facebook\.com|bbb\.org|yelp\.com|angi\.com|homeadvisor\.com|thumbtack\.com|gaf\.com|owenscorning\.com|certainteed\.com|instagram\.com|linkedin\.com|youtube\.com)/g) || [];
  const uniqueThirdParty = Array.from(new Set(thirdPartyMatches)).length;
  const servicePageMatches = (html.match(/href=["'][^"']*(roof|plumb|electric|hvac|heating|cooling|landscap|service|repair|replacement|installation|estimate|quote)[^"']*["']/gi) || []).length;
  const hasServiceAreaLanguage = /service area|areas served|serving|nearby|surrounding areas|county|neighborhood|zip/i.test(text);
  const hasAddressSignal = /\b\d{2,6}\s+[a-z0-9 .'-]+\s+(street|st\.?|road|rd\.?|avenue|ave\.?|drive|dr\.?|lane|ln\.?|boulevard|blvd\.?|way|court|ct\.?)\b/i.test(text);
  const crawlableWordCount = visibleContent.split(/\s+/).filter(Boolean).length;

  let entityScore = 0;
  if (primaryCount > 0) entityScore += 6;
  if (hasCity) entityScore += 5;
  if (hasPhone) entityScore += 4;
  if (hasContactLink) entityScore += 3;
  if (hasTitleOrMeta) entityScore += 2;

  let serviceScore = 0;
  if (serviceCount >= 3) serviceScore += 8;
  else if (serviceCount >= 1) serviceScore += 4;
  if (servicePageMatches >= 3) serviceScore += 5;
  else if (servicePageMatches >= 1) serviceScore += 2;
  if (localSeoCount >= 2) serviceScore += 4;
  else if (localSeoCount >= 1) serviceScore += 2;
  if (urgentCount > 0) serviceScore += 3;

  let trustScore = 0;
  if (hasStrongReviewProof) trustScore += 7;
  else if (hasBasicReviewProof) trustScore += 4;
  if (hasCertificationProof) trustScore += 6;
  if (hasProjectProof) trustScore += 4;
  if (hasFamilyLocalProof) trustScore += 3;
  if (uniqueThirdParty >= 2) trustScore += 5;
  else if (uniqueThirdParty === 1) trustScore += 2;

  let crawlScore = 0;
  if (crawlableWordCount >= 600) crawlScore += 7;
  else if (crawlableWordCount >= 250) crawlScore += 4;
  if (hasSchema) crawlScore += 5;
  if (hasAboutLink) crawlScore += 2;
  if (hasContactLink) crawlScore += 2;
  if (hasFaq) crawlScore += 2;
  if (hasCurrentYear || !hasStaleYear) crawlScore += 2;

  let footprintScore = 0;
  if (uniqueThirdParty >= 3) footprintScore += 7;
  else if (uniqueThirdParty >= 1) footprintScore += 4;
  if (hasServiceAreaLanguage) footprintScore += 4;
  if (hasAddressSignal || hasCity) footprintScore += 4;

  entityScore = Math.min(20, entityScore);
  serviceScore = Math.min(20, serviceScore);
  trustScore = Math.min(25, trustScore);
  crawlScore = Math.min(20, crawlScore);
  footprintScore = Math.min(15, footprintScore);

  let score = entityScore + serviceScore + trustScore + crawlScore + footprintScore;
  if (!hasCity) score = Math.min(score, 72);
  if (primaryCount === 0) score = Math.min(score, 68);
  if (!hasPhone && !hasContactLink) score = Math.min(score, 66);
  if (!hasBasicReviewProof && !hasCertificationProof) score = Math.min(score, 78);
  if (crawlableWordCount < 200) score = Math.min(score, 62);

  const signals = [
    aiSignal("Entity clarity", entityScore >= 15 ? "strong" : entityScore >= 9 ? "needs-review" : "missing", entityScore >= 15 ? "Business type, location, and contact signals are clear enough for AI/search systems to understand the company." : "The site may not clearly connect business type, location, and contact details in one crawlable place.", "Make the homepage title, headline, phone, and contact page clearly identify the business, service type, and city."),
    aiSignal("Service clarity", serviceScore >= 15 ? "strong" : serviceScore >= 8 ? "needs-review" : "missing", serviceScore >= 15 ? "Specific service terms and/or service-page links were found." : `AI tools may need clearer service detail for ${industry.label.toLowerCase()} work.`, `Add crawlable service sections/pages for ${industry.serviceKeywords.slice(0, 4).join(", ")}.`),
    aiSignal("Trust and citation readiness", trustScore >= 18 ? "strong" : trustScore >= 9 ? "needs-review" : "missing", trustScore >= 18 ? "Review, credential, project, or third-party trust signals were found." : "The site may not provide enough visible proof for an AI answer to confidently describe why the company is trustworthy.", "Add review source/count, certifications, warranties, project proof, and links to trusted third-party profiles."),
    aiSignal("Crawlable content", crawlScore >= 15 ? "strong" : crawlScore >= 8 ? "needs-review" : "missing", crawlScore >= 15 ? "The homepage appears to include enough website text that search and AI tools can read and support pages/signals." : "Important information may be too thin, image-based, or missing structured context.", "Add plain text service summaries, FAQ content, About/Contact links, and LocalBusiness schema where possible."),
    aiSignal("Local footprint", footprintScore >= 11 ? "strong" : footprintScore >= 6 ? "needs-review" : "missing", footprintScore >= 11 ? "Local/service-area and third-party footprint signals were found." : "AI systems may have limited external/local context for this business from the website alone.", "Add service areas, local project examples, and links to Google Business Profile, BBB, Facebook, and relevant trade/manufacturer profiles."),
  ];

  const gaps = signals.filter((signal) => signal.status !== "strong").map((signal) => signal.fix);
  if (gaps.length === 0) gaps.push("Keep AI visibility signals current with recent projects, reviews, service pages, and local proof.");

  return {
    score,
    label: aiVisibilityLabel(score),
    summary: score >= 85
      ? "The site appears to provide strong basic signals for AI/search systems to understand the business. This does not guarantee recommendations, but the foundation looks solid."
      : score >= 70
        ? "The site has some useful AI visibility signals, but a few gaps may limit how confidently AI/search systems understand services, location, or trust."
        : "The site has meaningful AI visibility gaps. It may not give AI/search tools enough clear business, service, location, trust, and crawlability signals.",
    signals,
    gaps: gaps.slice(0, 5),
    note: "Website AI Readiness does not test live rankings in ChatGPT, Gemini, Copilot, or Google AI. It checks whether the website provides the basic signals those systems can use when understanding local businesses.",
  };
}

function buildOffsiteVisibilityReadiness({ industry, visibleContent, html, text, title, city, hasCity, hasBasicReviewProof, hasStrongReviewProof, hasCertificationProof, hasProjectProof, hasFamilyLocalProof }) {
  const fullText = `${visibleContent} ${html} ${title || ""}`;
  const lowerText = fullText.toLowerCase();
  const domainName = String((html.match(/https?:\/\/([^\/"' ]+)/i) || [])[1] || "").replace(/^www\./, "");

  const profilePatterns = {
    google: /(google\.com\/maps|maps\.app\.goo\.gl|g\.page|google business|google reviews)/i,
    bbb: /bbb\.org|better business bureau/i,
    facebook: /facebook\.com/i,
    angi: /angi\.com|homeadvisor\.com|thumbtack\.com/i,
    yelp: /yelp\.com/i,
    manufacturer: /(gaf\.com|owenscorning\.com|certainteed\.com|iko\.com|tamko\.com)/i,
    social: /(instagram\.com|linkedin\.com|youtube\.com|x\.com|twitter\.com)/i,
    editorial: /(best of|top rated|award|awards|expertise\.com|cityview|best roofers|best plumbers|best electricians|best hvac|best landscapers)/i,
  };

  const profileHits = Object.entries(profilePatterns)
    .filter(([, pattern]) => pattern.test(lowerText))
    .map(([key]) => key);

  const hasSameAs = /"sameAs"|sameas/i.test(html);
  const hasLocalBusinessSchema = /localbusiness|organization|professionalservice|homeandconstructionbusiness|roofingcontractor|plumber|electrician|hvacbusiness/i.test(html);
  const hasReviewSchema = /aggregaterating|reviewrating|review/i.test(html) && /application\/ld\+json|schema\.org/i.test(html);
  const hasDifferentiator = /(one[- ]day|same[- ]day|24\/7|top 1%|platinum|master elite|select shinglemaster|\d+\+? years|thousands of|award[- ]winning|family owned|locally owned)/i.test(fullText);
  const hasBrandMismatchRisk = /(construction|exteriors|siding|remodeling)/i.test(title || "") && industry.id === "roofing" && /roofing/i.test(visibleContent);

  let gbpScore = 0;
  if (profilePatterns.google.test(lowerText)) gbpScore += 18;
  else if (/google/i.test(lowerText) && hasStrongReviewProof) gbpScore += 10;

  let reviewConsistencyScore = 0;
  if (hasStrongReviewProof) reviewConsistencyScore += 12;
  else if (hasBasicReviewProof) reviewConsistencyScore += 7;
  if (profilePatterns.bbb.test(lowerText) || profilePatterns.facebook.test(lowerText) || profilePatterns.angi.test(lowerText) || profilePatterns.yelp.test(lowerText)) reviewConsistencyScore += 8;
  if (hasBrandMismatchRisk) reviewConsistencyScore = Math.min(reviewConsistencyScore, 8);

  let citationScore = 0;
  citationScore += Math.min(20, profileHits.length * 4);
  if (profilePatterns.editorial.test(lowerText)) citationScore += 8;
  if (profilePatterns.manufacturer.test(lowerText)) citationScore += 5;

  let entityScore = 0;
  if (hasCity) entityScore += 6;
  if (hasFamilyLocalProof) entityScore += 4;
  if (hasCertificationProof) entityScore += 4;
  if (hasDifferentiator) entityScore += 5;
  if (domainName) entityScore += 2;
  if (hasBrandMismatchRisk) entityScore = Math.min(entityScore, 8);

  let schemaScore = 0;
  if (hasLocalBusinessSchema) schemaScore += 8;
  if (hasSameAs) schemaScore += 7;
  if (hasReviewSchema) schemaScore += 5;

  let score = Math.min(100, gbpScore + reviewConsistencyScore + citationScore + entityScore + schemaScore);
  const hasGoogleProfileSignal = profilePatterns.google.test(lowerText);
  const hasStrongLinkedEntityFootprint = hasGoogleProfileSignal && hasSameAs && profileHits.length >= 3 && (hasStrongReviewProof || hasReviewSchema);
  // Build 6A calibration: this is NOT a live SERP/GBP/review-platform check yet.
  // Be intentionally conservative until Build 7 adds a search API.
  if (!hasStrongLinkedEntityFootprint) score = Math.min(score, 64);
  if (!hasGoogleProfileSignal) score = Math.min(score, 48);
  if (!profileHits.length) score = Math.min(score, 40);
  if (!hasSameAs) score = Math.min(score, 55);
  if (hasBrandMismatchRisk) score = Math.min(score, 45);

  const signal = (label, points, strongAt, fix, noteOverride) => ({
    label,
    status: points >= strongAt ? "strong" : points > 0 ? "needs-review" : "missing",
    note: noteOverride || (points >= strongAt ? "Strong off-site/entity signal found from the website or linked profiles." : "This off-site/entity signal should be verified before claiming AI visibility strength."),
    fix,
  });

  const signals = [
    signal(
      "Manual off-site checks needed",
      1,
      99,
      "Before using this as a true off-site AI visibility score, manually verify Google Business Profile, review platforms, best-of/editorial lists, manufacturer/trade directories, and brand-name consistency.",
      "Build 6A is conservative: it reviews linked/exposed entity signals from the website, but it does not yet run live Google, Maps, review-platform, or AI-search queries."
    ),
    signal(
      "Google Business Profile visibility",
      gbpScore,
      16,
      "Verify the Google Business Profile exists under the same business name, points to this website, and has visible reviews.",
      gbpScore >= 16 ? "Google/GBP-style signals were found from the website content or links." : "No strong Google Business Profile signal was confirmed from the website scan."
    ),
    signal(
      "Review platform consistency",
      reviewConsistencyScore,
      18,
      "Make sure Google, BBB, Facebook, Angi, Yelp, BirdEye, and other review profiles use the same business name, phone, website, and service area.",
      hasBrandMismatchRisk ? "Possible brand/entity mismatch risk: the website brand may not match all off-site review profiles or service names." : undefined
    ),
    signal(
      "Editorial / best-of citations",
      profilePatterns.editorial.test(lowerText) ? 18 : 0,
      16,
      `Pursue local best-of lists, trade directories, awards, and “best ${industry.pluralLabel || industry.label} in ${city || "your city"}” pages that AI tools may cite.`
    ),
    signal(
      "Third-party citation footprint",
      citationScore,
      18,
      "Add and link trusted profiles such as Google Business Profile, BBB, Facebook, Yelp, Angi/HomeAdvisor/Thumbtack, manufacturer directories, and local chamber/trade listings."
    ),
    signal(
      "Schema / sameAs entity alignment",
      schemaScore,
      15,
      "Add LocalBusiness/ProfessionalService schema with sameAs links to official review, social, and directory profiles. Add AggregateRating/Review schema only when accurate and policy-compliant."
    ),
    signal(
      "Clear reason to choose this company",
      hasDifferentiator ? 12 : 0,
      10,
      "State one clear proof-based differentiator in website text that search and AI tools can read, such as review count, years in business, certification level, award, one-day service, emergency service, or warranty."
    ),
  ];

  const gaps = signals.filter((item) => item.status !== "strong").map((item) => item.fix);
  if (hasBrandMismatchRisk) {
    gaps.unshift("Possible entity mismatch: verify that review platforms, directory listings, and public profiles use the same business name as the website.");
  }
  if (!hasGoogleProfileSignal) {
    gaps.unshift("Verify or create a Google Business Profile under the exact same business name used on the website.");
  }
  if (!gaps.length) gaps.push("Keep off-site entity signals current across Google, reviews, directories, awards, manufacturer profiles, and matching profile links and behind-the-scenes website markup.");

  return {
    score,
    label: offsiteVisibilityLabel(score),
    summary: score >= 80
      ? "The website exposes several off-site/entity signals, but this still needs live search verification before calling it strong."
      : score >= 60
        ? "Some off-site/entity signals were found on the website, but Google Business Profile, review-platform consistency, citations, awards, and behind-the-scenes website markup alignment still need manual verification."
        : "Off-site AI visibility is weak, unverified, or not exposed from the website scan. The business should verify Google Business Profile, review platforms, citations, awards, and business name consistency before expecting AI tools to confidently recommend it.",
    signals,
    gaps: gaps.slice(0, 6),
    note: "Build 6A does not run live ChatGPT, Gemini, Copilot, Google, Maps, or review-platform searches. This conservative score checks only off-site/entity signals exposed by the website and flags what must be manually verified.",
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

function buildPreviewFromScrape({ url, cityState, email, industryId, html, visibleText = "", title = "", description = "", finalUrl }) {
  const industry = getIndustryById(industryId);
  const normalizedUrl = finalUrl || normalizeUrl(url);
  const visibleContent = `${title || ""} ${description || ""} ${visibleText || stripHtmlForVisibleText(html)}`;
  const text = `${visibleContent} ${html}`;
  const lower = visibleContent.toLowerCase();
  const city = String(cityState || "").split(",")[0]?.trim().toLowerCase() || "";

  const phoneMatch = visibleContent.match(phonePattern);
  const phoneIndex = phoneMatch?.index ?? -1;
  const hasPhoneVisible = phoneIndex >= 0;
  const hasPhoneInHtml = phonePattern.test(html);
  const hasTelLink = /href=["']tel:/i.test(html);
  const hasPhone = hasPhoneVisible || (hasTelLink && hasPhoneInHtml) || hasPhoneInHtml;
  const phoneMayBeHidden = hasPhoneInHtml && !hasPhoneVisible;
  // Build 2D: a phone number buried in the footer/contact area is not the same as a first-screen call path.
  // Firecrawl reads the whole homepage, so we use the phone's position in the extracted text as a practical prominence signal.
  const phoneAppearsLate = hasPhoneVisible && phoneIndex > 1400;
  const hasPhoneProminent = hasPhoneVisible && phoneIndex <= 1400;
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
  const formFieldCount = (html.match(/<(input|textarea|select)\b/gi) || []).length;

  const hasBrokenCta = /href=["']\s*(#|<>|javascript:void\(0\)|javascript:;|\s*)["']/i.test(html);
  const hasStrongReviewProof = /(\d+[,+]?\s*(?:5[- ]?star|reviews?)|[45]\.\d\s*(?:\/5)?\s*(?:stars?|google)|google rating|star rating|best of)/i.test(visibleContent);
  const hasBasicReviewProof = hasStrongReviewProof || /(?:★\s*){4,5}|(?:⭐\s*){4,5}|read more reviews|client reviews|customer reviews|testimonial|testimonials/i.test(visibleContent);
  const hasCertificationProof = /(gaf|owens corning|certainteed|iko|tamko|master elite|select shinglemaster|preferred contractor|licensed|insured|bonded|warranty|guarantee|bbb\s*a\+)/i.test(visibleContent);
  const hasProjectProof = /(before\s*(?:&|and)?\s*after|recent projects?|project photos?|portfolio|our work|gallery)/i.test(visibleContent);
  const hasWeakReviewLinkOnly = /(client reviews|reviews|testimonials)/i.test(visibleContent) && !hasBasicReviewProof;
  const hasFamilyLocalProof = /(family owned|locally owned|local, family|years in business|since\s+\d{4}|serving .+ since)/i.test(visibleContent);

  let callScore = 0;
  if (hasPhone) callScore += 8;
  if (hasPhoneProminent) callScore += 5;
  if (hasTelLink) callScore += 7;
  if (strongCtaCount > 0) callScore += 3;
  else if (softCtaCount > 0) callScore += 2;
  if (urgentCount > 0) callScore += 2;

  let clarityScore = 0;
  if (primaryCount > 0) clarityScore += 8;
  if (serviceCount >= 2) clarityScore += 6;
  else if (serviceCount === 1) clarityScore += 3;
  if (hasCity) clarityScore += 4;
  if (title && hasAny(title, industry.primaryKeywords)) clarityScore += 2;

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
    category("call", "Call Readiness", callScore, 25, hasPhone ? (!hasPhoneProminent ? "Phone was found, but not near the start of the scanned homepage content." : hasTelLink ? "Prominent phone and click-to-call found." : "Prominent phone found, but click-to-call was not confirmed.") : "Phone number not found in homepage content."),
    category("clarity", "5-Second Service Clarity", clarityScore, 20, primaryCount > 0 ? "Industry wording found." : "Main service wording was not confirmed."),
    category("trust", "Trust Proof", trustScore, 20, hasStrongReviewProof ? "Strong review proof was found." : hasBasicReviewProof || hasCertificationProof ? "Some trust proof was found, but the source/count may be limited." : "Trust proof appears thin, linked-only, or buried."),
    category("path", "Estimate Request Steps", requestScore, 15, hasBrokenCta ? "A possible broken/placeholder link was detected." : formFieldCount > 6 ? `Form may be high-friction with ${formFieldCount} fields.` : strongCtaCount > 0 ? "Strong request path language found." : "Request path has basic or soft signals."),
    category("seo", "Local Visibility", localSeoScore, 10, hasCity ? "City/service-area signal found." : "City/service-area signal not confirmed."),
    category("freshness", "Freshness", freshnessScore, 10, hasCurrentYear ? "Current year signal found." : hasStaleYear ? "Older dates found without a current year signal." : "Freshness signal was limited."),
  ];

  const findings = [];

  if (!hasPhone) {
    findings.push({
      title: "Critical leak: phone number not found on the homepage",
      severity: "critical",
      category: "Call Readiness",
      explanation: `A local ${industry.label.toLowerCase()} customer should be able to call quickly. The scan did not find a phone number in the homepage content.`,
      evidence: "No standard U.S. phone number pattern was found in the homepage HTML/text.",
      fix: ["Add a phone number to the header.", "Make the number click-to-call.", "Add a mobile call button for urgent visitors."],
    });
  } else if (!hasPhoneProminent) {
    findings.push({
      title: "Phone number is not visible near the top",
      severity: "warning",
      category: "Call Readiness",
      explanation: `The site appears to have a phone number somewhere, but it was not found near the start of the scanned homepage content. A ${industry.label.toLowerCase()} visitor who prefers to call may have to hunt for it instead of seeing a clear call option next to the main request button.`,
      evidence: phoneMayBeHidden
        ? "Phone pattern was found in page HTML/data, but not confirmed in the clean visible text."
        : `Phone pattern was first found around character ${phoneIndex} of the extracted homepage text, which usually means it is not part of the first-screen/header experience.`,
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

  if (hasPhone && !hasPhoneProminent && strongCtaCount > 0) {
    findings.push({
      title: "Estimate button or form is visible, but the call path is weaker",
      severity: "warning",
      category: "Call Readiness",
      explanation: `The page appears to have a request/estimate action, but the phone path is not as obvious. Some ${industry.customerLabel || "visitors"} will want to call instead of filling out a form.`,
      evidence: "Strong button or form wording was found, but the phone number was not confirmed near the top of the scanned homepage content.",
      fix: ["Place 'Call Now' beside the estimate button.", "Make the phone number click-to-call.", "Use both call and request options on mobile."],
    });
  }

  if (primaryCount === 0) {
    findings.push({ title: `${industry.label} service clarity may be weak`, severity: "critical", category: "5-Second Service Clarity", explanation: `The scan did not find clear ${industry.label.toLowerCase()} wording in the homepage content. Visitors should know what you do within seconds.`, evidence: `Missing primary terms checked: ${industry.primaryKeywords.slice(0, 4).join(", ")}.`, fix: [`Add '${industry.primaryKeywords[0]}' to the main headline.`, "Avoid using only a brand slogan in the first screen.", "List your core services near the top."] });
  } else if (serviceCount < 2) {
    findings.push({ title: "Core services may not be specific enough", severity: "warning", category: "5-Second Service Clarity", explanation: `The page mentions ${industry.label.toLowerCase()}, but the scan found limited specific service wording.`, evidence: `Only ${serviceCount} specific service keyword(s) were found from the preview list.`, fix: [`Mention services such as ${industry.serviceKeywords.slice(0, 3).join(", ")}.`, "Add links to dedicated service pages.", "Use customer-friendly service names."] });
  }

  if (!hasCity) {
    findings.push({ title: "City or service area was not clearly confirmed", severity: "warning", category: "Local Visibility", explanation: "Local visitors and search engines should quickly understand where the business works.", evidence: city ? `The city '${city}' was not found in the scanned homepage content.` : "No city was parsed from the submitted location.", fix: ["Add the city to the homepage headline or intro.", "List nearby service areas.", "Add local project examples with city labels."] });
  }

  if (!hasBasicReviewProof && !hasCertificationProof) {
    findings.push({ title: "Trust proof is not strongly visible in the preview", severity: "warning", category: "Trust Proof", explanation: "The scan did not confirm strong proof such as star ratings, review count, BBB/certification badges, warranty, licensing, or insurance language. A reviews link alone is weaker than proof visible on the page.", evidence: hasWeakReviewLinkOnly ? "Review/testimonial wording was found, but no star rating, review count, or certification proof was confirmed." : `Only ${trustCount} trust keyword(s) were found from the preview list.`, fix: ["Add a review or star-rating block near the top.", "Show licenses, insurance, warranties, or certifications.", "Add recent project proof or testimonials."] });
  } else if (hasBasicReviewProof && !hasStrongReviewProof) {
    findings.push({ title: "Review proof is visible, but the source or count could be clearer", severity: "warning", category: "Trust Proof", explanation: "The scan found basic review proof such as stars, testimonial wording, or a review link. The stronger version would show the review source and count, such as Google rating and number of reviews.", evidence: "Basic review/testimonial signal was found, but a clear rating source or review count was not confirmed.", fix: ["Add a Google rating or review count near the first screen.", "Show where the reviews came from.", "Keep the Read More Reviews button, but add a stronger summary above it."] });
  }

  if (hasBrokenCta) {
    findings.push({ title: "Possible broken or placeholder button or form link detected", severity: "critical", category: "Estimate Request Steps", explanation: "A main action link that points nowhere can stop a ready visitor from contacting the business.", evidence: "The scan detected a placeholder link pattern such as href='#', href='', href='<>' or javascript:void(0).", fix: ["Test every button in the header and hero section.", "Send the main button or form to a real quote/contact form.", "Use a clear action such as 'Get a Free Estimate' or 'Schedule Service'."] });
  } else if (strongCtaCount === 0 && softCtaCount > 0) {
    findings.push({ title: "button or form is present but could be more specific", severity: "warning", category: "Estimate Request Steps", explanation: "The page has a contact/consultation path, but the wording may be softer than a direct service request. Specific action buttons usually make the next step clearer.", evidence: "Soft button or form wording was found, but the strongest industry-specific button or form terms were not confirmed.", fix: [`Use wording like '${industry.ctaKeywords[0]}' near the top.`, "Repeat the button or form after trust proof sections.", "Tell visitors what happens after they submit."] });
  } else if (ctaCount === 0) {
    findings.push({ title: "No strong call-to-action found", severity: "warning", category: "Estimate Request Steps", explanation: "The page should give ready-to-act visitors a clear next step, not just general information.", evidence: `No button or form terms were found from this industry list: ${industry.ctaKeywords.slice(0, 4).join(", ")}.`, fix: ["Add a clear button or form button near the top.", `Use wording like '${industry.ctaKeywords[0]}'.`, "Repeat the button or form after trust proof sections."] });
  }

  if (formFieldCount > 6) {
    findings.push({ title: "Contact form may have too much friction", severity: "warning", category: "Estimate Request Steps", explanation: `The scan found ${formFieldCount} form fields. Long forms can reduce quote or service requests, especially on mobile.`, evidence: `${formFieldCount} input/select/textarea fields were found in the homepage HTML.`, fix: ["Reduce the form to 4–5 key fields.", "Ask for more detail after the first contact.", "Add a clear 'what happens next' line under the form."] });
  }

  if (localSeoCount < 2) {
    findings.push({ title: "Local search signals may be light", severity: "warning", category: "Local Visibility", explanation: "The scan found limited local service keywords that help customers and search engines understand what you do.", evidence: `Only ${localSeoCount} foundational local visibility keyword(s) were found.`, fix: ["Add core service terms to the homepage.", "Create dedicated service pages.", "Add a short FAQ section for common local customer questions."] });
  }

  if (!hasCurrentYear && hasStaleYear) {
    findings.push({ title: "Freshness signals may look stale", severity: "warning", category: "Freshness", explanation: "Older dates can make a business look less active, even if the company is still operating.", evidence: "Older year references were found, but no 2025/2026 freshness signal was confirmed.", fix: ["Update copyright and recent project sections.", "Remove outdated notices.", "Add a recent project or seasonal service update."] });
  }

  if (urgentCount === 0 && industry.id !== "landscaping") {
    findings.push({ title: "Urgent-service language was not confirmed", severity: "warning", category: "Call Readiness", explanation: `For ${industry.label.toLowerCase()} businesses, urgent visitors often want to know if same-day or emergency help is available.`, evidence: `No urgent terms were found from this industry list: ${industry.urgentKeywords.slice(0, 4).join(", ")}.`, fix: ["Add emergency, same-day, or urgent-service wording only if you truly offer it.", "Place urgent-service wording near the phone number.", "Create a dedicated urgent-service page if it is a real service."] });
  }

  if (findings.length === 0) {
    findings.push({ title: "No major preview leaks found", severity: "good", category: "Overall", explanation: "The basic scan found a clear service path, local signal, trust wording, and contact path. This site may not need a basic paid report.", evidence: "The homepage passed the main rule-based checks in this preview.", fix: ["Consider a deeper manual review only if you want a second opinion.", "Keep reviews, photos, and service pages current.", "Track call clicks and form submissions."] });
  }

  const rawScore = categories.reduce((sum, category) => sum + category.score, 0);
  let finalScore = Math.max(25, Math.min(99, rawScore));
  if (!hasPhone) finalScore = Math.min(finalScore, 69);
  if (hasPhone && !hasPhoneProminent) finalScore = Math.min(finalScore, 82);
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

  const aiVisibility = buildAiVisibilityReadiness({
    industry,
    visibleContent,
    html,
    text,
    title: title || "",
    description: description || "",
    city,
    hasCity,
    hasPhone,
    hasTelLink,
    primaryCount,
    serviceCount,
    urgentCount,
    localSeoCount,
    hasBasicReviewProof,
    hasStrongReviewProof,
    hasCertificationProof,
    hasProjectProof,
    hasFamilyLocalProof,
    hasCurrentYear,
    hasStaleYear,
  });

  const offsiteVisibility = buildOffsiteVisibilityReadiness({
    industry,
    visibleContent,
    html,
    text,
    title: title || "",
    city,
    hasCity,
    hasBasicReviewProof,
    hasStrongReviewProof,
    hasCertificationProof,
    hasProjectProof,
    hasFamilyLocalProof,
  });

  let overallAiVisibilityScore = Math.round((aiVisibility.score * 0.35) + (offsiteVisibility.score * 0.65));
  // If off-site visibility is unverified/weak, do not let strong on-site content create a misleading overall score.
  if (offsiteVisibility.score < 65) overallAiVisibilityScore = Math.min(overallAiVisibilityScore, 68);
  if (offsiteVisibility.score < 50) overallAiVisibilityScore = Math.min(overallAiVisibilityScore, 58);
  const overallAiVisibility = {
    score: overallAiVisibilityScore,
    label: overallAiVisibilityScore >= 85 ? "Overall AI visibility verified strong" : overallAiVisibilityScore >= 70 ? "Overall AI visibility mostly ready" : overallAiVisibilityScore >= 50 ? "Overall AI visibility gaps found" : "Major overall AI visibility gaps",
    summary: "This combines on-site readiness with conservative off-site/business name consistency signals. Off-site signals are weighted more heavily because AI recommendations often rely on Google Business Profile, reviews, mentions on trusted websites, awards, and brand consistency. Build 6A does not yet run live search/API verification.",
  };

  return {
    inputUrl: url,
    normalizedUrl,
    siteTitle: title || "",
    cityState,
    email,
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
    aiVisibility,
    offsiteVisibility,
    overallAiVisibility,
    webPersonChecklist: checklist(industry),
    nextBestAction:
      paidRecommendation === "recommended"
        ? "Show the locked full report offer once payments are added."
        : paidRecommendation === "manual-review"
          ? "Run a deeper manual review before charging."
          : "Do not push the paid report unless a deeper scan finds more meaningful issues.",
  };
}

function uniqueList(items) {
  return [...new Set(items.filter(Boolean).map((item) => String(item).trim()).filter(Boolean))];
}

function buildRulesFullReportDraft(result) {
  const industry = result.industry;
  const primaryService = industry.primaryKeywords?.[0] || industry.label.toLowerCase();
  const cityState = result.cityState || "the local service area";
  const findings = Array.isArray(result.findings) ? result.findings : [];
  const warningFindings = findings.filter((finding) => finding.severity !== "good");
  const topFindings = warningFindings.length ? warningFindings : findings;
  const offsiteActionPlan = [
    "P1 — Verify the Google Business Profile exists under the same business name, website, phone, and service area.",
    "P1 — Consolidate reviews so Google, Facebook, BBB, Angi/Yelp, and other profiles point to the same entity.",
    "P2 — Add behind-the-scenes website markup and links to the correct official profiles.",
    "P2 — Pursue credible best-of, award, manufacturer, chamber, or trade-directory citations.",
    "P3 — Create one clear reason to choose this company that outside sources and the website can repeat consistently.",
  ];

  const topRecommendations = uniqueList([
    ...offsiteActionPlan.slice(0, 3),
    ...topFindings.slice(0, 5).map((finding) => Array.isArray(finding.fix) ? finding.fix[0] : ""),
    ...result.localSeoGaps?.filter((gap) => !/^.+was found/i.test(gap)).slice(0, 2) || [],
  ]).slice(0, 8);

  const copyPasteFixes = [
    {
      label: "Homepage headline",
      text: `${industry.label} services in ${cityState} that make it easy to call, compare, and request help.`,
    },
    {
      label: "Primary button or form",
      text: industry.id === "roofing" ? "Request a Free Roof Inspection" : industry.id === "plumbing" ? "Schedule Plumbing Service" : industry.id === "hvac" ? "Schedule HVAC Service" : industry.id === "landscaping" ? "Request a Free Landscaping Quote" : "Request Service",
    },
    {
      label: "Trust block",
      text: `Add a short trust line near the top: Local ${primaryService} help for ${cityState}. Include your review source/count, license or certification details, warranty or guarantee, and recent project proof when available.`,
    },
    {
      label: "Business clarity block",
      text: `${industry.label} company serving ${cityState}. Services include ${industry.serviceKeywords.slice(0, 4).join(", ")}. Add this in website text that search and AI tools can read near the top of the homepage or About section.`,
    },
  ];

  const gbpPosts = [
    `Need ${industry.serviceKeywords[0] || primaryService} in ${cityState}? Our team helps local customers understand the issue, review options, and request service without pressure.`,
    `Local project spotlight: Share one recent ${industry.label.toLowerCase()} job, the city served, the problem solved, and one photo that shows the work clearly.`,
    `Trust reminder: Explain one warranty, certification, review milestone, or experience point that helps customers choose your business with confidence.`,
    `Seasonal tip: Remind ${industry.customerLabel || "customers"} in ${cityState} what to check this month and invite them to call or request service if they notice a problem.`,
  ];

  const sevenDayPlan = [
    "Day 1: Add or improve the phone/call path near the top of the homepage.",
    "Day 2: Make the main headline clearly state the service and city/service area.",
    "Day 3: Add visible review proof, star rating, testimonial, certification, or warranty proof near the first screen.",
    "Day 4: Shorten or clarify the estimate/service request path.",
    "Day 5: Add service-area and core-service wording in website text that search and AI tools can read for AI/search tools.",
    "Day 6: Add or update recent project photos, captions, or local proof.",
    "Day 7: Send the web-person checklist to whoever manages the site and track call/form clicks after changes are made.",
  ];

  return {
    source: "rules",
    generatedAt: new Date().toISOString(),
    executiveSummary: `This draft report reviewed ${result.normalizedUrl || "the submitted website"} for ${industry.label.toLowerCase()} lead leaks and AI and online visibility in ${cityState}. The preview score is ${result.score}/100 (${result.label}), the On-Site AI Readiness score is ${result.aiVisibility?.score ?? "not scored"}/100, and the Online Reputation & AI Visibility score is ${result.offsiteVisibility?.score ?? "not scored"}/100. The report should focus on practical fixes that help customers and AI/search tools quickly understand who the business is, what it does, where it works, why it can be trusted, and how to contact it.`,
    aiVisibilitySummary: `${result.aiVisibility?.summary || "The site was checked for clear business name, service, location, trust, readable website text, and outside reputation signals."} Off-site note: ${result.offsiteVisibility?.summary || "Outside-web checks should verify Google Business Profile, review platforms, directories, awards, and matching official profile links."}`,
    leadLeakSummary: topFindings[0]?.explanation || "The preview did not find a critical lead leak, but the paid report should still document the highest-value improvements if the report is recommended.",
    localSeoSummary: `The local search review should focus on clear service/city wording, dedicated service pages, service-area proof, FAQs, current business information, and trust proof written on the website. This is not a rankings audit or backlink report.`,
    topRecommendations,
    copyPasteFixes,
    gbpPosts,
    sevenDayPlan: [...offsiteActionPlan, ...sevenDayPlan].slice(0, 10),
    webPersonChecklist: result.webPersonChecklist || [],
    disclaimer: "This report is an informational website and AI and online visibility review. It does not guarantee rankings, AI recommendations, traffic, calls, leads, or revenue.",
  };
}

function parseJsonObject(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {}
  const match = String(text).match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

async function buildOpenAiFullReportDraft(result) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const compactInput = {
    businessType: result.industry?.label,
    customerLabel: result.industry?.customerLabel,
    website: result.normalizedUrl,
    cityState: result.cityState,
    leadLeakScore: result.score,
    leadLeakLabel: result.label,
    onSiteAiVisibilityScore: result.aiVisibility?.score,
    onSiteAiVisibilityLabel: result.aiVisibility?.label,
    offsiteVisibilityScore: result.offsiteVisibility?.score,
    offsiteVisibilityLabel: result.offsiteVisibility?.label,
    overallAiVisibilityScore: result.overallAiVisibility?.score,
    findings: result.findings,
    categories: result.categories,
    onSiteAiVisibilitySignals: result.aiVisibility?.signals,
    offsiteVisibilitySignals: result.offsiteVisibility?.signals,
    offsiteSearchEvidence: result.offsiteVisibility?.evidence,
    serpapiUsed: result.serpapiUsed,
    serpapiError: result.serpapiError,
    localSeoGaps: result.localSeoGaps,
    webPersonChecklist: result.webPersonChecklist,
    paidRecommendation: result.paidRecommendation,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.25,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You write concise, practical website conversion and AI and online visibility reports for local service businesses. Use plain English. Do not guarantee rankings, ChatGPT visibility, traffic, calls, leads, revenue, or outcomes. Do not invent facts not supplied. Return valid JSON only.",
          },
          {
            role: "user",
            content: `Create a paid-report draft from this preview data. Return JSON with exactly these fields: executiveSummary string, aiVisibilitySummary string, leadLeakSummary string, localSeoSummary string, topRecommendations array of 5-7 strings, copyPasteFixes array of objects with label and text, gbpPosts array of 4 strings, sevenDayPlan array of 7 strings, webPersonChecklist array of strings, disclaimer string.\n\nPreview data:\n${JSON.stringify(compactInput, null, 2)}`,
          },
        ],
      }),
    });

    clearTimeout(timeout);
    if (!response.ok) throw new Error(`OpenAI report draft failed with ${response.status}`);
    const payload = await response.json();
    const content = payload?.choices?.[0]?.message?.content || "";
    const parsed = parseJsonObject(content);
    if (!parsed) throw new Error("OpenAI returned non-JSON report draft");
    return {
      source: "openai",
      generatedAt: new Date().toISOString(),
      executiveSummary: String(parsed.executiveSummary || ""),
      aiVisibilitySummary: String(parsed.aiVisibilitySummary || ""),
      leadLeakSummary: String(parsed.leadLeakSummary || ""),
      localSeoSummary: String(parsed.localSeoSummary || ""),
      topRecommendations: Array.isArray(parsed.topRecommendations) ? parsed.topRecommendations.map(String).slice(0, 7) : [],
      copyPasteFixes: Array.isArray(parsed.copyPasteFixes)
        ? parsed.copyPasteFixes.slice(0, 6).map((item) => ({ label: String(item?.label || "Fix"), text: String(item?.text || "") })).filter((item) => item.text)
        : [],
      gbpPosts: Array.isArray(parsed.gbpPosts) ? parsed.gbpPosts.map(String).slice(0, 4) : [],
      sevenDayPlan: Array.isArray(parsed.sevenDayPlan) ? parsed.sevenDayPlan.map(String).slice(0, 7) : [],
      webPersonChecklist: Array.isArray(parsed.webPersonChecklist) ? parsed.webPersonChecklist.map(String).slice(0, 12) : [],
      disclaimer: String(parsed.disclaimer || "This report is informational and does not guarantee rankings, AI recommendations, traffic, calls, leads, or revenue."),
    };
  } catch (error) {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function attachFullReportDraft(result) {
  const rulesDraft = buildRulesFullReportDraft(result);
  const openAiDraft = await buildOpenAiFullReportDraft(result);
  result.fullReportDraft = openAiDraft || rulesDraft;
  result.fullReportDraft.source = openAiDraft ? "openai" : "rules";
  return result;
}

async function scrapeWithFirecrawl(normalizedUrl) {
  const apiKey = process.env.FIRECRAWL_API_KEY || process.env.FIRECRAWL_API_TOKEN;
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch("https://api.firecrawl.dev/v2/scrape", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: normalizedUrl,
        formats: ["markdown", "html", "links", "screenshot"],
        onlyMainContent: false,
        onlyCleanContent: false,
        waitFor: 1000,
        mobile: false,
        removeBase64Images: true,
        blockAds: true,
        proxy: "auto",
        timeout: 20000,
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`Firecrawl scrape failed with ${response.status}: ${text.slice(0, 160)}`);
    }

    const payload = await response.json();
    if (!payload?.success || !payload?.data) {
      throw new Error(payload?.error || "Firecrawl returned no scrape data");
    }

    const data = payload.data;
    const metadata = data.metadata || {};
    const html = [data.html, data.rawHtml, data.markdown, Array.isArray(data.links) ? data.links.join("\n") : ""]
      .filter(Boolean)
      .join("\n\n");

    if (!html.trim()) throw new Error("Firecrawl returned empty page content");

    return {
      html,
      visibleText: [data.markdown, metadata.title, metadata.description].filter(Boolean).join("\n\n"),
      title: metadata.title || data.title || "",
      description: metadata.description || data.description || "",
      finalUrl: metadata.sourceURL || metadata.url || data.url || normalizedUrl,
      screenshotUrl: data.screenshot || data.screenshotUrl || metadata.screenshot || metadata.screenshotUrl || "",
      warning: data.warning || metadata.error || "",
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function scrapeWithBasicFetch(normalizedUrl) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);
  try {
    const response = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 LeadLeakReportPreview/2.0",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    clearTimeout(timeout);
    if (!response.ok) throw new Error(`Could not fetch site. Status ${response.status}`);
    const html = await response.text();
    const meta = extractMeta(html);
    return { html, visibleText: stripHtmlForVisibleText(html), title: meta.title, description: meta.description, finalUrl: response.url, screenshotUrl: "" };
  } finally {
    clearTimeout(timeout);
  }
}

function extractMeta(html) {
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || "";
  const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] || "";
  return { title, description };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { url, cityState, email, industryId } = req.body || {};
  if (!url || !cityState || !email) return res.status(400).json({ error: "Missing required fields" });

  const normalizedUrl = normalizeUrl(url);
  const firecrawlConfigured = Boolean(process.env.FIRECRAWL_API_KEY || process.env.FIRECRAWL_API_TOKEN);

  let scrapeData = null;
  let scrapeSource = "basic-fetch";
  let firecrawlError = "";

  if (firecrawlConfigured) {
    try {
      scrapeData = await scrapeWithFirecrawl(normalizedUrl);
      scrapeSource = "firecrawl";
    } catch (error) {
      firecrawlError = error instanceof Error ? error.message : "Firecrawl scrape failed";
    }
  }

  if (!scrapeData) {
    try {
      scrapeData = await scrapeWithBasicFetch(normalizedUrl);
      scrapeSource = firecrawlConfigured ? "basic-fetch-after-firecrawl-fallback" : "basic-fetch";
    } catch (error) {
      return res.status(502).json({
        error: firecrawlConfigured
          ? `Could not fully read this website with the standard or backup website reader. ${firecrawlError ? `Website reader note: ${firecrawlError}` : ""}`
          : "Could not read this website yet. Add FIRECRAWL_API_KEY in Build 2 for stronger site reading.",
      });
    }
  }

  const result = buildPreviewFromScrape({
    url,
    cityState,
    email,
    industryId,
    html: String(scrapeData.html || "").slice(0, 500000),
    visibleText: String(scrapeData.visibleText || "").slice(0, 200000),
    title: scrapeData.title || "",
    description: scrapeData.description || "",
    finalUrl: scrapeData.finalUrl || normalizedUrl,
  });

  const screenshotUrl = String(scrapeData.screenshotUrl || "");
  if (screenshotUrl) {
    result.screenshotUrl = screenshotUrl;
    result.visualChecks = [
      { label: "Homepage screenshot", status: "confirmed", note: "A homepage screenshot was captured for first-screen review." },
      ...(result.visualChecks || []).filter((check) => check.label !== "Homepage screenshot"),
    ];
  }

  if (scrapeSource === "firecrawl") {
    result.confidence = screenshotUrl ? "Firecrawl + screenshot preview" : "Firecrawl homepage preview";
    result.nextBestAction =
      result.paidRecommendation === "recommended"
        ? "The homepage was read and a screenshot was checked when available. This preview is strong enough to show whether a full report may be useful."
        : result.paidRecommendation === "manual-review"
          ? "The homepage was read, but a manual review is still recommended before asking for payment."
          : "The homepage was read and did not find enough meaningful issues to push a paid report.";
  } else if (scrapeSource === "basic-fetch-after-firecrawl-fallback") {
    result.confidence = "Live homepage preview";
    result.findings = [
      {
        title: "Limited website scan used",
        severity: "warning",
        category: "Preview Confidence",
        explanation:
          "The stronger website reader was unavailable, so this scan used a simpler homepage check. The preview may miss some details.",
        evidence: firecrawlError ? firecrawlError.slice(0, 220) : "The website reader did not return usable content.",
        fix: ["Check the website reader setup.", "Confirm the website reader account has credits.", "Run the preview again before charging for a report."],
      },
      ...result.findings,
    ].slice(0, 5);
    result.summary = `${result.summary} A limited scan was used, so verify the result before charging.`;
  }

  result.scrapeSource = scrapeSource;
  result.firecrawlConfigured = firecrawlConfigured;

  const searchDomain = safeUrlHost(result.normalizedUrl || normalizedUrl);
  const businessName = extractBusinessNameFromTitle(result.siteTitle || scrapeData.title || "", searchDomain);
  const serpApiData = await runSerpApiSearches({
    businessName,
    cityState,
    industry: result.industry,
    websiteUrl: result.normalizedUrl || normalizedUrl,
  });
  mergeOffsiteWithSearch(result, serpApiData);

  await attachFullReportDraft(result);

  res.status(200).json(result);
}
