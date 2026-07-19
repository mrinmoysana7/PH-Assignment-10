// import { serverMutation } from "../core/server";

// export const createSubscription = async (subInfo) => {
//   return serverMutation("/api/subscriptions", subInfo);
// };

import { apiRequest } from "../core/fetch";

export const createSubscription = async (subInfo) => {
  return apiRequest("/api/subscriptions", {
    method: "POST",
    body: subInfo,
  });
};
