import React from "react";
import type { Metadata } from "next";
import { HomeClient } from "@/components/home/HomeClient";
import { LANDING_FAQS } from "@/data/landingFaqs";

export const metadata: Metadata = {
  title: "Flunked.fun — Academic Survival Tools Built for Indian College Chaos",
  description:
    "Free, student-only calculators for Indian colleges: 75% bunk limits, official university CGPA conversion, in-hand placement take-home, and semester survival tools. Zero ads.",
  alternates: {
    canonical: "https://flunked.fun",
  },
  openGraph: {
    title: "Flunked.fun — Academic Survival Tools Built for Indian College Chaos",
    description:
      "Free student-only calculators for Indian colleges: 75% bunk attendance, official university CGPA conversion, CTC to in-hand salary, and semester survival.",
    url: "https://flunked.fun",
    siteName: "Flunked.fun",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient />
    </>
  );
}
