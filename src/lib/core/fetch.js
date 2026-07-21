const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;
console.log("ENV", process.env.NEXT_PUBLIC_APP_URL);

/**
 * Safely parse JSON response
 */
const parseResponse = async (res) => {
  const contentType = res.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return await res.json();
  }

  return null;
};

/**
 * GET Request
 */
export const apiGet = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    cache: "no-store",
    // credentials: "include",
    ...options,
  });

  const data = await parseResponse(res);

  if (!res.ok) {
    throw new Error(
      `API Error (${res.status}) : ${data?.message || res.statusText}`,
    );
  }

  return data;
};

/**
 * POST / PATCH / DELETE
 */
export const apiRequest = async (path, method = "POST", body, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    // credentials: "include",

    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },

    body:
      body !== undefined && method !== "GET" ? JSON.stringify(body) : undefined,

    ...options,
  });

  const data = await parseResponse(res);

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong.");
  }

  return data;
};
