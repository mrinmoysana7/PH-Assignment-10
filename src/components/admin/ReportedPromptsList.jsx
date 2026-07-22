"use client";

import { useState } from "react";
import ReportCard from "./ReportCard";
import { ShieldCheck } from "lucide-react";

export default function ReportedPromptsList({ reports }) {
  const [items, setItems] = useState(reports);

  const handleUpdated = (reportId) => {
    setItems((prev) => prev.filter((item) => item._id !== reportId));
  };

  if (!items?.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-[#131C33] px-8 py-24 text-center shadow-xl transition-all">
        {/* Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <ShieldCheck size={40} className="text-emerald-400" strokeWidth={2} />
        </div>

        {/* Badge */}
        <div className="mt-8 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
          Moderation Queue
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-3xl font-bold text-white tracking-wide">
          No Reported Prompts
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-lg leading-relaxed text-slate-400">
          Great news! Your moderation queue is completely clear. There are no
          reported prompts waiting for review at the moment.
        </p>

        {/* Footer */}
        <div className="mt-10 rounded-2xl border border-white/5 bg-white/5 px-6 py-4 text-sm text-slate-300">
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
