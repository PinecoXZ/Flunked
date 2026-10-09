"use client";

import React from "react";
import Link from "next/link";
import { Coffee, Share2 } from "lucide-react";
import { ShareSiteModal } from "@/components/ui/ShareSiteModal";

export function Footer() {
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);

  return (
    <footer className="w-full border-t-2 border-black bg-[#1E1E22] text-zinc-300 py-10 sm:py-12 mt-auto transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand Tagline */}
          <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
            <div className="flex items-center gap-1.5 text-base font-black tracking-tight text-white">
              <span>Flunked</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono font-medium">
              Built by a student · For students
            </p>
          </div>

          {/* Navigation Links & Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-zinc-300 font-bold">
            <Link
              href="/about"
              className="hover:text-black hover:bg-flunked-yellow px-2 py-1 rounded transition-colors"
            >
              About
            </Link>
            <span className="text-zinc-600">/</span>
            <Link
              href="/suggest"
              className="hover:text-black hover:bg-flunked-yellow px-2 py-1 rounded transition-colors"
            >
              Suggest a Tool
            </Link>
            <span className="text-zinc-600">/</span>

            {/* Share With Friends Button */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-300 hover:bg-cyan-200 text-black font-mono font-black border border-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer select-none"
              title="Share Flunked with your college group"
            >
              <Share2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Share with friends</span>
            </button>

            <span className="text-zinc-600">/</span>
            <a
              href="https://buymeacoffee.com/fayezahmad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-flunked-yellow hover:bg-[#FFD000] text-black font-mono font-black border border-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition-all"
            >
              <Coffee className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Buy me a coffee</span>
            </a>
          </div>
        </div>

        {/* Legal Links Bar */}
        <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400 font-medium">
          <div>
            © {new Date().getFullYear()} Flunked · Not affiliated with university administration.
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-zinc-400 font-mono">
            <Link
              href="/privacy"
              className="hover:text-flunked-yellow transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="text-zinc-700">•</span>
            <Link
              href="/terms"
              className="hover:text-flunked-yellow transition-colors underline-offset-4 hover:underline"
            >
              Terms of Service
            </Link>
            <span className="text-zinc-700">•</span>
            <Link
              href="/disclaimer"
              className="hover:text-flunked-yellow transition-colors underline-offset-4 hover:underline"
            >
              Academic Disclaimer
            </Link>
            <span className="text-zinc-700">•</span>
            <Link
              href="/cookies"
              className="hover:text-flunked-yellow transition-colors underline-offset-4 hover:underline"
            >
              Cookie Policy
            </Link>
          </div>

          <div className="text-zinc-500 text-[10px]">
            No tracking cookies · Student privacy first
          </div>
        </div>
      </div>

      <ShareSiteModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </footer>
  );
}
