"use client";

import React, { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";
import { LoadingWindow, type OrbState } from "@/components/ui/LoadingWindow";

export interface ShowLoadingOptions {
  title?: string;
  statusTitle: string;
  steps?: string[];
  state?: OrbState;
  badgeText?: string;
  duration?: number;
  onComplete?: () => void;
}

interface LoadingContextType {
  showLoading: (options: ShowLoadingOptions) => Promise<void>;
  hideLoading: () => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [activeOptions, setActiveOptions] = useState<ShowLoadingOptions | null>(null);
  const resolveRef = useRef<(() => void) | null>(null);

  const hideLoading = useCallback(() => {
    setActiveOptions(null);
    if (resolveRef.current) {
      resolveRef.current();
      resolveRef.current = null;
    }
  }, []);

  const showLoading = useCallback(
    (options: ShowLoadingOptions): Promise<void> => {
      return new Promise<void>((resolve) => {
        resolveRef.current = resolve;
        setActiveOptions({
          ...options,
          onComplete: () => {
            if (options.onComplete) {
              options.onComplete();
            }
            hideLoading();
          },
        });
      });
    },
    [hideLoading]
  );

  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        hideLoading,
        isLoading: Boolean(activeOptions),
      }}
    >
      {children}
      {activeOptions && (
        <LoadingWindow
          isOpen={true}
          title={activeOptions.title}
          statusTitle={activeOptions.statusTitle}
          steps={activeOptions.steps}
          state={activeOptions.state}
          badgeText={activeOptions.badgeText}
          duration={activeOptions.duration ?? 950}
          onComplete={activeOptions.onComplete}
        />
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
