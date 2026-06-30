"use client";

import Image from "next/image";
import Link from "next/link";

import { Avatar, Button, Card, Chip } from "@heroui/react";

import { ArrowRight, Copy, Comment, StarFill } from "@gravity-ui/icons";

export default function PromptCard({ prompt }) {
  const {
    _id,
    image,
    promptTitle,
    fullDescription,
    tags,
    aiToolName,
    difficultyLevel,
    creatorInformation,
    copyCount,
    reviews,
    rating,
  } = prompt;

  const handleViewDetails = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    router.push(`/prompts/${prompt._id}`);
  };

  return (
    <Card
      radius="xl"
      className="
      h-full
      flex flex-col
        group
        overflow-hidden
        rounded-2xl
        bg-white/80
        backdrop-blur-xl
        shadow-xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-violet-300
        hover:shadow-[0_20px_45px_rgba(124,58,237,0.15)]
      "
    >
      {/* ================= HEADER ================= */}

      <div className="flex-1">
        <Card.Header className="flex flex-col gap-5 p-4">
          {/* Image */}
          <div className="relative h-35 w-full overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt={promptTitle}
              fill
              priority={false}
              className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
            />

            {/* Dark Gradient */}

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

            <div
              className="
              absolute
              bottom-3
              right-3
              flex
              items-center
              gap-1
              rounded-full
              bg-white/90
              px-3
              py-1
              backdrop-blur-lg
              shadow-lg
            "
            >
              <StarFill width={15} height={15} className="text-yellow-500" />

              <span className="text-sm font-semibold">{rating}</span>
            </div>
          </div>
          {/* PromptCard.jsx-এ নিচের অংশটি আপডেট করুন */}
          <div className="flex gap-2">
            {/* AI Tool Chip */}
            <Chip
              size="xl" // 'sm' এর বদলে 'md' ব্যবহার করলে টেক্সট বড় দেখাবে
              color="secondary"
              variant="solid"
              className="px-4 h-auto py-1.5 rounded-full border border-white/30 bg-violet-600/90 text-white min-w-fit"
            >
              {/* ডেটা চেক করার জন্য */}
              {typeof aiToolName === "string" ? aiToolName : "Tool"}
            </Chip>

            {/* Difficulty Chip */}
            <Chip
              size="md"
              color="warning"
              variant="solid"
              className="px-4 h-auto py-1.5 rounded-full border border-white/30 bg-amber-500/90 text-white min-w-fit"
            >
              {typeof difficultyLevel === "string" ? difficultyLevel : "Level"}
            </Chip>
          </div>
          {/* <div className="flex gap-4"> */}
          {/* AI Tool */}
          {/* <Chip
              size="sm"
              color="secondary"
              variant="solid"
              className="
              px-4
              py-1
              rounded-full
              border
              border-white/30
              bg-violet-600/90
              backdrop-blur-md
              text-white
            "
            >
              {aiToolName}
            </Chip> */}
          {/* Difficulty */}
          {/* <Chip
              size="sm"
              color="warning"
              variant="solid"
              className="
              px-4
              py-1
              rounded-full
              border
              border-white/30
              bg-amber-500/90
              text-white
            "
            >
              {difficultyLevel}
            </Chip> */}
          {/* </div> */}
          {/* Title */}
          <Card.Title
            className="
            line-clamp-2
            text-xl
            font-bold
            leading-snug
            tracking-tight
            transition-colors
            duration-300
            group-hover:text-violet-700
          "
          >
            {promptTitle}
          </Card.Title>
          {/* Description */}
          <Card.Description
            className="
            line-clamp-3
            text-sm
            leading-6
            text-default-500
          "
          >
            {fullDescription}
          </Card.Description>
        </Card.Header>

        {/* ================= CONTENT ================= */}

        <Card.Content className="space-y-5 px-4 pb-4">
          {/* Tags */}

          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                size="sm"
                radius="full"
                variant="flat"
                className="
                bg-violet-50
                text-violet-700
                font-medium
              "
              >
                #{tag}
              </Chip>
            ))}

            {tags.length > 3 && (
              <Chip size="sm" radius="full" variant="bordered">
                +{tags.length - 3}
              </Chip>
            )}
          </div>
        </Card.Content>

        {/* ================= FOOTER ================= */}
      </div>
      <Card.Footer className="p-4 mt-auto pt-0 space-y-8">
        {/* Creator + Stats */}

        <div className="rounded-2xl shadow-lg bg-default-50/70 p-3">
          {/* Creator */}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                src={
                  creatorInformation?.avatar ||
                  "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                }
                name={creatorInformation?.name || "Anonymous"}
                size="md"
                className="ring-2 ring-violet-100"
              />

              <div>
                <h4 className="text-sm font-semibold text-default-900">
                  {creatorInformation?.name || "Anonymous"}
                </h4>

                <p className="text-xs text-default-500">
                  @{creatorInformation?.username || "unknown"}
                </p>
              </div>
            </div>

            <div className="rounded-full bg-violet-100 px-3 py-1">
              <span className="text-xs font-semibold text-violet-700">
                Creator
              </span>
            </div>
          </div>

          {/* Divider */}

          <div className="my-3 h-px bg-default-200" />

          {/* Stats */}

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100">
                <Copy width={18} height={18} className="text-violet-600" />
              </div>

              <div>
                <p className="text-lg font-bold leading-none">
                  {copyCount.toLocaleString()}
                </p>

                <span className="text-xs text-default-500">Copies</span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100">
                <Comment width={18} height={18} className="text-orange-500" />
              </div>

              <div>
                <p className="text-lg font-bold leading-none">{reviews}</p>

                <span className="text-xs text-default-500">Reviews</span>
              </div>
            </div>
          </div>
        </div>
        <Link href={`/prompts/${_id}`}>
          <Button
            onClick={handleViewDetails}
            as={Link}
            radius="full"
            className="
            h-12
            w-full
            border-0
            rounded-lg
            bg-linear-to-r
            from-violet-600
            via-purple-600
            to-fuchsia-600
            font-semibold
            text-white
            shadow-lg
            shadow-violet-500/30
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:shadow-xl
            hover:shadow-violet-500/40
          "
            endContent={
              <ArrowRight
                width={18}
                height={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            }
          >
            View Details
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}
