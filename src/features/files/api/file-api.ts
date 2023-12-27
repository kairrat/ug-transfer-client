import AsyncStorage from "@react-native-async-storage/async-storage";
import AbstractApiRepository from "../../../app/api/ApiRepository";
import { AsyncStorageKeys } from "../../../app/types/authorization";
import { Endpoints } from "../../../shared/utils/endpoints";

export class FileApi extends AbstractApiRepository {
    uploadFiles = async (formData: FormData) => {
        const token = await AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
        return this.apiClient.post({
            url: Endpoints.uploadFiles,
            data: formData,
            config: {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            },
        });
    };
};