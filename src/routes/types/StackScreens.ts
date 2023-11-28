import { UserRole } from "../../types/role";

export type StackScreens = {
  Init: undefined;
  AuthenticationChoice: undefined;
  PrivacyPolicy: undefined;
  SmsVerification: undefined;
  Subscription: {
    subscription_status: boolean;
  };
  CreateProfile: {
    type: UserRole;
  };
  CreateProfileComplete: undefined;
  Orders: undefined;
  OrderDetails: {
    id: string;
  };
  SubscribeModal: {
    url: string;
  };
  AuthorizationComplete: undefined;
  Wallet: undefined;
};
