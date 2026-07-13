"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function EngineBarChart({ data }) {
  return (
    <div
      className="
rounded-3xl
border
border-default-100
bg-content1
p-8
"
    >
      <h2 className="mb-8 text-2xl font-bold">
        Engine Prompts Density vs Total Copies
      </h2>

      <div className="h-90">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="engine" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="copies" fill="#22D3EE" radius={[8, 8, 0, 0]} />

            <Bar dataKey="prompts" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
