import { apiRequest } from "../core/fetch";
import { apiGet } from "../core/fetch";

/* =========================================
   Get All Prompts
========================================= */

export const getAllPrompts = async () => {
  return apiGet("/api/admin/prompts");
};

/* =========================================
   Approve Prompt
========================================= */

export const approvePrompt = async (id) => {
  return apiRequest(`/api/admin/prompts/${id}/approve`, "PATCH");
};

/* =========================================
   Reject Prompt
========================================= */

export const rejectPrompt = async (id, feedback) => {
  return apiRequest(`/api/admin/prompts/${id}/reject`, "PATCH", { feedback });
};

/* =========================================
   Feature Prompt
========================================= */

export const featurePrompt = async (id, featured) => {
  return apiRequest(`/api/admin/prompts/${id}/feature`, "PATCH", { featured });
};

/* =========================================
   Delete Prompt
========================================= */

export const deletePromptByAdmin = async (id) => {
  return apiRequest(`/api/admin/prompts/${id}`, "DELETE");
};
