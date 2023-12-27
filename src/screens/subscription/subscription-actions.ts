// import { subscriptionApi } from "@src/features/subscription";

import { subscriptionApi } from "src/features/subscription";
import { UserRoleBackend } from "src/types/role";

// import { UserRoleBackend } from "@src/types/role";
export const getSubscriptionActions = async (role?: UserRoleBackend) => {
  const { data } = await subscriptionApi.getSubscriptionTypes(role).catch((e) => e);
  return data;
};
export const subscriptionSubscribe = async () => {
  const data = await subscriptionApi.subscriptionSubscribe().catch((e) => e);
  return data;
};
