import { BuisinessClassCar, BuisinessMinivenClassCar, ComfortClassCar, MinivenClassCar, StandartClassCar, WhiteCreditCardIcon, WhiteWalletIcon } from "src/shared/img";
import { PaymentMethodEnum } from "../types/paymentMethod.enum";

export const CARS_CLASSES = [
    { label: "Стандарт", img: StandartClassCar, id: "658ae8fdd6d1b39add937b8c", price: 25},
    { label: "Комфорт", img: ComfortClassCar, id: "", price: 30 },
    { label: "Бизнес", img: BuisinessClassCar, id: "", price: 35 },
    { label: "Минивен", img: MinivenClassCar, id: "", price: 40 },
    { label: "Бизнес минивен", img: BuisinessMinivenClassCar, id: "", price: 80},
];

export const PAYMENT_METHODS = {
    [PaymentMethodEnum.CASH]: { label: "Наличные", Icon: <WhiteWalletIcon width={25} /> },
    [PaymentMethodEnum.CARD]: { label: "Перевод", Icon: <WhiteCreditCardIcon width={25} /> },
}