import { CarIcon, DriverIcon, TelegramIcon } from "src/shared/img";

export const DRAWER_NAVS = [
    {label: "Поездки", icon: <CarIcon/>, route: "Trips", url: null },
    {label: "Как стать водителем", icon: <DriverIcon/>, route: null, url: "http://yandex.ru"},
    {label: "Обратная связь", icon: <TelegramIcon/>, route: null, url: "https://t.me/"},
]