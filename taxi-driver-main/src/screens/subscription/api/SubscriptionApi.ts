import AbstractApiRepository from "../../../app/api/ApiRepository";
import { UserRoleBackend } from "../../../types/role";
import { IGetSubscriptionTypes } from "@screens/subscription/subscription-response";
import { APP_URL } from "../../../appConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorakeKeys } from "../../../app/types/authorization";
import { AxiosRequestConfig } from "axios";

const checkAuthorization = () => {
  return AsyncStorage.getItem(AsyncStorakeKeys.TOKEN);
};

class SubscriptionApi extends AbstractApiRepository {
  async getSubscriptionTypes(role?: UserRoleBackend) {
    const token = await checkAuthorization();
    const headers: AxiosRequestConfig["headers"] = {
      Authorization: `Bearer ${token}`,
    };
    const resp = await this.apiClient.get<IGetSubscriptionTypes>({
      url: `${APP_URL}/subscription/types?role=driver`,
      config: {
        headers,
        params: role,
      },
    });
    return resp;
  }
}

export const subscriptionApi = new SubscriptionApi();
