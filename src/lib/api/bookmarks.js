// // import { serverFetch } from "../core/server";

import { apiGet, apiRequest } from "../core/fetch";

// // // Check bookmark status
// // export const checkBookmarkStatus = async (userId, promptId) => {
// //   const data = await serverFetch(`/api/bookmarks/${userId}/${promptId}`);

// //   return data;
// // };

// import { serverFetch, serverMutation } from "../core/server";

// export const checkBookmarkStatus = async (userId, promptId) => {
//   return serverFetch(`/api/bookmarks/${userId}/${promptId}`);
// };

// export const toggleBookmark = async (data) => {
//   return serverMutation("/api/bookmarks/toggle", data, "POST");
// };

// export const getSavedPrompts = async (userId) => {
//   const data = await serverFetch(`/api/bookmarks/user/${userId}`);

//   return data.prompts || [];
// };

// export const removeBookmark = async (data) => {
//   return serverMutation("/api/bookmarks/remove", data, "DELETE");
// };

// import { apiGet, apiRequest } from "./fetch";

/* =========================================
   Check Bookmark Status
========================================= */

export const checkBookmarkStatus = async (userId, promptId) => {
  return apiGet(`/api/bookmarks/${userId}/${promptId}`);
};

/* =========================================
   Toggle Bookmark
========================================= */

export const toggleBookmark = async (data) => {
  return apiRequest("/api/bookmarks/toggle", "POST", data);
};

/* =========================================
   Get Saved Prompts
========================================= */

export const getSavedPrompts = async (userId) => {
  const data = await apiGet(`/api/bookmarks/user/${userId}`);

  return data.prompts || [];
};

/* =========================================
   Remove Bookmark
========================================= */

export const removeBookmark = async (data) => {
  return apiRequest("/api/bookmarks/remove", "DELETE", data);
};
