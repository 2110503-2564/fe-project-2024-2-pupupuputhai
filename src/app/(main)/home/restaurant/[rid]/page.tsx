'use client'
import getComments from "@/libs/getComments";
import getRestaurant from "@/libs/getRestaurant";
import Image from "next/image"
import { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IconButton, LinearProgress, Menu, MenuItem } from "@mui/material";
import BookingModal from "@/components/form/BookingModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CommentModal from "@/components/form/CommentModal";
import getUserProfile from "@/libs/auth/userGetMe";
import EditCommentModal from "@/components/form/EditCommentModal";
export default function RestaurantPage({params} : {params:{rid:string}}){
   
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleDropdown = (commentId: string) => {
        setOpenDropdown(openDropdown === commentId ? null : commentId);
    };
    const [openEditModal, setOpenEditModal] = useState<string | null>(null);

    const toggleEditModal = (commentId: string) => {
        setOpenEditModal(openEditModal === commentId ? null : commentId);
    };


    

    const router = useRouter();
    const { data: session } = useSession();  
    const [restaurant, setRestaurant] = useState<RestaurantItem | null>(null);
    const [comments, setComments] = useState<CommentItem[]>([]);
    const [isCommentPosted, setIsCommentPosted] = useState(false);
    const [ user, setUser] = useState<User | null>(null);
    const [showResModal, setShowResModal] = useState(false);
    const [showComModal, setShowComModal] = useState(false);
    const [imageIndex,setImageIndex] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const res = await getRestaurant(params.rid);
            const com = await getComments(params.rid);
            const user = await getUserProfile(session?.user.token as string);
            // console.log('user here --->', user);
            setUser(user.data);
            setRestaurant(res.data);
            setComments(com.data);
        };
        fetchData();
    }, [params.rid , isCommentPosted]);


    
    const  handleDelete = async (id:string) => {
        try {
            const response = await fetch(`https://backend-restaurant-project.vercel.app/api/comments/${id}` ,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${session?.user.token as string}`,
                },
            })
            if(response.ok){
                setIsCommentPosted(prev => !prev)
                toast.success('delete Successfully ')
            }
            
        }catch (e) {
            toast.error('comment Fail')
            console.log('reserve fail',e)
        }
    }

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
                        priority
                        className="rounded-lg w-full h-[650px] object-cover ml-2"
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
                            setShowResModal(true);
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
                           
                        >
                            <FaRegCommentDots 
                                onClick={() => {
                                    if(!session?.user){
                                        router.push('/login')
                                    }
                                    // toast.success('hi')
                                    setShowComModal(true);
                                }}
                            />    
                        </div>    
                        
                        {
                            comments.length > 0 ?
                            
                                comments.map((comment:CommentItem) => (
                                    <div className="rounded-lg bg-white p-3 m-2">
                                        <div className="flex flex-row relative ">
                                            <div className={`size-10 rounded-full inline bg-[url(/image/bloom.jpg)]`}/>
                                            
                                            <div className="flex flex-col pl-3">
                                                <p className="text-black">{comment.nameUser || comment.user}</p>
                                                <p className="text-xs text-black">{comment.createAt}</p>
                                            </div>

                                            <div className="flex flex-row gap-1 pt-1 absolute right-2 "
                                                onClick={() => {
                                                    // console.log(`id: ${comment._id} + ${comment.user} + ${user?._id}`)
                                                    console.log(session?.user)
                                                    if( (session?.user.role !== 'admin') && (user?._id !== comment.user))return
                                                    toggleDropdown(comment._id);
                                                }}
                                            >
                                                <div className="rounded-full size-2 bg-black"></div>
                                                <div className="rounded-full size-2 bg-black"></div>
                                                <div className="rounded-full size-2 bg-black"></div>
                                                {openEditModal === comment._id && <EditCommentModal
                                                    onClose={(c:string) => toggleEditModal(c)}
                                                    commentId={comment._id}
                                                    name={session?.user.name as string} 
                                                    oldComment={comment.comment}
                                                    img={""}
                                                    posted={() =>setIsCommentPosted(prev => !prev)}
                                                />
                                                }
                                                {openDropdown === comment._id && (
                                                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                                                        <button className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                                                            onClick={() => {
                                                                toggleEditModal(comment._id);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                                                            onClick={() => {
                                                                // toggleEditModal(comment._id);
                                                                handleDelete(comment._id);

                                                            }}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-3">
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
                isOpen={showResModal}
                onClose={() => setShowResModal(false)}
                minTime={restaurant.open_time}
                maxTime={restaurant.close_time}
                restaurantId={params.rid}
            />

            <CommentModal
                isOpen={showComModal}
                onClose={() => setShowComModal(false)}
                restaurantId={params.rid}
                name={session?.user.name as string}
                img={""}
                posted={() =>setIsCommentPosted(prev => !prev)}
            />
            
           
            
          
        </div>
    )
}