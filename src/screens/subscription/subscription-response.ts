import { UserRoleBackend } from "../../types/role";

export interface IGetSubscriptionTypes {
  data: ISubscriptionType[];
}

export interface ISubscriptionType {
  _id: string;
  type: UserRoleBackend;
  price: number;
  description: string;
  __v: number;
}
