const stats = [
  ["50K+", "Active Creators"],
  ["100K+", "Prompts Shared"],
  ["1M+", "Tasks Automated"],
  ["4.9/5", "User Rating"],
];

export default function HeroStats() {
  return (
    <div className="mx-auto mt-20 max-w-6xl rounded-[36px] border border-gray-200 bg-white p-10 shadow-xl">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
        {stats.map(([value, label]) => (
          <div key={label}>
            <h3 className="text-5xl font-bold">{value}</h3>

            <p className="mt-2 text-gray-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
