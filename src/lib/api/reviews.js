import { serverFetch, serverMutation } from "../core/server";

export const getReviews = async (promptId) => {
  const data = await serverFetch(`/api/prompts/${promptId}/reviews`);

  return data.reviews || [];
};

export const submitReview = async (promptId, reviewData) => {
  return serverMutation(`/api/prompts/${promptId}/reviews`, reviewData, "POST");
};

export const getMyReviews = async (userId) => {
  const data = await serverFetch(`/api/reviews/user/${userId}`);

  return data.reviews || [];
};
