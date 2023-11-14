import { subscriptionApi } from "./api/SubscriptionApi";
import { UserRoleBackend } from "../../types/role";
export const getSubscriptionActions = async (role?: UserRoleBackend) => {
  const { data } = await subscriptionApi
    .getSubscriptionTypes(role)
    .catch((e) => e);
  console.log(data, "sendCheckCode");
  return data;
};
