import AsyncStorage from "@react-native-async-storage/async-storage";
import AbstractApiRepository from "../../../app/api/ApiRepository";
import { AsyncStorakeKeys } from "../../../app/types/authorization";

const urlU = "http://95.163.235.158:3000";
const type = "drivers";

class ProifleApi extends AbstractApiRepository {
  async addData(data: any) {
    const token = await AsyncStorage.getItem(AsyncStorakeKeys.TOKEN);
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
