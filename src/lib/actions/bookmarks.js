// import { serverMutation } from "../core/server";

// // Toggle bookmark
// export const toggleBookmark = async (userId, promptId) => {
//   return serverMutation("/api/bookmarks/toggle", {
//     userId,
//     promptId,
//   });
// };

import { apiRequest } from "../core/fetch";

// Toggle Bookmark
export const toggleBookmark = async (userId, promptId) => {
  return apiRequest("/api/bookmarks/toggle", {
    method: "POST",
    body: {
      userId,
      promptId,
    },
  });
};
