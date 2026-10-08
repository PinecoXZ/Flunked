"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { UserBadge } from "@/components/auth/UserBadge";
import { launchOnboardingTutorial } from "@/components/tutorial/OnboardingTutorial";
import { SearchModal } from "@/components/search/SearchModal";
import { LogIn, Compass } from "lucide-react";

export function Header() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-[#FDFBF7]/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left Section: Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center text-xl sm:text-2xl font-black tracking-tight text-black select-none"
          >
            <span>Flunked</span>
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-flunked-yellow border-2 border-black rounded-md font-mono font-black text-black shadow-neo-sm">
              .fun
            </span>
          </Link>
          <span className="hidden xl:inline-block text-[11px] font-mono text-black font-bold border-l-2 border-black pl-3 py-0.5 uppercase tracking-wider">
            student tools · no bs
          </span>
        </div>

        {/* Right Section: Tour & Auth */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* App Tour Button */}
          <button
            type="button"
            onClick={launchOnboardingTutorial}
            title="App Walkthrough & Tutorial"
            aria-label="App Tour"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white hover:bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black transition-all shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden xs:inline sm:inline">Tour</span>
          </button>

          {/* Campus Hub Auth Button / Badge */}
          {mounted && !isLoading ? (
            user ? (
              <UserBadge />
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg bg-flunked-yellow hover:bg-[#FFD000] text-xs sm:text-sm font-mono font-black text-black transition-all border-2 border-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">Enter Campus Hub</span>
                <span className="sm:hidden">Enter</span>
              </Link>
            )
          ) : (
            <div className="h-9 w-20 sm:w-28 rounded-lg bg-white border-2 border-black shadow-neo-sm animate-pulse" />
          )}
        </div>
      </div>

      {/* Global Search / Command Palette Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
