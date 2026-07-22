"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button, TextArea } from "@heroui/react";
import { ShieldAlert, X, AlertTriangle, FileText, User } from "lucide-react";
import { warnCreator } from "@/lib/api/reports";

export default function WarnCreatorModal({ report, onClose, onUpdated }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ================= CLOSE MODAL ================= */
  const handleClose = useCallback(() => {
    if (loading) return;
    onClose?.();
  }, [loading, onClose]);

  /* ================= ESC KEY ================= */
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

  /* ================= SEND WARNING ================= */
  const handleWarnCreator = async () => {
    if (!message.trim()) {
      toast.error("Please write a warning message.");
      return;
    }

    try {
      setLoading(true);
      const result = await warnCreator(report._id, message.trim());

      if (!result.success) {
        toast.error(result.message || "Failed to send warning.");
        return;
      }

      toast.success("Warning sent successfully.");

      setTimeout(() => {
        handleClose();
        onUpdated?.();
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!report) return null;

  return (
    <>
      {/* ================= BACKDROP ================= */}
      <div
        onClick={handleClose}
        className="fixed inset-0 z-[9998] bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* ================= MODAL ================= */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg flex flex-col rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl shadow-amber-950/10 overflow-hidden animate-in zoom-in-95 duration-200"
        >
          {/* ================= HEADER ================= */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800/80 bg-slate-900/30 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <ShieldAlert size={18} />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-slate-100">
                  Warn Creator
                </h2>
              </div>
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
          <div className="p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[70vh]">
            {/* Report Summary Box */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
              <h3 className="mb-4 text-sm font-semibold text-slate-200 flex items-center gap-2">
                <FileText size={16} className="text-slate-400" />
                Report Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-400 shrink-0">Prompt</span>
                  <span className="font-medium text-slate-100 text-right truncate">
                    {report?.promptTitle || "Unknown Prompt"}
                  </span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-400 shrink-0">Reason</span>
                  <span className="font-medium text-amber-400 text-right">
                    {report?.reason || "Not specified"}
                  </span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-400 shrink-0">Reported By</span>
                  <span className="font-medium text-slate-100 text-right flex items-center gap-1.5 justify-end">
                    <User size={14} className="text-slate-500" />
                    {report?.reporter?.name || "Anonymous"}
                  </span>
                </div>
              </div>
            </div>

            {/* Warning Message Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" />
                Warning Message
              </label>
              <TextArea
                name="warningMessage"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail the community guidelines violation here..."
                minRows={4}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/50 text-slate-100 px-4 py-3 placeholder:text-slate-500 shadow-inner transition-all duration-200 hover:border-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none resize-none"
              />
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
              isLoading={loading}
              onPress={handleWarnCreator}
              startContent={!loading && <ShieldAlert size={16} />}
              className="w-full sm:w-auto h-10 px-5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-md shadow-amber-950/20 border-none"
            >
              {loading ? "Sending..." : "Send Warning"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
