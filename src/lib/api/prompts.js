// // import { serverFetch, serverMutation } from "../core/server";

import { apiGet, apiRequest } from "../core/fetch";

// // const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

// // export const getPrompts = async () => {
// //   return serverFetch("/api/prompts");
// // };

// // export const getPrompts = async () => {
// //   const data = await serverFetch("/api/prompts");
// //   return data.prompts;
// // };

// // export const getFeaturedPrompts = async () => {
// //   const data = await serverFetch("/api/prompts/featured");
// //   return data.prompts;
// // };

// // export const getPromptsById = async (jobId) => {
// //   return serverFetch(`/api/prompts/${jobId}`);
// // };

// // export const getUserPrompts = async (userId) => {
// //   const data = await serverFetch(`/api/prompts/user/${userId}`);

// //   return data.prompts;
// // };

// // export const incrementCopyCount = async (promptId) => {
// //   return serverMutation(`/api/prompts/${promptId}/copy`);
// // };

// const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

// import { serverFetch, serverMutation } from "../core/server";

// // export const getFeaturedPrompts = async () => {
// //   const data = await serverFetch("/api/prompts/featured");
// //   return data.prompts || [];
// // };

// export const getFeaturedPrompts = async () => {
//   const res = await fetch(`${baseUrl}/api/prompts/featured`, {
//     cache: "no-store",
//   });

//   const data = await res.json();

//   return data.prompts ?? [];
// };

// export const getPrompts = async () => {
//   const data = await serverFetch("/api/prompts");
//   return data.prompts || [];
// };

// export const getPromptsById = async (jobId) => {
//   return serverFetch(`/api/prompts/${jobId}`);
// };

// export const addPrompt = async (newPrompt) => {
//   return serverMutation("/api/prompts", newPrompt, "POST");
// };

// // export const updatePrompt = async (promptId, updatedPrompt) => {
// //   return serverMutation(`/api/prompts/${promptId}`, updatedPrompt, "PATCH");
// // };

// export const updatePrompt = async (id, data) => {
//   const res = await fetch(`${baseUrl}/api/prompts/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   return res.json();
// };

// export const deletePrompt = async (promptId, authorId) => {
//   return serverMutation(
//     `/api/prompts/${promptId}`,
//     {
//       authorId,
//     },
//     "DELETE",
//   );
// };

// export const incrementCopyCount = async (promptId) => {
//   return serverMutation(`/api/prompts/${promptId}/copy`);
// };

// export const getPromptAnalytics = async (promptId) => {
//   return serverFetch(`/api/prompts/${promptId}/analytics`);
// };

// export const getUserPrompts = async (userId) => {
//   const data = await serverFetch(`/api/prompts/user/${userId}`);

//   return data.prompts;
// };

// export const getPendingPrompts = async () => {
//   const data = await serverFetch("/api/prompts/pending");

//   return data.prompts || [];
// };

// export const getApprovedPrompts = async () => {
//   const data = await serverFetch("/api/prompts/approved");

//   return data.prompts || [];
// };

// export const rejectPrompt = async (promptId) => {
//   return serverMutation(`/api/prompts/${promptId}/reject`, {}, "PATCH");
// };

// export const approvePrompt = async (promptId) => {
//   return serverMutation(`/api/prompts/${promptId}/approve`, {}, "PATCH");
// };

// export const getCreatorAnalytics = async (userId) => {
//   const data = await serverFetch(`/api/creator/${userId}/analytics`);

//   return data.analytics;
// };

// export const getPromptCountByUser = async (userId) => {
//   return serverFetch(`/api/prompts/count?userId=${userId}`);
// };

// import { apiGet, apiRequest } from "../core/fetch";

// import { apiGet, apiRequest } from "./fetch";

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

export const getPromptsById = async (promptId) => {
  return apiGet(`/api/prompts/${promptId}`);
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
