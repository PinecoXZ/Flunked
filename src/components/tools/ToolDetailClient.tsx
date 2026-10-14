"use client";

import Link from "next/link";
import { type ToolItem } from "@/data/tools";
import { type ToolFaq } from "@/data/toolFaqs";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolFaqSection } from "@/components/tools/ToolFaqSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

import { ArrowLeft } from "lucide-react";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { TOOL_COMPONENTS } from "@/components/tools/toolRegistry";
import { ToolErrorBoundary } from "@/components/ui/ToolErrorBoundary";
import { ProxyMascot, type MascotMood } from "@/components/mascot/ProxyMascot";

interface ToolDetailClientProps {
  tool: ToolItem | null;
  slug: string;
  faqs: ToolFaq[];
}

function getToolProxyConfig(tool: ToolItem): { mood: MascotMood; quip: string } {
  switch (tool.slug) {
    case "bunk-calculator":
      return {
        mood: "chill",
        quip: "Attendance below 75%? Let Proxy do the survival math.",
      };
    case "attend-or-skip":
      return {
        mood: "thinking",
        quip: "To sleep in or to attend? The eternal hostel question.",
      };
    case "am-i-cooked":
      return {
        mood: "panic",
        quip: "Deep breaths. Calculating your exact degree of cookedness.",
      };
    case "ctc-calculator":
      return {
        mood: "smug",
        quip: "Let's strip the 4-year ESOPs and find the real in-hand cash.",
      };
    case "stipend-checker":
      return {
        mood: "smug",
        quip: "Is that internship stipend covering rent, or just cutting chai?",
      };
    case "assignment-panic":
      return {
        mood: "panic",
        quip: "Due in 3 hours? Coffee brewed? Proxy is standing by.",
      };
    case "expense-splitter":
      return {
        mood: "chill",
        quip: "Never argue over canteen bills. Split and settle clean.",
      };
    case "sleep-debt":
      return {
        mood: "thinking",
        quip: "Running on 3 hours and 2 Red Bulls? Let's check the damage.",
      };
    case "mess-calories":
      return {
        mood: "chill",
        quip: "Deciphering the mysterious hostel mess nutrition matrix.",
      };
    case "cgpa-marriage":
      return {
        mood: "smug",
        quip: "Can your 6.2 CGPA pass the strict Rishta Auntie filter?",
      };
    case "tier-engineer":
      return {
        mood: "thinking",
        quip: "Tier 1, 2, or 3? Engineering trauma is universally equal.",
      };
    case "startup-match":
      return {
        mood: "smug",
        quip: "Match your chaotic energy to the right Indian tech startup.",
      };
    case "placement-quiz":
      return {
        mood: "thinking",
        quip: "Product, service, or MBA escape? Find your placement destiny.",
      };
    case "how-indian-are-you":
      return {
        mood: "chill",
        quip: "Stealing hotel shampoo to bargaining for auto fares — scored.",
      };
    case "semester-survival":
      return {
        mood: "panic",
        quip: "Can you still clear the end-sems? Calculating required score.",
      };
    case "backlog-planner":
      return {
        mood: "thinking",
        quip: "Backlogs happen to the best of us. Let's draft the clearance roadmap.",
      };
    case "grade-to-pass":
      return {
        mood: "thinking",
        quip: "Minimum marks needed on the final sheet so you don't repeat.",
      };
    case "cgpa-calculator":
      return {
        mood: "thinking",
        quip: "Weighted grade points, credit math, and placement eligibility.",
      };
    case "linkedin-auditor":
      return {
        mood: "smug",
        quip: "Auditing 'Aspiring Thought Leader' cringe on your profile.",
      };
    default:
      if (tool.category === "academics") {
        return {
          mood: "thinking",
          quip: "Bunk wisely. Pass reliably. Proxy's got your back.",
        };
      }
      if (tool.category === "placement") {
        return {
          mood: "smug",
          quip: "Placement season rules: know your true numbers first.",
        };
      }
      if (tool.category === "fun") {
        return {
          mood: "panic",
          quip: "Campus chaos calibrated down to the second decimal.",
        };
      }
      return {
        mood: "chill",
        quip: "Campus life on autopilot. Sipping cutting chai with Proxy.",
      };
  }
}

export function ToolDetailClient({ tool, slug, faqs }: ToolDetailClientProps) {
  if (!tool) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="flex justify-center mb-2">
          <ProxyMascot
            size="md"
            mood="panic"
            showSpeech
            customQuip="Proxy searched the campus from library to canteen. No such tool!"
          />
        </div>
        <h1 className="text-3xl font-black text-black">Tool Not Found</h1>
        <p className="text-sm text-black/70 font-sans font-medium">
          The requested tool{" "}
          <code className="font-mono text-black font-black bg-flunked-yellow px-1.5 py-0.5 rounded border border-black">
            &quot;{slug}&quot;
          </code>{" "}
          does not exist or has been moved.
        </p>
        <div className="pt-4">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-flunked-yellow hover:bg-amber-300 border-2 border-black text-black font-black text-xs font-mono shadow-neo hover:shadow-neo-lg hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-black" />
            <span>Browse All Tools</span>
          </Link>
        </div>
      </div>
    );
  }

  const ToolComponent = TOOL_COMPONENTS[tool.slug];
  const proxyConfig = getToolProxyConfig(tool);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs Navigation & Prominent Back to Tools Button */}
      <div className="flex items-center justify-between flex-wrap gap-3 relative z-20">
        <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: tool.name }]} />
        <Link
          href="/tools"
          id="back-to-tools-btn"
          aria-label="Back to Tools"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black transition-all shadow-neo-sm hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer group shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-black group-hover:-translate-x-0.5 transition-transform stroke-[2.5]" />
          <span>Back to Tools</span>
        </Link>
      </div>

      {/* Tool Header (Graphic ToolIcon, title H1, description, Proxy Mascot companion) */}
      <div className="border-b-2 border-black pb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <ToolIcon toolSlug={tool.slug} size="lg" />

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-black font-black bg-flunked-yellow px-2 py-0.5 rounded border border-black shadow-neo-sm">
                  {tool.categoryLabel}
                </span>
                {tool.isPopular && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-black border border-black uppercase font-black shadow-neo-sm">
                    Popular
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight">
                {tool.name}
              </h1>
            </div>
          </div>

          {/* Proxy Mascot Companion across all 19 tools (self-contained callout that never overlaps navigation) */}
          <div className="self-start sm:self-auto shrink-0 flex items-center gap-3 bg-white border-2 border-black rounded-2xl p-2.5 sm:px-3.5 sm:py-2.5 shadow-neo-sm max-w-sm hover:shadow-neo transition-all group">
            <ProxyMascot
              size="sm"
              mood={proxyConfig.mood}
              showSpeech={false}
              className="shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="space-y-0.5">
              <div className="text-[10px] font-mono uppercase font-black text-flunked-muted flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Proxy Note
              </div>
              <p className="text-xs font-mono font-bold text-black leading-snug">
                &ldquo;{proxyConfig.quip}&rdquo;
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base text-black/80 max-w-2xl font-sans leading-relaxed pt-1 font-medium">
          {tool.description}
        </p>
      </div>

      {/* Active Tool Dynamic Component (Scoped AuthGuard) */}
      <AuthGuard>
        <div className="min-h-[400px]">
          <ToolErrorBoundary toolName={tool.name}>
            {ToolComponent ? (
              <ToolComponent />
            ) : (
              <div className="p-8 rounded-2xl bg-white border-2 border-black text-center font-mono text-sm text-black font-bold shadow-neo">
                This tool is currently undergoing maintenance. Check back shortly.
              </div>
            )}
          </ToolErrorBoundary>
        </div>
      </AuthGuard>

      {/* Programmatic SEO FAQ Accordions */}
      <ToolFaqSection toolName={tool.name} faqs={faqs} />

      {/* Related Tools Section at Bottom */}
      <RelatedTools currentSlug={tool.slug} />

      {/* Bottom Back Navigation Bar */}
      <div className="pt-6 pb-8 flex items-center justify-between flex-wrap gap-4 border-t-2 border-black">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-flunked-yellow hover:bg-amber-300 border-2 border-black text-black font-black text-xs font-mono shadow-neo hover:shadow-neo-lg hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-black stroke-[2.5]" />
          <span>Back to All 19 Campus Tools</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-flunked-muted hover:text-black underline underline-offset-4"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
