const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  return await res.json();
};


