"use client";

export default function AnalyticsCard({ title, value, icon: Icon, color }) {
  const colors = {
    violet: " text-violet-400",

    sky: " text-sky-400",

    emerald: " text-emerald-400",

    amber: " text-amber-400",

    rose: "text-rose-400",
  };

  return (
    <div
      className="
      rounded-3xl
      bg-content1
      p-7
      shadow-lg
      transition-all
      hover:-translate-y-1
      hover:shadow-xl
    "
    >
      <div className="flex items-center gap-5">
        <div
          className={`
            flex
            fllex-wrap
            
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
