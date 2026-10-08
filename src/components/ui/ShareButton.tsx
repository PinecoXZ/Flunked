"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  shareText: string;
  title?: string;
  className?: string;
  variant?: "primary" | "secondary" | "subtle";
}

export function ShareButton({
  shareText,
  title = "Flunked.online",
  className,
  variant = "primary",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Try native share on mobile if supported
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: typeof window !== "undefined" ? window.location.href : "https://flunked.online",
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return;
      } catch (err: unknown) {
        // User cancelled or share failed, fallback to clipboard
        if ((err as Error)?.name === "AbortError") return;
      }
    }

    // Clipboard fallback
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error("Clipboard copy failed", err);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-black tracking-wide uppercase transition-all select-none cursor-pointer border-2 border-black",
        copied
          ? "bg-[#00C853] text-black shadow-neo-sm"
          : variant === "primary"
            ? "bg-flunked-yellow text-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            : variant === "secondary"
              ? "bg-flunked-bg text-black shadow-neo-sm hover:bg-white"
              : "bg-white text-black shadow-neo-sm hover:bg-flunked-bg",
        className
      )}
      title="Share your result"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 stroke-[3] text-black" />
          <span>Copied to Clipboard!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 stroke-[2.5] text-black" />
          <span>Share Result</span>
        </>
      )}
    </button>
  );
}
