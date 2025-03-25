

interface RestaurantJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: RestaurantItem[]
}
interface RestaurantItem {
  _id: string ,
  name: string,
  address:string,
  tel:string,
  open_time:string,
  close_time:string,
  image:string[],
  description:string
}

interface CommentItem {
  _id:string,
  user:string ,
  imagesUser:string,
  nameUser:string,
  restaurant: string,
  comment: string,
  createAt: string
}

interface User {
    _id: string,
    name: string,
    email: string,
    role: string,
    tel: string,
    createdAt: string,
    token: string
}

interface Reservation {
  _id: string;
  reserDate: string;
  user: string;
  nameUser?: string;
  restaurant: {
    _id: string;
    name: string;
    address: string;
    tel: string;
  };
  createdAt: string;
}

interface ReservationResponse {
  success: boolean;
  count: number;
  data: Reservation[];
}