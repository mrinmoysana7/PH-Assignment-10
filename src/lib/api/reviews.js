// import { serverFetch, serverMutation } from "../core/server";

import { apiGet, apiRequest } from "../core/fetch";

// export const getReviews = async (promptId) => {
//   const data = await serverFetch(`/api/prompts/${promptId}/reviews`);

//   return data.reviews || [];
// };

// export const submitReview = async (promptId, reviewData) => {
//   return serverMutation(`/api/prompts/${promptId}/reviews`, reviewData, "POST");
// };

// export const getMyReviews = async (userId) => {
//   const data = await serverFetch(`/api/reviews/user/${userId}`);

//   return data.reviews || [];
// };

// import { apiGet, apiRequest } from "./fetch";

/* =========================================
   Get Reviews for a Prompt
========================================= */

export const getReviews = async (promptId) => {
  const data = await apiGet(`/api/prompts/${promptId}/reviews`);

  return data.reviews || [];
};

/* =========================================
   Submit Review
========================================= */

export const submitReview = async (promptId, reviewData) => {
  return apiRequest(`/api/prompts/${promptId}/reviews`, "POST", reviewData);
};

/* =========================================
   Get My Reviews
========================================= */

export const getMyReviews = async (userId) => {
  const data = await apiGet(`/api/reviews/user/${userId}`);

  return data.reviews || [];
};
