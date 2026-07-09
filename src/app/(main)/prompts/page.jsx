import { getPrompts } from "@/lib/api/prompts";
import PromptsClient from "@/components/prompts/PromptsClient";
import { getUserSession } from "@/lib/core/session";

const PromptsPage = async () => {
  const user = await getUserSession();
  const prompts = await getPrompts();
  return <PromptsClient prompts={prompts} user={user} />;
};

export default PromptsPage;
