"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { BookmarkX, Search } from "lucide-react";

export default function EmptySavedPrompts() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-[#111827] py-20 px-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-600/15">
        <BookmarkX className="h-10 w-10 text-violet-400" />
      </div>

      <h2 className="mt-6 text-3xl font-bold text-white">No Saved Prompts</h2>

      <p className="mt-3 max-w-lg text-zinc-400">
        You havent bookmarked any prompt templates yet. Browse the marketplace
        and save your favourite prompts.
      </p>

      <Link
        href="/prompts"
        color="secondary"
        radius="md"
        startContent={<Search size={18} />}
        className="mt-8 bg-linear-to-r transition hover:translate-y-1 rounded-lg py-3 px-5 from-violet-600 to-fuchsia-600 font-semibold text-white"
      >
        Explore Prompts
      </Link>
    </div>
  );
}
