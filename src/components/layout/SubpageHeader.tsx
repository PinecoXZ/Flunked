import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface SubpageHeaderProps {
  breadcrumbLabel: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
}

/**
 * Consolidated subpage top bar containing Breadcrumbs and back navigation link.
 */
export function SubpageHeader({
  breadcrumbLabel,
  backHref = "/",
  backLabel = "Back to Flunked.fun",
  className = "mb-6 sm:mb-8",
}: SubpageHeaderProps) {
  return (
    <div className={`flex items-center justify-between flex-wrap gap-2 ${className}`}>
      <Breadcrumbs items={[{ label: breadcrumbLabel }]} />
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-flunked-yellow border-2 border-black text-xs font-mono font-black text-black transition-all shadow-neo-sm hover:shadow-neo hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-black" />
        <span>{backLabel}</span>
      </Link>
    </div>
  );
}
