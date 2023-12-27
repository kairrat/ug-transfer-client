import { orderApi } from "../api/OrderApi";
import { OrderType } from "../types/orderType";

export const getOrders = async (type: OrderType) => {
    return [];
    if (type === 'active') {
        const { data } = await orderApi.getActiveOrders();
        return data;
    }
    else if (type === 'archive') {
        const { data } = await orderApi.getArchiveOrders();
        return data;
    }
    else if (type === 'common') {
        const { data } = await orderApi.getCommonOrders();
        return data;
    }
    else {
        const { data } = await orderApi.getUrgentOrders();
        return data;
    }
}