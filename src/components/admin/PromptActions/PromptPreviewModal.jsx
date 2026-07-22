"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Avatar } from "@heroui/react";
import {
  X,
  Eye,
  Star,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
  Layers,
  User,
} from "lucide-react";

export default function PromptPreviewModal({ prompt, onClose, onApprove }) {
  const [copied, setCopied] = useState(false);

  /* ================= ESC CLOSE ================= */
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
    status,
  } = prompt;

  const handleCopy = () => {
    if (!promptContent) return;
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* ================= Backdrop ================= */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* ================= Container ================= */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-4xl max-h-[85vh] sm:max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl border border-slate-800/80 bg-slate-950/95 shadow-2xl shadow-purple-950/20 overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-200"
      >
        {/* ================= Header ================= */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-semibold text-slate-100">
                Prompt Preview
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* ================= Scrollable Body ================= */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Hero Banner */}
          <div className="relative w-full bg-slate-900">
            <div className="relative h-44 sm:h-56 md:h-64 w-full">
              <Image
                src={image || "/placeholder.jpg"}
                alt={promptTitle || "Prompt Visual"}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            </div>

            {/* Overlaid Banner Metadata */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex flex-col justify-end space-y-2">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {aiToolName && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    {aiToolName}
                  </span>
                )}
                {difficultyLevel && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {difficultyLevel}
                  </span>
                )}
                {visibility && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 capitalize">
                    {visibility}
                  </span>
                )}
              </div>

              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug line-clamp-2">
                {promptTitle}
              </h1>
            </div>
          </div>

          {/* Core Content Grid */}
          <div className="p-4 sm:p-6 space-y-6">
            {/* Quick Analytics Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex flex-col sm:flex-row items-center sm:justify-center text-center sm:text-left gap-1 sm:gap-2.5">
                <Star
                  size={16}
                  className="text-amber-400 fill-amber-400 shrink-0"
                />
                <div>
                  <div className="text-[10px] sm:text-xs text-slate-400">
                    Rating
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-100">
                    {rating || 0}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:justify-center text-center sm:text-left gap-1 sm:gap-2.5 border-x border-slate-800/80 px-2">
                <Copy size={16} className="text-violet-400 shrink-0" />
                <div>
                  <div className="text-[10px] sm:text-xs text-slate-400">
                    Copies
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-100">
                    {copyCount || 0}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:justify-center text-center sm:text-left gap-1 sm:gap-2.5">
                <MessageCircle size={16} className="text-cyan-400 shrink-0" />
                <div>
                  <div className="text-[10px] sm:text-xs text-slate-400">
                    Reviews
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-100">
                    {reviews || 0}
                  </div>
                </div>
              </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (Main Specs & Content) */}
              <div className="lg:col-span-2 space-y-5">
                {/* Full Description */}
                {fullDescription && (
                  <div className="space-y-2">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Overview
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/50">
                      {fullDescription}
                    </p>
                  </div>
                )}

                {/* Prompt Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Prompt Content
                    </h3>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-emerald-400" />
                          <span className="text-emerald-400 font-medium">
                            Copied
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="relative rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 sm:p-4 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed overflow-x-auto max-h-64 overflow-y-auto">
                    <pre className="whitespace-pre-wrap font-sans sm:font-mono">
                      {promptContent}
                    </pre>
                  </div>
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column (Sidebar Cards) */}
              <div className="space-y-4">
                {/* Creator Information */}
                <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 space-y-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Creator
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-medium text-slate-100 truncate">
                        {creatorInformation?.name || "Anonymous"}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {creatorInformation?.email || "No email available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Specifications Card */}
                <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 space-y-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Details
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                      <span className="text-slate-400">Category</span>
                      <span className="font-medium text-slate-200">
                        {category || "General"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                      <span className="text-slate-400">AI Tool</span>
                      <span className="font-medium text-slate-200">
                        {aiToolName || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                      <span className="text-slate-400">Difficulty</span>
                      <span className="font-medium text-slate-200">
                        {difficultyLevel || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-400">Visibility</span>
                      <span className="font-medium text-slate-200 capitalize">
                        {visibility || "Public"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Footer ================= */}
        <div className="shrink-0 p-3.5 sm:p-4 px-4 sm:px-6 border-t border-slate-800/80 bg-slate-900/90 backdrop-blur-md flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <Sparkles size={14} className="text-violet-400" />
            <span>PromptVerse Preview</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              variant="bordered"
              onPress={onClose}
              className="flex-1 sm:flex-none h-9 sm:h-10 px-4 rounded-xl border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 text-xs sm:text-sm font-medium"
            >
              Close
            </Button>

            <Button
              onPress={handleCopy}
              startContent={copied ? <Check size={16} /> : <Copy size={16} />}
              className={`flex-1 sm:flex-none h-9 sm:h-10 px-5 rounded-xl font-medium text-xs sm:text-sm text-white transition-all duration-200 shadow-md ${
                copied
                  ? "bg-emerald-600 hover:bg-emerald-500"
                  : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-violet-950/50"
              }`}
            >
              {copied ? "Copied" : "Copy Prompt"}
            </Button>

            {status === "pending" && (
              <Button
                color="success"
                startContent={<Eye size={16} />}
                onPress={onApprove}
                className="flex-1 sm:flex-none h-9 sm:h-10 px-5 rounded-xl font-medium text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
              >
                Approve
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
