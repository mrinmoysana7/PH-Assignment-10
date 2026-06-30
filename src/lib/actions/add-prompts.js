import { serverMutation } from "../core/server";

export const addPrompt = async (newPromptData) => {
  return serverMutation("/api/prompts", newPromptData);
};
