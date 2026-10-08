"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FDFBF7] text-[#080808] min-h-screen flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full p-8 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center space-y-6">
          <div className="w-14 h-14 mx-auto rounded-xl bg-[#FFE600] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tight text-black">
              Critical Render Interrupted
            </h1>
            <p className="text-xs text-black/70 font-medium leading-relaxed">
              A layout-level exception occurred. We have contained the error. Please reload the
              interface to restore your session.
            </p>
          </div>

          <button
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFE600] border-2 border-black font-black text-sm text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-black stroke-[2.5]" />
            <span>Reload Application</span>
          </button>
        </div>
      </body>
    </html>
  );
}
