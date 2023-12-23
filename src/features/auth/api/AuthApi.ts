
import AbstractApiRepository from "src/app/api/ApiRepository";
import { APP_URL } from "src/appConfig";
import { RequestCodeResponse } from "../types/AuthResponse";


class AuthApi extends AbstractApiRepository {
    requestCode(phone_number: string) {
        return this.apiClient.post<RequestCodeResponse>({
            url: `${APP_URL}/users/clients/make-call`,
            data: { phone_number },
        });
    };
    verifyCode(phone_number: string, code: string) {
        return this.apiClient.post({
            url: APP_URL + '/users/clients/register',
            data: { phone_number, code }
        });
    };
};

export const authApi = new AuthApi();