import { getUserSession } from "../core/session";

export const getLoggedInUser = async () => {
  return await getUserSession();
};
