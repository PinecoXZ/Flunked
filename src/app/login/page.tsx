import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { SubpageHeader } from "@/components/layout/SubpageHeader";

export const metadata: Metadata = {
  title: "Enter Campus Hub",
  description:
    "Instant, frictionless campus onboarding. Enter your nickname and college to unlock 19 academic and placement survival calculators.",
  alternates: {
    canonical: "https://flunked.fun/login",
  },
};

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 sm:py-20 relative overflow-hidden">
      {/* Breadcrumb & Navigation */}
      <SubpageHeader breadcrumbLabel="Campus Entry" className="w-full max-w-md mb-6 z-10" />

      {/* Main Login Card */}
      <div className="w-full z-10">
        <Suspense
          fallback={
            <div className="w-full max-w-md mx-auto h-96 rounded-2xl bg-white border-2 border-black shadow-neo flex items-center justify-center">
              <span className="text-xs font-mono font-black text-black">
                Loading campus portal...
              </span>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>

      {/* Reassurance text */}
      <div className="mt-8 text-center text-xs font-mono font-bold text-black/70 max-w-sm z-10 leading-relaxed">
        We never sell data, send promotional spam, or notify university administrations. Built by
        students, strictly for students.
      </div>
    </div>
  );
}
