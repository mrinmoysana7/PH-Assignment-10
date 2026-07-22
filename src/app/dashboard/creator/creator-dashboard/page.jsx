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
      <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-white/5 bg-[#131C33] px-6 py-20 md:py-28 text-center shadow-xl transition-all duration-300 hover:border-violet-500/20 hover:shadow-2xl hover:shadow-violet-900/20">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="h-[250px] w-[250px] rounded-full bg-violet-600 blur-[100px]"></div>
        </div>

        {/* Image Container with inner styling */}
        <div className="relative z-10 mb-8 flex h-40 w-40 md:h-48 md:w-48 items-center justify-center rounded-full border border-white/10 bg-[#0B1221]/50 shadow-[0_0_40px_rgba(139,92,246,0.15)]">
          <Image
            height={200}
            width={200}
            alt="No Prompts Empty State"
            src="/empty.svg"
            className="w-28 md:w-36 drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>

        {/* Typography */}
        <div className="relative z-10 max-w-md px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-white">
            No Prompts Created Yet
          </h2>

          <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-400">
            Your portfolio is currently empty. Create your first prompt to start
            tracking analytics and engaging with the community.
          </p>
        </div>

        {/* Premium Action Button */}
        <Link
          href="/dashboard/creator/add-prompt"
          className="relative z-10 mt-10 inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-violet-900/40 transition-all duration-300 hover:scale-[1.02] hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-600/50 active:scale-95"
        >
          Create Your First Prompt
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
