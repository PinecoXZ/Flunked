"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";

/**
 * Ultra-lightweight zero-dependency Neo-Brutalist Top Progress Bar.
 * Listens to link interactions and immediately signals page navigation.
 */
export function TopProgressBar() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Finish loading whenever pathname changes
    setProgress(100);
    const timer = setTimeout(() => {
      setIsNavigating(false);
      setProgress(0);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Intercept clicks on anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");

      // Only handle internal navigation links
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("#") &&
        targetAttr !== "_blank" &&
        href !== pathname
      ) {
        setIsNavigating(true);
        setProgress(30);

        startTransition(() => {
          setTimeout(() => setProgress(75), 100);
        });
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, [pathname]);

  if (!isNavigating && progress === 0) return null;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className="fixed top-0 left-0 right-0 h-1 z-[99999] pointer-events-none bg-transparent"
    >
      <div
        className="h-full bg-flunked-yellow border-b border-black shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transitionProperty: "width, opacity",
        }}
      />
    </div>
  );
}
