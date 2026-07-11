"use client";

export default function SavedPromptSkeleton() {
  return (
    <div className="animate-pulse duration-initial rounded-2xl border border-zinc-800 bg-[#111827] p-5">
      <div className="flex gap-2">
        <div className="h-6 w-20 rounded-full bg-zinc-700"></div>

        <div className="h-6 w-24 rounded-full bg-zinc-700"></div>
      </div>

      <div className="mt-5 h-7 w-3/4 rounded bg-zinc-700"></div>

      <div className="mt-4 space-y-2">
        <div className="h-4 rounded bg-zinc-800"></div>

        <div className="h-4 rounded bg-zinc-800"></div>

        <div className="h-4 w-2/3 rounded bg-zinc-800"></div>
      </div>

      <div className="mt-8 flex gap-3">
        <div className="h-11 flex-1 rounded-lg bg-zinc-700"></div>

        <div className="h-11 w-11 rounded-lg bg-zinc-700"></div>
      </div>
    </div>
  );
}
