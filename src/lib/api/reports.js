import { serverMutation } from "../core/server";

export const submitReport = async (reportData) => {
  return serverMutation("/api/reports", reportData, "POST");
};
