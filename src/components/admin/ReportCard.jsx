"use client";

import { useState } from "react";

import { Avatar, Button, Chip } from "@heroui/react";

import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Eye,
  ShieldAlert,
  Trash2,
  User,
} from "lucide-react";

import InspectReportModal from "./ReportActions/InspectReportModal";
import WarnCreatorModal from "./ReportActions/WarnCreatorModal";
import DismissReportModal from "./ReportActions/DismissReportModal";
import RemovePromptModal from "./ReportActions/RemovePromptModal";


export default function ReportCard({ report, onUpdated }) {
  const [inspectOpen, setInspectOpen] = useState(false);

  const [warnOpen, setWarnOpen] = useState(false);

  const [dismissOpen, setDismissOpen] = useState(false);

  const [removeOpen, setRemoveOpen] = useState(false);

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
      <div
        className="
          rounded-3xl
          border
          border-default-100
          bg-content1
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

        <div className="flex flex-col gap-4 border-b border-default-100 p-6 md:flex-row md:items-start md:justify-between">
          <div>
            <Chip
              size="sm"
              color={getReasonColor(report.reason)}
              variant="flat"
              startContent={<AlertTriangle size={14} />}
              className="font-semibold"
            >
              REASON : {report.reason}
            </Chip>

            <h2 className="mt-4 text-2xl font-bold text-white">
              Prompt: {report.promptTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-default-500">
            <CalendarDays size={16} />

            <span className="text-sm">
              Reported on {new Date(report.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* ================================= */}
        {/* Report Details */}
        {/* ================================= */}

        <div className="p-6">
          <div
            className="
              rounded-2xl
              border
              border-default-100
              bg-default-50/30
              p-5
            "
          >
            <p className="font-semibold text-default-400">Report Details :</p>

            <p className="mt-2 leading-7 text-default-300">
              {report.description}
            </p>
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
            border-default-100
            px-6
            py-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Reporter */}

          <div className="flex items-center gap-3">
            <Avatar
              src={report.reporter?.image}
              name={report.reporter?.name}
              size="md"
            />

            <div>
              <p className="text-sm font-medium text-default-500">
                Reported by
              </p>

              <p className="font-semibold text-white">
                {report.reporter?.name || "Unknown"}
              </p>
            </div>
          </div>

          {/* Actions */}

          <div className="flex flex-wrap justify-end gap-3">
            <Button
              variant="bordered"
              startContent={<Eye size={16} />}
              onPress={() => setInspectOpen(true)}
              className="
                rounded-xl
                border-default-200
              "
            >
              Inspect
            </Button>

            <Button
              color="success"
              variant="flat"
              startContent={<CheckCircle2 size={16} />}
              onPress={() => setDismissOpen(true)}
              className="rounded-xl"
            >
              Dismiss
            </Button>

            <Button
              color="warning"
              variant="flat"
              startContent={<ShieldAlert size={16} />}
              onPress={() => setWarnOpen(true)}
              className="rounded-xl"
            >
              Warn Creator
            </Button>

            <Button
              color="danger"
              variant="flat"
              startContent={<Trash2 size={16} />}
              onPress={() => setRemoveOpen(true)}
              className="rounded-xl"
            >
              Remove Prompt
            </Button>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* Custom Modals */}
      {/* ================================= */}

      {inspectOpen && (
        <InspectReportModal
          report={report}
          onClose={() => setInspectOpen(false)}
        />
      )}

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

      {dismissOpen && (
        <DismissReportModal
          report={report}
          onClose={() => setDismissOpen(false)}
          onUpdated={() => {
            setDismissOpen(false);
            onUpdated?.(report._id);
          }}
        />
      )}

      {removeOpen && (
        <RemovePromptModal
          report={report}
          onClose={() => setRemoveOpen(false)}
          onUpdated={() => {
            setRemoveOpen(false);
            onUpdated?.(report._id);
          }}
        />
      )}
    </>
  );
}
