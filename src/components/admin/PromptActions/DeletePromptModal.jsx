"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { Button } from "@heroui/react";

import { Trash2, AlertTriangle, X } from "lucide-react";
import { deletePromptByAdmin } from "@/lib/api/adminPrompts";

// import { deletePrompt } from "@/lib/api/adminPrompts";

export default function DeletePromptModal({ prompt, onClose, onDeleted }) {
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
                ESC CLOSE
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
              DELETE PROMPT
  ========================================== */

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

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= BACKDROP ================= */}

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

      {/* ================= MODAL ================= */}

      <div
        className="
          fixed
          inset-0
          z-9999
          flex
          items-center
          justify-center
          p-5
        "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            w-full
            max-w-2xl
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
          {/* ================= HEADER ================= */}

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
                <Trash2 className="text-red-500" size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">Delete Prompt</h2>

                <p className="mt-1 text-sm text-slate-400">
                  This action is permanent and cannot be undone.
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

          {/* ================= BODY ================= */}

          <div className="space-y-6 p-8">
            {/* Warning */}

            <div
              className="
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/10
                p-5
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-500/20
                  "
                >
                  <AlertTriangle size={18} className="text-red-400" />
                </div>

                <div>
                  <h4 className="font-semibold text-red-400">
                    Permanent Delete
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-red-200">
                    This prompt template will be permanently removed from
                    PromptVerse. This operation cannot be reversed.
                  </p>
                </div>
              </div>
            </div>

            {/* Prompt Preview */}

            <div
              className="
                rounded-2xl
                border
                border-slate-700
                bg-[#151D30]
                p-5
              "
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Prompt Title
              </p>

              <h3 className="mt-3 text-lg font-semibold text-white">
                {prompt?.promptTitle}
              </h3>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Description
                </p>

                <p className="mt-2 line-clamp-3 leading-7 text-slate-400">
                  {prompt?.fullDescription || "No description available."}
                </p>
              </div>
            </div>

            {/* ==========================================
                    DANGER NOTE
            ========================================== */}

            <div
              className="
                rounded-2xl
                border
                border-amber-500/20
                bg-amber-500/10
                p-5
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-amber-500/20
                  "
                >
                  <AlertTriangle size={18} className="text-amber-400" />
                </div>

                <div>
                  <h4 className="font-semibold text-amber-400">Warning</h4>

                  <p className="mt-2 text-sm leading-7 text-amber-200">
                    Deleting this prompt will permanently remove all associated
                    reviews, analytics, bookmarks, reports and prompt data. This
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
                    FOOTER
          ========================================== */}

          <div
            className="
              flex
              items-center
              justify-end
              gap-3
              border-t
              border-slate-700
              bg-[#0F172A]
              px-8
              py-5
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
              onPress={handleDelete}
              startContent={!loading && <Trash2 size={16} />}
              className="
                rounded-xl
                bg-linear-to-r
                from-red-600
                to-red-500
                px-6
                text-white
                transition-all
                hover:translate-y-0.5
              "
            >
              Delete Prompt
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
