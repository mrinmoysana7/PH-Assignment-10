// import { serverFetch } from "@/lib/core/server";

import { apiGet } from "../core/fetch";

// export const getAdminAnalytics = async () => {
//   const data = await serverFetch("/api/admin/analytics");

//   return data.analytics;
// };

// import { apiGet } from "../core/fetch";

/* =========================================
   Admin Analytics
========================================= */

export const getAdminAnalytics = async () => {
  const data = await apiGet("/api/admin/analytics");

  return data.analytics;
};
