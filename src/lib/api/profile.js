import { serverFetch } from "../core/server";

export const getProfile = async (userId) => {
  const data = await serverFetch(`/api/profile/${userId}`);

  console.log("Profile API Response:", data);

  return data.profile;
};
