"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { deleteReport, dismissReport } from "@/lib/api/reports";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Eye,
  ShieldAlert,
  Trash2,
  User,
  Info,
} from "lucide-react";

import WarnCreatorModal from "./ReportActions/WarnCreatorModal";

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
        router.refresh();
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
      onUpdated?.(report._id);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setDismissLoading(false);
    }
  };

  // Keep colors strictly tailored to the deep blue theme
  const getReasonConfig = (reason) => {
    const r = reason?.toLowerCase() || "";
    if (r.includes("fake") || r.includes("misleading")) {
      return {
        bg: "bg-[#5b222d]",
        border: "border-red-500/50",
        text: "text-red-400",
        icon: <Info size={14} />,
      };
    }
    if (r.includes("copyright")) {
      return {
        bg: "bg-amber-950/40",
        border: "border-amber-500/50",
        text: "text-amber-400",
        icon: <ShieldAlert size={14} />,
      };
    }
    return {
      bg: "bg-red-950/40",
      border: "border-red-500/50",
      text: "text-red-400",
      icon: <AlertTriangle size={14} />,
    };
  };

  const config = getReasonConfig(report.reason);

  return (
    <>
      <Toaster />
      <div className="flex flex-col rounded-3xl border border-white/5 bg-[#131C33] shadow-lg transition-all duration-300 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-900/20 overflow-hidden">
        {/* ================================= */}
        {/* Header Section */}
        {/* ================================= */}
        <div className="p-6 md:p-8 pb-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col">
              <div
                className={`inline-flex w-max items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${config.bg} ${config.border} ${config.text}`}
              >
                {config.icon}
                <span>Reason: {report.reason}</span>
              </div>

              <h2 className="mt-5 text-2xl md:text-3xl font-bold text-white leading-tight">
                Prompt: {report.promptTitle}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-slate-400 mt-2 md:mt-0">
              <CalendarDays size={16} />
              <span>
                Reported on{" "}
                {new Date(report.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* Report Details Inset Box */}
        {/* ================================= */}
        <div className="px-6 md:px-8 py-6">
          <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#0B1221]/50 p-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Report Details
            </p>
            <p className="text-sm md:text-base leading-relaxed text-slate-200">
              {report.description ||
                "No additional details provided by the user."}
            </p>
          </div>
        </div>

        {/* ================================= */}
        {/* Footer: User & Actions */}
        {/* ================================= */}
        <div className="flex flex-col gap-5 border-t border-white/5 bg-[#0B1221]/30 p-6 md:px-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Reporter Info */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400">
              <User size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Reported by
              </p>
              <p className="text-sm font-bold text-slate-200">
                {report.reporter?.name || "Unknown"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <Link
              href={`/prompts/${report.promptId}?returnTo=${encodeURIComponent(
                "/dashboard/admin/reported-prompts",
              )}`}
              className="flex-1 sm:flex-none"
            >
              <Button
                variant="bordered"
                className="w-full h-11 px-4 rounded-xl border border-white/20 bg-transparent text-slate-300 font-medium hover:bg-white/5 hover:text-white transition-all"
                startContent={<Eye size={16} />}
              >
                Inspect
              </Button>
            </Link>

            <Button
              isLoading={dismissLoading}
              isDisabled={dismissLoading}
              onPress={handleDismiss}
              className="flex-1 sm:flex-none h-11 px-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
              startContent={!dismissLoading && <CheckCircle2 size={16} />}
            >
              Dismiss
            </Button>

            <Button
              onPress={() => setWarnOpen(true)}
              className="flex-1 sm:flex-none h-11 px-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 font-medium hover:bg-amber-500/20 hover:border-amber-500/50 transition-all"
              startContent={<ShieldAlert size={16} />}
            >
              Warn
            </Button>

            <Button
              onPress={handleRemove}
              className="flex-1 sm:flex-none h-11 px-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20 hover:border-red-500/50 transition-all"
              startContent={<Trash2 size={16} />}
            >
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
