import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  CheckCircle2,
  Phone,
  Star,
  MapPin,
  FileText,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

/**
 * Design Philosophy: Industrial Modernism
 * - Navy + Burnt Orange + Charcoal Gray + Off-white palette
 * - Poppins Bold for headlines, Inter for body
 * - Asymmetric layouts with orange accent lines
 * - Strong, immediate feedback on interactions
 */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleCheckWebsite = () => {
    setLocation("/preview");
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#e5e7eb] shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1a2332] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">LLR</span>
            </div>
            <span className="font-bold text-[#1a2332] text-lg">Lead Leak Report</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-[#374151] hover:text-[#1a2332] transition">
              How It Works
            </a>
            <a href="#what-we-check" className="text-[#374151] hover:text-[#1a2332] transition">
              What We Check
            </a>
            <a href="#sample-report" className="text-[#374151] hover:text-[#1a2332] transition">
              Sample Report
            </a>
            <a href="#faq" className="text-[#374151] hover:text-[#1a2332] transition">
              FAQ
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={handleCheckWebsite}
              className="bg-[#d97706] hover:bg-[#b45309] text-white font-semibold"
            >
              Check My Website
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#1a2332]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-[#e5e7eb] bg-white">
            <div className="container py-4 flex flex-col gap-4">
              <a href="#how-it-works" className="text-[#374151] hover:text-[#1a2332]">
                How It Works
              </a>
              <a href="#what-we-check" className="text-[#374151] hover:text-[#1a2332]">
                What We Check
              </a>
              <a href="#sample-report" className="text-[#374151] hover:text-[#1a2332]">
                Sample Report
              </a>
              <a href="#faq" className="text-[#374151] hover:text-[#1a2332]">
                FAQ
              </a>
              <Button
                onClick={handleCheckWebsite}
                className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-semibold"
              >
                Check My Website
              </Button>
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-[#f9fafb] py-16 md:py-24 border-b-4 border-[#d97706]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1a2332] mb-6 leading-tight">
                Is your roofing website leaking leads?
              </h1>
              <p className="text-lg text-[#374151] mb-8 leading-relaxed">
                Before you spend more on ads, SEO, or a new website, find out if your current site is making it harder for homeowners to call or request an estimate.
              </p>

              {/* Hero Form */}
              <div className="bg-white border-l-4 border-[#d97706] p-6 rounded-lg shadow-md mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1a2332] mb-2">
                      Your Website URL
                    </label>
                    <Input
                      type="text"
                      placeholder="https://yourroofingcompany.com"
                      className="w-full border-[#e5e7eb]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1a2332] mb-2">
                      City / State
                    </label>
                    <Input
                      type="text"
                      placeholder="Dallas, TX"
                      className="w-full border-[#e5e7eb]"
                    />
                  </div>
                  <Button
                    onClick={handleCheckWebsite}
                    className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-lg py-6 transition-all hover:shadow-lg hover:scale-105 active:scale-95"
                  >
                    Check My Website
                  </Button>
                  <p className="text-xs text-[#6b7280] text-center">
                    Free preview first. Paid report only recommended if we find meaningful issues.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Mock Score Card */}
            <div className="hidden md:block">
              <div className="bg-white border border-[#e5e7eb] rounded-lg shadow-lg p-8 space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-[#d97706] mb-2">58</div>
                  <div className="text-sm font-semibold text-[#6b7280]">/ 100</div>
                  <div className="text-lg font-bold text-[#1a2332] mt-4">Multiple Lead Leaks</div>
                </div>

                <div className="border-t border-[#e5e7eb] pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-[#1a2332] text-sm">Critical Leak Found</p>
                      <p className="text-xs text-[#6b7280] mt-1">
                        Phone number not visible near top
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-[#1a2332] text-sm">Top Fix</p>
                      <p className="text-xs text-[#6b7280] mt-1">Add sticky mobile call button</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f3f4f6] border-2 border-dashed border-[#d1d5db] rounded p-4 text-center">
                  <p className="text-xs font-semibold text-[#6b7280] mb-2">LOCKED</p>
                  <p className="text-sm font-bold text-[#1a2332]">Full Report</p>
                  <p className="text-xs text-[#6b7280] mt-1">Unlock for $29</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-4 text-center">
            More traffic does not help if your website leaks the lead.
          </h2>
          <p className="text-lg text-[#374151] text-center mb-12 max-w-2xl mx-auto">
            Most roofers do not need a huge website rebuild right away. They need to know which obvious leaks should be patched first.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: "Homeowners cannot call quickly",
                desc: "If your phone number is hidden or not click-to-call, leads walk away.",
              },
              {
                icon: Star,
                title: "Trust proof is missing or buried",
                desc: "Reviews, certifications, and project photos should be easy to find.",
              },
              {
                icon: MapPin,
                title: "Google and homeowners cannot clearly tell where you work",
                desc: "Your service area and location should be obvious on the first screen.",
              },
            ].map((item, idx) => (
              <Card key={idx} className="p-8 border-l-4 border-[#d97706] hover:shadow-lg transition">
                <item.icon className="text-[#d97706] mb-4" size={32} />
                <h3 className="text-lg font-bold text-[#1a2332] mb-3">{item.title}</h3>
                <p className="text-[#374151]">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Check Section */}
      <section id="what-we-check" className="py-16 md:py-24 bg-[#f9fafb]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-12 text-center">
            What the Lead Leak Report checks
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Emergency Call Readiness",
                desc: "Can a mobile homeowner call you quickly?",
              },
              {
                title: "5-Second Clarity",
                desc: "Does the first screen clearly say roofing and your service area?",
              },
              {
                title: "Trust Proof",
                desc: "Are reviews, certifications, warranties, and project photos easy to see?",
              },
              {
                title: "Estimate Path",
                desc: "Is it easy to request an estimate without a long, confusing form?",
              },
              {
                title: "Local Proof",
                desc: "Does the site show real local service-area relevance?",
              },
              {
                title: "Foundational Local SEO Gaps",
                desc: "Does the site give Google and homeowners the basic signals they expect?",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="p-6 bg-white border border-[#e5e7eb] hover:border-[#d97706] hover:shadow-md transition"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#d97706] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a2332]">{item.title}</h3>
                </div>
                <p className="text-[#374151] text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Critical Leak Example Section */}
      <section id="sample-report" className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-12 text-center">
            Example: Critical Lead Leak
          </h2>

          <div className="max-w-2xl mx-auto">
            <Card className="border-l-4 border-red-500 bg-red-50 p-8 mb-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={28} />
                <div>
                  <h3 className="text-lg font-bold text-red-700 mb-2">
                    Critical Leak Found: No phone number visible near the top of the homepage
                  </h3>
                  <p className="text-red-600 text-sm">
                    For a roofing company, homeowners with storm damage or a leak often want to call quickly. If the phone number is hidden, missing, or not click-to-call, some visitors may leave before contacting you.
                  </p>
                </div>
              </div>
            </Card>

            <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-lg p-8">
              <h4 className="font-bold text-[#1a2332] mb-6">Fix preview:</h4>
              <ul className="space-y-3">
                {[
                  "Add phone number to the header",
                  "Make it click-to-call",
                  'Add a sticky mobile "Call Now" button',
                  'Add a clear "Get Free Roof Inspection" button',
                ].map((fix, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-[#374151]">{fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Paid Report Section */}
      <section className="py-16 md:py-24 bg-[#f9fafb]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-12 text-center">
            What you get in the full report
          </h2>

          <div className="max-w-3xl mx-auto">
            <Card className="border border-[#e5e7eb] p-8 md:p-12 bg-white">
              <div className="space-y-6">
                {[
                  "Lead Leak Score",
                  "Top 5 Lead Leaks",
                  "Copy/Paste Website Fixes",
                  "Foundational Local SEO Gaps",
                  "Google Business Profile Freshness Ideas",
                  "7-Day Fix Plan",
                  "Send This to Your Web Person Checklist",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-6 border-b border-[#e5e7eb] last:border-b-0 last:pb-0">
                    <FileText className="text-[#d97706] flex-shrink-0 mt-1" size={20} />
                    <span className="text-[#374151] font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-center text-[#6b7280] mt-8 text-sm">
                The report is designed to be read in about 5 minutes and forwarded to whoever manages your website.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Send to Web Person Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-4 text-center">
            No new website company required
          </h2>
          <p className="text-lg text-[#374151] text-center mb-12 max-w-2xl mx-auto">
            We do not make you switch vendors. The report gives you a clear checklist you can send to your current web person, designer, agency, or office manager.
          </p>

          <div className="max-w-2xl mx-auto">
            <Card className="border border-[#e5e7eb] p-8 bg-[#f9fafb]">
              <h3 className="font-bold text-[#1a2332] mb-6">Send This to Your Web Person Checklist:</h3>
              <ul className="space-y-3">
                {[
                  "Add sticky mobile call button",
                  "Make phone number click-to-call",
                  "Move estimate CTA above first scroll",
                  "Add review block near top",
                  "Add roofing + city wording to homepage headline",
                  "Add recent project photos with city labels",
                  "Shorten contact form to 5 fields or fewer",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 border-2 border-[#d97706] rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="text-[#d97706]" size={16} />
                    </div>
                    <span className="text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="py-16 md:py-24 bg-[#f9fafb]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-4 text-center">
            Basic local SEO checks included
          </h2>
          <p className="text-lg text-[#374151] text-center mb-12 max-w-2xl mx-auto">
            This is not a full SEO audit. We check the simple local visibility signals that help homeowners and search engines understand what you do, where you work, and why you can be trusted.
          </p>

          <div className="max-w-2xl mx-auto">
            <Card className="border border-[#e5e7eb] p-8 bg-white">
              <ul className="grid md:grid-cols-2 gap-6">
                {[
                  "Roofing + city in homepage title/headline",
                  "Dedicated roof repair/replacement pages",
                  "Service areas listed",
                  "Reviews visible on site",
                  "Project photos with locations",
                  "FAQ section",
                  "Clear name/address/phone",
                  "Fresh/current site signals",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-[#374151]">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-white border-t-4 border-[#d97706]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-12 text-center">
            Simple pricing
          </h2>

          <div className="max-w-md mx-auto">
            <Card className="border-2 border-[#d97706] p-8 bg-gradient-to-b from-white to-[#f9fafb]">
              <h3 className="text-2xl font-bold text-[#1a2332] mb-2">Lead Leak Report</h3>
              <div className="text-4xl font-bold text-[#d97706] mb-6">$29</div>

              <ul className="space-y-3 mb-8">
                {[
                  "Free preview first",
                  "Full 5-minute report",
                  "Top 5 lead leaks",
                  "Copy/paste fixes",
                  "Local SEO gap check",
                  "Web-person checklist",
                  "No sales call required",
                  "No website rebuild required",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-[#374151] text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={handleCheckWebsite}
                className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold py-6 transition-all hover:shadow-lg hover:scale-105 active:scale-95 mb-4"
              >
                Check My Website
              </Button>

              <p className="text-xs text-[#6b7280] text-center">
                If we do not find enough meaningful issues, we will not recommend buying the full report.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-[#f9fafb]">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="max-w-2xl mx-auto space-y-6">
            {[
              {
                q: "Is this an SEO audit?",
                a: "No. This is a conversion-first website report with basic local SEO checks included. We focus on calls, estimate requests, trust, and local clarity.",
              },
              {
                q: "Do you make the website changes?",
                a: "No. The report gives you copy/paste fixes and a checklist you can send to your current web person.",
              },
              {
                q: "Do you guarantee more leads?",
                a: "No. The report identifies likely friction points and practical improvements. Results depend on your website, market, traffic, and whether the fixes are implemented.",
              },
              {
                q: "What if my site is already strong?",
                a: "If we do not find enough meaningful issues, we will tell you and will not recommend buying the paid report.",
              },
              {
                q: "How long is the report?",
                a: "It is designed to be read in about 5 minutes.",
              },
              {
                q: "Why is this only for roofers?",
                a: "Roofing leads are high-value, trust matters, and homeowners often need to call quickly. The report is built around how roofing customers make decisions.",
              },
            ].map((item, idx) => (
              <Card key={idx} className="border border-[#e5e7eb] p-6 bg-white">
                <h3 className="font-bold text-[#1a2332] mb-3 flex items-start gap-2">
                  <span className="text-[#d97706] font-bold">Q:</span>
                  {item.q}
                </h3>
                <p className="text-[#374151] flex items-start gap-2">
                  <span className="text-[#d97706] font-bold flex-shrink-0">A:</span>
                  {item.a}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2332] text-white py-12 border-t-4 border-[#d97706]">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-2">Lead Leak Report</h3>
              <p className="text-[#d1d5db] text-sm">
                Website conversion + local visibility checks for roofing companies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm text-[#d1d5db]">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get Started</h4>
              <Button
                onClick={handleCheckWebsite}
                className="bg-[#d97706] hover:bg-[#b45309] text-white font-semibold w-full"
              >
                Check My Website
              </Button>
            </div>
          </div>

          <div className="border-t border-[#374151] pt-8">
            <p className="text-xs text-[#9ca3af] text-center">
              This report is an informational website review. It does not guarantee rankings, traffic, calls, or revenue.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
