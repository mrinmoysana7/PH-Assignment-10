"use client";

import { useState } from "react";
import ReportCard from "./ReportCard";
import { ShieldCheck } from "lucide-react";

export default function ReportedPromptsList({ reports }) {
  const [items, setItems] = useState(reports);

  const handleUpdated = (reportId) => {
    setItems((prev) => prev.filter((item) => item._id !== reportId));
  };

  if (!items.length) {
    return (
      <div
        className="
    flex
    flex-col
    items-center
    justify-center
    rounded-3xl
    hover:shadow-xl
    bg-content1
    px-8
    py-24
    text-center
    shadow-lg
    transition-all
  "
      >
        {/* Icon */}

        <div
          className="
      flex
      h-20
      w-20
      items-center
      justify-center
      rounded-full
      bg-linear-to-br
      from-emerald-500/20
      to-teal-500/10
      ring-1
      ring-emerald-500/20
    "
        >
          <ShieldCheck
            size={38}
            className="text-emerald-400"
            strokeWidth={2.3}
          />
        </div>

        {/* Badge */}

        <div
          className="
      mt-6
      rounded-full
      border
      border-emerald-500/20
      bg-emerald-500/10
      px-4
      py-1.5
      text-xs
      font-semibold
      uppercase
      tracking-[0.2em]
      text-emerald-400
    "
        >
          Moderation Queue
        </div>

        {/* Heading */}

        <h2 className="mt-6 text-3xl font-bold text-white">
          No Reported Prompts
        </h2>

        {/* Description */}

        <p className="mt-4 max-w-lg leading-7 text-default-500">
          Great news! Your moderation queue is completely clear. There are no
          reported prompts waiting for review at the moment.
        </p>

        {/* Footer */}

        <div
          className="
      mt-8
      rounded-2xl
      border
      border-emerald-500/15
      bg-emerald-500/5
      px-6
      py-4
      text-sm
      text-emerald-300
    "
        >
          🎉 Community guidelines are being followed. Check back later for new
          moderation requests.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((report) => (
        <ReportCard
          key={report._id}
          report={report}
          onUpdated={handleUpdated}
        />
      ))}
    </div>
  );
}
