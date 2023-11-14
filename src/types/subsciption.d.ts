import { UserRole } from "./role";

interface Subscription {
  title: string;
  icon: any;
  isActive: boolean;
  price?: string;
  role?: UserRole;
  expires?: string;
  description?: string;
  type?: string;
  period?: string;
}
