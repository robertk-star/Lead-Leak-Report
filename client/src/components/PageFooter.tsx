import { Link } from "wouter";

const links = [
  ["How It Works", "/how-it-works"],
  ["AI Visibility", "/ai-visibility"],
  ["Sample Report", "/sample-report"],
  ["Pricing", "/pricing"],
  ["FAQ", "/faq"],
];

const industryLinks = [
  ["Roofers", "/roofers"],
  ["Plumbers", "/plumbers"],
  ["Electricians", "/electricians"],
  ["HVAC", "/hvac"],
  ["Landscapers", "/landscapers"],
];

export default function PageFooter() {
  return (
    <footer className="bg-[#111827] text-white py-12">
      <div className="container grid md:grid-cols-3 gap-8">
        <div>
          <p className="font-bold text-lg">Lead Leak Report</p>
          <p className="text-sm text-[#d1d5db] mt-2">
            AI visibility readiness, foundational local SEO, and website lead leak checks for local service businesses.
          </p>
          <p className="text-xs text-[#9ca3af] mt-4">
            This report is an informational website review. It does not guarantee AI mentions, rankings, traffic, calls, or revenue.
          </p>
        </div>
        <div>
          <p className="font-bold mb-3">Product</p>
          <div className="grid gap-2 text-sm">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="text-[#d1d5db] hover:text-white transition">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold mb-3">Industries</p>
          <div className="grid gap-2 text-sm">
            {industryLinks.map(([label, href]) => (
              <Link key={href} href={href} className="text-[#d1d5db] hover:text-white transition">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
