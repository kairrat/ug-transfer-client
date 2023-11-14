import { Car } from "@components/icons/Car";
import { Controller } from "@components/icons/Controller";
import { DriverController } from "@components/icons/DriverController";
import { Subscription } from "../../types/subsciption";
import { UserRole } from "../../types/role";

export const subscriptions: Subscription[] = [
  {
    title: "Водитель",
    icon: Car,
    description:
      "Lorem ipsum dolor sit amet consectetur. Dignissim porttitor eu ullamcorper velit at. Sed eget malesuada cursus tellus. Euismod.",
    price: "250",
    expires: "12.12.2023",
    role: UserRole.DRIVER,
    isActive: true,
  },
];
