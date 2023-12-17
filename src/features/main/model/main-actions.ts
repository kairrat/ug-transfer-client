import { mainApi } from "./MainApi";

export const getCities = async (city: string) => {
    const { data } = await mainApi.getCities(city);
    return data;
};