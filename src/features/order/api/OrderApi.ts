import AbstractApiRepository from "src/app/api/ApiRepository";
import { ICity } from "src/types/city";
import { Endpoints } from "src/shared/utils/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "src/app/types/authorization";


const checkAuthorization = async () => {
    return AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
  };

class OrderApi extends AbstractApiRepository {
    async getCities(query: string) {
        const apiKey = 'e35cdf79-1eb6-4895-96c0-038767c7af03'; // API key of yandex, you better hide it somewhere
        return this.apiClient.get<ICity[]>({
            url: `https://suggest-maps.yandex.ru/v1/suggest?apikey=${apiKey}&text=${query}&types=locality` // Free yandex api to search objects (locality == cities, villages and regions)
        });
    };

    async createOrder(data) {
        const token = await checkAuthorization();
        return this.apiClient.post({
            url: Endpoints.createOrder,
            data,
            config: {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        })
    }
}

export const orderApi = new OrderApi();