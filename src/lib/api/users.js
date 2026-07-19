import { apiRequest } from "../core/fetch";
import { apiGet } from "../core/fetch";

export const getAllUsers = async () => {
  const data = await apiGet("/api/admin/users");

  return data.users || [];
};

export const updateUserRole = async (userId, role) => {
  return apiRequest(`/api/admin/users/${userId}/role`, "PATCH", { role });
};

export const deleteUser = async (userId) => {
  return apiRequest(`/api/admin/users/${userId}`, "DELETE");
};

export const getTopCreators = async () => {
  return apiGet("/api/users/top-creators");
};
