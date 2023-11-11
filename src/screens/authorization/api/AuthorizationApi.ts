import AbstractApiRepository from "../../../app/api/ApiRepository";
import { CallResponse, VerifyResponse } from "../authorization-response";

const urlU = "http://95.163.235.158:3000";
const type = "drivers";

class AuthorizationApi extends AbstractApiRepository {
  sendCheckCode(phone: string) {
    return this.apiClient.post<CallResponse>({
      url: `${urlU}/users/${type}/make-call`,
      data: { phone },
    });
  }

  verifyCode(phone: string, code: string) {
    return this.apiClient.post<VerifyResponse>({
      url: `${urlU}/users/${type}/verify`,
      data: { phone, code },
    });
  }
}

export const authorizationApi = new AuthorizationApi();
