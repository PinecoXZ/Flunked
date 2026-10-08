"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-flunked-bg text-black">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-black border-t-transparent animate-spin" />
          <span className="text-xs font-mono font-black text-black">
            Verifying student credentials...
          </span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[650px] flex flex-col items-center justify-center px-4 py-12 bg-flunked-bg">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
