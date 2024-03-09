import { PaymentMethodEnum } from "./paymentMethod.enum";

export type Order = {
    departure: {
        city: string;
        address: string;
    };
    arrival: {
        city: string;
        address: string;
    };
    params: {
        babyChair: boolean;
        buster: boolean;
        animalTransfer: boolean;
    };
    date: Date,
    carClass: number;
    baggage: string;
    passangersAmount: string;
    comment: string;
    price: number | null;
    paymentMethod: PaymentMethodEnum;
    distance?: string;
    isUrgent: boolean;
}

export type EditingOrder = {
    departure: {
        city: string;
        address: string;
    };
    arrival: {
        city: string;
        address: string;
    };
}