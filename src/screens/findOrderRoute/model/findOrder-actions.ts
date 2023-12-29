import { findOrderApi } from "../api/findOrderApi";

export const getCities = async (city: string) => {
    const { data } = await findOrderApi.getCities(city);
    return data;
};