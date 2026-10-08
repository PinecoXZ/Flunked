"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, Shield, AlertCircle, Cookie, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface LegalTab {
  href: string;
  label: string;
  badge: string;
  icon: React.ElementType;
}

const LEGAL_TABS: LegalTab[] = [
  {
    href: "/terms",
    label: "Terms of Service",
    badge: "Agreement",
    icon: Scale,
  },
  {
    href: "/privacy",
    label: "Privacy Policy",
    badge: "DPDP 2023",
    icon: Shield,
  },
  {
    href: "/disclaimer",
    label: "Academic Disclaimer",
    badge: "Ordinances",
    icon: AlertCircle,
  },
  {
    href: "/cookies",
    label: "Cookie & Storage",
    badge: "Local Storage",
    icon: Cookie,
  },
];

export function LegalNav() {
  const pathname = usePathname();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal when user scrolls down past 250px
      setShowBackToTop(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav aria-label="Legal Documents Navigation" className="w-full mb-8">
        <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white border-2 border-black rounded-2xl shadow-neo">
          {LEGAL_TABS.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all",
                  isActive
                    ? "bg-flunked-yellow border-2 border-black text-black shadow-neo-sm font-black"
                    : "bg-transparent text-black/70 hover:text-black hover:bg-black/5 border-2 border-transparent"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-black" : "text-black/60")} />
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded border font-mono",
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-black/5 text-black/60 border-black/10"
                  )}
                >
                  {tab.badge}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Back to Top Button — Exclusively rendered on legal pages */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top of document"
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-flunked-yellow hover:bg-[#FFD000] border-2 border-black text-black font-mono font-black text-xs shadow-neo hover:shadow-neo-lg hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer animate-in fade-in zoom-in-95 duration-200"
        >
          <ArrowUp className="w-4 h-4 text-black stroke-[2.5]" />
          <span>Back to Top</span>
        </button>
      )}
    </>
  );
}
