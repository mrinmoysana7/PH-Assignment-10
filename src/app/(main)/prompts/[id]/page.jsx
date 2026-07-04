import { getPromptsById } from "@/lib/api/prompts";
import PromptDetailsClient from "@/components/prompts/PromptDetailsClient";
import { getUserSession } from "@/lib/core/session";

export default async function PromptDetailsPage({ params }) {
  const { id } = await params;

  const prompt = await getPromptsById(id);

  const user = await getUserSession();

  if (!prompt) {
    return <div className="p-20 text-center">Prompt not found</div>;
  }

  return <PromptDetailsClient prompt={prompt} user={user} />;
}
