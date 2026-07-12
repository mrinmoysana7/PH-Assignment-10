import { serverFetch, serverMutation } from "@/lib/core/server";

export const getAllPrompts = () => serverFetch("/api/admin/prompts");

export const approvePrompt = (id) =>
  serverMutation(`/api/admin/prompts/${id}/approve`, {}, "PATCH");

export const rejectPrompt = (id, feedback) =>
  serverMutation(`/api/admin/prompts/${id}/reject`, { feedback }, "PATCH");

export const featurePrompt = (id, featured) =>
  serverMutation(`/api/admin/prompts/${id}/feature`, { featured }, "PATCH");

export const deletePromptByAdmin = (id) =>
  serverMutation(`/api/admin/prompts/${id}`, {}, "DELETE");
