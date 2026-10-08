import React from "react";
import { cn } from "@/lib/utils";

export interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

export const NeoCard = React.memo(function NeoCard({
  children,
  className,
  accent = false,
}: NeoCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white border-2 border-black shadow-neo p-6",
        accent && "border-l-4 border-l-flunked-yellow",
        className
      )}
    >
      {children}
    </div>
  );
});
