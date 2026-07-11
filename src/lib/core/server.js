const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    // method: "POST",
    method: method,
    headers: {
      "content-type": "application/json",
    },
    body: method === "GET" ? undefined : JSON.stringify(data),
  });

  return res.json();
};
