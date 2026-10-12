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
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full max-w-full min-w-0">
      <Header />
      {mounted && user ? (
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
