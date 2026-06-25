import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

// export const getPrompts = async () => {
//   return serverFetch("/api/prompts");
// };

export const getPrompts = async () => {
  const data = await serverFetch("/api/prompts");
  return data.prompts;
};
