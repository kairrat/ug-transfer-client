import { UserRole } from '../../../types/role';

export interface MenuItemProps {
  title: string;
  icon: any;
  route: string;
  hasUpdates?: boolean;
  textColor?: string;
  backgroundColor?: string;
  role?: UserRole;
}
