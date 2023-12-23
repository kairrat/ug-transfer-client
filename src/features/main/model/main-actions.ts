import { Location } from "../types/address";
import { mainApi } from "./MainApi";

export const getCities = async (city: string) => {
    const { data } = await mainApi.getCities(city);
    return data;
};

/**
 * 
 * @param points  Точки маршруто
 */
export const findRoutes = async (points: Location[]) => {
    console.log('Requesting route from locationiq...');
    const res = await mainApi.findRoutes(points);
    // console.log(res);
    // console.log(res.data);
    return res.data;
}