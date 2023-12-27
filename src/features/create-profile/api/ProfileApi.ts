import AsyncStorage from "@react-native-async-storage/async-storage";
import AbstractApiRepository from "../../../app/api/ApiRepository";
import { AsyncStorageKeys } from "../../../app/types/authorization";

const urlU = "http://95.163.235.158:3001";
const type = "drivers";

const checkAuthorization = () => {
  return AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
};

class ProifleApi extends AbstractApiRepository {
  async addData(data: any) {
    const token = await checkAuthorization();
    return this.apiClient.put<any>({
      url: `${urlU}/users/${type}/add-data`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  }

  async uploadImages(data: any) {
    const token =  await checkAuthorization();
    return this.apiClient.post<any>({
      url: `${urlU}/users/upload`,
      data,
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        }
      }
    })
  };

  async getProfile() {
    const token = await checkAuthorization();
    return this.apiClient.get<any>({
      url: `${urlU}/users/${type}/info`,
      config: {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })
  }
}

export const profileApi = new ProifleApi();
