import React from "react";
import { Header } from "@/components/layout/Header";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 w-full max-w-full min-w-0">
      <Header />
      <div className="flex-1 flex flex-col w-full max-w-full min-w-0">{children}</div>
    </div>
  );
}
