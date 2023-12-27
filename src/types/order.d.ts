interface Order {
  _id?: string;
  date?: string;
  time?: string;
  id?: string;
  from?: string;
  to?: string;
  fromStreet?: string;
  toStreet?: string;
  type?: string;
  discount?: number;
  price?: number;
  aditionalInfo?: string[];
  comments?: string;
  controllerNumber?: string;
  controllerTelegram?: string;
  clientNumber?: string;
}
