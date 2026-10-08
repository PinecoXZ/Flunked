import React from "react";
import { cn } from "@/lib/utils";

export interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

const VARIANT_STYLES = {
  primary: "bg-flunked-yellow hover:bg-amber-300 border-2 border-black text-black",
  secondary: "bg-white hover:bg-flunked-bg border-2 border-black text-black",
  danger: "bg-red-100 hover:bg-red-200 border-2 border-red-400 text-red-800",
  ghost: "bg-transparent hover:bg-black/5 border border-black/20 text-black",
};

const SIZE_STYLES = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-xs rounded-xl",
  lg: "px-6 py-3.5 text-sm rounded-xl",
};

export const NeoButton = React.memo(function NeoButton({
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  ...props
}: NeoButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-black font-mono",
        "shadow-neo hover:shadow-neo-lg hover:translate-x-[-1px] hover:translate-y-[-1px]",
        "active:shadow-none active:translate-x-[1px] active:translate-y-[1px]",
        "transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
});
