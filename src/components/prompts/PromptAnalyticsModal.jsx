// "use client";

// import { useState } from "react";

// import toast from "react-hot-toast";

// import { Button, Spinner } from "@heroui/react";

// import {
//   BarChart3,
//   Copy,
//   Bookmark,
//   Star,
//   MessageSquare,
//   Flag,
//   Calendar,
//   Eye,
//   X,
// } from "lucide-react";

// import { getPromptAnalytics } from "@/lib/api/prompts";

// export default function PromptAnalyticsModal({ prompt }) {
//   /* ===============================
//             STATES
//   =============================== */

//   const [open, setOpen] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const [analytics, setAnalytics] = useState(null);

//   /* ===============================
//         LOAD ANALYTICS
//   =============================== */

//   const loadAnalytics = async () => {
//     try {
//       setLoading(true);

//       const result = await getPromptAnalytics(prompt._id);

//       console.log("Analytics Response:", result);

//       if (!result.success) {
//         toast.error(result.message || "Failed to load analytics.");
//         return;
//       }

//       setAnalytics(result.analytics);
//     } catch (err) {
//       console.error(err);

//       toast.error("Failed to load analytics.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ===============================
//           OPEN MODAL
//   =============================== */

//   const handleOpen = async () => {
//     setOpen(true);

//     await loadAnalytics();
//   };

//   /* ===============================
//           CLOSE MODAL
//   =============================== */

//   const handleClose = () => {
//     setOpen(false);
//   };

//   /* ===============================
//             RETURN
//   =============================== */

//   return (
//     <>
//       {/* Analytics Button */}

//       <Button
//         isIconOnly
//         size="sm"
//         variant="flat"
//         color="success"
//         title="View Analytics"
//         onPress={handleOpen}
//         className="
//           p-2
//           bg-zinc-900/50
//           hover:bg-green-600
//           text-white
//           border
//           border-green-800
//           rounded-lg
//           transition-all
//           duration-300
//         "
//       >
//         <BarChart3 className="w-4 h-4" />
//       </Button>

//       {/* Modal */}

//       {open && (
//         <>
//           {/* Backdrop */}

//           <div
//             className="
//               fixed
//               inset-0
//               z-9998
//               bg-black/60
//               backdrop-blur-sm
//             "
//             onClick={handleClose}
//           />

//           {/* Modal Wrapper */}
//           <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md transition-all">
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="
//       relative
//       w-full
//       max-w-2xl
//       max-h-[90vh]
//       flex
//       flex-col
//       overflow-hidden
//       rounded-3xl
//       border
//       border-slate-800
//       bg-[#0F172A]
//       shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]
//       animate-in
//       fade-in
//       zoom-in-95
//       duration-200
//     "
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between border-b border-slate-800/80 px-5 py-4 sm:px-6 sm:py-5 bg-slate-900/50 backdrop-blur-sm shrink-0">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
//                     <BarChart3 size={20} />
//                   </div>

//                   <div>
//                     <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
//                       Prompt Analytics
//                     </h2>
//                     <p className="text-xs text-slate-400">
//                       Performance metrics compiled dynamically
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleClose}
//                   className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-700"
//                 >
//                   <X size={18} />
//                 </button>
//               </div>

//               {/* Scrollable Body */}
//               <div className="overflow-y-auto p-5 sm:p-6 space-y-4 sm:space-y-5">
//                 {loading ? (
//                   <div className="flex items-center justify-center py-16">
//                     <Spinner size="lg" color="primary" />
//                   </div>
//                 ) : (
//                   <>
//                     {/* Top Primary Stats Grid (2x2 on Mobile, 4 Cols on Desktop) */}
//                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                       {/* Copies */}
//                       <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-3.5 sm:p-4 transition-all hover:bg-slate-900/80">
//                         <div className="flex items-center justify-between text-slate-400 mb-1.5">
//                           <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
//                             Copies
//                           </span>
//                           <Copy size={16} className="text-cyan-400" />
//                         </div>
//                         <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
//                           {analytics?.copies ?? 0}
//                         </p>
//                       </div>

//                       {/* Saved */}
//                       <div className="rounded-2xl border border-amber-500/20 bg-slate-900/60 p-3.5 sm:p-4 transition-all hover:bg-slate-900/80">
//                         <div className="flex items-center justify-between text-slate-400 mb-1.5">
//                           <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
//                             Saved
//                           </span>
//                           <Bookmark size={16} className="text-amber-400" />
//                         </div>
//                         <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">
//                           {analytics?.bookmarks ?? 0}
//                         </p>
//                       </div>

//                       {/* Rating */}
//                       <div className="rounded-2xl border border-orange-500/20 bg-slate-900/60 p-3.5 sm:p-4 transition-all hover:bg-slate-900/80">
//                         <div className="flex items-center justify-between text-slate-400 mb-1.5">
//                           <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
//                             Rating
//                           </span>
//                           <Star
//                             size={16}
//                             className="fill-orange-400 text-orange-400"
//                           />
//                         </div>
//                         <p className="text-2xl sm:text-3xl font-extrabold text-orange-400">
//                           {analytics?.rating ?? 0}
//                         </p>
//                       </div>

//                       {/* Reviews */}
//                       <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-3.5 sm:p-4 transition-all hover:bg-slate-900/80">
//                         <div className="flex items-center justify-between text-slate-400 mb-1.5">
//                           <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
//                             Reviews
//                           </span>
//                           <MessageSquare
//                             size={16}
//                             className="text-emerald-400"
//                           />
//                         </div>
//                         <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
//                           {analytics?.reviews ?? 0}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Secondary Stats Row (Views, Reports, Created Date) */}
//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                       {/* Views */}
//                       <div className="rounded-2xl border border-blue-500/20 bg-slate-900/60 p-3.5 sm:p-4 flex items-center justify-between">
//                         <div>
//                           <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
//                             Total Views
//                           </p>
//                           <p className="mt-0.5 text-lg font-bold text-blue-400">
//                             {analytics?.views ?? 0}
//                           </p>
//                         </div>
//                         <div className="rounded-xl bg-blue-500/10 p-2 text-blue-400">
//                           <Eye size={18} />
//                         </div>
//                       </div>

//                       {/* Reports */}
//                       <div className="rounded-2xl border border-rose-500/20 bg-slate-900/60 p-3.5 sm:p-4 flex items-center justify-between">
//                         <div>
//                           <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
//                             Reports
//                           </p>
//                           <p className="mt-0.5 text-lg font-bold text-rose-400">
//                             {analytics?.reports ?? 0}
//                           </p>
//                         </div>
//                         <div className="rounded-xl bg-rose-500/10 p-2 text-rose-400">
//                           <Flag size={18} />
//                         </div>
//                       </div>

//                       {/* Created Date */}
//                       <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 sm:p-4 flex items-center justify-between">
//                         <div>
//                           <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
//                             Created
//                           </p>
//                           <p className="mt-0.5 text-xs sm:text-sm font-semibold text-white">
//                             {analytics?.createdAt
//                               ? new Date(
//                                   analytics.createdAt,
//                                 ).toLocaleDateString("en-IN", {
//                                   day: "numeric",
//                                   month: "short",
//                                   year: "numeric",
//                                 })
//                               : "-"}
//                           </p>
//                         </div>
//                         <div className="rounded-xl bg-slate-800 p-2 text-slate-400">
//                           <Calendar size={18} />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Performance Summary Banner */}
//                     <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
//                       <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
//                         Performance Insights
//                       </h3>
//                       <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
//                         This prompt has been copied{" "}
//                         <span className="font-bold text-cyan-400">
//                           {analytics?.copies ?? 0} times
//                         </span>
//                         , bookmarked by{" "}
//                         <span className="font-bold text-amber-400">
//                           {analytics?.bookmarks ?? 0} users
//                         </span>
//                         , and holds an average rating of{" "}
//                         <span className="font-bold text-orange-400">
//                           {analytics?.rating ?? 0}★
//                         </span>{" "}
//                         from{" "}
//                         <span className="font-bold text-emerald-400">
//                           {analytics?.reviews ?? 0} reviews
//                         </span>
//                         .
//                       </p>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Footer */}
//               <div className="flex items-center justify-end border-t border-slate-800/80 bg-slate-900/50 backdrop-blur-sm px-5 py-3.5 sm:px-6 shrink-0">
//                 <Button
//                   variant="flat"
//                   onPress={handleClose}
//                   className="
//           w-full
//           sm:w-auto
//           rounded-xl
//           border
//           border-slate-700
//           bg-slate-800/80
//           px-5
//           py-2
//           text-xs
//           sm:text-sm
//           font-medium
//           text-white
//           hover:bg-slate-700
//           hover:border-slate-600
//           transition-all
//         "
//                 >
//                   Close Analytics
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

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
          text-white
          border
          border-green-800
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
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md transition-all">
            <div
              onClick={(e) => e.stopPropagation()}
              className="
                relative 
                w-full 
                max-w-2xl 
                max-h-[75vh] 
                sm:max-h-[90vh] 
                flex 
                flex-col 
                overflow-hidden 
                rounded-3xl 
                border 
                border-slate-800 
                bg-[#0F172A] 
                shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] 
                animate-in 
                fade-in 
                zoom-in-95 
                duration-200
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3 sm:px-6 sm:py-5 bg-slate-900/50 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <BarChart3 size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Prompt Analytics
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-400">
                      Performance metrics compiled dynamically
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-700"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-5">
                {loading ? (
                  <div className="flex items-center justify-center py-10 sm:py-16">
                    <Spinner
                      size="lg"
                      color="secondary"
                      className="text-violet-500"
                    />
                  </div>
                ) : (
                  <>
                    {/* Top Primary Stats Grid (2x2 on Mobile, 4 Cols on Desktop) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                      {/* Copies */}
                      <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-3 sm:p-4 transition-all hover:bg-slate-900/80">
                        <div className="flex items-center justify-between text-slate-400 mb-1.5">
                          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                            Copies
                          </span>
                          <Copy size={16} className="text-cyan-400" />
                        </div>
                        <p className="text-xl sm:text-3xl font-extrabold text-cyan-400">
                          {analytics?.copies ?? 0}
                        </p>
                      </div>

                      {/* Saved */}
                      <div className="rounded-2xl border border-amber-500/20 bg-slate-900/60 p-3 sm:p-4 transition-all hover:bg-slate-900/80">
                        <div className="flex items-center justify-between text-slate-400 mb-1.5">
                          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                            Saved
                          </span>
                          <Bookmark size={16} className="text-amber-400" />
                        </div>
                        <p className="text-xl sm:text-3xl font-extrabold text-amber-400">
                          {analytics?.bookmarks ?? 0}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="rounded-2xl border border-orange-500/20 bg-slate-900/60 p-3 sm:p-4 transition-all hover:bg-slate-900/80">
                        <div className="flex items-center justify-between text-slate-400 mb-1.5">
                          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                            Rating
                          </span>
                          <Star
                            size={16}
                            className="fill-orange-400 text-orange-400"
                          />
                        </div>
                        <p className="text-xl sm:text-3xl font-extrabold text-orange-400">
                          {analytics?.rating ?? 0}
                        </p>
                      </div>

                      {/* Reviews */}
                      <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-3 sm:p-4 transition-all hover:bg-slate-900/80">
                        <div className="flex items-center justify-between text-slate-400 mb-1.5">
                          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                            Reviews
                          </span>
                          <MessageSquare
                            size={16}
                            className="text-emerald-400"
                          />
                        </div>
                        <p className="text-xl sm:text-3xl font-extrabold text-emerald-400">
                          {analytics?.reviews ?? 0}
                        </p>
                      </div>
                    </div>

                    {/* Secondary Stats Row (Views, Reports, Created Date) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                      {/* Views */}
                      <div className="rounded-2xl border border-blue-500/20 bg-slate-900/60 p-3 sm:p-4 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Total Views
                          </p>
                          <p className="mt-0.5 text-base sm:text-lg font-bold text-blue-400">
                            {analytics?.views ?? 0}
                          </p>
                        </div>
                        <div className="rounded-xl bg-blue-500/10 p-2 text-blue-400">
                          <Eye size={18} />
                        </div>
                      </div>

                      {/* Reports */}
                      <div className="rounded-2xl border border-rose-500/20 bg-slate-900/60 p-3 sm:p-4 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Reports
                          </p>
                          <p className="mt-0.5 text-base sm:text-lg font-bold text-rose-400">
                            {analytics?.reports ?? 0}
                          </p>
                        </div>
                        <div className="rounded-xl bg-rose-500/10 p-2 text-rose-400">
                          <Flag size={18} />
                        </div>
                      </div>

                      {/* Created Date */}
                      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 sm:p-4 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Created
                          </p>
                          <p className="mt-0.5 text-xs sm:text-sm font-semibold text-white">
                            {analytics?.createdAt
                              ? new Date(
                                  analytics.createdAt,
                                ).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "-"}
                          </p>
                        </div>
                        <div className="rounded-xl bg-slate-800 p-2 text-slate-400">
                          <Calendar size={18} />
                        </div>
                      </div>
                    </div>

                    {/* Performance Summary Banner */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-3 sm:p-4">
                      <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1 sm:mb-1.5">
                        Performance Insights
                      </h3>
                      <p className="text-[11px] sm:text-sm leading-relaxed text-slate-300">
                        This prompt has been copied{" "}
                        <span className="font-bold text-cyan-400">
                          {analytics?.copies ?? 0} times
                        </span>
                        , bookmarked by{" "}
                        <span className="font-bold text-amber-400">
                          {analytics?.bookmarks ?? 0} users
                        </span>
                        , and holds an average rating of{" "}
                        <span className="font-bold text-orange-400">
                          {analytics?.rating ?? 0}★
                        </span>{" "}
                        from{" "}
                        <span className="font-bold text-emerald-400">
                          {analytics?.reviews ?? 0} reviews
                        </span>
                        .
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end border-t border-slate-800/80 bg-slate-900/50 backdrop-blur-sm px-4 py-3 sm:px-6 shrink-0">
                <Button
                  variant="flat"
                  onPress={handleClose}
                  className="
                    w-full 
                    sm:w-auto 
                    rounded-xl 
                    border 
                    border-slate-700 
                    bg-slate-800/80 
                    px-5 
                    py-2 
                    text-xs 
                    sm:text-sm 
                    font-medium 
                    text-white 
                    hover:bg-slate-700 
                    hover:border-slate-600 
                    transition-all
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
