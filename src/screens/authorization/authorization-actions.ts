import { authorizationApi } from "./api/AuthorizationApi";

export const sendCheckCode = async (phone: string) => {
  const { data } = await authorizationApi.sendCheckCode(phone);
  console.log(data, "sendCode");
  return data;
};

export const verifyCode = async (phone: string, code: string) => {
  const { data } = await authorizationApi.verifyCode(phone, code);
  console.log(data, "verifyCode");
  return data;
};
