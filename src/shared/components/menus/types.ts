import { UserRole } from "../../../types/role";

export interface MenuItemProps {
  title: string;
  icon: any;
  route?: string;
  externalLink?: string;

  hasUpdates?: boolean;
  textColor?: string;
  backgroundColor?: string;
  role?: UserRole;
}
