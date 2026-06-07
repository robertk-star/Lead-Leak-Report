import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Lock,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import { useLocation } from "wouter";

/**
 * Design Philosophy: Industrial Modernism
 * Mock preview page showing free results before purchase
 * - Navy + Burnt Orange color scheme
 * - Score card with critical leak findings
 * - Locked full report section with upgrade CTA
 */

export default function Preview() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#e5e7eb] shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-[#1a2332] hover:text-[#d97706] transition"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1a2332] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">LLR</span>
            </div>
            <span className="font-bold text-[#1a2332] text-lg">Lead Leak Report</span>
          </div>
          <div className="w-20" />
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-12">
        {/* Company Info */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a2332] mb-2">
            Sample Roofing Co.
          </h1>
          <p className="text-lg text-[#374151]">sampleroofing.com</p>
        </div>

        {/* Score Card */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Main Score */}
          <div className="md:col-span-2">
            <Card className="bg-white border-2 border-[#d97706] p-8 md:p-12">
              <div className="flex items-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-7xl font-bold text-[#d97706] mb-2">58</div>
                  <div className="text-sm font-semibold text-[#6b7280]">/ 100</div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1a2332] mb-2">
                    Multiple Lead Leaks Found
                  </h2>
                  <p className="text-[#374151]">
                    Your website has several conversion friction points that may be costing you leads.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#e5e7eb] pt-8">
                <h3 className="font-bold text-[#1a2332] mb-6">Free Preview Findings:</h3>

                {/* Critical Leak */}
                <div className="mb-6 pb-6 border-b border-[#e5e7eb]">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="text-red-500 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-[#1a2332] mb-2">
                        Critical Leak: Phone number not visible near top
                      </h4>
                      <p className="text-[#374151] text-sm mb-3">
                        Homeowners with urgent roofing needs often want to call immediately. If your phone number is hidden or not click-to-call, you may lose leads to competitors.
                      </p>
                      <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded p-3">
                        <p className="text-xs font-semibold text-[#6b7280] mb-2">Quick Fix:</p>
                        <ul className="text-xs text-[#374151] space-y-1">
                          <li>• Add phone number to header</li>
                          <li>• Make it click-to-call on mobile</li>
                          <li>• Add sticky "Call Now" button on mobile</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning Leak */}
                <div>
                  <div className="flex items-start gap-4">
                    <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-[#1a2332] mb-2">
                        Warning: Estimate request form is too long
                      </h4>
                      <p className="text-[#374151] text-sm mb-3">
                        Your contact form has 12 fields. Most homeowners abandon forms with more than 5 fields. This is likely costing you estimate requests.
                      </p>
                      <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded p-3">
                        <p className="text-xs font-semibold text-[#6b7280] mb-2">Quick Fix:</p>
                        <ul className="text-xs text-[#374151] space-y-1">
                          <li>• Reduce form to 5 essential fields</li>
                          <li>• Move form above the fold</li>
                          <li>• Add progress indicator for multi-step form</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Analysis Date */}
            <Card className="bg-white border border-[#e5e7eb] p-6">
              <p className="text-xs font-semibold text-[#6b7280] mb-2">ANALYSIS DATE</p>
              <p className="font-semibold text-[#1a2332]">June 7, 2026</p>
            </Card>

            {/* Service Area */}
            <Card className="bg-white border border-[#e5e7eb] p-6">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-[#d97706] flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-xs font-semibold text-[#6b7280] mb-1">SERVICE AREA</p>
                  <p className="font-semibold text-[#1a2332]">Dallas, TX</p>
                </div>
              </div>
            </Card>

            {/* Mobile Readiness */}
            <Card className="bg-white border border-[#e5e7eb] p-6">
              <div className="flex items-start gap-3">
                <Phone className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-xs font-semibold text-[#6b7280] mb-1">MOBILE READY</p>
                  <p className="font-semibold text-[#1a2332] text-sm">Partially Optimized</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Locked Full Report Section */}
        <Card className="bg-gradient-to-br from-[#1a2332] to-[#2d3e52] border-2 border-[#d97706] p-8 md:p-12 text-white mb-12">
          <div className="flex items-start gap-6">
            <Lock className="text-[#d97706] flex-shrink-0 mt-1" size={32} />
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3">Unlock the Full Report</h3>
              <p className="text-[#d1d5db] mb-6">
                Get the complete analysis with all 5 lead leaks, detailed copy/paste fixes, local SEO gaps, and a 7-day fix plan you can send directly to your web person.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8 bg-[#374151] bg-opacity-50 p-6 rounded-lg">
                <div>
                  <p className="text-xs font-semibold text-[#d1d5db] mb-2">INCLUDES:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Top 5 Lead Leaks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Copy/Paste Fixes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Local SEO Check</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>7-Day Fix Plan</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#d1d5db] mb-2">ALSO INCLUDES:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Google Business Profile Tips</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Web Person Checklist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>No Sales Call</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span>5-Minute Read</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-lg py-6 px-8 transition-all hover:shadow-lg hover:scale-105 active:scale-95">
                  Unlock Full Report — $29
                </Button>
                <Button
                  onClick={() => setLocation("/")}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1a2332] font-bold text-lg py-6 px-8"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Info Section */}
        <Card className="bg-white border border-[#e5e7eb] p-8">
          <h3 className="font-bold text-[#1a2332] mb-4">About This Report</h3>
          <p className="text-[#374151] mb-4">
            This free preview shows the most critical issues we found on your website. The full report includes all 5 lead leaks, detailed fixes you can copy/paste, and a checklist to send to your web person.
          </p>
          <p className="text-[#374151] mb-4">
            The report is designed to be read in about 5 minutes and forwarded to whoever manages your website.
          </p>
          <p className="text-sm text-[#6b7280]">
            <strong>Disclaimer:</strong> This report is an informational website review. It does not guarantee rankings, traffic, calls, or revenue. Results depend on your website, market, traffic, and whether the fixes are implemented.
          </p>
        </Card>
      </div>
    </div>
  );
}
