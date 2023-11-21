export interface IUsersDriverInfoResponse {
  __v: number;
  _id: string;
  carPhotoArray: string[]; // Замените "any" на конкретный тип, если известен
  code: string | null; // Замените "any" на конкретный тип, если известен
  passportArray: string[]; // Замените "any" на конкретный тип, если известен
  phone: string;
  regComplete: RegComplete;
  subscription_status: boolean;
}
export enum RegComplete {
  IN_PROGRESS = "in_progress", //Пользователь подтверждает номер телефона кодом
  SUBSCRIBED = "subscribed", //Пользователь покупает подписку
  VERIFYING = "verifying", //Пользователь отправил данные которые ввёл на проверку
  COMPLETE = "complete", //Админ подтвердил пользователя
  REJECTED = "rejected", //Админ отказал пользователю
}
