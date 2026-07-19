// import { serverFetch } from "../core/server";

import { apiGet } from "../core/fetch";

// export const getProfile = async (userId) => {
//   const data = await serverFetch(`/api/profile/${userId}`);

//   console.log("Profile API Response:", data);

//   return data.profile;
// };

// import { apiGet } from "../core/fetch";

/* =========================================
   Get User Profile
========================================= */

export const getProfile = async (userId) => {
  const data = await apiGet(`/api/profile/${userId}`);

  return data.profile;
};
