"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { deleteReport } from "@/lib/api/reports";
import { dismissReport } from "@/lib/api/reports";
import { Button } from "@heroui/react";

import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Eye,
  ShieldAlert,
  Trash2,
  UserCircle,
} from "lucide-react";

import WarnCreatorModal from "./ReportActions/WarnCreatorModal";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReportCard({ report, onUpdated }) {
  const [dismissLoading, setDismissLoading] = useState(false);
  const [warnOpen, setWarnOpen] = useState(false);

  const router = useRouter();

  const handleRemove = async () => {
    try {
      const result = await deleteReport(report._id);

      if (!result.success) {
        toast.error(result.message);

        return;
      }

      toast.success(result.message);

      setTimeout(() => {
        onUpdated?.(report._id);
        router.window.reload();
      }, 500);
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete report.");
    }
  };

  const handleDismiss = async () => {
    try {
      setDismissLoading(true);

      const result = await dismissReport(report._id);

      if (!result.success) {
        toast.error(result.message || "Failed to dismiss report.");
        return;
      }

      toast.success("Report dismissed successfully.");

      // Card remove from UI
      onUpdated?.(report._id);
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong.");
    } finally {
      setDismissLoading(false);
    }
  };

  const getReasonColor = (reason) => {
    switch (reason?.toLowerCase()) {
      case "spam":
        return "danger";

      case "copyright":
        return "warning";

      case "abusive content":
        return "secondary";

      case "misleading":
        return "primary";

      default:
        return "default";
    }
  };

  return (
    <>
      <Toaster></Toaster>
      <div
        className="
          rounded-3xl
          border
          border-default-100
          bg-[#131C33]
          shadow-lg
          transition-all
          duration-300
          hover:border-violet-500/20
          hover:shadow-2xl
        "
      >
        {/* ================================= */}
        {/* Header */}
        {/* ================================= */}

        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col">
            <div className="flex w-68 items-center text-sm text-red-500 gap-2 border font-bold border-red-600 px-4 py-1 rounded-full bg-[#5b222d]">
              <h2>
                <AlertTriangle size={14} />
              </h2>{" "}
              <h2 className="">REASON : {report.reason.toUpperCase()}</h2>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">
              Prompt: {report.promptTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <CalendarDays size={16} />

            <span className="text-lg">
              Reported on {new Date(report.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* ================================= */}
        {/* Report Details */}
        {/* ================================= */}

        <div className="px-6 pb-7">
          <div
            className="
              rounded-lg
              border
              border-slate-700
              bg-default-50/30
              px-5
              py-3
              flex
              gap-3
              items-center
            "
          >
            <p className="font-semibold text-slate-300">Report Details :</p>

            <p className=" leading-7 text-slate-300">{report.description}</p>
          </div>
        </div>

        {/* ================================= */}
        {/* Footer */}
        {/* ================================= */}

        <div
          className="
            flex
            flex-col
            gap-5
            border-t
            border-slate-700
            px-6
            py-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Reporter */}

          <div className="">
            <div className="flex items-center text-slate-400 gap-3">
              <UserCircle></UserCircle>
              <p className="text-lg font-medium ">Reported by:</p>

              <p className="font-semibold">
                {report.reporter?.name || "Unknown"}
              </p>
            </div>
          </div>

          {/* Actions */}

          <div className="flex flex-wrap items-center justify-end gap-3">
            <Link
              href={`/prompts/${report.promptId}?returnTo=${encodeURIComponent(
                "/dashboard/admin/reported-prompts",
              )}`}
            >
              <Button
                variant="bordered"
                className="
        h-11
        rounded-xl
        border
        border-slate-700
        bg-slate-900/60
        text-slate-200
        hover:bg-slate-800
        hover:border-slate-500
        transition-all
        flex items-center gap-2
      px-2.5
      "
              >
                <Eye size={16} />
                Inspect
              </Button>
            </Link>

            {/* <Button
              onPress={() => setDismissOpen(true)}
              className="
      h-11
      rounded-xl
      border
      border-emerald-600/40
      bg-emerald-500/10
      text-emerald-400
      hover:bg-emerald-500/20
      hover:border-emerald-500
      transition-all
      flex items-center gap-2
      px-2.5
    "
            >
              <CheckCircle2 size={16} />
              Dismiss
            </Button> */}

            <Button
              isLoading={dismissLoading}
              isDisabled={dismissLoading}
              onPress={handleDismiss}
              className="
    h-11
    rounded-xl
    border
    border-emerald-600/40
    bg-emerald-500/10
    text-emerald-400
    hover:bg-emerald-500/20
    hover:border-emerald-500
    transition-all
    flex items-center gap-2
    px-2.5
  "
            >
              <CheckCircle2 size={16} />
              Dismiss
            </Button>

            <Button
              onPress={() => setWarnOpen(true)}
              className="
      h-11
      rounded-xl
      border
      border-amber-500/40
      bg-amber-500/10
      text-amber-400
      hover:bg-amber-500/20
      hover:border-amber-400
      transition-all
      flex items-center gap-2
      px-2.5
    "
            >
              <ShieldAlert size={16} />
              Warn Creator
            </Button>

            <Button
              onPress={handleRemove}
              className="
      h-11
      rounded-xl
      border
      border-red-500/40
      bg-red-500/10
      text-red-400
      hover:bg-red-500/20
      hover:border-red-400
      transition-all
      flex items-center gap-2
      px-2.5
    "
            >
              <Trash2 size={16} />
              Remove Prompt
            </Button>
          </div>
        </div>
      </div>

      {warnOpen && (
        <WarnCreatorModal
          report={report}
          onClose={() => setWarnOpen(false)}
          onUpdated={() => {
            setWarnOpen(false);
            onUpdated?.(report._id);
          }}
        />
      )}
    </>
  );
}
