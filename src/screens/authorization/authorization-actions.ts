import { authorizationApi } from "./api/AuthorizationApi";

export const sendCheckCode = async (phone: string) => {
  const { data } = await authorizationApi.sendCheckCode(phone).catch((e) => e);
  return data;
};

export const verifyCode = async (phone: string, code: string) => {
  const { data } = await authorizationApi
    .verifyCode(phone, code)
    .catch((e) => e);
  return data;
};
