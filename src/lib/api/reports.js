// import { serverFetch, serverMutation } from "../core/server";

import { apiGet, apiRequest } from "../core/fetch";

// export const submitReport = async (reportData) => {
//   return serverMutation("/api/reports", reportData, "POST");
// };

// export const getReportedPrompts = async () => {
//   const data = await serverFetch("/api/admin/reports");

//   return data.reports;
// };

// export const warnCreator = (reportId, message) => {
//   return serverMutation(
//     `/api/admin/reports/${reportId}/warn`,
//     {
//       message,
//     },
//     "PATCH",
//   );
// };

// export const deleteReport = (reportId) => {
//   return serverMutation(`/api/admin/reports/${reportId}`, {}, "DELETE");
// };

// export const dismissReport = (reportId) => {
//   return serverMutation(`/api/admin/reports/${reportId}/dismiss`, {}, "PATCH");
// };

// import { apiGet, apiRequest } from "./fetch";

/* =========================================
   Submit Report
========================================= */

export const submitReport = async (reportData) => {
  return apiRequest("/api/reports", "POST", reportData);
};

/* =========================================
   Get Reported Prompts (Admin)
========================================= */

export const getReportedPrompts = async () => {
  const data = await apiGet("/api/admin/reports");

  return data.reports || [];
};

/* =========================================
   Warn Creator
========================================= */

export const warnCreator = async (reportId, message) => {
  return apiRequest(`/api/admin/reports/${reportId}/warn`, "PATCH", {
    message,
  });
};

/* =========================================
   Delete Report
========================================= */

export const deleteReport = async (reportId) => {
  return apiRequest(`/api/admin/reports/${reportId}`, "DELETE");
};

/* =========================================
   Dismiss Report
========================================= */

export const dismissReport = async (reportId) => {
  return apiRequest(`/api/admin/reports/${reportId}/dismiss`, "PATCH");
};
