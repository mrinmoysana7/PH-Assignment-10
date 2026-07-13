"use client";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { Button } from "@heroui/react";

import { Trash2, AlertTriangle, X } from "lucide-react";

import { removeReportedPrompt } from "@/lib/api/reports";
import Image from "next/image";

export default function RemovePromptModal({ report, onClose, onUpdated }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  /* ==========================================
      CLOSE MODAL
  ========================================== */

  const handleClose = useCallback(() => {
    if (loading) return;

    onClose?.();
  }, [loading, onClose]);

  /* ==========================================
      ESC KEY
  ========================================== */

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);

      document.body.style.overflow = "auto";
    };
  }, [handleClose]);

  /* ==========================================
      REMOVE PROMPT
  ========================================== */

  const handleRemove = async () => {
    try {
      setLoading(true);

      const result = await removeReportedPrompt(report._id);

      if (!result.success) {
        toast.error(result.message || "Failed to remove prompt.");

        return;
      }

      toast.success("Prompt removed successfully.");

      onUpdated?.();

      handleClose();

     
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ==========================================
          Backdrop
      ========================================== */}

      <div
        onClick={handleClose}
        className="
          fixed
          inset-0
          z-9998
          bg-black/70
          backdrop-blur-sm
        "
      />

      {/* ==========================================
          Modal Wrapper
      ========================================== */}

      <div
        className="
          fixed
          inset-0
          z-9999
          flex
          items-center
          justify-center
          overflow-y-auto
          p-6
        "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            w-full
            max-w-3xl
            overflow-hidden
            rounded-3xl
            border
            border-slate-700
            bg-[#0F172A]
            shadow-2xl
            animate-in
            fade-in
            zoom-in-95
            duration-200
          "
        >
          {/* ==========================================
              Header
          ========================================== */}

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
                  bg-red-500/10
                  p-3
                "
              >
                <Trash2 size={24} className="text-red-500" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Remove Reported Prompt
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Permanently remove this prompt from the marketplace.
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              disabled={loading}
              className="
                rounded-lg
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

          {/* ==========================================
              BODY START
              (Continue in Part 2)
          ========================================== */}

          <div className="space-y-8 p-8">
            {/* ==========================================
                Prompt Preview
            ========================================== */}

            <div
              className="
                rounded-2xl
                border
                border-slate-700
                bg-[#111827]
                p-6
              "
            >
              <h3 className="mb-5 text-xl font-bold text-white">
                Prompt Information
              </h3>

              <div className="grid gap-6 lg:grid-cols-[120px_1fr]">
                {/* Prompt Image */}

                <div
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-700
                  "
                >
                  <Image
                    src={
                      report.promptImage ||
                      report.prompt?.image ||
                      "/placeholder.png"
                    }
                    fill
                    alt={report.promptTitle}
                    className="
                      h-32
                      w-full
                      object-cover
                    "
                  />
                </div>

                {/* Prompt Details */}

                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Prompt Title
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-white">
                      {report.promptTitle}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span
                      className="
                        rounded-full
                        bg-violet-500/10
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-violet-300
                      "
                    >
                      {report.prompt?.category || report.category || "General"}
                    </span>

                    <span
                      className="
                        rounded-full
                        bg-cyan-500/10
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-cyan-300
                      "
                    >
                      {report.prompt?.aiToolName ||
                        report.aiToolName ||
                        "ChatGPT"}
                    </span>

                    <span
                      className="
                        rounded-full
                        bg-emerald-500/10
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-emerald-300
                      "
                    >
                      {report.prompt?.difficultyLevel ||
                        report.difficultyLevel ||
                        "Beginner"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================
                Creator Information
            ========================================== */}

            <div
              className="
                rounded-2xl
                border
                border-slate-700
                bg-[#111827]
                p-6
              "
            >
              <h3 className="mb-5 text-xl font-bold text-white">
                Prompt Creator
              </h3>

              <div className="flex items-center gap-5">
                <Image
                  src={report.creator?.image}
                  alt={report.creator?.name}
                  fill
                  className="
                    h-16
                    w-16
                    rounded-full
                    border
                    border-slate-700
                    object-cover
                  "
                />

                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {report.creator?.name}
                  </h4>

                  <p className="mt-1 text-sm text-slate-400">
                    {report.creator?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* ==========================================
                Report Information
            ========================================== */}

            <div
              className="
                rounded-2xl
                border
                border-slate-700
                bg-[#111827]
                p-6
              "
            >
              <h3 className="mb-5 text-xl font-bold text-white">
                Report Details
              </h3>

              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <span className="text-slate-400">Reported By</span>

                  <div className="text-right">
                    <p className="font-semibold text-white">
                      {report.reporter?.name}
                    </p>

                    <p className="text-sm text-slate-400">
                      {report.reporter?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-slate-400">Reason</span>

                  <span
                    className="
                      rounded-full
                      bg-red-500/10
                      px-4
                      py-1.5
                      text-sm
                      font-medium
                      text-red-300
                    "
                  >
                    {report.reason}
                  </span>
                </div>

                <div>
                  <p className="mb-3 text-slate-400">Description</p>

                  <div
                    className="
                      rounded-xl
                      border
                      border-slate-700
                      bg-[#0F172A]
                      p-5
                    "
                  >
                    <p className="leading-7 text-slate-300">
                      {report.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================
                Danger Alert
            ========================================== */}

            <div
              className="
                rounded-2xl
                border
                border-red-500/30
                bg-red-500/10
                p-6
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-500/20
                  "
                >
                  <AlertTriangle size={22} className="text-red-400" />
                </div>

                <div>
                  <h4 className="font-semibold text-red-400">
                    Permanent Action
                  </h4>

                  <p className="mt-2 leading-7 text-red-200">
                    Removing this prompt will permanently delete it from the
                    marketplace. The report will also be marked as resolved and
                    this action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ==========================================
                Footer
            ========================================== */}

          <div
            className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-slate-700
                bg-[#0F172A]
                px-8
                py-6
                sm:flex-row
                sm:items-center
                sm:justify-end
              "
          >
            {/* Cancel */}

            <Button
              variant="bordered"
              onPress={handleClose}
              isDisabled={loading}
              className="
                  rounded-xl
                  border-slate-600
                  bg-[#1E293B]
                  px-6
                  text-white
                  hover:bg-slate-700
                "
            >
              Cancel
            </Button>

            {/* Delete */}

            <Button
              color="danger"
              isLoading={loading}
              startContent={!loading && <Trash2 size={17} />}
              onPress={handleRemove}
              className="
                  rounded-xl
                  bg-linear-to-r
                  from-red-600
                  to-red-500
                  px-6
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  hover:scale-[1.02]
                "
            >
              {loading ? "Removing..." : "Remove Prompt"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
