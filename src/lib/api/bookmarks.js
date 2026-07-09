// import { serverFetch } from "../core/server";

// // Check bookmark status
// export const checkBookmarkStatus = async (userId, promptId) => {
//   const data = await serverFetch(`/api/bookmarks/${userId}/${promptId}`);

//   return data;
// };

import { serverFetch, serverMutation } from "../core/server";

// ===================================
// Check Bookmark Status
// ===================================

export const checkBookmarkStatus = async (userId, promptId) => {
  return serverFetch(`/api/bookmarks/${userId}/${promptId}`);
};

// ===================================
// Toggle Bookmark
// ===================================

export const toggleBookmark = async (data) => {
  return serverMutation("/api/bookmarks/toggle", data, "POST");
};

// ===================================
// Get All Saved Prompts
// ===================================

export const getSavedPrompts = async (userId) => {
  const data = await serverFetch(`/api/bookmarks/user/${userId}`);

  return data.prompts || [];
};

// ===================================
// Remove Bookmark
// ===================================

export const removeBookmark = async (data) => {
  return serverMutation("/api/bookmarks/remove", data, "DELETE");
};
