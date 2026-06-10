"use client";

import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildFallbackPreview, type PreviewCategory, type PreviewFinding, type PreviewResult } from "@/lib/localPreview";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Lock,
  Mail,
  MapPin,
  MonitorSmartphone,
  RefreshCw,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";

function getSeverityStyles(severity: PreviewFinding["severity"]) {
  if (severity === "critical") return { badge: "bg-red-100 text-red-700", label: "Critical", icon: <AlertCircle className="text-red-500 shrink-0 mt-1" size={22} /> };
  if (severity === "good") return { badge: "bg-green-100 text-green-700", label: "Good", icon: <CheckCircle2 className="text-green-500 shrink-0 mt-1" size={22} /> };
  return { badge: "bg-yellow-100 text-yellow-800", label: "Needs Review", icon: <AlertCircle className="text-yellow-600 shrink-0 mt-1" size={22} /> };
}

function getCategoryStyles(status: PreviewCategory["status"]) {
  if (status === "strong") return { bar: "bg-green-600", badge: "bg-green-100 text-green-700", label: "Strong" };
  if (status === "critical") return { bar: "bg-red-600", badge: "bg-red-100 text-red-700", label: "Critical" };
  return { bar: "bg-yellow-500", badge: "bg-yellow-100 text-yellow-800", label: "Needs Review" };
}

function getSignalBadge(status: "strong" | "needs-review" | "missing") {
  if (status === "strong") return { badge: "bg-green-100 text-green-700", label: "Strong" };
  if (status === "missing") return { badge: "bg-red-100 text-red-700", label: "Missing" };
  return { badge: "bg-yellow-100 text-yellow-800", label: "Needs Review" };
}

function friendlyConfidence(confidence: PreviewResult["confidence"]) {
  if (confidence === "Basic preview") return "Limited website check";
  if (confidence === "Live homepage preview") return "Homepage checked";
  if (confidence === "Firecrawl homepage preview") return "Full homepage checked";
  if (confidence === "Firecrawl + screenshot preview") return "Homepage and screenshot checked";
  return "Website checked";
}

function getRecommendationBox(result: PreviewResult) {
  if (result.paidRecommendation === "recommended") {
    return {
      title: "Full Report Recommended",
      body: "We found enough possible missed leads or online-visibility gaps to make a full report useful. During early access, enter an email to unlock the full report and get a copy sent to you.",
      button: "Get Full Report by Email",
      tone: "border-[#d97706]",
      note: "Stripe placeholder: no payment is required during early access.",
    };
  }
  if (result.paidRecommendation === "manual-review") {
    return {
      title: "Manual Review Needed First",
      body: "We could not automatically check enough of this site to confidently recommend a paid report. You can still email yourself the current report draft for review.",
      button: "Email Current Report Draft",
      tone: "border-yellow-400",
      note: "This protects the customer from paying for a weak or incomplete scan.",
    };
  }
  return {
    title: "Full Report Not Recommended Yet",
    body: "This preview did not find enough meaningful issues to recommend charging for a full report. During early access, you can still email yourself the report draft for review.",
    button: "Email Current Report Draft",
    tone: "border-green-400",
    note: "You can still run another preview or manually review the site.",
  };
}

function getUnlockKey(result: PreviewResult) {
  return `leadLeakReportUnlocked:${result.normalizedUrl || result.inputUrl || "preview"}`;
}

const fullReportValueItems = [
  { title: "Top missed lead issues", text: "The biggest things that may stop a customer from calling, trusting, or asking for an estimate." },
  { title: "Plain-English fix plan", text: "A simple 7-day list of what to fix first, without SEO jargon or technical guesswork." },
  { title: "Copy/paste wording", text: "Ready-to-use headline, trust, and button text that can be added to the website." },
  { title: "Checklist for your web person", text: "A forwardable checklist so the business owner does not have to explain the fixes from scratch." },
];

export default function Preview() {
  const router = useRouter();
  const params = useSearchParams();
  const url = params.get("url") || "";
  const cityState = params.get("location") || "";
  const email = params.get("email") || "";
  const industryId = params.get("industry") || "roofing";

  const [result, setResult] = useState<PreviewResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);
  const [unlockEmail, setUnlockEmail] = useState("");
  const [reportUnlocked, setReportUnlocked] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPreview() {
      setHasAttemptedLoad(false);
      setError(null);

      const stored = sessionStorage.getItem("leadLeakPreviewResult");
      const storedError = sessionStorage.getItem("leadLeakPreviewError");

      if (stored) {
        try {
          const parsed = JSON.parse(stored) as PreviewResult;
          if (!cancelled) {
            setResult(parsed);
            setError(storedError);
            setHasAttemptedLoad(true);
          }
          return;
        } catch {
          sessionStorage.removeItem("leadLeakPreviewResult");
          sessionStorage.removeItem("leadLeakPreviewError");
        }
      }

      if (!url || !cityState || !email) {
        if (!cancelled) {
          setResult(null);
          setHasAttemptedLoad(true);
        }
        return;
      }

      setLoading(true);
      const fallback = buildFallbackPreview({ url, cityState, email, industryId });

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, cityState, email, industryId }),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          throw new Error(payload?.error || "The live preview could not read this site yet.");
        }

        const data = (await response.json()) as PreviewResult;
        sessionStorage.setItem("leadLeakPreviewResult", JSON.stringify(data));
        sessionStorage.removeItem("leadLeakPreviewError");
        if (!cancelled) setResult(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "The live preview could not run.";
        sessionStorage.setItem("leadLeakPreviewResult", JSON.stringify(fallback));
        sessionStorage.setItem("leadLeakPreviewError", message);
        if (!cancelled) {
          setResult(fallback);
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setHasAttemptedLoad(true);
        }
      }
    }

    loadPreview();
    return () => {
      cancelled = true;
    };
  }, [url, cityState, email, industryId]);

  useEffect(() => {
    if (!result) return;
    setUnlockEmail((result.email || email || "").trim());
    setReportUnlocked(sessionStorage.getItem(getUnlockKey(result)) === "true");
  }, [result, email]);

  async function handleEmailUnlock(event: FormEvent) {
    event.preventDefault();
    if (!result) return;

    const trimmedEmail = unlockEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsEmailing(true);
    setEmailError(null);
    setEmailMessage(null);

    try {
      const updatedResult = { ...result, email: trimmedEmail };
      const response = await fetch("/api/email-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, result: updatedResult }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error || "The report could not be emailed.");

      setResult(updatedResult);
      sessionStorage.setItem("leadLeakPreviewResult", JSON.stringify(updatedResult));
      sessionStorage.setItem(getUnlockKey(updatedResult), "true");
      setReportUnlocked(true);
      setEmailMessage(payload?.sent ? `Full report unlocked and emailed to ${trimmedEmail}.` : "Full report unlocked. Email sending is not configured yet, so no email was sent.");
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "The report could not be emailed.");
    } finally {
      setIsEmailing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fafb]">
        <SiteHeader />
        <div className="container py-16">
          <Card className="max-w-2xl mx-auto p-8 text-center border border-[#e5e7eb]">
            <RefreshCw className="mx-auto mb-4 animate-spin text-[#d97706]" size={36} />
            <h1 className="text-2xl font-bold text-[#1a2332] mb-2">Checking your website preview...</h1>
            <p className="text-[#374151]">Running basic missed-lead checks for {cityState || "your service area"}.</p>
          </Card>
        </div>
      </div>
    );
  }

  if (hasAttemptedLoad && !result) {
    return (
      <div className="min-h-screen bg-[#f9fafb]">
        <SiteHeader />
        <div className="container py-16">
          <Card className="max-w-2xl mx-auto p-8 text-center border border-[#e5e7eb]">
            <FileText className="mx-auto mb-4 text-[#d97706]" size={40} />
            <h1 className="text-2xl font-bold text-[#1a2332] mb-3">Run a website check first</h1>
            <p className="text-[#374151] mb-6">No preview result was found. Enter a website, business type, city/state, and email to generate a real preview.</p>
            <Button onClick={() => router.push("/")} className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold">Start Website Check</Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const scoreColor = result.score >= 85 ? "text-green-600" : result.score >= 70 ? "text-[#d97706]" : result.score >= 50 ? "text-yellow-600" : "text-red-600";
  const recommendationBox = getRecommendationBox(result);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <SiteHeader />
      <div className="container py-10 md:py-16">
        <div className="mb-8">
          <Button onClick={() => router.push("/")} variant="outline" className="mb-6">← Back to Home</Button>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#d97706] mb-2">{result.industry.label} Lead Leak Preview</p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-2">Free preview result</h1>
              <p className="text-[#374151] break-all">{result.normalizedUrl || "No website URL entered"}</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#6b7280]"><MapPin size={18} className="text-[#d97706]" /><span>{result.cityState || "No city/state entered"}</span></div>
          </div>
        </div>

        {error && (
          <Card className="mb-8 p-4 border border-yellow-200 bg-yellow-50 text-yellow-900">
            <p className="text-sm"><strong>Note:</strong> {error} Showing a limited preview because some website details could not be checked automatically.</p>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <Card className="lg:col-span-2 bg-white border-2 border-[#d97706] p-8">
            <div className="grid md:grid-cols-[180px_1fr] gap-8 items-center mb-8">
              <div className="text-center"><div className={`text-7xl font-bold ${scoreColor} mb-2`}>{result.score}</div><div className="text-sm font-semibold text-[#6b7280]">/ 100</div></div>
              <div>
                <h2 className="text-2xl font-bold text-[#1a2332] mb-2">{result.label}</h2>
                <p className="text-[#374151] mb-4">{result.summary}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-bold text-[#374151]">{friendlyConfidence(result.confidence)}</span>
                  <span className="inline-flex items-center rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#b45309]">{result.paidRecommendation.replace("-", " ")}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-5 mb-8">
              <p className="text-xs font-bold uppercase tracking-wide text-[#6b7280] mb-1">Main issue found</p>
              <p className="font-bold text-[#1a2332]">{result.criticalLeakTitle}</p>
              <p className="text-sm text-[#374151] mt-2">{result.nextBestAction}</p>
            </div>

            <div className="border-t border-[#e5e7eb] pt-8">
              <h3 className="font-bold text-[#1a2332] mb-6">Preview Findings</h3>
              <div className="space-y-6">
                {result.findings.slice(0, 3).map((finding, index) => {
                  const styles = getSeverityStyles(finding.severity);
                  return (
                    <div key={`${finding.title}-${index}`} className="pb-6 border-b border-[#e5e7eb] last:border-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        {styles.icon}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2"><h4 className="font-bold text-[#1a2332]">{finding.title}</h4><span className={`rounded-full px-2 py-1 text-[11px] font-bold ${styles.badge}`}>{styles.label}</span>{finding.category && <span className="rounded-full bg-[#f3f4f6] px-2 py-1 text-[11px] font-bold text-[#6b7280]">{finding.category}</span>}</div>
                          <p className="text-[#374151] text-sm mb-3">{finding.explanation}</p>
                          <p className="text-xs text-[#6b7280]">Full details and exact fixes are included after email unlock.</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white border border-[#e5e7eb] p-6"><ShieldCheck className="text-[#d97706] mb-3" size={24} /><p className="text-xs font-semibold text-[#6b7280] mb-1">BUSINESS TYPE</p><p className="font-semibold text-[#1a2332]">{result.industry.label}</p></Card>
            <Card className="bg-white border border-[#e5e7eb] p-6"><Search className="text-[#d97706] mb-3" size={24} /><p className="text-xs font-semibold text-[#6b7280] mb-1">LOCAL SEARCH</p><p className="font-semibold text-[#1a2332] text-sm">Basic visibility gaps included</p></Card>
          </div>
        </div>

        {result.overallAiVisibility && <ScoreCard title="Overall AI Visibility" score={result.overallAiVisibility.score} label={result.overallAiVisibility.label} summary={result.overallAiVisibility.summary} />}

        {result.offsiteVisibility && (
          <Card className="bg-white border-2 border-[#7c3aed] p-8 mb-10">
            <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
              <div><p className="text-xs font-bold uppercase tracking-wide text-[#7c3aed] mb-2">Online Reputation & AI Visibility</p><div className="text-6xl font-bold text-[#7c3aed] mb-1">{result.offsiteVisibility.score}</div><div className="text-sm font-semibold text-[#6b7280] mb-3">/ 100</div><h3 className="text-xl font-bold text-[#1a2332] mb-2">{result.offsiteVisibility.label}</h3><p className="text-sm text-[#374151]">{result.offsiteVisibility.summary}</p></div>
              <div>
                <div className="mb-5 rounded-lg border border-purple-100 bg-purple-50 p-4 text-sm text-[#4c1d95]"><strong>What this means:</strong> This checks whether other trusted websites help confirm who the business is, where it works, and why customers should trust it.</div>
                {result.offsiteVisibility.evidence?.length ? <EvidenceList items={result.offsiteVisibility.evidence} unlocked={reportUnlocked} /> : null}
                <SignalGrid signals={result.offsiteVisibility.signals} locked={!reportUnlocked} />
              </div>
            </div>
          </Card>
        )}

        {result.aiVisibility && (
          <Card className="bg-white border-2 border-[#2563eb] p-8 mb-10">
            <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
              <div><p className="text-xs font-bold uppercase tracking-wide text-[#2563eb] mb-2">On-Site AI Readiness</p><div className="text-6xl font-bold text-[#2563eb] mb-1">{result.aiVisibility.score}</div><div className="text-sm font-semibold text-[#6b7280] mb-3">/ 100</div><h3 className="text-xl font-bold text-[#1a2332] mb-2">{result.aiVisibility.label}</h3><p className="text-sm text-[#374151]">{result.aiVisibility.summary}</p></div>
              <div><div className="mb-5 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-[#1e3a8a]"><strong>What this means:</strong> This checks the website itself. It looks for clear wording about who the business is, what services it offers, what areas it serves, why customers should trust it, and how easy the important information is to read.</div><SignalGrid signals={result.aiVisibility.signals} /></div>
            </div>
          </Card>
        )}

        <Card className="bg-white border border-[#e5e7eb] p-8 mb-10">
          <div className="flex items-center gap-3 mb-4"><MonitorSmartphone className="text-[#d97706]" size={24} /><h3 className="font-bold text-[#1a2332]">What a customer sees first</h3></div>
          <p className="text-sm text-[#374151] mb-6">This section looks at the first screen of the homepage. For service businesses, the phone number, main service, location, and estimate button should be easy to spot quickly.</p>
          {result.screenshotUrl ? <a href={result.screenshotUrl} target="_blank" rel="noreferrer"><img src={result.screenshotUrl} alt="Homepage screenshot" className="w-full max-h-[360px] object-contain rounded border border-[#e5e7eb] bg-white" /><p className="text-xs text-[#6b7280] mt-2">Click screenshot to open full-size capture.</p></a> : <p className="text-sm text-[#6b7280]">No homepage screenshot was available for this preview. The site text may still have been checked.</p>}
        </Card>

        <Card className="bg-white border border-[#e5e7eb] p-8 mb-10"><h3 className="font-bold text-[#1a2332] mb-6">What the preview checked</h3><CategoryGrid categories={result.categories} /></Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          <Card className="bg-white border border-[#e5e7eb] p-8"><div className="flex items-center gap-3 mb-4"><Search className="text-[#d97706]" size={24} /><h3 className="font-bold text-[#1a2332]">Local Search Visibility</h3></div><p className="text-sm text-[#374151] mb-4">This is not a full Google ranking report. These are simple checks to see whether customers and search tools can understand the service area, services, and local proof.</p><Checklist items={result.localSeoGaps.slice(0, 3)} /></Card>
          <Card className="bg-white border border-[#e5e7eb] p-8"><div className="flex items-center gap-3 mb-4"><Wrench className="text-[#d97706]" size={24} /><h3 className="font-bold text-[#1a2332]">Send This to Your Web Person Preview</h3></div><p className="text-sm text-[#374151] mb-4">The full report will turn findings into a forwardable checklist. This preview shows the type of action list we will provide.</p><Checklist items={result.webPersonChecklist.slice(0, 3)} /></Card>
        </div>

        <Card className="bg-white border-2 border-[#d97706] p-8 mb-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:items-start"><div className="lg:w-72"><p className="text-xs font-bold uppercase tracking-wide text-[#d97706] mb-2">Full Report Teaser</p><h3 className="text-2xl font-bold text-[#1a2332] mb-3">What the full report gives you</h3><p className="text-sm text-[#374151] mb-4">The free preview shows the main direction. The full report is meant to give a business owner or web person a clearer action plan.</p><div className="rounded-lg bg-[#fff7ed] border border-[#fed7aa] p-4 text-sm text-[#9a3412]"><p className="font-bold">Early access placeholder</p><p>No payment is required right now. Enter an email below to unlock the report and receive a copy.</p></div></div><div className="flex-1 grid md:grid-cols-2 gap-4">{fullReportValueItems.map((item) => <div key={item.title} className="rounded-lg border border-[#e5e7eb] p-4 bg-[#f9fafb]"><CheckCircle2 className="text-[#d97706] mb-3" size={20} /><p className="font-bold text-[#1a2332] mb-2">{item.title}</p><p className="text-sm text-[#374151]">{item.text}</p></div>)}</div></div>
        </Card>

        {reportUnlocked ? <FullReport result={result} /> : <EmailUnlockCard email={unlockEmail} emailError={emailError} emailMessage={emailMessage} isEmailing={isEmailing} onEmailChange={setUnlockEmail} onSubmit={handleEmailUnlock} />}

        <Card className={`bg-gradient-to-br from-[#1a2332] to-[#2d3e52] border-2 ${recommendationBox.tone} p-8 md:p-12 text-white mb-10`}>
          <div className="flex items-start gap-6"><Lock className="text-[#d97706] shrink-0 mt-1" size={32} /><div className="flex-1"><h3 className="text-2xl font-bold mb-3">{recommendationBox.title}</h3><p className="text-[#d1d5db] mb-6">{recommendationBox.body}</p><div className="grid md:grid-cols-2 gap-4 mb-8 bg-[#374151] bg-opacity-50 p-6 rounded-lg">{["Website clarity review", "Top missed lead issues", "Online reputation checks", "Copy/paste website fixes", "Checklist for your web person", "7-day fix plan", "Clean report you can save or send"].map((item) => <div key={item} className="flex items-start gap-2 text-sm"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" /><span>{item}</span></div>)}</div><p className="text-sm text-[#fef3c7] mb-6">{recommendationBox.note}</p><div className="flex flex-col sm:flex-row gap-4"><Button disabled={reportUnlocked} onClick={() => document.getElementById("email-unlock")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#d97706] text-white font-bold text-lg py-6 px-8 disabled:opacity-70">{reportUnlocked ? "Full Report Unlocked" : recommendationBox.button}</Button><Button onClick={() => router.push("/")} variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a2332] font-bold text-lg py-6 px-8">Run Another Preview</Button></div></div></div>
        </Card>

        <Card className="bg-white border border-[#e5e7eb] p-8"><h3 className="font-bold text-[#1a2332] mb-4">Important note</h3><p className="text-[#374151] mb-4">This preview is a website and online-visibility review. It is meant to show practical items that may make it harder for customers to call, request an estimate, or trust the business online.</p><p className="text-sm text-[#6b7280]"><strong>Disclaimer:</strong> This preview does not guarantee Google rankings, AI recommendations, traffic, calls, leads, or revenue.</p></Card>
      </div>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return <ul className="space-y-2 text-sm text-[#374151]">{items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="text-[#d97706] shrink-0 mt-0.5" size={16} />{item}</li>)}</ul>;
}

function CategoryGrid({ categories }: { categories: PreviewCategory[] }) {
  return <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{categories.map((category) => { const styles = getCategoryStyles(category.status); const width = `${Math.round((category.score / category.max) * 100)}%`; return <div key={category.key} className="rounded-lg border border-[#e5e7eb] p-4"><div className="flex items-start justify-between gap-3 mb-3"><div><p className="font-bold text-[#1a2332]">{category.label}</p><p className="text-xs text-[#6b7280] mt-1">{category.note}</p></div><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${styles.badge}`}>{styles.label}</span></div><div className="h-2 rounded-full bg-[#e5e7eb] overflow-hidden mb-2"><div className={`h-full ${styles.bar}`} style={{ width }} /></div><p className="text-xs font-semibold text-[#6b7280]">{category.score}/{category.max} points</p></div>; })}</div>;
}

function SignalGrid({ signals, locked = false }: { signals: { label: string; status: "strong" | "needs-review" | "missing"; note: string; fix: string }[]; locked?: boolean }) {
  return <div className="grid md:grid-cols-2 gap-4">{signals.map((signal) => { const styles = locked ? { badge: "bg-[#f3f4f6] text-[#6b7280]", label: "Locked" } : getSignalBadge(signal.status); return <div key={signal.label} className="rounded-lg border border-[#e5e7eb] p-4"><div className="flex items-start justify-between gap-3 mb-2"><p className="font-bold text-[#1a2332]">{signal.label}</p><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${styles.badge}`}>{styles.label}</span></div>{locked ? <p className="text-xs text-[#6b7280]">Included in the full report. Enter your email below to see the details and get a copy sent to you.</p> : <><p className="text-xs text-[#6b7280] mb-3">{signal.note}</p><p className="text-xs text-[#374151]"><strong>Fix:</strong> {signal.fix}</p></>}</div>; })}</div>;
}

function EvidenceList({ items, unlocked }: { items: NonNullable<PreviewResult["offsiteVisibility"]>["evidence"]; unlocked: boolean }) {
  if (!items?.length) return null;
  return <div className="mb-5 rounded-lg border border-purple-200 bg-white p-4 text-sm text-[#374151]"><p className="font-bold text-[#1a2332] mb-3">What we found around the web</p><div className="space-y-3">{items.slice(0, 7).map((item, index) => { const showDetails = unlocked || index === 0; const badge = showDetails ? (item.status === "found" ? "bg-green-100 text-green-700" : item.status === "needs-review" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-700") : "bg-[#f3f4f6] text-[#6b7280]"; const label = showDetails ? (item.status === "found" ? "Found" : item.status === "needs-review" ? "Needs review" : "Not found") : "Locked"; return <div key={`${item.label}-${index}`} className="rounded-md border border-[#e5e7eb] p-3"><div className="flex items-start justify-between gap-3 mb-1"><p className="font-semibold text-[#1a2332]">{item.label}</p><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${badge}`}>{label}</span></div><p className="text-xs text-[#374151]">{showDetails ? item.detail : "Included in the full report. Enter your email below to see what we found and get a copy sent to you."}</p></div>; })}</div>{!unlocked && <p className="mt-4 text-xs text-[#6b7280]">The preview shows the first checked item. The remaining details unlock after email submit.</p>}</div>;
}

function ScoreCard({ title, score, label, summary }: { title: string; score: number; label: string; summary: string }) {
  return <Card className="bg-white border-2 border-[#1e40af] p-8 mb-10"><div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start"><div><p className="text-xs font-bold uppercase tracking-wide text-[#1e40af] mb-2">{title}</p><div className="text-6xl font-bold text-[#1e40af] mb-1">{score}</div><div className="text-sm font-semibold text-[#6b7280] mb-3">/ 100</div><h3 className="text-xl font-bold text-[#1a2332] mb-2">{label}</h3></div><div className="rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm text-[#1e3a8a]"><p className="font-bold mb-2">Why this score matters</p><p>{summary}</p><p className="mt-3 text-xs text-[#1e3a8a]">This is still a readiness score. It does not guarantee ChatGPT, Gemini, Copilot, Google AI, or any other AI/search tool will recommend the business.</p></div></div></Card>;
}

function EmailUnlockCard({ email, emailError, emailMessage, isEmailing, onEmailChange, onSubmit }: { email: string; emailError: string | null; emailMessage: string | null; isEmailing: boolean; onEmailChange: (value: string) => void; onSubmit: (event: FormEvent) => void }) {
  return <Card id="email-unlock" className="bg-white border-2 border-[#d97706] p-8 mb-10"><div className="flex items-start gap-4 mb-5"><Mail className="text-[#d97706] shrink-0 mt-1" size={28} /><div><p className="text-xs font-bold uppercase tracking-wide text-[#d97706] mb-2">Early Access Report Unlock</p><h3 className="text-2xl font-bold text-[#1a2332] mb-2">Enter your email to unlock the full report</h3><p className="text-sm text-[#374151]">This is the Stripe placeholder. Payment is not required yet. The email address unlocks the full report and sends a copy when email sending is configured.</p></div></div><form onSubmit={onSubmit} className="grid md:grid-cols-[1fr_auto] gap-3"><input type="email" value={email} onChange={(event) => onEmailChange(event.target.value)} placeholder="you@company.com" className="h-12 rounded-md border border-[#d1d5db] px-4 text-sm outline-none focus:ring-2 focus:ring-[#d97706]" required /><Button type="submit" disabled={isEmailing} className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold px-6">{isEmailing ? "Sending..." : "Unlock & Email Report"}</Button></form>{emailError && <p className="mt-3 text-sm text-red-700">{emailError}</p>}{emailMessage && <p className="mt-3 text-sm text-green-700">{emailMessage}</p>}<p className="mt-4 text-xs text-[#6b7280]">Later, this step can become Stripe checkout. For now it captures the lead and lets the business owner access the report.</p></Card>;
}

function FullReport({ result }: { result: PreviewResult }) {
  const draft = result.fullReportDraft;
  if (!draft) return null;
  return <Card className="bg-white border-2 border-green-500 p-8 mb-10"><div className="flex items-center gap-3 mb-2"><FileText className="text-green-600" size={24} /><h3 className="font-bold text-[#1a2332]">Your Full Report</h3></div><p className="text-sm text-green-700 mb-6">Unlocked by email. A copy has been sent if email sending is configured.</p><div className="grid lg:grid-cols-2 gap-6 mb-6"><ReportText title="Executive Summary" text={draft.executiveSummary} /><ReportText title="AI & Online Visibility Summary" text={draft.aiVisibilitySummary} /><ReportText title="Missed Lead Summary" text={draft.leadLeakSummary} /><ReportText title="Local Search Summary" text={draft.localSeoSummary} /></div><div className="grid lg:grid-cols-2 gap-6 mb-6"><div><h4 className="font-bold text-[#1a2332] mb-3">Top Recommendations</h4><Checklist items={draft.topRecommendations || []} /></div><div><h4 className="font-bold text-[#1a2332] mb-3">7-Day Fix Plan</h4><Checklist items={draft.sevenDayPlan || []} /></div></div><div className="mb-6"><h4 className="font-bold text-[#1a2332] mb-3">Copy/Paste Fixes</h4><div className="grid md:grid-cols-2 gap-4">{(draft.copyPasteFixes || []).map((fix, index) => <div key={`${fix.label}-${index}`} className="rounded-lg border border-[#e5e7eb] p-4"><p className="text-sm font-bold text-[#1a2332] mb-2">{fix.label}</p><p className="text-sm text-[#374151]">{fix.text}</p></div>)}</div></div><div className="grid lg:grid-cols-2 gap-6 mb-6"><div><h4 className="font-bold text-[#1a2332] mb-3">Checklist for Your Web Person</h4><Checklist items={draft.webPersonChecklist || []} /></div><div><h4 className="font-bold text-[#1a2332] mb-3">Google Business Profile Post Ideas</h4><Checklist items={draft.gbpPosts || []} /></div></div><div className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-4 text-xs text-[#6b7280]"><strong>Disclaimer:</strong> {draft.disclaimer}</div></Card>;
}

function ReportText({ title, text }: { title: string; text?: string }) {
  return <div className="rounded-lg border border-[#e5e7eb] p-5 bg-[#f9fafb]"><p className="text-xs font-bold uppercase text-[#6b7280] mb-2">{title}</p><p className="text-sm text-[#374151] leading-relaxed">{text || "No details available."}</p></div>;
}
