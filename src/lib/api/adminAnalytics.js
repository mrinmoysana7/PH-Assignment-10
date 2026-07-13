import { serverFetch } from "@/lib/core/server";

export const getAdminAnalytics = async () => {
  const data = await serverFetch("/api/admin/analytics");

  return data.analytics;
};
