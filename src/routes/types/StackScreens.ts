import { UserRole } from "../../types/role";

export type StackScreens = {
  Init: undefined;
  AuthenticationChoice: undefined;
  PrivacyPolicy: undefined;
  SmsVerification: undefined;
  Subscription: undefined;
  CreateProfile: {
    type: UserRole;
  };
  CreateProfileComplete: undefined;
  Orders: undefined;
  OrderDetails: {
    id: string;
  };
};
