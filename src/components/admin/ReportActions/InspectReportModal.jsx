"use client";

import { useCallback, useEffect } from "react";

import Image from "next/image";

import { Avatar, Button, Chip } from "@heroui/react";

import {
  AlertTriangle,
  CalendarDays,
  Eye,
  Shield,
  User,
  X,
} from "lucide-react";

export default function InspectReportModal({ report, onClose }) {
  /* ==========================================
      CLOSE MODAL
  ========================================== */

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  /* ==========================================
      ESC KEY + BODY SCROLL LOCK
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
      REASON BADGE COLOR
  ========================================== */

  const getReasonColor = (reason) => {
    switch (reason?.toLowerCase()) {
      case "spam":
        return "danger";

      case "copyright":
        return "warning";

      case "misleading":
        return "primary";

      case "abusive content":
        return "secondary";

      default:
        return "default";
    }
  };

  return (
    <>
      {/* ==========================================
          BACKDROP
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
          MODAL WRAPPER
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
            max-w-6xl
            overflow-hidden
            rounded-3xl
            border
            border-default-100
            bg-[#0F172A]
            shadow-2xl
            animate-in
            fade-in
            zoom-in-95
            duration-200
          "
        >
          {/* ==========================================
              HEADER
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
                  bg-violet-500/10
                  p-3
                "
              >
                <Eye size={24} className="text-violet-400" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Inspect Report
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Review the report details before taking action.
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
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
                Prompt Preview
            ========================================== */}

          <div
            className="
                grid
                gap-8
                lg:grid-cols-[320px_1fr]
              "
          >
            {/* ================================= */}
            {/* Prompt Image */}
            {/* ================================= */}

            <div className="overflow-hidden rounded-3xl border border-slate-700">
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={
                    report.promptImage ||
                    report.prompt?.image ||
                    "/placeholder.png"
                  }
                  alt={report.promptTitle}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* ================================= */}
            {/* Prompt Information */}
            {/* ================================= */}

            <div className="space-y-6">
              {/* Badges */}

              <div className="flex flex-wrap gap-3">
                <Chip
                  color={getReasonColor(report.reason)}
                  variant="flat"
                  startContent={<AlertTriangle size={14} />}
                >
                  {report.reason}
                </Chip>

                <Chip
                  color={
                    report.status === "approved"
                      ? "success"
                      : report.status === "pending"
                        ? "warning"
                        : "danger"
                  }
                  variant="flat"
                >
                  {report.status?.toUpperCase()}
                </Chip>

                <Chip color="secondary" variant="flat">
                  {report.prompt?.category || report.category || "Unknown"}
                </Chip>

                <Chip color="primary" variant="flat">
                  {report.prompt?.aiToolName || report.aiToolName || "AI Tool"}
                </Chip>

                <Chip color="warning" variant="flat">
                  {report.prompt?.difficultyLevel ||
                    report.difficultyLevel ||
                    "Beginner"}
                </Chip>
              </div>

              {/* Prompt Title */}

              <div>
                <h3 className="text-3xl font-bold text-white leading-tight">
                  {report.promptTitle}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-slate-400">
                  <CalendarDays size={16} />

                  <span className="text-sm">
                    Reported on{" "}
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Prompt Description */}

              <div
                className="
                    rounded-2xl
                    border
                    border-slate-700
                    bg-[#111827]
                    p-6
                  "
              >
                <h4 className="mb-3 text-lg font-semibold text-white">
                  Prompt Description
                </h4>

                <p className="leading-8 text-slate-300">
                  {report.prompt?.fullDescription ||
                    report.fullDescription ||
                    "No description available."}
                </p>
              </div>
            </div>
          </div>

          {/* ==========================================
                Creator + Reporter
            ========================================== */}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* ================================= */}
            {/* Creator Information */}
            {/* ================================= */}

            <div
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
                    Original author of this prompt
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Avatar
                  src={report.creator?.image}
                  name={report.creator?.name}
                  size="lg"
                  className="h-16 w-16"
                />

                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-white">
                    {report.creator?.name}
                  </h4>

                  <p className="text-sm text-slate-400">
                    {report.creator?.email}
                  </p>

                  <Chip size="sm" color="secondary" variant="flat">
                    Creator
                  </Chip>
                </div>
              </div>
            </div>

            {/* ================================= */}
            {/* Reporter Information */}
            {/* ================================= */}

            <div
              className="
                  rounded-2xl
                  border
                  border-slate-700
                  bg-[#111827]
                  p-6
                "
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-red-500/10 p-3">
                  <Shield size={22} className="text-red-400" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Reported By</h3>

                  <p className="text-sm text-slate-400">
                    Community member who submitted this report
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Avatar
                  src={report.reporter?.image}
                  name={report.reporter?.name}
                  size="lg"
                  className="h-16 w-16"
                />

                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-white">
                    {report.reporter?.name}
                  </h4>

                  <p className="text-sm text-slate-400">
                    {report.reporter?.email}
                  </p>

                  <Chip size="sm" color="danger" variant="flat">
                    Reporter
                  </Chip>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
                Report Description
            ========================================== */}

          <div
            className="
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/5
                p-6
              "
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-red-500/10 p-3">
                <AlertTriangle size={22} className="text-red-400" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Report Description
                </h3>

                <p className="text-sm text-slate-400">
                  Details submitted by the reporter
                </p>
              </div>
            </div>

            <div
              className="
                  rounded-xl
                  border
                  border-slate-700
                  bg-[#0F172A]
                  p-5
                "
            >
              <p className="leading-8 text-slate-300">{report.description}</p>
            </div>
          </div>

          <div className="space-y-8 p-8">
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
              {/* Close */}

              <Button
                variant="bordered"
                onPress={handleClose}
                className="
                  rounded-xl
                  border-slate-600
                  bg-[#1E293B]
                  px-6
                  text-white
                  transition-all
                  hover:bg-slate-700
                "
              >
                Close
              </Button>

              {/* Inspect */}

              <Button
                color="secondary"
                startContent={<Eye size={18} />}
                className="
                  rounded-xl
                  bg-linear-to-r
                  from-violet-600
                  to-purple-600
                  px-6
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  hover:scale-[1.02]
                "
              >
                Inspection Completed
              </Button>
            </div>

            {/* ==========================================
              BODY END
          ========================================== */}
          </div>
        </div>
      </div>
    </>
  );
}
