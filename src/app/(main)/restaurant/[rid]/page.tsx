import Image from "next/image"
import Link from "next/link"

export default function RestaurantPage({params} : {params:{rid:string}}){
    let restaurant:RestaurantItem = {_id:'001' , name:'resDee' , address:'123 street',tel:'222-333-4444',open_time:'9:00',close_time:'20:00',image:['/image/bloom.jpg'] , description:'lsdkjfsdlkjfsldkjflksdjflksdjafwiejfowioefnvoenv'}
    const comments = [
        {user:'001', restaurant:'001',comment:'อาาา หร่อยยย',createAt:'12/03/2077 11:13'},
        {user:'001', restaurant:'001',comment:'อาาา หร่อยยย',createAt:'12/03/2077 11:13'},
        {user:'001', restaurant:'001',comment:'อาาา หร่อยยย',createAt:'12/03/2077 11:13'},
        {user:'001', restaurant:'001',comment:'อาาา หร่อยยย',createAt:'12/03/2077 11:13'}
    ]
    return(
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Left Section - Only Image */}
                <div className="bg-emerald-100 md:w-1/2 flex justify-center items-center p-6">
                    <Image 
                        src={'/image/bloom.jpg'} 
                        alt={`${restaurant.name} image`} 
                        width={500} 
                        height={300} 
                        className="rounded-lg w-full h-60 object-cover"
                    />
                </div>

                {/* Right Section - Details */}
                <div className="relative flex flex-col bg-emerald-100 md:w-1/2 p-6 justify-center">
                    <p className="text-2xl font-semibold text-gray-800">{restaurant.name}</p>
                    <p className="mt-4 text-md text-gray-800 leading-relaxed">{restaurant.description}</p>
                    <p className="mt-4 text-md text-gray-800 font-medium">Address: {restaurant.address}</p>
                    <p className="mt-2 text-sm text-gray-700">Tel: {restaurant.tel}</p>
                    <p className="mt-4 text-gray-700 text-lg">
                        Open Time - Close Time: <span className="font-medium">{restaurant.open_time} - {restaurant.close_time}</span>
                    </p>
                    <button 
                        className="absolute right-4 bottom-4 rounded-md bg-gradient-to-r from-red-700 to-red-500 px-4 py-2 text-white 
                        transition-transform duration-300 transform hover:scale-105 hover:opacity-90 shadow-md"
                    >
                        Book Now
                    </button>
                </div>
            </div>


            {/* Comment Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
                <div className="rounded-md bg-gray-100 p-4 shadow-sm">
                    {comments.map((comment, index) => (
                        <div key={index} className="bg-white p-4 m-2 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div 
                                    className="w-10 h-10 rounded-full bg-cover bg-center" 
                                    style={{ backgroundImage: 'url(/image/bloom.jpg)' }}
                                />
                                <div className="ml-3">
                                    <p className="text-black font-medium">{comment.user}</p>
                                    <p className="text-xs text-gray-600">{comment.createAt}</p>
                                </div>
                                <div className="ml-auto flex space-x-1">
                                    <div className="w-2 h-2 bg-black rounded-full" />
                                    <div className="w-2 h-2 bg-black rounded-full" />
                                    <div className="w-2 h-2 bg-black rounded-full" />
                                </div>
                            </div>
                            <p className="mt-2 text-gray-800">{comment.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}