import { UserRole } from "./role";

interface Subscription {
  title: string;
  icon: any;
  isActive: boolean;
  text?: string;
  price?: number;
  role?: UserRole;
  expires?: string;
}
