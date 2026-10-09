"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ShareButton } from "./ShareButton";
import { ShareStoryModal } from "./ShareStoryModal";
import { AlertTriangle, CheckCircle2, Flame, ShieldAlert, Camera } from "lucide-react";

export type ResultStatus = "safe" | "warning" | "danger" | "critical";

interface ResultCardProps {
  title?: string;
  toolName?: string;
  categoryLabel?: string;
  toolSlug?: string;
  headline: string;
  metric?: string | number;
  metricLabel?: string;
  verdict: string;
  description?: string;
  status: ResultStatus;
  shareText: string;
  breakdown?: { label: string; value: string | number }[];
  className?: string;
  children?: ReactNode;
}

export function ResultCard({
  title = "Calculation Result",
  toolName,
  categoryLabel,
  toolSlug,
  headline,
  metric,
  metricLabel,
  verdict,
  description,
  status,
  shareText,
  breakdown,
  className,
  children,
}: ResultCardProps) {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const statusStyles = {
    safe: {
      badgeBg: "bg-flunked-mint text-black border-2 border-black shadow-neo-sm",
      accentText: "text-[#00A843]",
      barColor: "bg-[#00C853]",
      icon: CheckCircle2,
      label: "Safe Zone",
    },
    warning: {
      badgeBg: "bg-flunked-yellow text-black border-2 border-black shadow-neo-sm",
      accentText: "text-black",
      barColor: "bg-flunked-yellow",
      icon: AlertTriangle,
      label: "Thin Ice",
    },
    danger: {
      badgeBg: "bg-flunked-pink text-black border-2 border-black shadow-neo-sm",
      accentText: "text-[#D90429]",
      barColor: "bg-[#FF3333]",
      icon: ShieldAlert,
      label: "Danger",
    },
    critical: {
      badgeBg: "bg-flunked-danger text-white border-2 border-black shadow-neo-sm font-black",
      accentText: "text-[#FF3333]",
      barColor: "bg-[#FF3333]",
      icon: Flame,
      label: "Cooked",
    },
  }[status];

  const StatusIcon = statusStyles.icon;

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white p-6 sm:p-7 border-2 border-black shadow-neo transition-all duration-150 overflow-hidden",
        className
      )}
    >
      {/* Header with Title and Badge */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-[11px] font-mono tracking-widest uppercase text-flunked-muted font-black">
          [{title}]
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-[11px] font-mono uppercase px-3 py-1 rounded-md font-black",
            statusStyles.badgeBg
          )}
        >
          <StatusIcon className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{statusStyles.label}</span>
        </span>
      </div>

      {/* Metric and Headline */}
      <div className="space-y-1 mb-5">
        {metric !== undefined && (
          <div className="flex items-baseline gap-2.5">
            <span
              className={cn(
                "text-4xl sm:text-5xl font-black tracking-tight tabular-nums",
                statusStyles.accentText
              )}
            >
              {metric}
            </span>
            {metricLabel && (
              <span className="text-sm font-mono text-flunked-muted font-bold">
                {metricLabel}
              </span>
            )}
          </div>
        )}
        <h3 className="text-xl sm:text-2xl font-black text-black leading-snug">{headline}</h3>
      </div>

      {/* Brutal Verdict Box with dot matrix accent */}
      <div className="p-4 sm:p-5 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm mb-5 relative overflow-hidden">
        <div className="flex items-center justify-between text-[10px] font-mono text-black uppercase tracking-wider mb-1.5 font-black">
          <span>Honest Student Verdict</span>
          <span className="text-flunked-muted">[VERIFIED MATH]</span>
        </div>
        <div className="text-sm sm:text-base font-bold text-black italic">
          &ldquo;{verdict}&rdquo;
        </div>
        {description && (
          <div className="text-xs text-flunked-muted mt-2 leading-relaxed font-sans font-medium">
            {description}
          </div>
        )}
      </div>

      {/* Utilitarian Breakdown Bento Grid if breakdown provided without custom children */}
      {!children && breakdown && breakdown.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
          {breakdown.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-flunked-bg border-2 border-black shadow-neo-sm text-xs font-mono"
            >
              <div className="text-[10px] text-flunked-muted uppercase tracking-wider font-bold">
                {item.label}
              </div>
              <div className="text-base font-black text-black mt-0.5 tabular-nums">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Extra children / breakdown details if any */}
      {children && <div className="mb-5">{children}</div>}

      {/* Card Footer with Share action and Watermark */}
      <div className="pt-4 border-t-2 border-black flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-black font-mono font-black">
          <span className="w-2.5 h-2.5 bg-flunked-yellow border border-black rounded-xs inline-block" />
          <span>Flunked.online</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsStoryOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-flunked-yellow hover:bg-[#FFD000] border-2 border-black text-black font-mono font-black text-xs shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            title="Generate Instagram / WhatsApp Story Card"
          >
            <Camera className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Story Card</span>
          </button>
          <ShareButton shareText={shareText} />
        </div>
      </div>

      {/* High-Res Story Card Modal */}
      <ShareStoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        toolName={toolName || title}
        categoryLabel={categoryLabel}
        toolSlug={toolSlug}
        headline={headline}
        metric={metric}
        metricLabel={metricLabel}
        verdict={verdict}
        status={status}
        breakdown={breakdown}
      />
    </div>
  );
}
