import AsyncStorage from "@react-native-async-storage/async-storage";
import AbstractApiRepository from "src/app/api/ApiRepository";
import { AsyncStorageKeys } from "src/app/types/authorization";
import { APP_URL } from "src/appConfig";
import { File } from "src/types/file";


export class FileApi extends AbstractApiRepository {
    async upload(formData: FormData) {
        const token = await AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
        console.log('Uploading form data', formData);
        return this.apiClient.post({
            url: `${APP_URL}/users/upload`,
            data: formData,
            config: {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            }
        });
    };
};