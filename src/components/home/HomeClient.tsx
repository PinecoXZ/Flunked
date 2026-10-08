"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
import { PublicHero } from "@/components/landing/PublicHero";
import { CampusTicker } from "@/components/landing/CampusTicker";
import { WhyCollegeOnly } from "@/components/landing/WhyCollegeOnly";
import { ToolPreviews } from "@/components/landing/ToolPreviews";
import { LandingFaq } from "@/components/landing/LandingFaq";
import { AuthenticatedHub } from "@/components/home/AuthenticatedHub";

export function HomeClient() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full max-w-full min-w-0">
      <Header />
      {!mounted || isLoading ? (
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-black border-t-transparent animate-spin" />
            <span className="text-xs font-mono font-black text-black">
              Verifying student credentials...
            </span>
          </div>
        </div>
      ) : user ? (
        <AuthenticatedHub />
      ) : (
        <div className="flex flex-col w-full max-w-full min-w-0">
          <PublicHero />
          <CampusTicker />
          <WhyCollegeOnly />
          <ToolPreviews />
          <LandingFaq />
        </div>
      )}
    </div>
  );
}
