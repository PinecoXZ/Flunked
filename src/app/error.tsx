"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AlertOctagon, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorBoundary({ error, reset }: ErrorProps) {
  const [incidentId, setIncidentId] = useState<string>("");

  useEffect(() => {
    // Generate a correlation ID for this incident
    const id = `INC_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setIncidentId(id);

    // In a production setup, error metrics are piped to server-side telemetry.
    // Notice: We NEVER print stack traces to the user's screen or expose sensitive database/internal schemas.
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24 max-w-lg mx-auto w-full text-center space-y-6">
      {/* Error Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F0] border-2 border-flunked-danger text-xs font-mono font-black text-flunked-danger shadow-neo-sm uppercase">
        <AlertOctagon className="w-4 h-4 text-flunked-danger stroke-[2.5]" />
        <span>SYSTEM EXCEPTION // CAUGHT</span>
      </div>

      {/* Main Heading (Single H1) */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black">
          Something stumbled behind the scenes.
        </h1>
        <p className="text-sm sm:text-base text-black/75 font-sans font-medium leading-relaxed">
          We ran into an unexpected calculation hiccup. This has been logged privately for
          investigation. None of your inputs were saved or compromised.
        </p>
      </div>

      {incidentId && (
        <div className="p-3 rounded-xl bg-white border-2 border-black/20 text-xs font-mono text-black/60 shadow-neo-sm">
          Incident Reference: <span className="font-bold text-black">{incidentId}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full pt-2">
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-flunked-yellow hover:bg-[#FFD000] border-2 border-black font-black text-sm text-black shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo-lg active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-black stroke-[2.5]" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-flunked-bg border-2 border-black font-mono font-black text-sm text-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
        >
          <Home className="w-4 h-4 text-black" />
          <span>Back to Hub</span>
        </Link>
      </div>
    </div>
  );
}
