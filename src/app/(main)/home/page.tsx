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
    useEffect(() => {
        const fetchData = async () => {
            const Restaurants = await getRestaurants(page,search);
            setRestaurant(Restaurants);
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
                <button onClick={() => setPage((prev) => prev-1)} className="text-2xl">❮</button>
                <div className="flex items-center bg-gray-300 rounded-full mx-2">
                {/* {Array.from({ length: totalPages }, (_, i) => (
                    <button
                    key={i + 1}
                    onClick={() => handlePageClick(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full mx-1 transition-colors ${page === i + 1 ? 'bg-red-500 text-white' : 'text-gray-700'}`}
                    >
                    {i + 1}
                    </button>
                ))} */}
                   <p className="mx-2">{page}</p> 
                </div>
                <button onClick={() => setPage((prev) => prev+1)} className="text-2xl">❯</button>
            </div>

        </main>
    )
}