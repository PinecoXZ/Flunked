import { LoadingWindow } from "@/components/ui/LoadingWindow";

export default function Loading() {
  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex items-center justify-center min-h-[60vh]">
      <LoadingWindow
        inline
        title="flunked-route.loader"
        statusTitle="Loading Campus Tool"
        state="working"
        badgeText="[ROUTING]"
        steps={[
          "Fetching student module...",
          "Compiling syllabus calculations...",
          "Preparing survival utilities...",
        ]}
      />
    </div>
  );
}
