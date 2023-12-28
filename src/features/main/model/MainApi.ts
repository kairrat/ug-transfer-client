import AbstractApiRepository from "src/app/api/ApiRepository";
import { APP_URL } from "src/appConfig";
import { ICity } from "src/types/city";
import { Location } from "../types/address";


const checkAuthorization = () => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTY5OTcxMjkxMDEiLCJ1c2VyX2lkIjoiNjU2ZGNiZjE2ODM0Y2EyZjcwZTc4YmI5IiwiaWF0IjoxNzAxNzAwMzU1fQ.Ui5Fb6Ixnbz0nQQzmfqJO_Ar2HEthAdMR4HyHV-ep9k';
  };

class MainApi extends AbstractApiRepository {
    async getCities(city: string) {
        const token = await checkAuthorization();
        return this.apiClient.get<ICity[]>({
            url: APP_URL + '/city/',
            config: {
                headers: {
                    Authorization: 'Bearer ' + token
                },
                params: {
                    city
                }
            }
        });
    };

    async createOrder(data) {
        const token = await checkAuthorization();
        return this.apiClient.post({
            url: APP_URL + '/order/create',
            data,
            config: {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        })
    }
}

export const mainApi = new MainApi();