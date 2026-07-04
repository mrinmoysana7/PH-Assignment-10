import { serverMutation } from "../core/server";

// Toggle bookmark
export const toggleBookmark = async (userId, promptId) => {
  return serverMutation("/api/bookmarks/toggle", {
    userId,
    promptId,
  });
};
