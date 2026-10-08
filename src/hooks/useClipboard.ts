"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface UseClipboardOptions {
  duration?: number;
}

/**
 * Reusable clipboard hook with timeout reset and browser fallback.
 */
export function useClipboard({ duration = 2000 }: UseClipboardOptions = {}) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (typeof window === "undefined") return false;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older or permission-restricted browser contexts
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }

        setCopied(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, duration);

        return true;
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
        return false;
      }
    },
    [duration]
  );

  return { copied, copy };
}
