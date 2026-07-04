"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, Button, Chip } from "@heroui/react";

import { ArrowLeft, Flag, Star } from "lucide-react";

import BookmarkButton from "./BookmarkButton";
import CopyPromptButton from "./CopyPromptButton";
import ReportPromptButton from "./ReportPromptButton";

export default function PromptDetailsClient({ prompt, user }) {
  const [copyCount, setCopyCount] = useState(prompt.copyCount || 0);

  return (
    <div className="bg-slate-50 text-slate-900 py-24 px-5 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Back Button */}

        <Link
          href="/prompts"
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back to previous page
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}

          <Card className="lg:col-span-2 rounded-2xl border border-slate-200 shadow-sm">
            <Card.Content className="p-8 flex flex-col gap-8">
              {/* Header */}

              <div className="flex flex-col md:flex-row justify-between gap-5">
                <div>
                  <h1 className="text-3xl font-bold">{prompt.promptTitle}</h1>

                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {prompt.fullDescription}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <BookmarkButton promptId={prompt._id} />

                  <ReportPromptButton promptId={prompt._id} userId={user?.id} />
                </div>
              </div>

              {/* Prompt */}

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg">Prompt Template</h2>

                  <CopyPromptButton
                    promptId={prompt._id}
                    promptContent={prompt.promptContent}
                    onCopied={setCopyCount}
                  />
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-100 p-5">
                  <pre className="whitespace-pre-wrap wrap-break text-sm text-indigo-700">
                    {prompt.promptContent}
                  </pre>
                </div>
              </div>

              {/* Usage */}

              <div className="space-y-2">
                <h2 className="font-bold text-lg">Usage Instructions</h2>

                <p className="text-slate-600">
                  {prompt.usageInstructions || "No instructions available."}
                </p>
              </div>
            </Card.Content>
          </Card>

          {/* RIGHT SIDEBAR */}

          <Card className="rounded-2xl border border-slate-200 shadow-sm h-fit">
            <Card.Content className="p-6 space-y-6">
              <h2 className="text-xl font-bold">Prompt Details</h2>

              {/* Details */}

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">AI Engine</span>

                  <Chip size="sm">{prompt.aiToolName}</Chip>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Category</span>

                  <Chip size="sm">{prompt.category}</Chip>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Difficulty</span>

                  <Chip size="sm">{prompt.difficultyLevel}</Chip>
                </div>
              </div>

              {/* Stats */}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Copies Made</span>

                  <span className="font-bold">{copyCount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Rating</span>

                  <span className="flex items-center gap-1 font-bold">
                    <Star size={14} className="fill-amber-400 text-amber-400" />

                    {prompt.rating}
                  </span>
                </div>
              </div>

              {/* Creator */}

              <div className="space-y-3">
                <h3 className="font-bold text-sm">Creator Information</h3>

                <div className="flex gap-3 items-center">
                  <Image
                    src={
                      prompt.creatorInformation?.avatar || "/default-avatar.png"
                    }
                    width={42}
                    height={42}
                    alt="avatar"
                    className="rounded-full"
                  />

                  <div>
                    <h4 className="font-semibold">
                      {prompt.creatorInformation?.name || "Anonymous"}
                    </h4>

                    <p className="text-xs text-slate-500">
                      @{prompt.creatorInformation?.username || "unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
