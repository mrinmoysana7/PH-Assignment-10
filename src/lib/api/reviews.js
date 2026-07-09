import { serverFetch, serverMutation } from "../core/server";

// export function getReviews(promptId) {
//   return serverFetch(`/api/prompts/${promptId}/reviews`);
// }

export const getReviews = async (promptId) => {
  const data = await serverFetch(`/api/prompts/${promptId}/reviews`);

  return data.reviews || [];
};

export const submitReview = async (promptId, reviewData) => {
  return serverMutation(`/api/prompts/${promptId}/reviews`, reviewData, "POST");
};
