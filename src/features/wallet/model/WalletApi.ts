import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosRequestConfig } from "axios";
import AbstractApiRepository from "src/app/api/ApiRepository";
import { AsyncStorageKeys } from "src/app/types/authorization";
import { APP_URL } from "src/appConfig";

const checkAuthorization = () => {
    return AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
};

class WalletApi extends AbstractApiRepository {
    async getBalance() {
        const token = await checkAuthorization();
        const headers: AxiosRequestConfig["headers"] = {
            Authorization: `Bearer ${token}`
        }
        return this.apiClient.get({
            url: APP_URL + '/financial/balance',
            config: {
                headers
            }
        });
    }
};

export const walletApi = new WalletApi();