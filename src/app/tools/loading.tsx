import { LoadingWindow } from "@/components/ui/LoadingWindow";

export default function ToolsLoading() {
  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex items-center justify-center min-h-[55vh]">
      <LoadingWindow
        inline
        title="flunked-tool.loader"
        statusTitle="Booting Student Tool..."
        state="working"
        badgeText="[TOOL: MOUNTING]"
        steps={[
          "Loading survival calculation engine...",
          "Checking attendance & CGPA algorithms...",
          "Rendering interactive interface...",
        ]}
      />
    </div>
  );
}
