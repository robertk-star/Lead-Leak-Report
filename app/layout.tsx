import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const siteUrl = "https://www.leadleakreport.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Visibility and Lead Leak Report for Local Service Businesses",
    template: "%s | Lead Leak Report",
  },
  description:
    "Check whether your local service business website is ready for AI search and whether it leaks calls, estimate requests, trust, and foundational local SEO signals.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "AI Visibility and Lead Leak Report for Local Service Businesses",
    description:
      "Check AI visibility readiness, local SEO basics, and lead leak issues for local service business websites.",
    url: siteUrl,
    siteName: "Lead Leak Report",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Visibility and Lead Leak Report",
    description:
      "Check whether your local service business website is ready for AI search and whether it leaks calls, trust, and estimate requests.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ErrorBoundary>
          <ThemeProvider defaultTheme="light">
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
