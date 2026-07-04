import { serverFetch, serverMutation } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

// export const getPrompts = async () => {
//   return serverFetch("/api/prompts");
// };

export const getPrompts = async () => {
  const data = await serverFetch("/api/prompts");
  return data.prompts;
};

export const getFeaturedPrompts = async () => {
  const data = await serverFetch("/api/prompts/featured");
  return data.prompts;
};

export const getPromptsById = async (jobId) => {
  return serverFetch(`/api/prompts/${jobId}`);
};

export const getUserPrompts = async (userId) => {
  const data = await serverFetch(`/api/prompts/user/${userId}`);

  return data.prompts;
};

export const incrementCopyCount = async (promptId) => {
  return serverMutation(`/api/prompts/${promptId}/copy`);
};
