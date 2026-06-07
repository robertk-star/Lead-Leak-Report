import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { industries, type IndustryId } from "@/data/industries";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

type LeadCheckFormProps = {
  defaultIndustryId?: IndustryId;
  compact?: boolean;
};

export default function LeadCheckForm({ defaultIndustryId = "roofing", compact = false }: LeadCheckFormProps) {
  const [, setLocation] = useLocation();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [cityState, setCityState] = useState("");
  const [email, setEmail] = useState("");
  const [industryId, setIndustryId] = useState<IndustryId>(defaultIndustryId);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams({
      industry: industryId,
      url: websiteUrl.trim(),
      location: cityState.trim(),
      email: email.trim(),
    });
    setLocation(`/preview?${params.toString()}`);
  };

  return (
    <Card className={`bg-white border-l-4 border-[#d97706] shadow-md ${compact ? "p-5" : "p-6"}`}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold text-[#1a2332] mb-2">Business Type</label>
          <select
            value={industryId}
            onChange={(event) => setIndustryId(event.target.value as IndustryId)}
            className="w-full h-11 rounded-md border border-[#e5e7eb] bg-white px-3 text-sm text-[#1a2332] outline-none focus:ring-2 focus:ring-[#d97706]"
          >
            {industries.map((industry) => (
              <option key={industry.id} value={industry.id}>
                {industry.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1a2332] mb-2">Website URL</label>
          <Input
            type="text"
            value={websiteUrl}
            onChange={(event) => setWebsiteUrl(event.target.value)}
            placeholder="https://yourcompany.com"
            required
            className="w-full border-[#e5e7eb]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1a2332] mb-2">City / State</label>
          <Input
            type="text"
            value={cityState}
            onChange={(event) => setCityState(event.target.value)}
            placeholder="Dallas, TX"
            required
            className="w-full border-[#e5e7eb]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1a2332] mb-2">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            required
            className="w-full border-[#e5e7eb]"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-base py-6 transition-all hover:shadow-lg"
        >
          Check My Website <ArrowRight className="ml-2" size={18} />
        </Button>
        <p className="text-xs text-[#6b7280] text-center">
          Free preview first. Paid report only recommended if we find meaningful issues.
        </p>
      </form>
    </Card>
  );
}
