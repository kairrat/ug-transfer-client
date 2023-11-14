import AbstractApiRepository from "../../../app/api/ApiRepository";
import { UserRoleBackend } from "../../../types/role";
import { IGetSubscriptionTypes } from "@screens/subscription/subscription-response";
import { APP_URL } from "../../../appConfig";

class SubscriptionApi extends AbstractApiRepository {
  getSubscriptionTypes(role?: UserRoleBackend) {
    return this.apiClient.get<IGetSubscriptionTypes>({
      url: `${APP_URL}/subscription/types`,
      config: {
        params: role,
      },
    });
  }
}

export const subscriptionApi = new SubscriptionApi();
