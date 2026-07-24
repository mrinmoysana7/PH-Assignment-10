"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Quote, Sparkles, Star } from "lucide-react";

export default function ReviewCard({ review }) {
  const {
    userName,
    userImage,
    comment,
    rating = 5,
    promptTitle,
    promptId,
  } = review;

  return (
    <motion.article
      whileHover={{
        y: -8,
        scale: 1.01,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[30px]
        border
        border-white/60
        bg-white/80
        p-8
        backdrop-blur-xl
        shadow-xl shadow-slate-200/40
        transition-all
        duration-500
        hover:border-violet-300
        hover:shadow-2xl hover:shadow-violet-500/20 
      "
    >
      {/* Gradient Glow */}
      <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet-400/20 blur-[120px] transition-all duration-500 group-hover:scale-125" />
      <div className="absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-sky-300/20 blur-[110px]" />

      {/* Quote */}
      <Quote
        className="
          absolute
          right-8
          top-8
          h-16
          w-16
          text-violet-100
          transition-transform
          duration-500
          group-hover:rotate-12
          group-hover:scale-110
        "
      />

      {/* User */}
      {/* Removed flex-1 from here so it doesn't stretch unnecessarily */}
      <div className="relative z-10 flex items-center gap-4">
        <div
          className="
            relative
            h-16
            w-16
            shrink-0
            overflow-hidden
            rounded-full
            ring-4
            ring-violet-100
            transition-all
            duration-500
            group-hover:ring-violet-400
          "
        >
          <Image
            src={userImage || "https://i.pravatar.cc/200"}
            alt={userName}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900">{userName}</h3>
          <p className="text-sm text-slate-500">PromptVerse Member</p>
        </div>
      </div>

      {/* Rating */}
      <div className="relative z-10 mt-7 flex items-center justify-between">
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={18}
              className={
                index < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-200"
              }
            />
          ))}
        </div>
        <div
          className="
            rounded-full
            bg-violet-100
            px-3
            py-1
            text-xs
            font-semibold
            text-violet-700
          "
        >
          {rating}.0 / 5
        </div>
      </div>

      {/* Review */}
      {/* Kept flex-1 here so the comment block pushes the prompt box to the bottom */}
      <div className="relative z-10 mt-8 flex-1">
        <p
          className="
            line-clamp-6
            text-[17px]
            leading-8
            text-slate-600
          "
        >
          {comment}
        </p>
      </div>

      {/* Prompt */}
      {/* Removed flex-1, added mt-auto to ensure it sits at the absolute bottom if comment is short */}
      <div
        className="
          relative
          z-10
          mt-auto 
          pt-8
          flex
          flex-col
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-5
            transition-all
            duration-300
            group-hover:border-violet-200
            group-hover:bg-violet-50
          "
        >
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-violet-600" />
            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-slate-500
              "
            >
              Reviewed Prompt
            </span>
          </div>

          <h4
            className="
              mt-3
              line-clamp-2
              text-base
              font-semibold
              text-slate-900
            "
          >
            {promptTitle}
          </h4>

          <div className="flex">
            <Link
              href={`/prompts/${promptId}`}
              className="
              mt-5
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-violet-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:gap-3
              hover:bg-violet-700
            "
            >
              View Prompt
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
