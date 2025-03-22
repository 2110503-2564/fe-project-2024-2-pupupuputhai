import Image from "next/image"
import Link from "next/link"



export default function RestaurantSector(){

    const mockVenue = [
        {vid: '001', name: 'The Bloom Pavilion', img:'/image/bloom.jpg' , openTime: '9:00' , closeTime: '20:00'},
        {vid: '002', name: 'Spark Space', img:'/image/sparkspace.jpg' , openTime: '9:00' , closeTime: '20:00'},
        {vid: '003', name: 'The Grand Table', img:'/image/grandtable.jpg', openTime: '9:00' , closeTime: '20:00' },
        {vid: '002', name: 'Spark Space', img:'/image/sparkspace.jpg' , openTime: '9:00' , closeTime: '20:00'},
        {vid: '002', name: 'Spark Space', img:'/image/sparkspace.jpg' , openTime: '9:00' , closeTime: '20:00'},
        {vid: '002', name: 'Spark Space', img:'/image/sparkspace.jpg' , openTime: '9:00' , closeTime: '20:00'},
        {vid: '002', name: 'Spark Space', img:'/image/sparkspace.jpg' , openTime: '9:00' , closeTime: '20:00'},
        
    ] 

    return(
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-5 m-4">
                    {mockVenue.map((item) => (
                        // <Link href={}
                        <div className='w-full h-[320px] rounded-lg shadow-lg bg-white border-2 border-solid'>
                            <div className='w-full h-[70%] relative rounded-t-lg'>
                            <Image src={item.img}
                                alt='table'
                                fill={true}
                                className='object-cover rounded-t-lg'             
                            />
                            </div>
                            <div className='w-full h-[15%]'>
                                <h2 className='text-blue-600 dark:text-sky-400 pt-[10px] pl-[5px]'>{item.name}</h2>
                                <h6 className='text-slate-600 dark:text-slate-400  p-[5px]'>{item.openTime} - {item.closeTime}</h6>
                            </div>
                        </div>
                    ))}
        </div>
    )
}