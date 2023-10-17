import AbstractApiRepository from '../../../app/api/ApiRepository';
import { API_URL, APP_TYPE } from '@env';
import { CallResponse, VerifyResponse } from '../authorization-response';

class AuthorizationApi extends AbstractApiRepository {
  sendCheckCode(phone: string) {
    return this.apiClient.post<CallResponse>({
      url: `${API_URL}/users/${APP_TYPE}/make-call`,
      data: { phone },
    });
  }

  verifyCode(phone: string, code: string) {
    return this.apiClient.post<VerifyResponse>({
      url: `${API_URL}/users/${APP_TYPE}/verify`,
      data: { phone, code },
    });
  }
}

export const authorizationApi = new AuthorizationApi();
