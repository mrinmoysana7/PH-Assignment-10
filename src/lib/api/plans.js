// import { serverFetch } from "../core/server";

import { apiGet } from "../core/fetch";

// export const getPlanById = async (PlanId) => {
//   return serverFetch(`/api/plans?plan_id=${PlanId}`);
// };

// import { apiGet } from "../core/fetch";

/* =========================================
   Get Plan By ID
========================================= */

export const getPlanById = async (planId) => {
  return apiGet(`/api/plans?plan_id=${planId}`);
};
