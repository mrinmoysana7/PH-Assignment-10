import { serverFetch, serverMutation } from "../core/server";

export const submitReport = async (reportData) => {
  return serverMutation("/api/reports", reportData, "POST");
};

export const getReportedPrompts = async () => {
  const data = await serverFetch("/api/admin/reports");

  return data.reports;
};

export const warnCreator = (reportId, message) => {
  return serverMutation(
    `/api/admin/reports/${reportId}/warn`,
    {
      message,
    },
    "PATCH",
  );
};

export const deleteReport = (reportId) => {
  return serverMutation(`/api/admin/reports/${reportId}`, {}, "DELETE");
};

export const dismissReport = (reportId) => {
  return serverMutation(`/api/admin/reports/${reportId}/dismiss`, {}, "PATCH");
};
