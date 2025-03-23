import Promotion from "@/components/HomeComponent/Promotion";
import RestaurantSector from "@/components/HomeComponent/RestaurantSector";
import getRestaurants from "@/libs/getRestaurant";


export default function HomePage(){
    const Restaurants = getRestaurants()
    return(
        <main>
            <Promotion/>
            <RestaurantSector restaurantJson={Restaurants}/>
        </main>
    )
}