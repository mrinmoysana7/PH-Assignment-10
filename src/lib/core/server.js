// import { headers } from "next/headers";
// import { auth } from "../auth";
// import { redirect } from "next/navigation";

// const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

// // Token Generation step 1
// const getUserToken = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   return session?.session?.token || null;
// };

// // // Token Generation step 2
// export const authHeader = async () => {
//   const token = await getUserToken();
//   const header = token
//     ? {
//         authorization: `Bearer ${token}`,
//       }
//     : {};

//   return header;
// };
// export const serverFetch = async (path) => {
//   const res = await fetch(`${baseUrl}${path}`, {
//     cache: "no-store",
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Something went wrong");
//   }

//   return data;
// };

// // Token Generation step 4
// export const protectedFetch = async (path) => {
//   const res = await fetch(`${baseUrl}${path}`, {
//     headers: await authHeader(),
//   });

//   // Handle 401, 404, 403
//   return handleStatusCode(res);
// };

// export const serverMutation = async (path, data, method = "POST") => {
//   console.log(path);
//   const res = await fetch(`${baseUrl}${path}`, {
//     // method: "POST",
//     method: method,
//     headers: {
//       "content-type": "application/json",
//       // Token Generation step 3
//       ...(await authHeader()),
//     },
//     body: method === "GET" ? undefined : JSON.stringify(data),
//   });

//   return handleStatusCode(res);
// };

// // Handle 401, 404, 403
// const handleStatusCode = (res) => {
//   if (res.status === 401) {
//     redirect("/unathorized");
//   } else if (res.status === 403) {
//     redirect("/unathorized");
//   }

//   return res.json();
// };

// import { redirect } from "next/navigation";

// const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

/* =====================================================
   Public GET Request
===================================================== */

// export const serverFetch = async (path) => {
//   const res = await fetch(`${baseUrl}${path}`, {
//     cache: "no-store",
//   });

//   return handleResponse(res);
// };

/* =====================================================
   Public Mutation
===================================================== */

// export const serverMutation = async (path, data = {}, method = "POST") => {
//   const res = await fetch(`${baseUrl}${path}`, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body:
//       method === "GET" || method === "DELETE"
//         ? undefined
//         : JSON.stringify(data),
//   });

//   return handleResponse(res);
// };

/* =====================================================
   Handle Response
===================================================== */

// const handleResponse = async (res) => {
//   const data = await res.json();

//   if (!res.ok) {
//     if (res.status === 401) {
//       redirect("/signin");
//     }

//     if (res.status === 403) {
//       redirect("/unauthorized");
//     }

//     throw new Error(data.message || "Something went wrong");
//   }

//   return data;
// };
