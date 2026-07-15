import CreatorAnalyticsCards from "@/components/creator/CreatorAnalyticsCards";
import CreatorCopiesChart from "@/components/creator/CreatorCopiesChart";
import CreatorGrowthChart from "@/components/creator/CreatorGrowthChart";
import DashboardHeader from "@/components/creator/DashboardHeader";
import { getCreatorAnalytics } from "@/lib/api/prompts";
import Image from "next/image";
import Link from "next/link";

import { getUserSession } from "@/lib/core/session";

export default async function CreatorDashboardPage() {
  const user = await getUserSession();

  const analytics = await getCreatorAnalytics(user.id);

  const prompts = analytics.prompts;

  const totalPrompts = prompts.length;

  const totalCopies = prompts.reduce(
    (sum, item) => sum + (item.copyCount || 0),
    0,
  );

  const totalBookmarks = prompts.reduce(
    (sum, item) => sum + (item.bookmarkCount || 0),
    0,
  );

  if (!prompts.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-700 bg-[#0F172A] py-28 text-center">
        <Image
          height={200}
          width={200}
          alt="image"
          src="/empty.svg"
          className="mx-auto w-44"
        />

        <h2 className="mt-6 text-3xl font-bold text-white">
          No Prompt Created Yet
        </h2>

        <p className="mt-3 text-slate-400">
          Create your first prompt to start tracking analytics.
        </p>

        <Link
          href="/dashboard/creator/add-prompt"
          className="mt-8 inline-flex rounded-xl bg-violet-600 px-8 py-3 text-white"
        >
          Create Prompt
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:px-12 lg:px-10 xl:px-0 py-22 lg:py-10">
      <DashboardHeader />

      <CreatorAnalyticsCards
        analytics={analytics}
        totalPrompts={totalPrompts}
        totalCopies={totalCopies}
        totalBookmarks={totalBookmarks}
      />

      <CreatorCopiesChart prompts={prompts} />

      <CreatorGrowthChart prompts={prompts} />
    </div>
  );
}
