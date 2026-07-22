import Link from "next/link";

import { Plus } from "lucide-react";

import { getUserPrompts } from "@/lib/api/prompts";
import PromptsTable from "@/components/dashboard/PromptsTable";
import { getLoggedInUser } from "@/lib/api/user";
import { CirclePlus } from "@gravity-ui/icons";

export default async function CreatorMyPromptsPage() {
  // Logged-in creator
  const user = await getLoggedInUser();

  if (!user) {
    return (
      <div className="py-20 text-center text-slate-400">
        Please login first.
      </div>
    );
  }

  

  // Creator prompts
  const prompts = await getUserPrompts(user.id);

  const totalPrompts = prompts.length;

  const approvedPrompts = prompts.filter(
    (prompt) => prompt.status === "approved",
  ).length;

  const pendingPrompts = prompts.filter(
    (prompt) => prompt.status === "pending",
  ).length;

  const rejectedPrompts = prompts.filter(
    (prompt) => prompt.status === "rejected",
  ).length;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 md:px-12 lg:px-10 xl:px-0 py-22 lg:py-10">
      {/* Header */}

      <div className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-[#0F172A] p-8 shadow-xl md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">My Prompt Templates</h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Review your prompt templates, monitor approval status, update
            content, and track prompt performance.
          </p>
        </div>

        <Link
          href="/dashboard/creator/add-prompt"
          className="font-semibold flex items-center gap-2 bg-violet-500 px-5 rounded-xl"
        >
          <CirclePlus className="h-13 w-7 text-white"></CirclePlus>
          <span className="text-white md:text-[13px] lg:text-lg">Create New Prompt</span>
        </Link>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-[#14213d] p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Total Prompts
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">{totalPrompts}</h2>
        </div>

        <div className="rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-[#14213d] p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Approved
          </p>

          <h2 className="mt-3 text-4xl font-bold text-emerald-400">
            {approvedPrompts}
          </h2>
        </div>

        <div className="rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-[#14213d] p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-yellow-400">
            Pending
          </p>

          <h2 className="mt-3 text-4xl font-bold text-yellow-400">
            {pendingPrompts}
          </h2>
        </div>

        <div className="rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-[#14213d] p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
            Rejected
          </p>

          <h2 className="mt-3 text-4xl font-bold text-red-400">
            {rejectedPrompts}
          </h2>
        </div>
      </div>

      {/* Table */}

      <PromptsTable prompts={prompts} user={user} dashboardType="creator" />
    </div>
  );
}
