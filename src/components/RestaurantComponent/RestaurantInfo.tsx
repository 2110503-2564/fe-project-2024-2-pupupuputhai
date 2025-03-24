// import Image from "next/image";

// export default function RestaurantInfo({RestaurantJson} : {RestaurantJson:Promise<RestaurantItem>}){
    
//     return (
//         <div className="flex flex-row ">
//             <div className="bg-emerald-100 w-1/2">
//                 <p className="ml-3 font-semibold text-lg">{restaurant.name}</p>
//                 <Image src={restaurant.image}
//                     alt={`${restaurant.name} image`}
//                     width={0} height={0} sizes="100vw"
//                     className="rounded-lg w-full"
//                 />
//                 <p className="ml-3 mt-4 mb-4">open time - close time:  {restaurant.open_time} - {restaurant.close_time}</p>
//             </div>
            
//             <div className="relative  flex flex-col bg-emerald-100 w-1/2 p-4 pt-10">
//                 <div className="text-md mx-5 p-5 text-slate-900">
//                     { restaurant.description }
//                 </div>
//                 <div className="text-md mx-5 p-5  text-slate-900 ">
//                     address : {restaurant.address}
//                 </div>    
//                 <div className="text-sm mx-5 p-5 pb-10  text-slate-900 ">
//                         tel: {restaurant.tel}
//                 </div> 
//                 {/* <Link href={`/booing?id=${params.vid}&venue=${VenueDetail.data.name}`}> */}
//                 <button className="absolute right-2 bottom-2 rounded-md bg-gradient-to-r from-red-700 to-red-500 
//                     px-3 py-2 text-white transition-transform duration-300 transform hover:scale-105 hover:opacity-90"

//                 >
//                     Book Now
//                 </button>


//                 {/* </Link> */}
//             </div>
//         </div>
//     )
// }