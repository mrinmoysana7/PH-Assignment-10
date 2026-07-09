"use client";

export default function ProfileStatsCard({
  icon,
  title,
  value,
  valueClassName = "text-white",
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#111827] p-6 transition-all duration-300 hover:border-violet-500/40 hover:shadow-lg">
      <div className="flex items-center gap-3 text-violet-400">
        {icon}

        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          {title}
        </span>
      </div>

      <h3 className={`mt-5 text-lg md:text-2xl lg:text-3xl font-bold ${valueClassName}`}>{value}</h3>
    </div>
  );
}
