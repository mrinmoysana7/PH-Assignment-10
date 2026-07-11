"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { Button } from "@heroui/react";

import { Trash2, X } from "lucide-react";

import { deletePrompt } from "@/lib/api/prompts";

export default function DeletePromptModal({ prompt, user, onDeleted }) {
  const router = useRouter();

  /* ======================================
            STATES
  ====================================== */

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  /* ======================================
            OPEN / CLOSE
  ====================================== */

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) return;

    setOpen(false);
  };

  /* ======================================
            ESC TO CLOSE
  ====================================== */

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

  /* ======================================
            DELETE PROMPT
  ====================================== */

  // console.log("Prompt:", prompt);
  // console.log("Prompt ID:", prompt._id);
  // console.log("User:", user);

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

  /* ======================================
              UI
  ====================================== */

  return (
    <>
      {/* Delete Button */}

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
                max-w-xl
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
              {/* Header */}

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
                    <h2 className="text-2xl font-bold text-white">
                      Delete Prompt
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      This action cannot be undone.
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
                    hover:bg-slate-800
                    hover:text-white
                    transition
                  "
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}

              <div className="space-y-6 p-8">
                {/* Description */}

                <p className="leading-7 text-slate-400">
                  Are you sure you want to permanently delete this prompt
                  template? Once deleted, it cannot be recovered and all
                  associated analytics, bookmarks and reports will be removed.
                </p>

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

                {/* Danger Alert */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-red-500/30
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
                      <Trash2 size={18} className="text-red-400" />
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-400">
                        Permanent Action
                      </h4>

                      <p className="mt-2 text-sm leading-7 text-red-200">
                        Deleting this prompt will permanently remove the prompt,
                        analytics, bookmarks, reports and related records from
                        the system. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}

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
                <Button
                  variant="bordered"
                  onPress={handleClose}
                  isDisabled={loading}
                  className="
                    border-slate-600
                    bg-[#1E293B]
                    text-white
                    hover:bg-slate-700
                    rounded-xl
                    px-6
                    py-2
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
                    bg-linear-to-r
                    from-red-600
                    to-red-500
                    text-white
                    rounded-xl
                    px-6
                    py-2
                    cursor-pointer
                    hover:translate-y-0.5
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
