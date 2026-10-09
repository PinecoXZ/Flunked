import React from "react";
import type { Metadata } from "next";
import { ToolsIndexClient } from "@/components/tools/ToolsIndexClient";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: "All 19 College Survival Tools & Campus Calculators",
  description:
    "Explore 19 student-tested calculators for Indian colleges: 75% attendance bunking, official CGPA conversions, CTC in-hand breakdown, and exam survival.",
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/tools`,
  },
  openGraph: {
    title: "All 19 College Survival Tools & Campus Calculators",
    description:
      "Explore all 19 free academic, attendance, placement, and hostel calculators for Indian college students. Zero ads. Instant calculations.",
    url: `${env.NEXT_PUBLIC_BASE_URL}/tools`,
    siteName: "Flunked",
    type: "website",
  },
};

export default function ToolsPage() {
  return <ToolsIndexClient />;
}
