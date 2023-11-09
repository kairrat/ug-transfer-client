import { UserRole } from "./role";

interface Profile {
  phone?: string;
  subscriptionStatus?: boolean;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  tariffId?: string;
  publicNumber?: string;
  carBrandId?: string;
  carColor?: string;
  carModel?: string;
  tariffId?: string;
  role?: UserRole;
  subRole?: SubRole;
  registrationComplete?: boolean;
}
