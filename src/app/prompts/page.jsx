import { getPrompts } from "@/lib/api/prompts";
import PromptsClient from "@/components/prompts/PromptsClient";

const PromptsPage = async () => {
  const prompts = await getPrompts();
  return <PromptsClient prompts={prompts} />;
};

export default PromptsPage;
