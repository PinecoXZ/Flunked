import React from "react";
import { safeJsonLd } from "@/lib/jsonLd";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { env } from "@/lib/env";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  // Generate JSON-LD BreadcrumbList structured data for search engines
  const breadcrumbListJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href
          ? { item: item.href.startsWith("http") ? item.href : `${baseUrl}${item.href}` }
          : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbListJsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center gap-1.5 text-xs font-mono font-bold text-black/60 flex-wrap ${className}`}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-black hover:underline transition-colors px-1 py-0.5 rounded"
          title="Home"
        >
          <Home className="w-3.5 h-3.5 text-black" />
          <span className="sr-only">Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-black/40 stroke-[2.5] flex-shrink-0" />
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-black text-black bg-flunked-yellow/40 px-1.5 py-0.5 rounded border border-black/20 truncate max-w-[200px] sm:max-w-none"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-black hover:underline transition-colors px-1 py-0.5 rounded"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
