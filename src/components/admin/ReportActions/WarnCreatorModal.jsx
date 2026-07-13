"use client";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
  Button,
  Avatar,
  Chip,
  TextArea,
  TextField,
  ChipLabel,
} from "@heroui/react";

import { AlertTriangle, Mail, ShieldAlert, User, X } from "lucide-react";
import { warnCreator } from "@/lib/api/reports";
import { Label } from "recharts";

// import { warnCreator } from "@/lib/api/reports";

export default function WarnCreatorModal({ report, onClose, onUpdated }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

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
        SEND WARNING
  ========================================== */

  const handleWarnCreator = async () => {
    if (!message.trim()) {
      toast.error("Please write a warning message.");
      return;
    }

    try {
      setLoading(true);

      const result = await warnCreator(report._id, message.trim());

      if (!result.success) {
        toast.error(result.message);
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
            max-h-200
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
                  bg-amber-500/10
                  p-3
                "
              >
                <ShieldAlert size={24} className="text-amber-400" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">Warn Creator</h2>

                <p className="mt-1 text-sm text-slate-400">
                  Send an official warning regarding this reported prompt.
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
                Body Starts Here
                (Continue in Part 2)
          ========================================== */}

          <div className="space-y-8 p-8">
            {/* ==========================================
                Creator Information
            ========================================== */}

            {/* <div
              className="
                rounded-2xl
                border
                border-slate-700
                bg-[#111827]
                p-6
              "
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-violet-500/10 p-3">
                  <User size={22} className="text-violet-400" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Prompt Creator
                  </h3>

                  <p className="text-sm text-slate-400">
                    This warning will be sent to the prompt creator.
                  </p>
                </div>
              </div>

              <div className="">
                <div className="space-y-2">
                  <div className="flex gap-3">
                    <h4 className="text-lg font-semibold text-white">
                      {report.creator?.name}
                    </h4>
                    <div className="text-cyan-700 rounded-full  text-center border border-cyan-700 bg-cyan-200 px-3 py-1">
                      {report.creator?.role || "Creator"}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <Mail size={15} />

                    <span className="text-sm">{report.creator?.email}</span>
                  </div>
                </div>
              </div>
            </div> */}

            {/* ==========================================
                Report Information
            ========================================== */}

            <div
              className="
                rounded-2xl
                border
                border-slate-700
                bg-[#111827]
                max-h-52
                p-5
              "
            >
              <h3 className="mb-5 text-xl  font-bold text-white">
                Report Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-300">Prompt</span>

                  <span className="max-w-md text-right font-medium text-white">
                    {report?.promptTitle}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-300">Reason</span>

                  <span className="max-w-md text-right font-medium text-white">
                    {report.reason}
                  </span>
                </div>

                <div className="flex justify-between gap-5">
                  <span className="text-slate-300">Reported By</span>

                  <span className="font-medium text-white">
                    {report.reporter?.name}
                  </span>
                </div>
              </div>
            </div>

            {/* ==========================================
                Warning Alert
            ========================================== */}

            {/* <div
              className="
                rounded-2xl
                border
                border-amber-500/30
                bg-amber-500/10
                p-5
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-amber-500/20
                  "
                >
                  <AlertTriangle size={20} className="text-amber-400" />
                </div>

                <div>
                  <h4 className="font-semibold text-amber-300">
                    Warning Notice
                  </h4>

                  <p className="mt-2 leading-7 text-amber-100">
                    This warning will notify the creator that their prompt has
                    been reported by the community. Repeated violations may lead
                    to prompt removal or account restrictions.
                  </p>
                </div>
              </div>
            </div> */}

            <div>
              <label className="text-lg font-semibold text-white">
                Warning Message!
              </label>
              <TextArea
                name="warningMessage"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Kindly write the warning message....."
                className="h-30
                mt-2
                p-2
                w-full
rounded-2xl
border
border-gray-200
bg-white/5
text-white
px-4
placeholder:text-gray-400
shadow-md
transition-all
duration-300
hover:border-violet-600
focus:ring-4
focus:ring-violet-600"
                minRows={5}
              />
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
              {/* Cancel Button */}

              <Button
                variant="bordered"
                onPress={handleClose}
                isDisabled={loading}
                className="
                  rounded-xl
                  border-slate-600
                  bg-[#1E293B]
                  px-6
                  py-3
                  text-white
                  text-xl
                  transition-all
                  hover:bg-slate-700
                "
              >
                Cancel
              </Button>

              {/* Send Warning */}

              <Button
                color="warning"
                isLoading={loading}
                startContent={!loading && <ShieldAlert size={18} />}
                onPress={handleWarnCreator}
                className="
                  rounded-xl
                  bg-linear-to-r
                  from-amber-500
                  to-orange-500
                  px-6
                  py-3
                  text-xl
                  font-semibold
                  text-black
                  shadow-lg
                  transition-all
                  hover:scale-[1.02]
                "
              >
                {loading ? "Sending Warning..." : "Send Warning"}
              </Button>
            </div>

            {/* ==========================================
                End Body
            ========================================== */}
          </div>
        </div>
      </div>
    </>
  );
}
