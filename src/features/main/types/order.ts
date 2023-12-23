import { PaymentMethodEnum } from "./paymentMethod.enum";

export type OrderParams = {
    activeCarClass: number;
    shipDate: Date;
    paymentMethod: PaymentMethodEnum
};