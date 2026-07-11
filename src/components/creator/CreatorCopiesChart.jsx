"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import { Copy } from "lucide-react";

export default function CreatorCopiesChart({ prompts }) {
  const chartData = prompts.map((prompt) => ({
    name:
      prompt.promptTitle.length > 18
        ? `${prompt.promptTitle.slice(0, 18)}...`
        : prompt.promptTitle,

    Copies: prompt.copyCount || 0,

    Bookmarks: prompt.bookmarkCount || 0,
  }));

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6 shadow-xl">
      <div className="mb-8 flex items-center gap-3">
        <Copy className="text-white" size={20} />

        <h2 className="text-xl font-bold text-white">
          Prompt Templates Copies vs Bookmarks
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />

          <XAxis
            dataKey="name"
            tick={{
              fill: "#94A3B8",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: "#94A3B8",
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "#0F172A",
              border: "1px solid #334155",
              borderRadius: 12,
            }}
            labelStyle={{
              color: "#fff",
            }}
          />

          <Legend />

          <Bar dataKey="Copies" fill="#06B6D4" radius={[8, 8, 0, 0]} />

          <Bar dataKey="Bookmarks" fill="#7C3AED" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
