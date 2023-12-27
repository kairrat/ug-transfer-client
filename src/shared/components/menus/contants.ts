import { colors } from "@styles";
import AdminIcon from "@assets/img/admin.svg";
import WalletIcon from "@assets/img/wallet.svg";
import StarIcon from "@assets/img/star.svg";
import QuestionIcon from "@assets/img/question.svg";
import { Car } from "../icons/Car";
import { MenuItemProps } from "./types";
import { UserRole } from "../../../types/role";
import { Telegram } from "../icons/Telegram";
import AdIcon from '@assets/img/ad-icon.svg';

export const menuItems: MenuItemProps[] = [
  {
    title: "Рекламный банер",
    icon: AdIcon,
    route: "AdBanners",
    hasUpdates: false,
    textColor: colors.black,
    backgroundColor: colors.secondary,
    // role: UserRole.ADMIN,
  },
  {
    title: "Заказы водителя",
    icon: Car,
    route: "Orders",
    hasUpdates: false,
  },
  {
    title: "Баланс",
    icon: WalletIcon,
    route: "Wallet",
    hasUpdates: false,
  },
  {
    title: "Подписка",
    icon: StarIcon,
    textColor: colors.primary,
    route: "SubScreen",
    hasUpdates: false,
  },
  {
    title: "Как стать диспетчером?",
    icon: QuestionIcon,
    route: "Help",
    hasUpdates: false,
  },
  {
    title: "Обратная связь",
    icon: Telegram,
    route: "Contact",
    hasUpdates: false,
  },
];
