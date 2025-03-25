'use client'
import Promotion from "@/components/HomeComponent/Promotion";
import RestaurantSector from "@/components/HomeComponent/RestaurantSector";
import getRestaurants from "@/libs/getRestaurants";
import { LinearProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage(){
    const [restaurant,setRestaurant] = useState<RestaurantJson | null>(null)
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [next,setNext] = useState(true);
    const [prev,setPrev] = useState(true);
   
    useEffect(() => {
        const fetchData = async () => {
            const Restaurants = await getRestaurants(page,10,search);
            setRestaurant(Restaurants);
            if(!Restaurants.pagination.next){
                console.log(`not have next ${Restaurants.pagination.next}`)
                setNext(false)
            }else if(Restaurants.pagination.next){
                setNext(true)
            }
            if(!Restaurants.pagination.prev){
                console.log(`not have prev ${Restaurants.pagination.prev}`)
                setPrev(false)
            }else if(Restaurants.pagination.prev){
                setPrev(true)
            }
            // console.log(Restaurants)
        };
        fetchData();    
    },[page, search]);
    // console.log(`->>>>>>>>>>>>>>>>> ${Restaurants}`)
    if(!restaurant)return(
            <p className="text-center text-lg mt-5">loading ...<LinearProgress/></p>
    ) 
    
    return(
        <main className="bg-gradient-to-r from-purple-400 to-rose-500 grid justify-items-stretch">
            <Promotion/>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-5 px-5 m-4">
                {restaurant?.data.map((item:RestaurantItem) => (
                    <Link href={`/home/restaurant/${item._id}`}>
                    
                        <div className='w-full h-[400px] rounded-lg shadow-lg bg-white border-2 border-solid'>
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
                                
                                {/* <button className="w-[90%] rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 
                                    px-3 py-2 text-white justify-self-center"
                                >
                                    Veiw Details
                                </button> */}
                                
                            </div>
                        </div>
                    </Link>
                    
                ))}
            </div>
            <div className="flex flex-row justify-self-center">
                
                {prev ? 
                    <button onClick={() => setPage((prev) => prev-1)} className="text-2xl">❮</button>
                    :
                    ''
                }
                <div className="flex items-center bg-gray-300 rounded-full mx-2">
                   <p className="mx-2">{page}</p> 
                </div>
                {next?
                   <button onClick={() => setPage((prev) => prev+1)} className="text-2xl">❯</button>  
                   :
                   ''
                }
               
            </div>

        </main>
    )
}