"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, Chip } from "@heroui/react";
import { ArrowLeft, Crown, Lock, Sparkles, Zap } from "lucide-react";

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
  const [reviewList, setReviewList] = useState(
    Array.isArray(reviews) ? reviews : [],
  );

  // prompt ডেটাকে স্টেটে রাখা যাতে রেটিং বা অন্যান্য তথ্য সাথে সাথে আপডেট হয়
  const [currentPrompt, setCurrentPrompt] = useState(prompt);

  const backUrl = returnTo ? decodeURIComponent(returnTo) : "/prompts";
  const creator = currentPrompt?.creatorInformation;

  const isPremium = user?.plan === "AI_Prompt_PRO_Access";
  const isPrivate = currentPrompt.visibility === "private";
  const isLocked = isPrivate && !isPremium;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-violet-50/70 pt-24 pb-10 px-4 md:px-8 lg:px-12">
      <div className="container mx-auto flex flex-col gap-8">
        {/* Back Button */}
        <Link
          href={backUrl}
          className="group flex items-center gap-2 text-sm md:text-base font-medium text-slate-500 hover:text-violet-600 transition-colors w-fit"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to previous page
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ====================================== */}
          {/* LEFT SIDE: MAIN CONTENT */}
          {/* ====================================== */}
          <Card className="lg:col-span-2 rounded-3xl border border-slate-200/60 shadow-sm bg-white/70 backdrop-blur-xl">
            <Card.Content className="p-6 md:p-8 flex flex-col gap-8">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                      {currentPrompt.promptTitle}
                    </h1>

                    {isPrivate && (
                      <Chip className="font-semibold flex border border-violet-200 bg-violet-50 text-violet-700 px-3 py-1 rounded-full items-center gap-1.5 shadow-sm">
                        <Crown size={14} className="text-violet-600" /> Premium
                      </Chip>
                    )}
                  </div>

                  <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
                    {currentPrompt.fullDescription}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end border-t md:border-none border-slate-100 pt-4 md:pt-0">
                  <BookmarkButton promptId={currentPrompt._id} />
                  <ReportPromptButton prompt={currentPrompt} user={user} />
                </div>
              </div>

              {/* Top Premium Notice */}
              {isLocked && (
                <div className="relative overflow-hidden rounded-2xl border border-violet-200 bg-linear-to-br from-violet-50 via-white to-purple-50 p-6 md:p-8 shadow-sm">
                  <div className="absolute -right-6 -top-6 text-violet-100/50 rotate-12 pointer-events-none">
                    <Crown size={120} />
                  </div>

                  <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-md">
                      <Lock size={24} className="text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900">
                        Exclusive Premium Prompt
                      </h3>
                      <p className="mt-2 text-sm md:text-base leading-relaxed text-slate-600 max-w-xl">
                        This high-quality prompt is reserved for Premium
                        members. Upgrade today to unlock the complete template,
                        copy functionality, and full community reviews.
                      </p>
                    </div>

                    <Link
                      href="/pricing"
                      className="mt-4 md:mt-0 flex shrink-0 items-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-violet-500/30"
                    >
                      <Sparkles size={16} /> Upgrade Now
                    </Link>
                  </div>
                </div>
              )}

              {/* Prompt Template */}
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Zap size={20} className="text-violet-500" /> Prompt
                      Template
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Ready to copy and use instantly in your AI tool.
                    </p>
                  </div>

                  {isLocked ? (
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-semibold text-violet-700 shadow-sm transition-all hover:bg-violet-100"
                    >
                      <Lock size={16} /> Unlock Template
                    </Link>
                  ) : (
                    <CopyPromptButton
                      prompt={currentPrompt}
                      user={user}
                      promptId={currentPrompt._id}
                      promptContent={currentPrompt.promptContent}
                      onCopied={setCopyCount}
                    />
                  )}
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-dashed min-h-50 border-violet-500 bg-slate-50">
                  <div
                    className={`p-6 md:p-8 transition-all duration-300 ${isLocked ? "pointer-events-none select-none blur-md opacity-40" : ""}`}
                  >
                    <pre className="whitespace-pre-wrap wrap-break-word text-sm md:text-base font-mono leading-relaxed text-indigo-900/80">
                      {currentPrompt.promptContent}
                    </pre>
                  </div>

                  {isLocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white backdrop-blur-md">
                      <div className="rounded-3xl bg-white p-8 text-center border border-white/50 backdrop-blur-xl max-w-sm py-5 mx-auto">
                        <Crown
                          size={32}
                          className="mx-auto text-violet-600 mb-1"
                        />
                        <h3 className="text-lg font-bold text-slate-900">
                          Premium Access Required
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          Upgrade to reveal this carefully crafted prompt and
                          speed up your workflow.
                        </p>
                        <Link
                          href="/pricing"
                          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-600 hover:shadow-lg"
                        >
                          <Sparkles size={16} /> Get Premium
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Usage Instructions */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">
                  Usage Instructions
                </h2>

                {isLocked ? (
                  <div className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/50 p-8 text-center transition-all hover:bg-violet-50">
                    <Lock size={24} className="mx-auto text-violet-400" />
                    <h3 className="mt-3 font-semibold text-slate-800">
                      Hidden Content
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                      Detailed instructions, variables, and tips for this prompt
                      are exclusively available to our Premium members.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
                    <p className="leading-relaxed text-slate-600">
                      {currentPrompt.usageInstructions ||
                        "No specific instructions provided for this prompt. You can use it directly in your AI tool."}
                    </p>
                  </div>
                )}
              </div>
            </Card.Content>
          </Card>

          {/* ====================================== */}
          {/* RIGHT SIDEBAR */}
          {/* ====================================== */}
          <div className="flex flex-col gap-6 h-fit">
            <Card className="rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-xl shadow-sm overflow-hidden">
              <Card.Content className="space-y-8 p-6 md:p-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Prompt Overview
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Key details and statistics.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">
                      AI Engine
                    </span>
                    <Chip className="bg-blue-50 rounded-full text-blue-700 border border-blue-100 font-medium px-3 py-1">
                      {currentPrompt.aiToolName}
                    </Chip>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">
                      Category
                    </span>
                    <Chip className="bg-slate-100 rounded-full text-slate-700 border border-slate-200 font-medium px-3 py-1">
                      {currentPrompt.category}
                    </Chip>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">
                      Difficulty
                    </span>
                    <Chip className="bg-fuchsia-50 rounded-full text-fuchsia-700 border border-fuchsia-100 font-medium px-3 py-1">
                      {currentPrompt.difficultyLevel}
                    </Chip>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">
                      Access
                    </span>
                    {isPrivate ? (
                      <Chip className="bg-violet-100 rounded-full text-violet-700 border border-violet-200 font-medium px-3 py-1 flex items-center gap-1">
                        <Lock size={12} /> Premium
                      </Chip>
                    ) : (
                      <Chip className="bg-emerald-50 rounded-full text-emerald-700 border border-emerald-200 font-medium px-3 py-1">
                        Public
                      </Chip>
                    )}
                  </div>
                </div>

                {/* Statistics */}
                <div className="space-y-4 border-t border-slate-100 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-500">
                      Total Copies
                    </span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-md">
                      {copyCount}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-500">
                      Rating
                    </span>
                    {isLocked ? (
                      <span className="text-xs font-semibold text-violet-500 bg-violet-50 px-2 py-1 rounded-md">
                        Hidden
                      </span>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
                        <RatingStars value={currentPrompt.rating} size={14} />
                        <span className="font-bold text-amber-700 text-sm">
                          {Number(currentPrompt.rating || 0).toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-500">
                      Reviews
                    </span>
                    {isLocked ? (
                      <span className="text-xs font-semibold text-violet-500 bg-violet-50 px-2 py-1 rounded-md">
                        Hidden
                      </span>
                    ) : (
                      <span className="font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                        {reviewList?.length ?? 0}
                      </span>
                    )}
                  </div>
                </div>

                {/* Creator Profile */}
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Creator
                  </h3>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="relative">
                      <Image
                        src={creator?.image || "/default-avatar.png"}
                        alt={creator?.name || "Creator"}
                        width={48}
                        height={48}
                        className="rounded-full h-12 w-12 object-cover border-2 border-white shadow-md transition-transform group-hover:scale-105"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                        {creator?.name || "Anonymous"}
                      </h4>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">
                        Prompt Engineer
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {isLocked && (
              <div className="rounded-3xl bg-linear-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Crown size={80} />
                </div>
                <div className="relative z-10">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <Sparkles size={20} className="text-fuchsia-200" /> Pro
                    Features
                  </h4>
                  <p className="mt-2 mb-5 text-sm text-violet-100 leading-relaxed">
                    Unlock private prompts, view ratings, community reviews, and
                    get unlimited copy access.
                  </p>
                  <Link
                    href="/pricing"
                    className="block w-full text-center bg-white text-violet-700 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    Upgrade Account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ====================================== */}
        {/* BOTTOM SIDE: REVIEWS */}
        {/* ====================================== */}
        <div className="mt-4">
          <ReviewSection
            prompt={currentPrompt}
            user={user}
            reviews={reviewList ?? []}
            isLocked={isLocked}
            onReviewAdded={(newReview, updatedRating) => {
              setReviewList((prev) => [newReview, ...prev]);
              if (updatedRating !== undefined) {
                setCurrentPrompt((prev) => ({
                  ...prev,
                  rating: updatedRating,
                }));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
