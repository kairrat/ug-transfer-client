import AsyncStorage from "@react-native-async-storage/async-storage";
import AbstractApiRepository from "src/app/api/ApiRepository";
import { AsyncStorageKeys } from "src/app/types/authorization";
import { APP_URL } from "src/appConfig";

const checkAuthorization = () => {
    return AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
};

class OrderApi extends AbstractApiRepository {
    async getActiveOrders() {
        const token = await checkAuthorization();
        return this.apiClient.get<Order[]>({
            url: APP_URL + '/order/',
            config: {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        })
    }
    async getCommonOrders() {
        const token = await checkAuthorization();
        return this.apiClient.get<Order[]>({
            url: APP_URL + '/order/',
            config: {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        })
    }
    async getArchiveOrders() {
        const token = await checkAuthorization();
        return this.apiClient.get<Order[]>({
            url: APP_URL + '/order/',
            config: {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        })
    }
    async getUrgentOrders() {
        const token = await checkAuthorization();
        return this.apiClient.get<Order[]>({
            url: APP_URL + '/order/',
            config: {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        })
    }
};

export const orderApi = new OrderApi();