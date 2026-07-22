"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { Button } from "@heroui/react";

import { Trash2, X } from "lucide-react";

import { deletePrompt } from "@/lib/api/prompts";

export default function DeletePromptModal({ prompt, user, onDeleted }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) return;

    setOpen(false);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);

      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);

      document.body.style.overflow = "auto";
    };
  }, [open, loading]);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const result = await deletePrompt(prompt._id, user.id);

      if (!result.success) {
        toast.error(result.message || "Delete failed.");

        return;
      }

      toast.success("Prompt deleted successfully");

      handleClose();

      router.refresh();

      onDeleted?.();
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        isIconOnly
        size="sm"
        color="danger"
        variant="flat"
        onPress={handleOpen}
        className="
          p-2
          bg-red-900/20
          hover:bg-red-600
          text-white
          border
          border-red-700/30
          rounded-lg
          transition-all
        "
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      {/* Modal */}

      {open && (
        <>
          {/* Backdrop */}

          <div
            onClick={handleClose}
            className="
              fixed
              inset-0
              z-9998
              bg-black/60
              backdrop-blur-sm
            "
          />

          {/* Modal Wrapper */}

          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md transition-all">
            <div
              onClick={(e) => e.stopPropagation()}
              className="
      w-full 
      max-w-md 
      overflow-hidden 
      rounded-3xl 
      border 
      border-slate-700/60 
      bg-[#0F172A] 
      shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] 
      animate-in 
      fade-in 
      zoom-in-95 
      duration-200
    "
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-700/50 px-6 py-5 sm:px-8 sm:py-6 bg-slate-900/40">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 shadow-inner shadow-red-500/10">
                    <Trash2 className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Delete Prompt
                    </h2>
                    <p className="mt-0.5 text-xs sm:text-sm text-slate-400">
                      This action cannot be undone.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  disabled={loading}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-slate-600 disabled:opacity-50"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 sm:p-5">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                      <Trash2 size={16} className="text-red-400" />
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-400 text-sm sm:text-base">
                        Permanent Action
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-300">
                        Are you sure you want to permanently delete this prompt
                        template? All associated data will be removed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-slate-700/50 bg-slate-900/40 px-6 py-5 sm:px-8 sm:py-6">
                <Button
                  variant="bordered"
                  onPress={handleClose}
                  isDisabled={loading}
                  className="
          w-full 
          sm:w-auto 
          border-slate-600 
          bg-transparent 
          text-white 
          hover:bg-slate-800 
          hover:border-slate-500 
          rounded-xl 
          px-6 
          py-2.5 
          font-medium 
          transition-all
        "
                >
                  Cancel
                </Button>

                <Button
                  color="danger"
                  isLoading={loading}
                  startContent={!loading && <Trash2 size={16} />}
                  onClick={handleDelete}
                  className="
          w-full 
          sm:w-auto 
          bg-linear-to-r 
          from-red-600 
          to-red-500 
          text-white 
          rounded-xl 
          px-6 
          py-2.5 
          font-medium 
          shadow-lg 
          shadow-red-500/20 
          border 
          border-red-500/50
          hover:shadow-red-500/40 
          hover:-translate-y-0.5 
          transition-all
        "
                >
                  Delete Prompt
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
