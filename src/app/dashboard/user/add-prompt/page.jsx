import AddPromptForm from "@/components/creator/AddPromptForm";
import { getPlanById } from "@/lib/api/plans";
import { getPromptCountByUser } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUserSession();
  if (!user) {
    redirect("/signin");
  }

  const plan = await getPlanById(user?.plan || "free");
  console.log(plan);

  const promptCount = await getPromptCountByUser(user.id);
  console.log("PromptCount:", promptCount);

  return (
    <AddPromptForm user={user} promptCount={promptCount.count} plan={plan} />
  );
}
