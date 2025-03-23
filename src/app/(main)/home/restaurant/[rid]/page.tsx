import Image from "next/image"
import Link from "next/link"
import { FaRegCommentDots } from "react-icons/fa";

export default function RestaurantPage({params} : {params:{rid:string}}){
    let restaurant:RestaurantItem = {id:'001' , name:'resDee' , address:'123 street',tel:'222-333-4444',open_time:'9:00',close_time:'20:00',image:'/image/bloom.jpg' , description:'lsdkjfsdlkjfsldkjflksdjflksdjafwiejfowioefnvoenv'}
    // let comments:CommentItem = {user:'001', restaurant:'001',comment:'อาาา หร่อยยย',createAt:'12/03/2077 11:13'}
    const comments = [
        {user:'001', restaurant:'001',comment:'อาาา หร่อยยย',createAt:'12/03/2077 11:13'},
        {user:'001', restaurant:'001',comment:'อาาา หร่อยยย',createAt:'12/03/2077 11:13'},
        {user:'001', restaurant:'001',comment:'อาาา หร่อยยย',createAt:'12/03/2077 11:13'},
        {user:'001', restaurant:'001',comment:'อาาา หร่อยยย',createAt:'12/03/2077 11:13'}
    ]
    return(
        <div>
            <div className="flex flex-row ">
                
                <div className="bg-emerald-100 w-1/2">
                    <p className="ml-3 font-semibold text-lg">{restaurant.name}</p>
                    <Image src={restaurant.image}
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
                        address : {restaurant.address}
                    </div>    
                    <div className="text-sm mx-5 p-5 pb-10  text-slate-900 ">
                         tel: {restaurant.tel}
                    </div> 
                    {/* <Link href={`/booing?id=${params.vid}&venue=${VenueDetail.data.name}`}> */}
                    <button className="absolute right-2 bottom-2 rounded-md bg-gradient-to-r from-red-700 to-red-500 
                        px-3 py-2 text-white transition-transform duration-300 transform hover:scale-105 hover:opacity-90"

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
                        <div className="place-items-end mr-3">
                            <FaRegCommentDots />    
                        </div>    
                        {
                            comments.map((comment) => (
                                <div className="rounded-lg bg-white p-3 m-2">
                                    <div className="flex flex-row relative ">
                                        <div className={`size-10 rounded-full inline bg-[url(/image/bloom.jpg)]`}/>
                                        
                                        <div className="flex flex-col pl-3">
                                            <p className="text-black">{comment.user}</p>
                                            <p className="text-xs text-black">{comment.createAt}</p>
                                        </div>

                                        <div className="flex flex-row gap-1 pt-1 absolute right-2">
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
                        }    
                    </div>
                    
                {/* </div> */}
            </div>
          
        </div>
    )
}