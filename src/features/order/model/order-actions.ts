import { orderApi } from "../api/OrderApi";


export const getCities = async (city: string) => {
    const { data } = await orderApi.getCities(city);
    return data;
};

export const createOrder = async (orderData) => {
    const { data } = await orderApi.createOrder(orderData);
    return data;
}