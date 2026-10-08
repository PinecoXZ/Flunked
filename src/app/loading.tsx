export default function Loading() {
  return (
    <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full animate-pulse space-y-8">
      {/* Top bar skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 bg-black/10 rounded-lg border border-black/20" />
        <div className="h-8 w-28 bg-black/10 rounded-xl border-2 border-black/20" />
      </div>

      {/* Main card skeleton */}
      <div className="p-8 sm:p-12 rounded-2xl bg-white border-2 border-black shadow-neo space-y-6">
        <div className="h-8 w-48 bg-flunked-yellow/50 rounded-lg border border-black/20" />
        <div className="h-4 w-3/4 bg-black/10 rounded" />
        <div className="space-y-4 pt-4">
          <div className="h-14 bg-black/5 rounded-xl border border-black/20" />
          <div className="h-14 bg-black/5 rounded-xl border border-black/20" />
          <div className="h-12 bg-black/10 rounded-xl border-2 border-black/20 w-1/2" />
        </div>
      </div>
    </div>
  );
}
