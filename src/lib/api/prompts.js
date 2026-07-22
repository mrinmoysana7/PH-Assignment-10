import { apiGet, apiRequest } from "../core/fetch";

/* =========================================
   Featured Prompts
========================================= */

export const getFeaturedPrompts = async () => {
  const data = await apiGet("/api/prompts/featured");

  return data.prompts || [];
};

/* =========================================
   Get All Prompts
========================================= */

export const getPrompts = async () => {
  const data = await apiGet("/api/prompts");

  return data.prompts || [];
};

/* =========================================
   Get Prompt Details
========================================= */

// export const getPromptsById = async (promptId) => {
//   return apiGet(`/api/prompts/${promptId}`);
// };

export const getPromptsById = async (promptId) => {
  const data = await apiGet(`/api/prompts/${promptId}`);

  return data.prompt || null;
};

/* =========================================
   Add Prompt
========================================= */

export const addPrompt = async (newPrompt) => {
  return apiRequest("/api/prompts", "POST", newPrompt);
};

/* =========================================
   Update Prompt
========================================= */

export const updatePrompt = async (promptId, updatedPrompt) => {
  return apiRequest(`/api/prompts/${promptId}`, "PATCH", updatedPrompt);
};

/* =========================================
   Delete Prompt
========================================= */

export const deletePrompt = async (promptId, authorId) => {
  return apiRequest(`/api/prompts/${promptId}`, "DELETE", {
    authorId,
  });
};

/* =========================================
   Increment Copy Count
========================================= */

export const incrementCopyCount = async (promptId) => {
  return apiRequest(`/api/prompts/${promptId}/copy`, "POST");
};

/* =========================================
   Prompt Analytics
========================================= */

export const getPromptAnalytics = async (promptId) => {
  return apiGet(`/api/prompts/${promptId}/analytics`);
};

/* =========================================
   Get User Prompts
========================================= */

export const getUserPrompts = async (userId) => {
  const data = await apiGet(`/api/prompts/user/${userId}`);

  return data.prompts || [];
};

/* =========================================
   Pending Prompts
========================================= */

export const getPendingPrompts = async () => {
  const data = await apiGet("/api/prompts/pending");

  return data.prompts || [];
};

/* =========================================
   Approved Prompts
========================================= */

export const getApprovedPrompts = async () => {
  const data = await apiGet("/api/prompts/approved");

  return data.prompts || [];
};

/* =========================================
   Reject Prompt
========================================= */

export const rejectPrompt = async (promptId) => {
  return apiRequest(`/api/prompts/${promptId}/reject`, "PATCH");
};

/* =========================================
   Approve Prompt
========================================= */

export const approvePrompt = async (promptId) => {
  return apiRequest(`/api/prompts/${promptId}/approve`, "PATCH");
};

/* =========================================
   Creator Analytics
========================================= */

export const getCreatorAnalytics = async (userId) => {
  const data = await apiGet(`/api/creator/${userId}/analytics`);

  return data.analytics;
};

/* =========================================
   Prompt Count By User
========================================= */

export const getPromptCountByUser = async (userId) => {
  return apiGet(`/api/prompts/count?userId=${userId}`);
};
