const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return await res.json();
};

export const serverMutation = async (path, data, method = "post") => {
  const res = await fetch(`${baseUrl}${path}`, {
    // method: "POST",
    method: method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};
