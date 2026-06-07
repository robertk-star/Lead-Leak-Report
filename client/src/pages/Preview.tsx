import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildFallbackPreview, type PreviewFinding, type PreviewResult } from "@/lib/localPreview";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Lock,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";

function getSeverityStyles(severity: PreviewFinding["severity"]) {
  if (severity === "critical") {
    return {
      icon: <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />,
      badge: "bg-red-100 text-red-700",
      label: "Critical",
    };
  }
  if (severity === "good") {
    return {
      icon: <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={24} />,
      badge: "bg-green-100 text-green-700",
      label: "Good",
    };
  }
  return {
    icon: <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />,
    badge: "bg-yellow-100 text-yellow-800",
    label: "Warning",
  };
}

export default function Preview() {
  const [location, setLocation] = useLocation();
  const params = useMemo(() => new URLSearchParams(location.split("?")[1] || ""), [location]);
  const url = params.get("url") || "";
  const cityState = params.get("location") || "";
  const email = params.get("email") || "";
  const industryId = params.get("industry") || "roofing";

  const [result, setResult] = useState<PreviewResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function runPreview() {
      setLoading(true);
      setError(null);

      const fallback = buildFallbackPreview({ url, cityState, email, industryId });

      if (!url || !cityState || !email) {
        if (!cancelled) {
          setResult(fallback);
          setLoading(false);
        }
        return;
      }

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, cityState, email, industryId }),
        });

        if (!response.ok) {
          throw new Error("The live preview could not read this site yet.");
        }

        const data = (await response.json()) as PreviewResult;
        if (!cancelled) setResult(data);
      } catch (err) {
        if (!cancelled) {
          setResult(fallback);
          setError(err instanceof Error ? err.message : "The live preview could not run.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    runPreview();
    return () => {
      cancelled = true;
    };
  }, [url, cityState, email, industryId]);

  if (loading || !result) {
    return (
      <div className="min-h-screen bg-[#f9fafb]">
        <SiteHeader />
        <div className="container py-16">
          <Card className="max-w-2xl mx-auto p-8 text-center border border-[#e5e7eb]">
            <RefreshCw className="mx-auto mb-4 animate-spin text-[#d97706]" size={36} />
            <h1 className="text-2xl font-bold text-[#1a2332] mb-2">Checking your website preview...</h1>
            <p className="text-[#374151]">Running basic lead leak checks for {cityState || "your service area"}.</p>
          </Card>
        </div>
      </div>
    );
  }

  const scoreColor = result.score >= 85 ? "text-green-600" : result.score >= 70 ? "text-[#d97706]" : result.score >= 50 ? "text-yellow-600" : "text-red-600";

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <SiteHeader />

      <div className="container py-10 md:py-16">
        <div className="mb-8">
          <Button onClick={() => setLocation("/")} variant="outline" className="mb-6">
            ← Back to Home
          </Button>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#d97706] mb-2">
                {result.industry.label} Lead Leak Preview
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-2">
                Free preview result
              </h1>
              <p className="text-[#374151] break-all">{result.normalizedUrl || "No website URL entered"}</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#6b7280]">
              <MapPin size={18} className="text-[#d97706]" />
              <span>{result.cityState || "No city/state entered"}</span>
            </div>
          </div>
        </div>

        {error && (
          <Card className="mb-8 p-4 border border-yellow-200 bg-yellow-50 text-yellow-900">
            <p className="text-sm">
              <strong>Note:</strong> {error} Showing a basic preview fallback for now. Build 2 should add Firecrawl for stronger site reading.
            </p>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <Card className="lg:col-span-2 bg-white border-2 border-[#d97706] p-8">
            <div className="grid md:grid-cols-[180px_1fr] gap-8 items-center mb-8">
              <div className="text-center">
                <div className={`text-7xl font-bold ${scoreColor} mb-2`}>{result.score}</div>
                <div className="text-sm font-semibold text-[#6b7280]">/ 100</div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#1a2332] mb-2">{result.label}</h2>
                <p className="text-[#374151] mb-4">{result.summary}</p>
                <span className="inline-flex items-center rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-bold text-[#374151]">
                  {result.confidence}
                </span>
              </div>
            </div>

            <div className="border-t border-[#e5e7eb] pt-8">
              <h3 className="font-bold text-[#1a2332] mb-6">Preview Findings</h3>
              <div className="space-y-6">
                {result.findings.map((finding, index) => {
                  const styles = getSeverityStyles(finding.severity);
                  return (
                    <div key={`${finding.title}-${index}`} className="pb-6 border-b border-[#e5e7eb] last:border-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        {styles.icon}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h4 className="font-bold text-[#1a2332]">{finding.title}</h4>
                            <span className={`rounded-full px-2 py-1 text-[11px] font-bold ${styles.badge}`}>{styles.label}</span>
                          </div>
                          <p className="text-[#374151] text-sm mb-3">{finding.explanation}</p>
                          <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded p-3">
                            <p className="text-xs font-semibold text-[#6b7280] mb-2">Possible Fix:</p>
                            <ul className="text-xs text-[#374151] space-y-1">
                              {finding.fix.map((fix) => (
                                <li key={fix}>• {fix}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white border border-[#e5e7eb] p-6">
              <Clock className="text-[#d97706] mb-3" size={24} />
              <p className="text-xs font-semibold text-[#6b7280] mb-1">CHECKED</p>
              <p className="font-semibold text-[#1a2332]">{new Date(result.checkedAt).toLocaleString()}</p>
            </Card>
            <Card className="bg-white border border-[#e5e7eb] p-6">
              <ShieldCheck className="text-[#d97706] mb-3" size={24} />
              <p className="text-xs font-semibold text-[#6b7280] mb-1">BUSINESS TYPE</p>
              <p className="font-semibold text-[#1a2332]">{result.industry.label}</p>
            </Card>
            <Card className="bg-white border border-[#e5e7eb] p-6">
              <Search className="text-[#d97706] mb-3" size={24} />
              <p className="text-xs font-semibold text-[#6b7280] mb-1">LOCAL SEO</p>
              <p className="font-semibold text-[#1a2332] text-sm">Basic visibility gaps included</p>
            </Card>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-[#1a2332] to-[#2d3e52] border-2 border-[#d97706] p-8 md:p-12 text-white mb-10">
          <div className="flex items-start gap-6">
            <Lock className="text-[#d97706] flex-shrink-0 mt-1" size={32} />
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3">
                {result.noSaleRecommended ? "Paid report not recommended yet" : "Full Report Locked"}
              </h3>
              <p className="text-[#d1d5db] mb-6">
                {result.noSaleRecommended
                  ? "This basic preview did not find enough meaningful issues to confidently recommend a paid report. That trust rule is part of the product."
                  : "The later paid report will include all lead leaks, copy/paste fixes, local SEO gaps, and a checklist to send to your web person."}
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-8 bg-[#374151] bg-opacity-50 p-6 rounded-lg">
                {["Top 5 Lead Leaks", "Copy/Paste Fixes", "Local SEO Gap Check", "Web Person Checklist", "7-Day Fix Plan", "Shareable Report Link"].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button disabled className="bg-[#d97706] text-white font-bold text-lg py-6 px-8 disabled:opacity-70">
                  Unlock Full Report — Coming Later
                </Button>
                <Button onClick={() => setLocation("/")} variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a2332] font-bold text-lg py-6 px-8">
                  Run Another Preview
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-[#e5e7eb] p-8">
          <h3 className="font-bold text-[#1a2332] mb-4">About Build 1A</h3>
          <p className="text-[#374151] mb-4">
            This build adds the multi-niche preview flow. It uses a server-side basic homepage fetch when available, then applies rule-based checks by selected business type.
          </p>
          <p className="text-[#374151] mb-4">
            The next build should improve reliability with Firecrawl and screenshot/mobile checks before adding AI-generated full reports, payments, PDF generation, or a database.
          </p>
          <p className="text-sm text-[#6b7280]">
            <strong>Disclaimer:</strong> This preview is an informational website review. It does not guarantee rankings, traffic, calls, or revenue.
          </p>
        </Card>
      </div>
    </div>
  );
}
