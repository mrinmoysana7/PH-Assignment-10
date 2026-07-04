"use client";

import { Button, Card } from "@heroui/react";
import { useState } from "react";
import BookmarkButton from "./BookmarkButton";
import { Flag } from "@gravity-ui/icons";
import CopyPromptButton from "./CopyPromptButton";

export default function PromptDetailsSidebar({ prompt }) {
  const [copyCount, setCopyCount] = useState(prompt.copyCount);

  return (
    <Card className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-2xl">
      <Card.Content className="p-6 md:p-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            {prompt.promptTitle}
          </h1>
          <div className="flex items-center gap-2 shrink-0">
            <BookmarkButton promptId={prompt._id} />

            <Button
              title="Report Prompt"
              isIconOnly
              variant="flat"
              className="bg-slate-100"
            >
              <Flag size={18} />
            </Button>
          </div>
        </div>

        <p className="text-slate-600 text-base leading-relaxed">
          {prompt.fullDescription}
        </p>

        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Prompt Template
            </h3>
            <CopyPromptButton
              promptId={prompt._id}
              promptContent={prompt.promptContent}
              onCopied={setCopyCount}
            />
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-inner">
            <p className="font-mono text-sm leading-relaxed text-indigo-700 wrap-break-words whitespace-pre-wrap">
              {prompt.promptContent}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-slate-900">
            Usage Instructions
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {prompt.usageInstructions}
          </p>
        </div>
      </Card.Content>
    </Card>
  );
}
