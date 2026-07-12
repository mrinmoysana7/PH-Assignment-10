"use client";

import { useEffect } from "react";

import Image from "next/image";

import { Button, Avatar, Chip } from "@heroui/react";

import { X, Eye, Star, Copy, MessageCircle, Sparkles } from "lucide-react";

export default function PromptPreviewModal({ prompt, onClose }) {
  /* ==========================================
                  ESC CLOSE
  ========================================== */

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEsc);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);

      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!prompt) return null;

  const {
    image,
    promptTitle,
    fullDescription,
    promptContent,
    category,
    aiToolName,
    difficultyLevel,
    visibility,
    tags = [],
    rating = 0,
    copyCount = 0,
    reviews = 0,
    creatorInformation,
  } = prompt;

  return (
    <>
      {/* ================= Backdrop ================= */}

      <div
        onClick={onClose}
        className="
          fixed
          inset-0
          z-9998
          bg-black/70
          backdrop-blur-sm
        "
      />

      {/* ================= Wrapper ================= */}

      <div
        className="
          fixed
          inset-0
          z-9999
          flex
          items-center
          justify-center
          p-6
        "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            w-full
            max-w-5xl
            overflow-hidden
            rounded-3xl
            border
            border-slate-700
            bg-[#0F172A]
            shadow-[0_40px_80px_rgba(0,0,0,.45)]
            animate-in
            fade-in
            zoom-in-95
            duration-200
          "
        >
          {/* ================= Header ================= */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-slate-700
              px-8
              py-6
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  rounded-2xl
                  bg-violet-500/15
                  p-3
                "
              >
                <Eye className="text-violet-400" size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Prompt Preview
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Review this prompt before taking action.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="
                rounded-xl
                p-2
                text-slate-400
                transition
                hover:bg-slate-800
                hover:text-white
              "
            >
              <X size={20} />
            </button>
          </div>

          {/* ================= Body ================= */}

          <div className="max-h-[78vh] overflow-y-auto">
            {/* Hero */}

            <div className="relative h-72 w-full">
              <Image
                src={image || "/placeholder.jpg"}
                alt={promptTitle}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Chip color="secondary" variant="solid">
                    {aiToolName}
                  </Chip>

                  <Chip color="warning" variant="solid">
                    {difficultyLevel}
                  </Chip>

                  <Chip color="success" variant="flat">
                    {visibility}
                  </Chip>
                </div>

                <h1 className="text-4xl font-bold text-white">{promptTitle}</h1>

                <p className="mt-3 max-w-3xl text-slate-200 leading-7">
                  {fullDescription}
                </p>
              </div>
            </div>
            {/* ==========================================
                    CONTENT
            ========================================== */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              {/* ==========================================
                      LEFT CONTENT
              ========================================== */}

              <div className="lg:col-span-2 space-y-8">
                {/* Creator */}

                <div className="rounded-2xl border border-slate-700 bg-[#151D30] p-6">
                  <div className="flex items-center gap-4">
                    <Avatar
                      src={creatorInformation?.image || "/default-avatar.png"}
                      name={creatorInformation?.name || "Anonymous"}
                      size="lg"
                    />

                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {creatorInformation?.name || "Anonymous"}
                      </h3>

                      <p className="text-sm text-slate-400">
                        {creatorInformation?.email}
                      </p>

                      <div className="mt-2">
                        <Chip size="sm" color="secondary" variant="flat">
                          {creatorInformation?.role || "Creator"}
                        </Chip>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prompt Content */}

                <div className="rounded-2xl border border-slate-700 bg-[#151D30] p-6">
                  <h3 className="text-xl font-bold text-white">
                    Prompt Content
                  </h3>

                  <div
                    className="
                      mt-5
                      rounded-xl
                      bg-[#0F172A]
                      border
                      border-slate-700
                      p-5
                      max-h-112.5
                      overflow-y-auto
                    "
                  >
                    <pre
                      className="
                        whitespace-pre-wrap
                        text-sm
                        leading-7
                        text-slate-300
                        font-mono
                      "
                    >
                      {promptContent}
                    </pre>
                  </div>
                </div>

                {/* Tags */}

                <div className="rounded-2xl border border-slate-700 bg-[#151D30] p-6">
                  <h3 className="text-xl font-bold text-white">Tags</h3>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {tags.length === 0 ? (
                      <span className="text-slate-500">No tags available</span>
                    ) : (
                      tags.map((tag) => (
                        <Chip
                          key={tag}
                          color="secondary"
                          variant="flat"
                          radius="full"
                        >
                          #{tag}
                        </Chip>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* ==========================================
                      RIGHT SIDEBAR
              ========================================== */}

              <div className="space-y-6">
                {/* Stats */}

                <div className="rounded-2xl border border-slate-700 bg-[#151D30] p-6">
                  <h3 className="mb-6 text-xl font-bold text-white">
                    Analytics
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Star
                          size={18}
                          className="text-yellow-400 fill-yellow-400"
                        />

                        <span className="text-slate-400">Rating</span>
                      </div>

                      <span className="font-bold text-white">{rating}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Copy size={18} className="text-violet-400" />

                        <span className="text-slate-400">Copies</span>
                      </div>

                      <span className="font-bold text-white">{copyCount}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MessageCircle size={18} className="text-cyan-400" />

                        <span className="text-slate-400">Reviews</span>
                      </div>

                      <span className="font-bold text-white">{reviews}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}

                <div className="rounded-2xl border border-slate-700 bg-[#151D30] p-6">
                  <h3 className="mb-6 text-xl font-bold text-white">Details</h3>

                  <div className="space-y-5">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Category
                      </p>

                      <p className="mt-2 font-medium text-white">{category}</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        AI Tool
                      </p>

                      <p className="mt-2 font-medium text-white">
                        {aiToolName}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Difficulty
                      </p>

                      <p className="mt-2 font-medium text-white">
                        {difficultyLevel}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Visibility
                      </p>

                      <p className="mt-2 font-medium capitalize text-white">
                        {visibility}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ==========================================
                        FOOTER
            ========================================== */}

            <div
              className="
                sticky
                bottom-0
                flex
                items-center
                justify-between
                border-t
                border-slate-700
                bg-[#0F172A]
                px-8
                py-5
              "
            >
              {/* Left */}

              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-violet-500/10
                    px-4
                    py-2
                  "
                >
                  <Sparkles size={16} className="text-violet-400" />

                  <span className="text-sm text-violet-300">
                    PromptVerse Preview
                  </span>
                </div>
              </div>

              {/* Right */}

              <div className="flex items-center gap-3">
                {/* Close */}

                <Button
                  variant="bordered"
                  onPress={onClose}
                  className="
                    rounded-xl
                    border-slate-600
                    bg-[#1E293B]
                    px-6
                    text-white
                    hover:bg-slate-700
                  "
                >
                  Close
                </Button>

                {/* Copy Prompt */}

                <Button
                  color="secondary"
                  startContent={<Copy size={16} />}
                  onPress={() => {
                    navigator.clipboard.writeText(promptContent || "");
                  }}
                  className="
                    rounded-xl
                    bg-linear-to-r
                    from-violet-600
                    to-purple-600
                    px-6
                    text-white
                    transition-all
                    hover:translate-y-0.5
                  "
                >
                  Copy Prompt
                </Button>

                {/* Optional Approve Button */}

                {prompt.status === "pending" && (
                  <Button
                    color="success"
                    startContent={<Eye size={16} />}
                    className="
                      rounded-xl
                      bg-linear-to-r
                      from-emerald-600
                      to-green-500
                      px-6
                      text-white
                    "
                  >
                    Approve
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
