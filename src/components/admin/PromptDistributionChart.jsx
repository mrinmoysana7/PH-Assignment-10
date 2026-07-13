"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#7C3AED",

  "#22D3EE",

  "#10B981",

  "#F59E0B",

  "#F43F5E",

  "#3B82F6",
];

export default function PromptDistributionChart({ data }) {
  return (
    <div
      className="
rounded-3xl
shadow-lg
hover:shadow-xl
bg-content1
transition-all
p-8

"
    >
      <h2 className="mb-8 text-2xl font-bold">Prompt Distribution Share</h2>

      <div className="h-90">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="prompts"
              nameKey="engine"
              innerRadius={75}
              outerRadius={110}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
