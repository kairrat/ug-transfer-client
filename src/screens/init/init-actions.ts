import { initApi } from "@screens/init/api/InitApi";

export const usersDriverInfo = async (token?: string) => {
  const { data } = await initApi.usersDriverInfo(token);
  return data;
};
