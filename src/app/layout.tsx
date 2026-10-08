import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { Footer } from "@/components/layout/Footer";
import { OnboardingTutorial } from "@/components/tutorial/OnboardingTutorial";
import { TopProgressBar } from "@/components/layout/TopProgressBar";
import { env } from "@/lib/env";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#FFD027",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: {
    default: "Flunked.online — Tools built for the chaos of college",
    template: "%s | Flunked.online",
  },
  description:
    "Free, student-only multi-tool platform for Indian college students. 75% bunk calculator, official university CGPA to %, CTC in-hand salary, and academic survival tools.",
  applicationName: "Flunked.online",
  alternates: {
    canonical: env.NEXT_PUBLIC_BASE_URL,
  },
  keywords: [
    "bunk calculator",
    "cgpa to percentage calculator",
    "ctc in hand salary calculator",
    "college attendance calculator",
    "75 percent attendance rule",
    "semester survival planner",
    "vit",
    "srm",
    "bits pilani",
    "anna university",
    "vtu attendance",
    "indian college student tools",
    "flunked.online",
  ],
  authors: [{ name: "Flunked.online Team", url: env.NEXT_PUBLIC_BASE_URL }],
  creator: "Flunked.online",
  publisher: "Flunked.online",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: env.NEXT_PUBLIC_BASE_URL,
    siteName: "Flunked.online",
    title: "Flunked.online — Tools built for the chaos of college",
    description:
      "Free student multi-tools: 75% bunk calculator, official university CGPA conversion, in-hand placement take-home, and semester survival tools. Zero ads.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flunked.online — College Academic Survival Tools",
    description:
      "Free student calculators: 75% bunk attendance, university CGPA converter, CTC in-hand salary, and semester survival planners.",
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  // Global structured data: WebSite with SearchAction + EducationalOrganization
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Flunked.online",
        description:
          "Academic survival tools and campus calculators built for Indian college students.",
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/tools?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "EducationalOrganization",
        "@id": `${baseUrl}/#organization`,
        name: "Flunked.online",
        url: baseUrl,
        logo: `${baseUrl}/icon`,
        description:
          "Independent, non-commercial digital platform providing free academic and placement calculations for Indian university students.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
        sameAs: ["https://buymeacoffee.com/fayezahmad"],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="bg-flunked-bg text-flunked-text min-h-screen antialiased flex flex-col w-full max-w-full overflow-x-hidden">
        <TopProgressBar />
        <AuthProvider>
          <div className="flex flex-col min-h-screen w-full max-w-full min-w-0 overflow-x-hidden">
            <main className="flex-1 flex flex-col w-full max-w-full min-w-0">{children}</main>
            <Footer />
            {/* Skippable Onboarding Tutorial */}
            <OnboardingTutorial />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
