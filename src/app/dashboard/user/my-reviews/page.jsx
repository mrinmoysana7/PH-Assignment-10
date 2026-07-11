import MyReviewsTable from "@/components/dashboard/MyReviewsTable";
import { getMyReviews } from "@/lib/api/reviews";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Reviews | PromptVerse",
};

export default async function MyReviewsPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/signin");
  }

  const reviews = await getMyReviews(user.id);

  return (
    <div className="px-6 py-22 sm:py-25 md:py-25 lg:py-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}

      <div className="rounded-3xl border border-slate-800 bg-[#0F172A] p-8 shadow-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              My Product Reviews
            </h1>

            <p className="max-w-2xl mb-3 text-slate-400">
              Feedback and ratings you have posted on the PromptVerse
              marketplace. 
            </p>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 px-6 py-5">
            <p className="text-xs uppercase tracking-widest text-violet-300">
              Total Reviews
            </p>

            <h2 className="mt-2 text-4xl font-bold text-white">
              {reviews.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Table */}

      <MyReviewsTable reviews={reviews} />
    </div>
  );
}
