import React from "react";
import type { Metadata } from "next";
import { HomeClient } from "@/components/home/HomeClient";
import { LANDING_FAQS } from "@/data/landingFaqs";
import { env } from "@/lib/env";
import { safeJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Flunked — College Survival Tools",
  description:
    "Free student calculators for Indian colleges: 75% attendance bunk limits, university CGPA converter, CTC in-hand salary, and survival tools. Zero ads.",
  alternates: {
    canonical: env.NEXT_PUBLIC_BASE_URL,
  },
  openGraph: {
    title: "Flunked — College Survival Tools",
    description:
      "Free student calculators for Indian colleges: 75% attendance bunk limits, university CGPA converter, CTC in-hand salary, and survival tools. Zero ads.",
    url: env.NEXT_PUBLIC_BASE_URL,
    siteName: "Flunked",
    type: "website",
  },
};

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LANDING_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
      />
      <HomeClient />
    </>
  );
}
