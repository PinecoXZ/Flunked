"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthenticatedHub } from "@/components/home/AuthenticatedHub";
import { ToolPreviews } from "@/components/landing/ToolPreviews";
import { CampusTicker } from "@/components/landing/CampusTicker";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

import { LoadingWindow } from "@/components/ui/LoadingWindow";

export function ToolsIndexClient() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh] px-4 py-12">
        <LoadingWindow
          inline
          title="flunked-vault.sys // directory_load"
          statusTitle="Loading Tools Directory..."
          badgeText="[VAULT: INDEXING]"
          state="searching"
          steps={[
            "Indexing 19 student calculators...",
            "Loading UGC attendance regulations...",
            "Syncing campus placement data...",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <Breadcrumbs items={[{ label: "Tools Directory" }]} />
      </div>
      {user ? (
        <AuthenticatedHub />
      ) : (
        <div className="flex flex-col">
          <CampusTicker />
          <ToolPreviews />
        </div>
      )}
    </div>
  );
}
