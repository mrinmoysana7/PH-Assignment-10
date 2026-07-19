"use client";

import { Magnifier } from "@gravity-ui/icons";

export default function HeroSearchBar() {
  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <div className="flex items-center justify-between rounded-full border border-gray-200 bg-white p-2 shadow-xl">
        <div className="flex items-center md:w-full">
          <Magnifier className="ml-4 h-5 w-5 text-gray-400" />

        <input
          placeholder="Search for prompts, use cases, or ideas..."
          className="flex-1 bg-transparent px-4 py-3 outline-none"
        />
        </div>

        <button className="rounded-full bg-linear-to-r from-violet-600 to-blue-600 px-3.5 sm:px-4 md:px-7 py-3 font-medium text-white">
          Search
        </button>
      </div>
    </div>
  );
}
