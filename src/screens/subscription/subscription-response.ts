import { UserRoleBackend } from "../../types/role";

export interface IGetSubscriptionTypes {
  data: ISubscriptionType[];
}

export interface ISubscriptionType {
  _id: string;
  type: UserRoleBackend;
  price: {
    $numberDecimal: string;
  };
  __v: number;
}
