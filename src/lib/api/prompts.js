// import { serverFetch, serverMutation } from "../core/server";

// const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

// export const getPrompts = async () => {
//   return serverFetch("/api/prompts");
// };

// export const getPrompts = async () => {
//   const data = await serverFetch("/api/prompts");
//   return data.prompts;
// };

// export const getFeaturedPrompts = async () => {
//   const data = await serverFetch("/api/prompts/featured");
//   return data.prompts;
// };

// export const getPromptsById = async (jobId) => {
//   return serverFetch(`/api/prompts/${jobId}`);
// };

// export const getUserPrompts = async (userId) => {
//   const data = await serverFetch(`/api/prompts/user/${userId}`);

//   return data.prompts;
// };

// export const incrementCopyCount = async (promptId) => {
//   return serverMutation(`/api/prompts/${promptId}/copy`);
// };

import { serverFetch, serverMutation } from "../core/server";

/* ==========================================
   Get Featured Prompts
========================================== */

export const getFeaturedPrompts = async () => {
  const data = await serverFetch("/api/prompts/featured");
  return data.prompts || [];
};

/* ==========================================
   Get All Prompts
========================================== */

export const getPrompts = async () => {
  const data = await serverFetch("/api/prompts");
  return data.prompts || [];
};

// export const getPrompts = async () => {
//     return serverFetch("/api/prompts");
//  };

/* ==========================================
   Get Prompt By ID
========================================== */

export const getPromptsById = async (jobId) => {
  return serverFetch(`/api/prompts/${jobId}`);
};

/* ==========================================
   Add Prompt
========================================== */

export const addPrompt = async (newPrompt) => {
  return serverMutation("/api/prompts", newPrompt, "POST");
};

/* ==========================================
   Update Prompt
========================================== */

export const updatePrompt = async (promptId, updatedPrompt) => {
  return serverMutation(`/api/prompts/${promptId}`, updatedPrompt, "PATCH");
};

/* ==========================================
   Delete Prompt
========================================== */

export const deletePrompt = async (promptId, authorId) => {
  return serverMutation(
    `/api/prompts/${promptId}`,
    {
      authorId,
    },
    "DELETE",
  );
};

/* ==========================================
   Copy Prompt
========================================== */

export const incrementCopyCount = async (promptId) => {
  return serverMutation(`/api/prompts/${promptId}/copy`);
};

/* ==========================================
   Prompt Analytics
========================================== */

export const getPromptAnalytics = async (promptId) => {
  return serverFetch(`/api/prompts/${promptId}/analytics`);
};

/* ==========================================
   My Prompts
========================================== */

export const getUserPrompts = async (userId) => {
  const data = await serverFetch(`/api/prompts/user/${userId}`);

  return data.prompts;
};

/* ==========================================
   Pending Prompts
========================================== */

export const getPendingPrompts = async () => {
  const data = await serverFetch("/api/prompts/pending");

  return data.prompts || [];
};

/* ==========================================
   Approved Prompts
========================================== */

export const getApprovedPrompts = async () => {
  const data = await serverFetch("/api/prompts/approved");

  return data.prompts || [];
};

/* ==========================================
   Reject Prompt
========================================== */

export const rejectPrompt = async (promptId) => {
  return serverMutation(`/api/prompts/${promptId}/reject`, {}, "PATCH");
};

/* ==========================================
   Approve Prompt
========================================== */

export const approvePrompt = async (promptId) => {
  return serverMutation(`/api/prompts/${promptId}/approve`, {}, "PATCH");
};
