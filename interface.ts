
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
  user:string ,
  restaurant: string,
  comment: string,
  createAt: string
}