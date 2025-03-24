import Image from "next/image"
import Link from "next/link"
// import { useRouter } from "next/navigation"

// 📍
export default async function RestaurantSector( {restaurantJson}:{ restaurantJson:Promise<RestaurantJson> }){
    const restaurant = await restaurantJson
    // const router = useRouter();
    console.log('here------------->',restaurant);

    return(
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-5 m-4">
            {restaurant.data.map((item:RestaurantItem) => (
                <Link href={`/home/restaurant/${item._id}`}>
                
                    <div className='w-full h-[370px] rounded-lg shadow-lg bg-white border-2 border-solid'>
                        <div className='w-full h-[60%] relative rounded-t-lg'>
                            <Image src={item.image[0]}
                            alt='table'
                            fill={true}
                            className='object-cover rounded-t-lg'             
                        />
                        </div>
                        <div className='w-full h-[35%] grid justify-items-stretch'>
                            <p className='text-blue-600 dark:text-sky-400 pt-[10px] pl-[5px]'>{item.name}</p>
                            <p className='text-slate-600 dark:text-slate-400  p-[5px]'>⏰{item.open_time}-{item.close_time}</p>
                            <p className='text-slate-600 dark:text-slate-400  p-[5px]'>📍{item.address}</p>
                            
                            <button className="w-[90%] rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 
                                px-3 py-2 text-white justify-self-center"
                            >
                                Veiw Details
                            </button>
                            
                        </div>
                    </div>
                </Link>
                
            ))}
        </div>
    )
}