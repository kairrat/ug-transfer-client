
import AsyncStorage from "@react-native-async-storage/async-storage";
import AbstractApiRepository from "src/app/api/ApiRepository";
import { AsyncStorageKeys } from "src/app/types/authorization";
import { APP_URL } from "src/appConfig";
import { Profile } from "src/types/profile";


class ProfileApi extends AbstractApiRepository {
    async getProfile() {
        const token = await AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
        return this.apiClient.get<Profile>({
            url: APP_URL + '/users/clients/info',
            config: {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        });
    };
    async updateProfile(data) {
        const token = await AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
        return this.apiClient.put({
            url: APP_URL + '/users/clients/update',
            data,
            config: {
                headers: {
                    Authorization: "Bearer " + token
                }
            },
        })
    };
};

export const profileApi = new ProfileApi();