export default function ToolsLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-pulse">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-40 bg-black/10 rounded border border-black/20" />
        <div className="h-7 w-24 bg-white border border-black rounded-lg" />
      </div>

      {/* Tool Header skeleton */}
      <div className="border-b-2 border-black pb-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-flunked-yellow border-2 border-black shadow-neo-sm" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-black/10 rounded" />
            <div className="h-8 w-64 bg-black/20 rounded" />
          </div>
        </div>
        <div className="h-4 w-full max-w-xl bg-black/10 rounded" />
      </div>

      {/* Tool Body Card skeleton */}
      <div className="p-8 sm:p-12 rounded-2xl bg-white border-2 border-black shadow-neo space-y-6">
        <div className="h-12 bg-black/5 rounded-xl border border-black/20" />
        <div className="h-12 bg-black/5 rounded-xl border border-black/20" />
        <div className="h-14 bg-flunked-yellow/60 rounded-xl border-2 border-black" />
      </div>
    </div>
  );
}
