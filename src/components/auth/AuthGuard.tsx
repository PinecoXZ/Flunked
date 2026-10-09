"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { buildRedirectPath } from "@/lib/redirect";

import { LoadingWindow } from "@/components/ui/LoadingWindow";

interface AuthGuardProps {
  children: React.ReactNode;
}

function AuthGuardLoginFallback() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams ? searchParams.toString() : "";
  const redirectTo = buildRedirectPath(pathname, searchParamsString);

  return (
    <div className="min-h-[650px] flex flex-col items-center justify-center px-4 py-12 bg-flunked-bg">
      <div className="w-full max-w-md">
        <LoginForm redirectTo={redirectTo} />
      </div>
    </div>
  );
}

function LoginFormSkeleton() {
  return (
    <div className="min-h-[650px] flex flex-col items-center justify-center px-4 py-12 bg-flunked-bg">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-white border-2 border-black shadow-neo-lg animate-pulse">
        <div className="h-8 bg-zinc-200 rounded mb-4" />
        <div className="h-4 bg-zinc-200 rounded w-2/3 mb-6" />
        <div className="space-y-4">
          <div className="h-10 bg-zinc-200 rounded" />
          <div className="h-10 bg-zinc-200 rounded" />
          <div className="h-12 bg-zinc-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center p-4 bg-flunked-bg">
        <LoadingWindow
          inline
          title="flunked-auth.guard"
          statusTitle="Verifying Student Session"
          state="connecting"
          badgeText="[AUTH CHECK]"
          steps={[
            "Checking local student cache...",
            "Validating campus roll number...",
            "Granting access to student tools...",
          ]}
        />
      </div>
    );
  }

  if (!user) {
    return (
      <Suspense fallback={<LoginFormSkeleton />}>
        <AuthGuardLoginFallback />
      </Suspense>
    );
  }

  return <>{children}</>;
}
