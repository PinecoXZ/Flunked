"use client";

import { useEffect, useRef } from "react";

/**
 * Synchronizes key-value state to URL search parameters using history.replaceState
 * without triggering Next.js router transitions or full page reloads.
 */
export function useUrlSync(
  paramsRecord: Record<string, string | number | boolean | null | undefined>
) {
  const isFirstRender = useRef(true);
  const serializedParams = JSON.stringify(paramsRecord);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Allow components to read initial URL params before writing back
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const parsed: Record<string, string | number | boolean | null | undefined> =
      JSON.parse(serializedParams);
    const searchParams = new URLSearchParams();

    for (const [key, val] of Object.entries(parsed)) {
      if (val !== undefined && val !== null && val !== "") {
        searchParams.set(key, val.toString());
      }
    }

    const queryString = searchParams.toString();
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState(null, "", newUrl);
  }, [serializedParams]);
}
