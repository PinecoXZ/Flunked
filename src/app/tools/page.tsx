import React from "react";
import type { Metadata } from "next";
import { ToolsIndexClient } from "@/components/tools/ToolsIndexClient";

export const metadata: Metadata = {
  title: "All 19 College Survival Tools & Campus Calculators",
  description:
    "Explore 19 student-tested calculators for Indian colleges: 75% attendance bunking, official CGPA conversions, CTC in-hand breakdown, and exam survival.",
  alternates: {
    canonical: "https://flunked.fun/tools",
  },
  openGraph: {
    title: "All 19 College Survival Tools & Campus Calculators",
    description:
      "Explore all 19 free academic, attendance, placement, and hostel calculators for Indian college students. Zero ads. Instant calculations.",
    url: "https://flunked.fun/tools",
    siteName: "Flunked.fun",
    type: "website",
  },
};

export default function ToolsPage() {
  return <ToolsIndexClient />;
}
