"use client";

import Link from "next/link";
import { type ToolItem } from "@/data/tools";
import { type ToolFaq } from "@/data/toolFaqs";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolFaqSection } from "@/components/tools/ToolFaqSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

import { ArrowLeft, AlertCircle } from "lucide-react";
import { ToolIcon } from "@/components/ui/ToolIcon";
import { TOOL_COMPONENTS } from "@/components/tools/toolRegistry";
import { ToolErrorBoundary } from "@/components/ui/ToolErrorBoundary";

interface ToolDetailClientProps {
  tool: ToolItem | null;
  slug: string;
  faqs: ToolFaq[];
}

export function ToolDetailClient({ tool, slug, faqs }: ToolDetailClientProps) {
  if (!tool) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-flunked-yellow border-2 border-black flex items-center justify-center mx-auto text-black shadow-neo-sm">
          <AlertCircle className="w-7 h-7" />
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: tool.name }]} />
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-flunked-yellow border border-black text-xs font-mono font-bold text-black transition-all shadow-neo-sm hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none cursor-pointer group"
        >
          <ArrowLeft className="w-3 h-3 text-black group-hover:-translate-x-0.5 transition-transform" />
          <span>All tools</span>
        </Link>
      </div>

      {/* Tool Header (Graphic ToolIcon, title H1, description) */}
      <div className="border-b-2 border-black pb-8 space-y-4">
        <div className="flex items-center gap-4">
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
    </div>
  );
}
