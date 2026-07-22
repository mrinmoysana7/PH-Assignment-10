// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// import toast from "react-hot-toast";

// import { Button } from "@heroui/react";

// import { X, CircleX, MessageSquareWarning } from "lucide-react";

// import { rejectPrompt } from "@/lib/api/adminPrompts";

// export default function RejectPromptModal({ prompt, onClose, onSuccess }) {
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);

//   const [feedback, setFeedback] = useState("");

//   /* ==========================================
//                 CLOSE MODAL
//   ========================================== */

//   const handleClose = () => {
//     if (loading) return;

//     onClose?.();
//   };

//   /* ==========================================
//                 ESC KEY
//   ========================================== */

//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape") {
//         handleClose();
//       }
//     };

//     document.addEventListener("keydown", handleEsc);

//     document.body.style.overflow = "hidden";

//     return () => {
//       document.removeEventListener("keydown", handleEsc);

//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   /* ==========================================
//               SUBMIT REJECTION
//   ========================================== */

//   const handleReject = async () => {
//     if (!feedback.trim()) {
//       toast.error("Feedback is required.");

//       return;
//     }

//     try {
//       setLoading(true);

//       const result = await rejectPrompt(prompt._id, feedback);

//       if (!result.success) {
//         toast.error(result.message);

//         return;
//       }

//       toast.success("Prompt rejected.");

//       onSuccess?.();

//       router.refresh();
//     } catch (error) {
//       console.error(error);

//       toast.error("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* ================= BACKDROP ================= */}

//       <div
//         onClick={handleClose}
//         className="
//           fixed
//           inset-0
//           z-9998
//           bg-black/70
//           backdrop-blur-sm
//         "
//       />

//       {/* ================= MODAL ================= */}

//       <div
//         className="
//           fixed
//           inset-0
//           z-9999
//           flex
//           items-center
//           justify-center
//           p-5
//         "
//       >
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className="
//             w-full
//             max-w-2xl
//             overflow-hidden
//             rounded-3xl
//             border
//             border-slate-700
//             bg-[#0F172A]
//             shadow-2xl
//             animate-in
//             fade-in
//             zoom-in-95
//             duration-200
//           "
//         >
//           {/* ================= HEADER ================= */}

//           <div
//             className="
//               flex
//               items-center
//               justify-between
//               border-b
//               border-slate-700
//               px-8
//               py-6
//             "
//           >
//             <div className="flex items-center gap-4">
//               <div
//                 className="
//                   rounded-2xl
//                   bg-red-500/10
//                   p-3
//                 "
//               >
//                 <CircleX className="text-red-500" size={24} />
//               </div>

//               <div>
//                 <h2 className="text-2xl font-bold text-white">Reject Prompt</h2>

//                 <p className="mt-1 text-sm text-slate-400">
//                   Send feedback to the creator.
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={handleClose}
//               disabled={loading}
//               className="
//                 rounded-lg
//                 p-2
//                 text-slate-400
//                 hover:bg-slate-800
//                 hover:text-white
//                 transition
//               "
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {/* ================= BODY START ================= */}

//           <div className="space-y-6 p-8">
//             <div
//               className="
//                 rounded-2xl
//                 border
//                 border-red-500/20
//                 bg-red-500/10
//                 p-5
//               "
//             >
//               <div className="flex items-start gap-4">
//                 <div
//                   className="
//                     flex
//                     h-10
//                     w-10
//                     shrink-0
//                     items-center
//                     justify-center
//                     rounded-xl
//                     bg-red-500/20
//                   "
//                 >
//                   <MessageSquareWarning size={18} className="text-red-400" />
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-red-400">
//                     Rejection Feedback
//                   </h4>

//                   <p className="mt-2 text-sm leading-7 text-red-200">
//                     Explain clearly why this prompt doesnt meet PromptVerse
//                     guidelines. Your feedback will help the creator improve and
//                     resubmit the prompt.
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {/* ==========================================
//                     FEEDBACK
//             ========================================== */}

//             <div>
//               <label className="mb-3 block text-sm font-semibold text-white">
//                 Rejection Feedback
//                 <span className="ml-1 text-red-400">*</span>
//               </label>

//               <textarea
//                 value={feedback}
//                 onChange={(e) => setFeedback(e.target.value)}
//                 placeholder="Explain why this prompt was rejected..."
//                 rows={6}
//                 maxLength={500}
//                 className="
//                   w-full
//                   resize-none
//                   rounded-2xl
//                   border
//                   border-slate-700
//                   bg-[#151D30]
//                   px-5
//                   py-4
//                   text-white
//                   placeholder:text-slate-500
//                   outline-none
//                   transition-all
//                   focus:border-violet-500
//                   focus:ring-2
//                   focus:ring-violet-500/20
//                 "
//               />

//               <div className="mt-2 flex justify-end">
//                 <span
//                   className={`
//                     text-xs

//                     ${feedback.length > 450 ? "text-red-400" : "text-slate-500"}
//                   `}
//                 >
//                   {feedback.length}/500
//                 </span>
//               </div>
//             </div>

//             {/* ==========================================
//                     PROMPT PREVIEW
//             ========================================== */}

//             <div
//               className="
//                 rounded-2xl
//                 border
//                 border-slate-700
//                 bg-[#151D30]
//                 p-5
//               "
//             >
//               <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
//                 Prompt Title
//               </p>

//               <h3 className="mt-3 text-lg font-semibold text-white">
//                 {prompt?.promptTitle}
//               </h3>

//               <div className="mt-5">
//                 <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
//                   Description
//                 </p>

//                 <p className="mt-2 line-clamp-3 leading-7 text-slate-400">
//                   {prompt?.fullDescription || "No description available."}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ==========================================
//                     FOOTER
//           ========================================== */}

//           <div
//             className="
//               flex
//               items-center
//               justify-end
//               gap-3
//               border-t
//               border-slate-700
//               px-8
//               py-5
//             "
//           >
//             <Button
//               variant="bordered"
//               onPress={handleClose}
//               isDisabled={loading}
//               className="
//                 rounded-xl
//                 border-slate-600
//                 bg-[#1E293B]
//                 text-white
//                 hover:bg-slate-700
//               "
//             >
//               Cancel
//             </Button>

//             <Button
//               color="danger"
//               isLoading={loading}
//               onPress={handleReject}
//               startContent={!loading && <CircleX size={16} />}
//               className="
//                 rounded-xl
//                 bg-linear-to-r
//                 from-red-600
//                 to-red-500
//                 px-6
//                 text-white
//                 transition-all
//                 hover:translate-y-0.5
//               "
//             >
//               Submit Rejection
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import { X, CircleX, AlertCircle } from "lucide-react";
import { rejectPrompt } from "@/lib/api/adminPrompts";

export default function RejectPromptModal({ prompt, onClose, onSuccess }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  /* ================= CLOSE MODAL ================= */
  const handleClose = () => {
    if (loading) return;
    onClose?.();
  };

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
  }, []);

  /* ================= SUBMIT REJECTION ================= */
  const handleReject = async () => {
    if (!feedback.trim()) {
      toast.error("Feedback is required.");
      return;
    }

    try {
      setLoading(true);
      const result = await rejectPrompt(prompt._id, feedback);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Prompt rejected.");
      onSuccess?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!prompt) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* ================= BACKDROP ================= */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* ================= MODAL ================= */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg flex flex-col rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl shadow-red-950/10 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh]"
      >
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800/80 bg-slate-900/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
              <CircleX size={18} />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-100">
              Reject Prompt
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
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
          {/* Target Reference Banner */}
          <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border border-slate-800 bg-slate-900/50 text-sm">
            <AlertCircle size={16} className="text-slate-400 shrink-0" />
            <p className="text-slate-300 truncate">
              Rejecting:{" "}
              <span className="font-semibold text-white">
                {prompt.promptTitle}
              </span>
            </p>
          </div>

          {/* Feedback Input */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Rejection Reason <span className="text-red-500">*</span>
            </label>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="e.g., The prompt lacks sufficient detail, violates platform guidelines, or contains broken variables..."
              rows={4}
              maxLength={500}
              className="w-full resize-none rounded-xl border border-slate-800 bg-slate-900 p-3.5 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50"
            />

            <div className="flex justify-end">
              <span
                className={`text-[10px] sm:text-xs font-medium ${
                  feedback.length > 450 ? "text-red-400" : "text-slate-500"
                }`}
              >
                {feedback.length}/500
              </span>
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
            onPress={handleReject}
            startContent={!loading && <CircleX size={16} />}
            className="w-full sm:w-auto h-10 px-5 rounded-xl font-medium text-sm text-white bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-md shadow-red-950/20"
          >
            Confirm Rejection
          </Button>
        </div>
      </div>
    </div>
  );
}
