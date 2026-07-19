// import { serverFetch } from "../core/server";

import { apiGet } from "../core/fetch";

// export const getAllPayments = async () => {
//   return serverFetch("/api/subscriptions");
// };

// import { apiGet } from "./fetch";

/* =========================================
   Get All Payments (Admin)
========================================= */

// export const getAllPayments = async () => {
//   const data = await apiGet("/api/subscriptions");

//   return data.subscriptions || data.payments || data;
// };

// import { apiGet } from "../core/fetch";

export const getAllPayments = async () => {
  return apiGet("/api/subscriptions");
};
