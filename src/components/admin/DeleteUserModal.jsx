"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { Button } from "@heroui/react";

import { Trash2, X } from "lucide-react";

import { deleteUser } from "@/lib/api/users";

export default function DeleteUserModal({ user, onDeleted }) {
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

      const result = await deleteUser(user._id);

      if (!result.success) {
        toast.error(result.message || "Delete failed.");

        return;
      }

      toast.success("User deleted successfully.");

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

          {/* Modal */}

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
                  <div className="rounded-2xl bg-red-500/10 p-3">
                    <Trash2 size={24} className="text-red-500" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Delete User
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
                  "
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}

              <div className="space-y-6 p-8">
                <p className="leading-7 text-slate-400">
                  Are you sure you want to permanently delete this user account?
                </p>

                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-700
                    bg-[#151D30]
                    p-5
                  "
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    USER NAME
                  </p>

                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {user?.name}
                  </h3>

                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      EMAIL
                    </p>

                    <p className="mt-2 text-slate-400">{user?.email}</p>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      ROLE
                    </p>

                    <p className="mt-2 capitalize text-white">{user?.role}</p>
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-red-500/30
                    bg-red-500/10
                    p-5
                  "
                >
                  <div className="flex gap-4">
                    <div className="rounded-xl bg-red-500/20 p-2">
                      <Trash2 size={18} className="text-red-400" />
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-400">
                        Permanent Action
                      </h4>

                      <p className="mt-2 text-sm leading-7 text-red-200">
                        This user account will be permanently removed from the
                        system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}

              <div
                className="
                  flex
                  justify-end
                  gap-3
                  border-t
                  border-slate-700
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
                  "
                >
                  Cancel
                </Button>

                <Button
                  color="danger"
                  isLoading={loading}
                  startContent={!loading && <Trash2 size={16} />}
                  onPress={handleDelete}
                  className="
                    bg-linear-to-r
                    from-red-600
                    to-red-500
                    text-white
                  "
                >
                  Delete User
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
