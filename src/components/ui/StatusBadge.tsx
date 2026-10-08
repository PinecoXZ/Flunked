import React from "react";
import { cn } from "@/lib/utils";
import { getStatusStyle, type ToolSeverity } from "@/lib/statusStyles";

export interface StatusBadgeProps {
  status: ToolSeverity;
  label: string;
  className?: string;
}

export const StatusBadge = React.memo(function StatusBadge({
  status,
  label,
  className,
}: StatusBadgeProps) {
  const styles = getStatusStyle(status);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-black uppercase border-2",
        styles.badge,
        className
      )}
    >
      <span className={cn("w-2 h-2 rounded-full", styles.dot)} />
      {label}
    </span>
  );
});
