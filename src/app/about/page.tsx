import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Coffee, ShieldCheck, Sparkles } from "lucide-react";
import { SubpageHeader } from "@/components/layout/SubpageHeader";

export const metadata: Metadata = {
  title: "About the Project — Manifesto & Story",
  description:
    "Why Flunked was built: 19 free, zero-friction academic & campus survival calculators created by Indian students, for Indian students. No corporate BS.",
  alternates: {
    canonical: "https://flunked.online/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
      {/* Breadcrumbs & Back button */}
      <SubpageHeader breadcrumbLabel="About" backLabel="Back to Hub" />

      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-flunked-yellow border-2 border-black text-xs font-mono text-black uppercase tracking-wider font-black shadow-neo-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-black" />
            <span>Manifesto</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-black">
            About Flunked
          </h1>
          <p className="text-xs font-mono font-bold text-black/70">Just the truth.</p>
        </div>

        {/* Editorial Quote Card */}
        <div className="relative rounded-2xl bg-white border-2 border-black p-6 sm:p-10 shadow-neo space-y-6">
          <blockquote className="text-lg sm:text-2xl text-black font-serif leading-relaxed space-y-4 font-normal">
            <p>
              Flunked is a collection of survival tools built specifically for Indian college
              students.
            </p>
            <p className="font-sans font-black text-base sm:text-lg">
              <span className="bg-flunked-yellow border-2 border-black px-2 py-0.5 rounded shadow-neo-sm text-black">
                No ads. No corporate garbage. No BS.
              </span>
            </p>
            <p>
              Built by students who were tired of calculating attendance in their heads at 8:00 AM
              on cold mornings.
            </p>
            <p className="text-sm sm:text-base text-black/80 font-sans font-medium">
              If you have a tool idea, suggest it. If it&apos;s useful, it&apos;ll be live in a
              week.
            </p>
          </blockquote>
        </div>

        {/* Story Section */}
        <div className="space-y-4 text-sm sm:text-base text-black/80 font-sans leading-relaxed border-t-2 border-black pt-8 font-medium">
          <h2 className="text-xl font-black text-black">The Student Survival Problem</h2>
          <p>
            Indian college life is dominated by hyper-specific micro-calculations: How many classes
            can I miss before my attendance hits 74.9%? What does a 12 LPA CTC actually pay out per
            month after gratuity, PF, and TDS? Who owes who after the Friday night Biryani order?
          </p>
          <p>
            Instead of clunky WhatsApp arguments or broken Excel sheets, Flunked puts all 19 tools
            in one zero-friction, student-verified place.
          </p>
        </div>

        {/* Support & Buy Me a Coffee Card */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-flunked-yellow border-2 border-black shadow-neo">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white text-black border-2 border-black shadow-neo-sm shrink-0">
              <Coffee className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="text-sm font-mono font-black text-black">
                Support the project · Buy me a coffee
              </div>
              <div className="text-xs font-mono font-bold text-black/80">
                Flunked is 100% free, private &amp; ad-free. If it saved your attendance or sanity,
                support the creator!
              </div>
            </div>
          </div>

          <a
            href="https://buymeacoffee.com/fayezahmad"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-50 border-2 border-black text-black font-mono font-black text-xs shadow-neo hover:shadow-neo-lg hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer shrink-0"
          >
            <span>Buy me a coffee ☕</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </a>
        </div>

        {/* Suggest a tool card */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border-2 border-black shadow-neo">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-flunked-yellow text-black border-2 border-black shadow-neo-sm shrink-0">
              <Sparkles className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-sm font-mono font-black text-black">
                Got a tool idea or feedback?
              </div>
              <div className="text-xs font-mono font-bold text-black/70">
                Submit your suggestions in 10 seconds.
              </div>
            </div>
          </div>

          <Link
            href="/suggest"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-flunked-yellow hover:bg-[#FFD000] border-2 border-black text-black font-mono font-black text-xs shadow-neo hover:shadow-neo-lg hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            <span>Suggest a tool</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </Link>
        </div>
      </div>
    </div>
  );
}
