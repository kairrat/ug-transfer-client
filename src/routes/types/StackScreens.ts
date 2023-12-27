import { UserRole } from "../../types/role";

export type StackScreens = {
  Init: undefined;
  AuthenticationChoice: undefined;
  PrivacyPolicy: {
    fromProfile: boolean;
  };
  SmsVerification: undefined;
  Subscription: {
    subscription_status: boolean;
  };
  CreateProfile: {
    type: UserRole;
  };
  CreateProfileComplete: undefined;
  Orders: undefined;
  FindOrderRoute: undefined;
  OrderDetails: {
    id: string;
  };
  OrderConfirmPopup: {
    id: string;
    from: string;
    to: string;
  };
  SubscribeModal: {
    url: string;
  };
  AuthorizationComplete: undefined;
  Wallet: undefined;
  Profile: undefined;
  EditProfile: undefined;
  SubscribeRemind: undefined;
  ConfirmDeleteAccount: undefined;
  AdBanners: undefined;
  SubScreen: undefined;
};
