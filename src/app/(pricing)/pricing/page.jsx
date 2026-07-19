import PricingClient from "@/components/pricing/PricingClient";
import { getUserSession } from "@/lib/core/session";
import { getPlanById } from "@/lib/api/plans";
import { redirect } from "next/navigation";

export default async function PricingPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/signin");
  }

  const plan = await getPlanById("AI_Prompt_PRO_Access");

  return <PricingClient user={user} plan={plan} />;
}
