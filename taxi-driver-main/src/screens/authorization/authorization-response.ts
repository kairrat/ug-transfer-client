export interface CallResponse {
  success: boolean;
}

export interface VerifyResponse {
  token: string;
  user_data: UserDataResponse;
}

export interface UserDataResponse {
  phone: string;
  subscription_status: boolean;
}
