"use client";

import { useState } from "react";
import ReportCard from "./ReportCard";



export default function ReportedPromptsList({ reports }) {
  const [items, setItems] = useState(reports);

  const handleUpdated = (reportId) => {
    setItems((prev) => prev.filter((item) => item._id !== reportId));
  };

  if (!items.length) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-default-100
          bg-content1
          p-20
          text-center
        "
      >
        <h2 className="text-2xl font-bold">No Reported Prompts 🎉</h2>

        <p className="mt-3 text-default-500">
          Your community moderation queue is empty.
        </p>
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
