export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-10 w-72 rounded bg-slate-800" />

      <div className="grid grid-cols-3 gap-6">
        <div className="h-28 rounded-2xl bg-slate-800" />

        <div className="h-28 rounded-2xl bg-slate-800" />

        <div className="h-28 rounded-2xl bg-slate-800" />
      </div>

      <div className="h-105 rounded-2xl bg-slate-800" />

      <div className="h-105 rounded-2xl bg-slate-800" />
    </div>
  );
}
