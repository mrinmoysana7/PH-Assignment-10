import { apiRequest } from "../core/fetch";

// Toggle Bookmark
export const toggleBookmark = async (userId, promptId) => {
  return apiRequest("/api/bookmarks/toggle", "POST", {
    userId,
    promptId,
  });
};
