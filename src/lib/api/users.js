// import { serverFetch } from "../core/server";
// const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

import { apiRequest } from "../core/fetch";
import { apiGet } from "../core/fetch";

// export const getAllUsers = async () => {
//   const data = await serverFetch("/api/admin/users");

//   return data.users || [];
// };

// export const updateUserRole = async (userId, role) => {
//   try {
//     console.log("Sending Role:", role);

//     const res = await fetch(`${baseUrl}/api/admin/users/${userId}/role`, {
//       method: "PATCH",
//       credentials: "include", // Better Auth session cookie
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         role,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || "Failed to update user role.");
//     }

//     return data;
//   } catch (error) {
//     console.error("Update Role Error:", error);

//     return {
//       success: false,
//       message: error.message || "Something went wrong.",
//     };
//   }
// };

// export const deleteUser = async (userId) => {
//   try {
//     const res = await fetch(`${baseUrl}/api/admin/users/${userId}`, {
//       method: "DELETE",
//       credentials: "include",
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || "Failed to delete user.");
//     }

//     return data;
//   } catch (error) {
//     console.error("Delete User Error:", error);

//     return {
//       success: false,
//       message: error.message || "Something went wrong.",
//     };
//   }
// };

// import { apiGet, apiRequest } from "../core/fetch";

/* =========================================
   Get All Users
========================================= */

export const getAllUsers = async () => {
  const data = await apiGet("/api/admin/users");

  return data.users || [];
};

/* =========================================
   Update User Role
========================================= */

export const updateUserRole = async (userId, role) => {
  return apiRequest(`/api/admin/users/${userId}/role`, "PATCH", { role });
};

/* =========================================
   Delete User
========================================= */

export const deleteUser = async (userId) => {
  return apiRequest(`/api/admin/users/${userId}`, "DELETE");
};
