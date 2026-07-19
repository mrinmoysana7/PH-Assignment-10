// const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

// /**
//  * GET Request
//  */
// export const apiGet = async (path, options = {}) => {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     method: "GET",
//     cache: "no-store",
//     ...options,
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Something went wrong.");
//   }

//   return data;
// };

// /**
//  * POST / PATCH / DELETE
//  */
// export const apiRequest = async (
//   path,
//   method = "POST",
//   body = {},
//   options = {},
// ) => {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     method,

//     credentials: "include",

//     headers: {
//       "Content-Type": "application/json",
//       ...(options.headers || {}),
//     },

//     body: method === "GET" ? undefined : JSON.stringify(body),

//     ...options,
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Something went wrong.");
//   }

//   return data;
// };
