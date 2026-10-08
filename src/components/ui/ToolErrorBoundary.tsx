"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";

interface Props {
  children: React.ReactNode;
  toolName?: string;
}

interface State {
  hasError: boolean;
}

export class ToolErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.error("ToolErrorBoundary caught an error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 rounded-2xl bg-red-50 border-2 border-red-300 text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
          <h2 className="text-lg font-black text-black">
            {this.props.toolName || "This tool"} hit an unexpected error
          </h2>
          <p className="text-sm text-black/70 font-sans">
            The rest of the page is still working. Try reloading just this tool.
          </p>
          <NeoButton
            variant="secondary"
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={() => this.setState({ hasError: false })}
          >
            Retry
          </NeoButton>
        </div>
      );
    }
    return this.props.children;
  }
}
