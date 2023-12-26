import { createEvent, createStore } from "effector";
import { EditingOrder, Order } from "../types/order";
import { PaymentMethodEnum } from "../types/paymentMethod.enum";

type MainState = {
    order: Order,
    editingOrder: EditingOrder,
    orderDetailModal: boolean
};

const initialState: MainState = {
    order: {
        departure: {
            city: "",
            address: ""
        },
        arrival: {
            city: "",
            address: ""
        },
        date: new Date(),
        carClass: 0,
        price: null,
        params: {
            babyChair: false,
            buster: false,
            animalTransfer: false
        },
        baggage: "",
        passangersAmount: "",
        comment: "",
        paymentMethod: PaymentMethodEnum.CASH
    },
    editingOrder: {
        departure: {
            city: "",
            address: ""
        },
        arrival: {
            city: "",
            address: ""
        }
    },
    orderDetailModal: false
};

export const setOrder = createEvent<Order>();
export const setEditingOrder = createEvent<EditingOrder>();
export const setOrderDetailsModal = createEvent<boolean>();

export const $main = createStore<MainState>(initialState)
    .on(setOrder, (state, order) => ({...state, order}))
    .on(setEditingOrder, (state, editingOrder) => ({...state, editingOrder}))
    .on(setOrderDetailsModal, (state, orderDetailModal) => ({...state, orderDetailModal}))