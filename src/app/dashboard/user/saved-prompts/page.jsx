import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

import { getSavedPrompts } from "@/lib/api/bookmarks";

import SavedPromptsGrid from "@/components/prompts/SavedPromptsGrid";
import EmptySavedPrompts from "@/components/prompts/EmptySavedPrompts";

export default async function SavedPromptsPage() {
  // Logged in user
  const user = await getUserSession();
  console.log("Logged User:", user);

  if (!user) {
    redirect("/signin");
  }

  // Fetch bookmarked prompts
  const prompts = await getSavedPrompts(user.id);
  console.log("Saved Prompts =>", prompts);

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-22 lg:py-10 w-full px-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-zinc-900">
          Saved Prompt Templates
        </h1>

        <p className="mt-2 text-zinc-500">
          Browse your bookmarked prompt templates.
        </p>
      </div>

      {/* Empty State */}
      {prompts.length === 0 ? (
        <EmptySavedPrompts />
      ) : (
        <SavedPromptsGrid prompts={prompts} user={user} />
      )}
    </div>
  );
}
