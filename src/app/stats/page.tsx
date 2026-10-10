import type { Metadata } from "next";
import { StatsClient } from "@/components/stats/StatsClient";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: "Live Stats & Campus Pulse — Platform Analytics",
  description:
    "Open, cookieless platform metrics on how Indian university students navigate the 75% attendance rule, placement salaries, and campus survival.",
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/stats`,
  },
  openGraph: {
    title: "Live Stats & Campus Pulse — Flunked Platform Metrics",
    description:
      "Interactive bar charts, 75% bunk distribution curves, and open web analytics across 180+ Indian colleges. 100% cookieless telemetry.",
    url: `${env.NEXT_PUBLIC_BASE_URL}/stats`,
    siteName: "Flunked",
    type: "website",
  },
};

export default function StatsPage() {
  return <StatsClient />;
}
