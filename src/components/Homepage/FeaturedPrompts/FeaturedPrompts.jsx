"use client";

import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
// import FeaturedPromptCard from "./FeaturedPromptCard";
import PromptCard from "@/components/ui/PromptCard";

export default function FeaturedPrompts({ prompts }) {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}

      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-violet-200/30 blur-[120px]" />

      <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-sky-200/30 blur-[120px]" />

      <div className="container relative mx-auto px-4">
        {/* Header */}

        <div className="mb-14 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="rounded-full bg-violet-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
              Handpicked
            </span>

            <h2 className="mt-5 text-4xl font-black md:text-5xl">
              Featured{" "}
              <span className="bg-linear-to-r from-violet-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Prompts
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-default-500">
              Discover the most popular prompts curated by our community of
              Prompt Engineers.
            </p>
          </div>

          <Link
            href="/prompts"
            className="group flex items-center gap-2 rounded-full border border-default-200 bg-white px-6 py-3 font-semibold shadow-sm transition-all hover:border-violet-400 hover:shadow-lg"
          >
            View All Prompts
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {prompts.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))}
        </div>
      </div>
    </section>
  );
}
