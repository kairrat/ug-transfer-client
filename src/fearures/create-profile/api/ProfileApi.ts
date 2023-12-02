import AsyncStorage from "@react-native-async-storage/async-storage";
import AbstractApiRepository from "../../../app/api/ApiRepository";
import { AsyncStorakeKeys } from "../../../app/types/authorization";
import { AxiosRequestConfig } from "axios";

const urlU = "http://95.163.235.158:3001";
const type = "drivers";

const checkAuthorization = () => {
  return AsyncStorage.getItem(AsyncStorakeKeys.TOKEN);
};

class ProifleApi extends AbstractApiRepository {
  async addData(data: any) {
    const token = await checkAuthorization();
    const headers: AxiosRequestConfig["headers"] = {
      Authorization: `Bearer ${token}`,
    };
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
}

export const profileApi = new ProifleApi();
