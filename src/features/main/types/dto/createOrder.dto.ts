export type CreateOrderDto = {
    from: string;
    to: string;
    fulladdressstart: string;
    fulladdressend: string;
    date: Date;
    time: string;
    tariffId: string;
    paymentMethod: string;
    countPeople: string;
    isBaggage: boolean | string;
    isBaby: boolean;
    isBuster: boolean;
    isAnimal: boolean;
    comment: string;
    price?: number;
}