"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Card, Chip, Button } from "@heroui/react";

import { ArrowLeft, Crown, Lock, Sparkles } from "lucide-react";

import BookmarkButton from "./BookmarkButton";
import CopyPromptButton from "./CopyPromptButton";
import ReportPromptButton from "./ReportPromptButton";

import ReviewSection from "../review/ReviewSection";
import RatingStars from "../rating/RatingStars";

export default function PromptDetailsClient({
  prompt,
  user,
  reviews,
  returnTo,
}) {
  const [copyCount, setCopyCount] = useState(prompt.copyCount || 0);
  const [reviewList, setReviewList] = useState(reviews);

  const backUrl = returnTo ? decodeURIComponent(returnTo) : "/prompts";

  const creator = prompt?.creatorInformation;

  const isPremium = user?.plan === "AI_Prompt_PRO_Access";

  const isPrivate = prompt.visibility === "private";

  const isLocked = isPrivate && !isPremium;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-violet-50 pt-24 pb-10 px-5 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Back Button */}

        <Link
          href={backUrl}
          className="flex items-center gap-2 text-lg font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back to previous page
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}

          <Card className="lg:col-span-2 rounded-2xl border border-slate-200 shadow-sm">
            <Card.Content className="p-8 flex flex-col gap-8">
              {/* Header */}

              <div className="flex md:flex-row justify-between gap-5">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-slate-900">
                      {prompt.promptTitle}
                    </h1>

                    {isPrivate && (
                      <Chip className="font-semibold flex border text-violet-700 bg-violet-100 border-violet-400 px-4 py-2 rounded-lg items-center gap-2">
                        <Lock size={14} /> Premium Prompt
                      </Chip>
                    )}
                  </div>

                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {prompt.fullDescription}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <BookmarkButton promptId={prompt._id} />

                  <ReportPromptButton prompt={prompt} user={user} />
                </div>
              </div>

              {isLocked && (
                <div
                  className="
     
      rounded-2xl
      border
      border-amber-300
      bg-linear-to-r
      from-amber-50
      to-orange-50
      p-5
    "
                >
                  <div className="flex gap-4">
                    <div
                      className="
          flex
          h-12
          w-12
          px-3
          border
          border-amber-400
          items-center
          justify-center
          rounded-xl
          bg-amber-100
        "
                    >
                      <Crown size={22} className="text-amber-600" />
                    </div>

                    <div>
                      <h3 className="font-bold text-amber-700">
                        Premium Prompt
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        This prompt is available only for Premium members.
                        Upgrade your account to unlock the complete prompt
                        template, copy feature, reviews and ratings.
                      </p>

                      <Link
                        href="/pricing"
                        color="warning"
                        className="my-4 border border-violet-200 p-2 shadow-md hover:shadow-lg transition-all text-violet-600 bg-violet-100 rounded-lg w-50 hover:translate-0.5 font-semibold flex items-center gap-2"
                      >
                        <Sparkles size={16} /> Upgrade to Premium
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================= */}
              {/* Prompt Template */}
              {/* ========================= */}

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Prompt Template
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Copy and use this AI prompt instantly.
                    </p>
                  </div>

                  {isLocked ? (
                    <Link
                      href="/pricing"
                      color="warning"
                      className="font-semibold flex items-center gap-2 border border-violet-200 p-2 rounded-lg bg-violet-100 text-violet-700 shadow-md  transition-all hover:translate-0.5 hover:shadow-lg"
                    >
                      <Crown size={16} /> Unlock
                    </Link>
                  ) : (
                    <CopyPromptButton
                      prompt={prompt}
                      user={user}
                      promptId={prompt._id}
                      promptContent={prompt.promptContent}
                      onCopied={setCopyCount}
                    />
                  )}
                </div>

                {/* Prompt Content */}

                <div className="relative overflow-hidden rounded-2xl border min-h-40 border-slate-200 bg-slate-100">
                  {/* Blur Layer */}

                  <div
                    className={`

        p-6

        transition-all

        duration-300

        ${isLocked ? "pointer-events-none select-none blur-md" : ""}

      `}
                  >
                    <pre
                      className="
          whitespace-pre-wrap
          wrap-break-word
          text-sm
          leading-7
          text-indigo-700
        "
                    >
                      {prompt.promptContent}
                    </pre>
                  </div>

                  {/* Locked Overlay */}

                  {isLocked && (
                    <div
                      className="
          
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
           bg-amber-50
          backdrop-blur-xl
        "
                    >
                      <div
                        className="
                        
            rounded-3xl
            
           
            text-center
          "
                      >
                        <h3
                          className="
              
              text-md
              font-semibold
              mt-2
              text-yellow-600
            "
                        >
                          Premium Prompt
                        </h3>

                        <p
                          className="
              mt-3
              text-sm
              leading-7
              text-slate-600
              max-w-xl
            "
                        >
                          Upgrade your account to unlock the complete prompt
                          template, copy it to clipboard.
                        </p>

                        <Link
                          href="/pricing"
                          color="warning"
                          size="lg"
                          className="
              mx-auto
              my-3
              w-50
              font-semibold
              flex
              gap-2 border border-violet-200 py-2 transition-all hover:translate-0.5 shadow hover:shadow-lg text-sm text-violet-600 bg-violet-100 rounded-lg items-center justify-center
            "
                        >
                          <Sparkles size={18} /> Upgrade to Premium
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ========================= */}
              {/* Usage */}
              {/* ========================= */}

              <div className="space-y-3">
                <h2 className="text-xl font-bold">Usage Instructions</h2>

                {isLocked ? (
                  <div
                    className="
        rounded-2xl
        border
        border-dashed
        border-amber-300
        bg-amber-50
        p-6
        text-center
      "
                  >
                    <Lock size={28} className="mx-auto text-amber-600" />

                    <h3
                      className="
          mt-3
          font-semibold
          text-amber-700
        "
                    >
                      Premium Content
                    </h3>

                    <p
                      className="
          mt-2
          text-sm
          text-slate-600
        "
                    >
                      Usage instructions are available only for Premium members.
                    </p>
                  </div>
                ) : (
                  <p className="leading-7 text-slate-600">
                    {prompt.usageInstructions || "No instructions available."}
                  </p>
                )}
              </div>
            </Card.Content>
          </Card>

          {/* ====================================== */}
          {/* RIGHT SIDEBAR */}
          {/* ====================================== */}

          <Card className="h-fit rounded-3xl border border-slate-200 bg-white shadow-sm">
            <Card.Content className="space-y-8 p-7">
              {/* Header */}

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Prompt Details
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Information about this prompt.
                </p>
              </div>

              {/* AI Information */}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">AI Engine</span>

                  <Chip color="primary" variant="flat">
                    {prompt.aiToolName}
                  </Chip>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Category</span>

                  <Chip variant="flat">{prompt.category}</Chip>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Difficulty</span>

                  <Chip color="secondary" variant="flat">
                    {prompt.difficultyLevel}
                  </Chip>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Visibility</span>

                  {prompt.visibility === "private" ? (
                    <Chip
                      color="warning"
                      variant="flat"
                      startContent={<Lock size={14} />}
                    >
                      Premium
                    </Chip>
                  ) : (
                    <Chip color="success" variant="flat">
                      Public
                    </Chip>
                  )}
                </div>
              </div>

              {/* Statistics */}

              <div className="space-y-4 border-t border-slate-200 pt-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">Copies</span>

                  <span className="font-bold text-slate-900">{copyCount}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Rating</span>

                  {isLocked ? (
                    <Chip color="warning" variant="flat">
                      Premium
                    </Chip>
                  ) : (
                    <div className="flex items-center gap-2">
                      <RatingStars value={prompt.rating} size={15} />

                      <span className="font-semibold">
                        {Number(prompt.rating || 0).toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Reviews</span>

                  {isLocked ? (
                    <Chip color="warning" variant="flat">
                      Hidden
                    </Chip>
                  ) : (
                    <span className="font-semibold">{reviewList.length}</span>
                  )}
                </div>
              </div>

              {/* Creator */}

              <div className="border-t border-slate-200 pt-6">
                <h3 className="mb-4 font-bold text-slate-900">Creator</h3>

                <div className="flex items-center gap-4">
                  <Image
                    src={creator?.image || "/default-avatar.png"}
                    alt={creator?.name}
                    width={0}
                    height={0}
                    className="rounded-full h-10 w-10 object-cover border-2 border-violet-400"
                  />

                  <div>
                    <h4 className="font-semibold">
                      {creator?.name || "Anonymous"}
                    </h4>

                    <p className="text-sm text-slate-500">Prompt Creator</p>
                  </div>
                </div>
              </div>

              {/* Premium Notice */}

              {isLocked && (
                <div
                  className="
          rounded-2xl
          border
          border-amber-300
          bg-linear-to-r
          from-amber-50
          to-orange-50
          p-5
        "
                >
                  <div className="flex items-center gap-3">
                    

                    <div>
                      <h4 className="font-semibold text-amber-700 flex gap-2">
                       <Crown size={22} className="text-amber-600" /> Premium Access Required
                      </h4>

                      <p className="mt-1 mb-4 text-sm text-slate-600">
                        Unlock private prompts, ratings, reviews and unlimited
                        copy access.
                      </p>
                    </div>
                  </div>

                  <Link href="/pricing" className="w-full transition-all hover:translate-0.5 shadow-md hover:shadow-lg border border-violet-200 px-2.5 py-1 font-medium rounded-md bg-violet-100 text-violet-600">
                    Upgrade Now
                  </Link>
                </div>
              )}
            </Card.Content>
          </Card>
        </div>

        {/* BUTTOM SIDE */}

        {/* Reviews */}

        <ReviewSection
          prompt={prompt}
          user={user}
          reviews={reviewList}
          onReviewAdded={(newReview) => {
            setReviewList((prev) => [newReview, ...prev]);
          }}
          isLocked={isLocked}
        />
      </div>
    </div>
  );
}
