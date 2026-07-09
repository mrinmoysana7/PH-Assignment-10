"use client";

import Link from "next/link";
import { Card, Chip, Button } from "@heroui/react";
import { Eye, Trash2 } from "lucide-react";
import RemoveBookmarkButton from "./RemoveBookmarkButton";

export default function SavedPromptCard({ prompt, user }) {
  return (
    <Card
      className="
        group
        bg-[#111827]
        border
        border-zinc-800
        hover:border-violet-500/50
        transition-all
        duration-300
        rounded-xl
        hover:-translate-y-1
        hover:shadow-[0_15px_40px_rgba(124,58,237,0.25)]
      "
    >
      <Card.Content className="p-5 flex flex-col w-full h-full">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Chip
            size="sm"
            className="bg-violet-600/20 text-violet-300 font-medium"
          >
            {prompt.aiToolName}
          </Chip>

          <Chip size="sm" className="bg-cyan-600/20 text-cyan-300 font-medium">
            {prompt.category}
          </Chip>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-lg font-bold text-white line-clamp-2 min-h-14">
          {prompt.promptTitle}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm text-zinc-400 line-clamp-3 flex-1">
          {prompt.fullDescription}
        </p>

        {/* Bottom */}
        <div className="mt-6 flex items-center gap-3">
          <Link
            href={`/prompts/${prompt._id}?returnTo=${encodeURIComponent(
              "/dashboard/user/saved-prompts",
            )}`}
            color="secondary"
            radius="md"
            className="
              flex-1
              bg-linear-to-r
              from-violet-600
              to-fuchsia-600
              text-white
              font-semibold
              text-center
              py-1
              rounded-md
              hover:opacity-90
              transition-opacity
              duration-300
            "
            startContent={<Eye size={16} />}
          >
            View Details
          </Link>

          <RemoveBookmarkButton promptId={prompt._id} userId={user.id} />
        </div>
      </Card.Content>
    </Card>
  );
}
