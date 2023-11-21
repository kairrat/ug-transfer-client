import AbstractApiRepository from "../../../app/api/ApiRepository";
import { CallResponse, VerifyResponse } from "../authorization-response";
import { APP_URL, TYPE } from "../../../appConfig";

class AuthorizationApi extends AbstractApiRepository {
  sendCheckCode(phone: string) {
    const url = `${APP_URL}/users/${TYPE}/make-call`;
    console.log(url);
    console.log(phone);
    return this.apiClient.post<CallResponse>({
      url,
      data: { phone },
    });
  }

  verifyCode(phone: string, code: string) {
    return this.apiClient.post<VerifyResponse>({
      url: `${APP_URL}/users/${TYPE}/verify`,
      data: { phone, code },
    });
  }
}

export const authorizationApi = new AuthorizationApi();
