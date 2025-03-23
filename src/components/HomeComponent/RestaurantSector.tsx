import Image from "next/image"
import Link from "next/link"



export default async function RestaurantSector( {restaurantJson}:{ restaurantJson:Promise<RestaurantJson> }){
    const restaurant = await restaurantJson


    return(
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-5 m-4">
            {restaurant.data.map((item:RestaurantItem) => (
            <Link href={`/home/restaurant/${item.id}`}>
                <div className='w-full h-[320px] rounded-lg shadow-lg bg-white border-2 border-solid'>
                <div className='w-full h-[70%] relative rounded-t-lg'>
                    <Image src={item.image}
                    alt='table'
                    fill={true}
                    className='object-cover rounded-t-lg'             
                />
                </div>
                    <div className='w-full h-[15%]'>
                        <h2 className='text-blue-600 dark:text-sky-400 pt-[10px] pl-[5px]'>{item.name}</h2>
                        <h6 className='text-slate-600 dark:text-slate-400  p-[5px]'>{item.open_time} - {item.close_time}</h6>
                    </div>
                </div>
            </Link>
                
            ))}
        </div>
    )
}