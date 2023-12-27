import { createEvent, createStore } from "effector";
import { orders } from "../contants";
import { OrderStatusEnum } from "../types/enums/OrderStatus.enum";

type OrdersState = {
    status: OrderStatusEnum;
    commonOrders: Order[];
    archiveOrders: Order[];
    activeOrders: Order[];
    urgentOrders: Order[];
}

const initialState: OrdersState = {
    status: OrderStatusEnum.NULL,
    commonOrders: [...orders],
    activeOrders: [...orders],
    archiveOrders: [...orders],
    urgentOrders: [...orders]
}

type SetOrdersDto = {
    data: Order[];
    type: 'commonOrders' | 'activeOrders' | 'archiveOrders' | 'urgentOrders';
}

export const setOrders = createEvent<SetOrdersDto>();
export const setOrdersStatus = createEvent<OrderStatusEnum>();

export const $orders = createStore<OrdersState>(initialState)
    .on(setOrders, (state, { type, data }) => ({...state, [type]: data}))
    .on(setOrdersStatus, (state, status) => ({...state, status}))