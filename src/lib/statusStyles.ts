export type ToolSeverity = "safe" | "warning" | "danger" | "critical";

export interface StatusStyleSet {
  badge: string;
  dot: string;
  bg: string;
  text: string;
  border: string;
  icon: string;
}

const STATUS_STYLES: Record<ToolSeverity, StatusStyleSet> = {
  safe: {
    badge: "bg-green-100 text-green-800 border-green-300",
    dot: "bg-green-500",
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-400",
    icon: "text-green-600",
  },
  warning: {
    badge: "bg-yellow-100 text-yellow-800 border-yellow-300",
    dot: "bg-yellow-500",
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    border: "border-yellow-400",
    icon: "text-yellow-600",
  },
  danger: {
    badge: "bg-orange-100 text-orange-800 border-orange-300",
    dot: "bg-orange-500",
    bg: "bg-orange-50",
    text: "text-orange-800",
    border: "border-orange-400",
    icon: "text-orange-600",
  },
  critical: {
    badge: "bg-red-100 text-red-800 border-red-300",
    dot: "bg-red-500",
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-400",
    icon: "text-red-600",
  },
};

export function getStatusStyle(status: ToolSeverity): StatusStyleSet {
  return STATUS_STYLES[status] ?? STATUS_STYLES.safe;
}

/**
 * Maps domain-specific tier names to the canonical ToolSeverity.
 * Use in tool components that have custom tier naming.
 */
export function mapToSeverity(tier: string): ToolSeverity {
  const MAP: Record<string, ToolSeverity> = {
    // AmICooked tiers
    fine: "safe",
    risky: "warning",
    cooked: "danger",
    gone: "critical",
    // AssignmentPanic tiers
    chill: "safe",
    manageable: "warning",
    all_nighter: "danger",
    impossible: "critical",
    // BacklogRecovery
    moderate: "warning",
    high: "danger",
  };
  return MAP[tier] ?? "safe";
}
