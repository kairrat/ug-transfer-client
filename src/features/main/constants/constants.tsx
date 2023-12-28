import { BuisinessClassCar, BuisinessMinivenClassCar, ComfortClassCar, MinivenClassCar, StandartClassCar, WhiteCreditCardIcon, WhiteWalletIcon } from "src/shared/img";
import { PaymentMethodEnum } from "../types/paymentMethod.enum";

export const CARS_CLASSES = [
    { label: "Стандарт", img: StandartClassCar, id: "658ae8fdd6d1b39add937b8c" },
    { label: "Комфорт", img: ComfortClassCar, id: "" },
    { label: "Бизнес", img: BuisinessClassCar, id: "" },
    { label: "Минивен", img: MinivenClassCar, id: "" },
    { label: "Бизнес минивен", img: BuisinessMinivenClassCar, id: "" },
];

export const PAYMENT_METHODS = {
    [PaymentMethodEnum.CASH]: { label: "Наличные", Icon: <WhiteWalletIcon width={25} /> },
    [PaymentMethodEnum.CARD]: { label: "Перевод", Icon: <WhiteCreditCardIcon width={25} /> },
}