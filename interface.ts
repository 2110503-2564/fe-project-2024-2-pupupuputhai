interface VenueItem {
  _id: string,
  name: string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  tel: string,
  picture: string,
  dailyrate: number,
  __v: number,
  id: string
}

interface VenueJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: VenueItem[]
}

interface BookingItem {
  nameLastname: string;
  tel: string;
  venue: string;
  bookDate: string;
}

interface RestaurantJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: RestaurantItem[]
}
interface RestaurantItem {
  id: string ,
  name: string,
  address:string,
  tel:string,
  open_time:string,
  close_time:string,
  image:string[],
  description:string
}

interface CommentItem {
  user:string ,
  restaurant: string,
  comment: string,
  createAt: string
}