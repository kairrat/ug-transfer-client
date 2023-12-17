import { AbstractApiRepository } from "src/app";
import { APP_URL } from "src/shared/configs/appConfig";

class AuthApi extends AbstractApiRepository {
    requestCode(phone_number: string) {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTY5OTcxMjkxMDEiLCJ1c2VyX2lkIjoiNjU2ZGNiZjE2ODM0Y2EyZjcwZTc4YmI5IiwiaWF0IjoxNzAxNzAwMzU1fQ.Ui5Fb6Ixnbz0nQQzmfqJO_Ar2HEthAdMR4HyHV-ep9k";
        return this.apiClient.post({
            url: `${APP_URL}/users/clients/make-call`,
            data: { phone_number },
            config: {
                headers: {
                    Authorization: 'Bearer ' + token
                },
            }
            
        });
    };
    verifyCode(phone_number: string, code: string) {
        return this.apiClient.post({
            url: APP_URL + '/users/clients/register',
            config: {
                headers: {
                    "Content-Type": "application/json"
                },
                data: { phone_number, code }
            }
        });
    };
};

export const authApi = new AuthApi();