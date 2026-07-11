import { serverFetch, serverMutation } from "../core/server";

export const getAllUsers = async () => {
  const data = await serverFetch("/api/admin/users");

  return data.users || [];
};

export const updateUserRole = async (userId, role) => {
  console.log("Sending Role:", role);

  return await serverMutation(
    `/api/admin/users/${userId}/role`,
    {
      role,
    },
    "PATCH"
  );
};

export const deleteUser = async (userId) => {
  return serverMutation(`/api/admin/users/${userId}`, {}, "DELETE");
};
