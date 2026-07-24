import { apiGet, apiRequest } from "../core/fetch";

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

/*
====================================
 Homepage Reviews
====================================
*/

export const getHomepageReviews = async () => {
  const data = await apiGet("/api/reviews/homepage");

  return data.reviews || [];
};
