import AbstractApiRepository from "../../../app/api/ApiRepository";
import { APP_URL, TYPE } from "../../../appConfig";
import { UsersDriverInfoResponse } from "@screens/init/init-response";

class InitApi extends AbstractApiRepository {
  usersDriverInfo(string) {
    return this.apiClient.post<UsersDriverInfoResponse>({
      url: `${APP_URL}/users/${TYPE}/info`,
    });
  }
}

export const initApi = new InitApi();
