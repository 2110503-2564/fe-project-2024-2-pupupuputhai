'use client'
import getComments from "@/libs/getComments";
import getRestaurant from "@/libs/getRestaurant";
import Image from "next/image"
import { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { LinearProgress } from "@mui/material";
import BookingModal from "@/components/form/BookingModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RestaurantPage({params} : {params:{rid:string}}){
   
    const router = useRouter();
    const { data: session } = useSession();  
    const [restaurant, setRestaurant] = useState<RestaurantItem | null>(null);
    const [comments, setComments] = useState<CommentItem[]>([])
    const [showModal, setShowModal] = useState(false);
    const [imageIndex,setImageIndex] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const res = await getRestaurant(params.rid);
            const com = await getComments(params.rid);
            setRestaurant(res.data);
            setComments(com.data);
        };
        fetchData();
    }, [params.rid]);

    if(!restaurant)return(
        <p className="text-center text-lg mt-5">loading ...<LinearProgress/></p>
    )
    return(
        <div>
            <div className="flex flex-row ">
                
                <div className="bg-emerald-100 w-1/2"
                    onClick={() => {
                        setImageIndex((prev) => (restaurant.image ? (prev + 1) % restaurant.image.length : 0));
                    }}
                >
                    <p className="ml-3 font-semibold text-lg">{restaurant.name}</p>
                    <Image src={restaurant.image[imageIndex]}
                        alt={`${restaurant.name} image`}
                        width={0} height={0} sizes="100vw"
                        className="rounded-lg w-full"
                    />
                    <p className="ml-3 mt-4 mb-4">open time - close time:  {restaurant.open_time} - {restaurant.close_time}</p>
                </div>
                
                <div className="relative  flex flex-col bg-emerald-100 w-1/2 p-4 pt-10">
                    <div className="text-md mx-5 p-5 text-slate-900">
                        { restaurant.description }
                    </div>
                    <div className="text-md mx-5 p-5  text-slate-900 ">
                        address: {restaurant.address}
                    </div>    
                    <div className="text-sm mx-5 p-5 pb-10  text-slate-900 ">
                         tel: {restaurant.tel}
                    </div> 
                    {/* <Link href={`/booing?id=${params.vid}&venue=${VenueDetail.name}`}> */}
                    <button className="absolute right-2 bottom-2 rounded-md bg-gradient-to-r from-red-700 to-red-500 
                        px-3 py-2 text-white transition-transform duration-300 transform hover:scale-105 hover:opacity-90"
                        onClick={() => {
                            if(!session?.user){
                                router.push('/login')
                            }
                            // toast.success('Successfully toasted!');
                            setShowModal(true);
                        }}
                    >
                        Book Now
                    </button>


                    {/* </Link> */}
                </div>
            </div>


            <div className="mt-10">
                <div className="ml-2 text-xl font-semibold">
                    Comment
                </div>
                {/* <div className="relative"> */}
                    
                    <div className="rounded-md flex flex-col bg-slate-100 pt-2 ">
                        <div className="place-items-end mr-3"
                            onClick={() => {
                                if(!session?.user){
                                    router.push('/login')
                                }
                            }}
                        >
                            <FaRegCommentDots />    
                        </div>    
                        
                        {
                            comments.length > 0 ?
                            
                                comments.map((comment:CommentItem) => (
                                    <div className="rounded-lg bg-white p-3 m-2">
                                        <div className="flex flex-row relative ">
                                            <div className={`size-10 rounded-full inline bg-[url(/image/bloom.jpg)]`}/>
                                            
                                            <div className="flex flex-col pl-3">
                                                <p className="text-black">{comment.user}</p>
                                                <p className="text-xs text-black">{comment.createAt}</p>
                                            </div>

                                            <div className="flex flex-row gap-1 pt-1 absolute right-2"
                                                
                                            >
                                                <div className="rounded-full size-2 bg-black"/>
                                                <div className="rounded-full size-2 bg-black"/>
                                                <div className="rounded-full size-2 bg-black"/>
                                            </div>
                                        </div>
                                        <div>
                                            {comment.comment}
                                        </div>
                                    </div>

                                ))
                            
                        :
                            <div className="text-center text-2xl m-10">
                                No Comment
                            </div>
                        }
                    </div>
                    
                {/* </div> */}
            </div>
            <BookingModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                minTime={restaurant.open_time}
                maxTime={restaurant.close_time}
                restaurantId={params.rid}
            />
            
          
        </div>
    )
}