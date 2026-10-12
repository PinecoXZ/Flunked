"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthenticatedHub } from "@/components/home/AuthenticatedHub";
import { ToolPreviews } from "@/components/landing/ToolPreviews";
import { CampusTicker } from "@/components/landing/CampusTicker";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function ToolsIndexClient() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col flex-1">
      {mounted && user ? (
        <div className="flex flex-col flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
            <Breadcrumbs items={[{ label: "Tools Directory" }]} />
          </div>
          <AuthenticatedHub />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 pb-2">
            <Breadcrumbs items={[{ label: "Tools Directory" }]} />
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black mt-4">
              Campus Calculators & Academic Survival Tools
            </h1>
            <p className="text-sm sm:text-base text-flunked-muted font-sans font-medium mt-1 max-w-2xl">
              19 free, student-tested calculators for attendance, CGPA conversion, salary breakdown, and semester survival.
            </p>
          </div>
          <CampusTicker />
          <ToolPreviews />
        </div>
      )}
    </div>
  );
}
