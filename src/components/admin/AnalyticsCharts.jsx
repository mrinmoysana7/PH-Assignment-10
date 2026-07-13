"use client";

import EngineBarChart from "./EngineBarChart";
import PromptDistributionChart from "./PromptDistributionChart";

export default function AnalyticsCharts({ data }) {
  return (
    <div className="grid gap-8 mt-10 lg:grid-cols-2">
      <EngineBarChart data={data} />

      <PromptDistributionChart data={data} />
    </div>
  );
}
