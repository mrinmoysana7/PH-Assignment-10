import { serverFetch } from "../core/server";

// Check bookmark status
export const checkBookmarkStatus = async (userId, promptId) => {
  const data = await serverFetch(`/api/bookmarks/${userId}/${promptId}`);

  return data;
};
