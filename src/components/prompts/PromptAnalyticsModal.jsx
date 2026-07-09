"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import { Button, Spinner } from "@heroui/react";

import {
  BarChart3,
  Copy,
  Bookmark,
  Star,
  MessageSquare,
  Flag,
  Calendar,
  Eye,
  X,
} from "lucide-react";

import { getPromptAnalytics } from "@/lib/api/prompts";

export default function PromptAnalyticsModal({ prompt }) {
  /* ===============================
            STATES
  =============================== */

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [analytics, setAnalytics] = useState(null);

  /* ===============================
        LOAD ANALYTICS
  =============================== */

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const result = await getPromptAnalytics(prompt._id);

      console.log("Analytics Response:", result);

      if (!result.success) {
        toast.error(result.message || "Failed to load analytics.");
        return;
      }

      setAnalytics(result.analytics);
    } catch (err) {
      console.error(err);

      toast.error("Failed to load analytics.");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
          OPEN MODAL
  =============================== */

  const handleOpen = async () => {
    setOpen(true);

    await loadAnalytics();
  };

  /* ===============================
          CLOSE MODAL
  =============================== */

  const handleClose = () => {
    setOpen(false);
  };

  /* ===============================
            RETURN
  =============================== */

  return (
    <>
      {/* Analytics Button */}

      <Button
        isIconOnly
        size="sm"
        variant="flat"
        color="success"
        title="View Analytics"
        onPress={handleOpen}
        className="
          p-2
          bg-zinc-900/50
          hover:bg-green-600
          hover:text-white
          border
          border-zinc-800/80
          rounded-lg
          transition-all
          duration-300
        "
      >
        <BarChart3 className="w-4 h-4" />
      </Button>

      {/* Modal */}

      {open && (
        <>
          {/* Backdrop */}

          <div
            className="
              fixed
              inset-0
              z-9998
              bg-black/60
              backdrop-blur-sm
            "
            onClick={handleClose}
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
              p-6
            "
          >
            <div
              className="
                relative
                w-full
                max-w-6xl
                max-h-[90vh]
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
                  <div className="rounded-xl bg-cyan-500/10 p-3">
                    <BarChart3 className="text-cyan-400" size={24} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Prompt Analytics
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Performance metrics compiled dynamically.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="
                    rounded-xl
                    p-2
                    text-slate-400
                    hover:bg-slate-800
                    hover:text-white
                    transition
                  "
                >
                  <X size={22} />
                </button>
              </div>

              {/* Scrollable Body */}

              <div className="max-h-[70vh] overflow-y-auto p-8">
                {loading ? (
                  <div className="flex items-center justify-center py-24">
                    <Spinner size="lg" color="primary" />
                  </div>
                ) : (
                  <>
                    {/* Top Stats */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                      {/* Copies */}

                      <div className="rounded-2xl border border-cyan-500/20 bg-[#151D30] p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-slate-400">
                              Total Copies
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-cyan-400">
                              {analytics?.copies ?? 0}
                            </h2>
                          </div>

                          <div className="rounded-xl bg-cyan-500/10 p-3">
                            <Copy size={24} className="text-cyan-400" />
                          </div>
                        </div>
                      </div>

                      {/* Saved */}

                      <div className="rounded-2xl border border-yellow-500/20 bg-[#151D30] p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-slate-400">
                              Saved
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-yellow-400">
                              {analytics?.bookmarks ?? 0}
                            </h2>
                          </div>

                          <div className="rounded-xl bg-yellow-500/10 p-3">
                            <Bookmark size={24} className="text-yellow-400" />
                          </div>
                        </div>
                      </div>

                      {/* Rating */}

                      <div className="rounded-2xl border border-orange-500/20 bg-[#151D30] p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-slate-400">
                              Rating
                            </p>

                            <h2 className="mt-3 flex items-center gap-2 text-3xl font-bold text-orange-400">
                              <Star
                                size={18}
                                className="fill-orange-400 text-orange-400"
                              />

                              {analytics?.rating ?? 0}
                            </h2>
                          </div>

                          <div className="rounded-xl bg-orange-500/10 p-3">
                            <Star
                              size={24}
                              className="fill-orange-400 text-orange-400"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Reviews */}

                      <div className="rounded-2xl border border-emerald-500/20 bg-[#151D30] p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-slate-400">
                              Reviews
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-emerald-400">
                              {analytics?.reviews ?? 0}
                            </h2>
                          </div>

                          <div className="rounded-xl bg-emerald-500/10 p-3">
                            <MessageSquare
                              size={24}
                              className="text-emerald-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row */}

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Reports */}

                      <div className="rounded-2xl border border-red-500/20 bg-[#151D30] p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-slate-400">
                              Reports
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-red-400">
                              {analytics?.reports ?? 0}
                            </h2>
                          </div>

                          <Flag className="text-red-400" size={24} />
                        </div>
                      </div>

                      {/* Views */}

                      <div className="rounded-2xl border border-blue-500/20 bg-[#151D30] p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-slate-400">
                              Views
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-blue-400">
                              {analytics?.views ?? 0}
                            </h2>
                          </div>

                          <Eye className="text-blue-400" size={24} />
                        </div>
                      </div>

                      {/* Created */}

                      <div className="rounded-2xl border border-slate-700 bg-[#151D30] p-6">
                        <div className="flex items-center gap-4">
                          <Calendar className="text-slate-400" size={22} />

                          <div>
                            <p className="text-xs uppercase tracking-widest text-slate-400">
                              Created
                            </p>

                            <p className="mt-2 font-semibold text-white">
                              {analytics?.createdAt
                                ? new Date(
                                    analytics.createdAt,
                                  ).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })
                                : "-"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}

                    <div className="mt-8 rounded-2xl border border-slate-700 bg-[#151D30] p-6">
                      <h3 className="text-xl font-bold text-white">
                        Performance Summary
                      </h3>

                      <p className="mt-4 leading-8 text-slate-400">
                        This prompt has been copied
                        <span className="font-bold text-cyan-400">
                          {" "}
                          {analytics?.copies ?? 0}
                        </span>{" "}
                        times, bookmarked by
                        <span className="font-bold text-yellow-400">
                          {" "}
                          {analytics?.bookmarks ?? 0}
                        </span>{" "}
                        users, received an average rating of
                        <span className="font-bold text-orange-400">
                          {" "}
                          {analytics?.rating ?? 0}
                        </span>{" "}
                        from
                        <span className="font-bold text-emerald-400">
                          {" "}
                          {analytics?.reviews ?? 0}
                        </span>{" "}
                        reviews.
                      </p>
                    </div>
                  </>
                )}
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
                  variant="flat"
                  onPress={handleClose}
                  className="
                    rounded-xl
                    border
                    border-slate-600
                    bg-[#1E293B]
                    px-6
                    text-white
                    hover:bg-slate-700
                  "
                >
                  Close Analytics
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
