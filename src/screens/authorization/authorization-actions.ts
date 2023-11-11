import { authorizationApi } from "./api/AuthorizationApi";

export const sendCheckCode = async (phone: string) => {
  const { data } = await authorizationApi.sendCheckCode(phone).catch((e) => e);
  console.log(data, "sendCheckCode");
  return data;
};

export const verifyCode = async (phone: string, code: string) => {
  console.log(phone, code, "verifyCode");
  const { data } = await authorizationApi
    .verifyCode(phone, code)
    .catch((e) => e);
  console.log(data, "verifyCode");
  return data;
};
