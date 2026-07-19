// import { serverMutation } from "../core/server";

// import { apiRequest } from "../core/fetch";

// export const addPrompt = async (newPromptData) => {
//   return serverMutation("/api/prompts", newPromptData);
// };

import { apiRequest } from "../core/fetch";

export const addPrompt = async (newPromptData) => {
  return apiRequest("/api/prompts", {
    method: "POST",
    body: newPromptData,
  });
};
