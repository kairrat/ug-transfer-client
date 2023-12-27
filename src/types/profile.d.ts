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
  avatar?: stirng;
  registrationComplete?: boolean;
  subscription_status?: boolean;
  telegram?: string;
  urgentOrderSubscriber?: boolean;
  carPhotoArray?: string[];
  passportArray?: string[];
}
