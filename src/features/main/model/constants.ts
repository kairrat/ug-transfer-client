import { BuisinessClassCar, BuisinessMinivenClassCar, ComfortClassCar, MinivenClassCar, StandartClassCar, WhiteCreditCardIcon, WhiteWalletIcon } from "src/shared/img";
import { PaymentMethodEnum } from "../types/paymentMethod.enum";

export const CARS_CLASSES = [
    { label: "Стандарт", img: StandartClassCar },
    { label: "Комфорт", img: ComfortClassCar },
    { label: "Бизнес", img: BuisinessClassCar },
    { label: "Минивен", img: MinivenClassCar },
    { label: "Бизнес минивен", img: BuisinessMinivenClassCar },
];

export const PAYMENT_METHODS = {
    [PaymentMethodEnum.CASH]: { label: "Наличные", Icon: WhiteWalletIcon },
    [PaymentMethodEnum.CARD]: { label: "Карта", Icon: WhiteCreditCardIcon },
}