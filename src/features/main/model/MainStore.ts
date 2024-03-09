import { createEvent, createStore } from "effector";
import { MainStatusEnum } from "../enums/mainStatus.enum";
import { EditingOrder, Order } from "../types/order";
import { PaymentMethodEnum } from "../types/paymentMethod.enum";

type MainState = {
    status: MainStatusEnum;
    order: Order;
    finishedOrder: Order | null;
    editingOrder: EditingOrder;
    orderDetailModal: boolean;
    orderProcessStatus: null | 'seeking' | 'received';
};

const initialState: MainState = {
    status: MainStatusEnum.NULL,
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
        paymentMethod: PaymentMethodEnum.CASH,
        isUrgent: false
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
    finishedOrder: null,
    orderDetailModal: false,
    orderProcessStatus: null
};

export const setOrder = createEvent<Order>();
export const setEditingOrder = createEvent<EditingOrder>();
export const setOrderDetailsModal = createEvent<boolean>();
export const setStatus = createEvent<MainStatusEnum>();
export const resetOrder = createEvent();
export const setOrderProcessStatus = createEvent<null | 'seeking' | 'received'>();
export const setFinishedOrder = createEvent<null | Order>();

export const $main = createStore<MainState>(initialState)
    .on(setOrder, (state, order) => ({...state, order}))
    .on(setEditingOrder, (state, editingOrder) => ({...state, editingOrder}))
    .on(setOrderDetailsModal, (state, orderDetailModal) => ({...state, orderDetailModal}))
    .on(setStatus, (state, status) => ({...state, status}))
    .on(resetOrder, (state) => ({...state, order: {...initialState.order}, editingOrder: {...initialState.editingOrder}}))
    .on(setOrderProcessStatus, (state, orderProcessStatus) => ({...state, orderProcessStatus}))
    .on(setFinishedOrder, (state, finishedOrder) => ({...state, finishedOrder}))