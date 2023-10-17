import { colors } from '@styles';
import AdminIcon from '@assets/img/admin.svg';
import ControllerIcon from '@assets/img/controller.svg';
import WalletIcon from '@assets/img/wallet.svg';
import StarIcon from '@assets/img/star.svg';
import QuestionIcon from '@assets/img/question.svg';
import TelegramIcon from '@assets/img/telegram.svg';
import { Car } from '../icons/Car';
import { MenuItemProps } from './types';
import { UserRole } from '../../../types/role';

export const menuItems: MenuItemProps[] = [
  {
    title: 'Админ панель',
    icon: AdminIcon,
    route: 'Admin',
    hasUpdates: false,
    textColor: colors.black,
    backgroundColor: colors.secondary,
    role: UserRole.ADMIN,
  },
  {
    title: 'Заказы водителя',
    icon: Car,
    route: 'DriverOrders',
    hasUpdates: false,
  },
  {
    title: 'Заказы диспетчера',
    icon: ControllerIcon,
    route: 'ControllerOrders',
    hasUpdates: false,
  },
  {
    title: 'Баланс',
    icon: WalletIcon,
    route: 'Wallet',
    hasUpdates: false,
  },
  {
    title: 'Подписка',
    icon: StarIcon,
    textColor: colors.primary,
    route: 'Subscription',
    hasUpdates: false,
  },
  {
    title: 'Диспетчер или водитель?',
    icon: QuestionIcon,
    route: 'Help',
    hasUpdates: false,
  },
  {
    title: 'Обратная связь',
    icon: TelegramIcon,
    route: 'Contact',
    hasUpdates: false,
  },
];
