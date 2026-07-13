"use client";

export default function AnalyticsCard({ title, value, icon: Icon, color }) {
  const colors = {
    violet: "bg-violet-500/10 text-violet-400",

    sky: "bg-sky-500/10 text-sky-400",

    emerald: "bg-emerald-500/10 text-emerald-400",

    amber: "bg-amber-500/10 text-amber-400",

    rose: "bg-rose-500/10 text-rose-400",
  };

  return (
    <div
      className="
      rounded-3xl
      border
      border-default-100
      bg-content1
      p-7
      shadow-md
      transition-all
      hover:-translate-y-1
      hover:shadow-xl
    "
    >
      <div className="flex items-center gap-5">
        <div
          className={`
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            ${colors[color]}
          `}
        >
          <Icon size={30} />
        </div>

        <div>
          <p className="text-sm uppercase text-default-500">{title}</p>

          <h2 className="mt-1 text-4xl font-bold">{value}</h2>
        </div>
      </div>
    </div>
  );
}
