"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { TrendingUp } from "lucide-react";

export default function CreatorGrowthChart({ prompts }) {
  let totalPrompts = 0;
  let totalCopies = 0;

  const sortedPrompts = [...prompts].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );

  const chartData = sortedPrompts.map((prompt) => {
    totalPrompts += 1;

    totalCopies += prompt.copyCount || 0;

    return {
      date: new Date(prompt.createdAt).toLocaleDateString("en-CA"),

      TotalPrompts: totalPrompts,

      TotalCopies: totalCopies,
    };
  });

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6 shadow-xl">
      <div className="mb-8 flex items-center gap-3">
        <TrendingUp size={20} className="text-white" />

        <h2 className="text-xl font-bold text-white">
          Accumulative Growth Metrics
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="copies" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.6} />

              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="prompts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.6} />

              <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#1E293B" strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
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

          <Area
            type="monotone"
            dataKey="TotalCopies"
            stroke="#06B6D4"
            fill="url(#copies)"
            strokeWidth={3}
          />

          <Area
            type="monotone"
            dataKey="TotalPrompts"
            stroke="#7C3AED"
            fill="url(#prompts)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
