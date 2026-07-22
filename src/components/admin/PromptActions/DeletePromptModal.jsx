"use client";

import { useEffect, useState, useCallback } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@heroui/react";
import { Trash2, AlertTriangle, X, FileText } from "lucide-react";
import { deletePromptByAdmin } from "@/lib/api/adminPrompts";

export default function DeletePromptModal({ prompt, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);

  /* ================= CLOSE MODAL ================= */
  const handleClose = useCallback(() => {
    if (loading) return;
    onClose?.();
  }, [loading, onClose]);

  /* ================= ESC CLOSE ================= */
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

  /* ================= DELETE PROMPT ================= */
  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await deletePromptByAdmin(prompt._id);

      if (!result.success) {
        toast.error(result.message || "Delete failed.");
        return;
      }

      toast.success("Prompt deleted successfully.");
      onDeleted?.();

      setTimeout(() => {
        handleClose();
      }, 1200);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!prompt) return null;

  return (
    <>
      <Toaster position="top-right" />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* ================= BACKDROP ================= */}
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        />

        {/* ================= MODAL ================= */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-md flex flex-col rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl shadow-red-950/10 overflow-hidden animate-in zoom-in-95 duration-200"
        >
          {/* ================= HEADER ================= */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800/80 bg-slate-900/30 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
                <Trash2 size={18} />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-100">
                Delete Prompt
              </h2>
            </div>

            <button
              onClick={handleClose}
              disabled={loading}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              <X size={18} />
            </button>
          </div>

          {/* ================= BODY ================= */}
          <div className="p-4 sm:p-6 space-y-4">
            {/* Target Reference Banner */}
            <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 text-sm">
              <FileText size={16} className="text-slate-400 shrink-0" />
              <p className="text-slate-300 truncate">
                Deleting:{" "}
                <span className="font-semibold text-white">
                  {prompt.promptTitle}
                </span>
              </p>
            </div>

            {/* Consolidated Warning */}
            <div className="flex items-start gap-3.5 p-4 rounded-xl border border-red-500/20 bg-red-500/10">
              <div className="flex items-center justify-center w-9 h-9 shrink-0 rounded-lg bg-red-500/20 text-red-400">
                <AlertTriangle size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-400">
                  Irreversible Action
                </h4>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-red-200/90">
                  This will permanently remove this prompt and all associated
                  data, including reviews, bookmarks, and analytics.{" "}
                  <strong>This cannot be undone.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="shrink-0 p-4 sm:p-5 border-t border-slate-800/80 bg-slate-900/30 flex flex-col-reverse sm:flex-row justify-end gap-2.5 sm:gap-3">
            <Button
              variant="bordered"
              onPress={handleClose}
              isDisabled={loading}
              className="w-full sm:w-auto h-10 px-5 rounded-xl border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-medium"
            >
              Cancel
            </Button>

            <Button
              color="danger"
              isLoading={loading}
              onPress={handleDelete}
              startContent={!loading && <Trash2 size={16} />}
              className="w-full sm:w-auto h-10 px-5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-md shadow-red-950/20"
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
