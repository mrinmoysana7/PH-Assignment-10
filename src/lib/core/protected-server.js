import { headers } from "next/headers";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

const getForwardHeaders = async () => {
  const incomingHeaders = await headers();

  const cookie = incomingHeaders.get("cookie");

  return cookie
    ? {
        cookie,
      }
    : {};
};

const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    if (res.status === 401) {
      redirect("/signin");
    }

    if (res.status === 403) {
      redirect("/unauthorized");
    }

    throw new Error(data.message || "Something went wrong.");
  }

  return data;
};

export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    headers: await getForwardHeaders(),
  });

  return handleResponse(res);
};

export const protectedMutation = async (path, body = {}, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(await getForwardHeaders()),
    },
    body:
      method === "GET" || method === "DELETE"
        ? undefined
        : JSON.stringify(body),
  });

  return handleResponse(res);
};
