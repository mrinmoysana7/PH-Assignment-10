export default function AnalyticsCard({
  title,

  value,

  icon,

  color,
}) {
  const colors = {
    violet: {
      bg: "bg-violet-500/10",

      border: "border-violet-500/20",

      text: "text-violet-400",
    },

    cyan: {
      bg: "bg-cyan-500/10",

      border: "border-cyan-500/20",

      text: "text-cyan-400",
    },

    emerald: {
      bg: "bg-emerald-500/10",

      border: "border-emerald-500/20",

      text: "text-emerald-400",
    },
  };

  const theme = colors[color];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-6 shadow-lg">
      <div className="flex items-center gap-4">
        <div
          className={`h-14 w-14 rounded-xl border flex items-center justify-center ${theme.bg} ${theme.border} ${theme.text}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">{value}</h2>
        </div>
      </div>
    </div>
  );
}
