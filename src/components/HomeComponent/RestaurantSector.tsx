import Image from "next/image"
import Link from "next/link"



export default function RestaurantSector(){

    const mockVenue = [
        {vid: '001', name: 'The Bloom Pavilion', img:'/image/bloom.jpg', openTime: '9:00', closeTime: '20:00', tel: '012-345-6789', address: '123 Flower St, Garden City', description: 'A beautiful venue surrounded by vibrant flowers and nature.'},
        {vid: '002', name: 'Spark Space', img:'/image/sparkspace.jpg', openTime: '9:00', closeTime: '20:00', tel: '098-765-4321', address: '456 Innovation Ave, Tech Park', description: 'A modern coworking space with high-speed internet and ergonomic seating.'},
        {vid: '003', name: 'The Grand Table', img:'/image/grandtable.jpg', openTime: '9:00', closeTime: '20:00', tel: '011-223-3445', address: '789 Feast Rd, Culinary Town', description: 'A spacious dining area perfect for banquets and special occasions.'},
        {vid: '002', name: 'Spark Space', img:'/image/sparkspace.jpg', openTime: '9:00', closeTime: '20:00', tel: '098-765-4321', address: '456 Innovation Ave, Tech Park', description: 'A modern coworking space with high-speed internet and ergonomic seating.'},
        {vid: '002', name: 'Spark Space', img:'/image/sparkspace.jpg', openTime: '9:00', closeTime: '20:00', tel: '098-765-4321', address: '456 Innovation Ave, Tech Park', description: 'A modern coworking space with high-speed internet and ergonomic seating.'},
        {vid: '002', name: 'Spark Space', img:'/image/sparkspace.jpg', openTime: '9:00', closeTime: '20:00', tel: '098-765-4321', address: '456 Innovation Ave, Tech Park', description: 'A modern coworking space with high-speed internet and ergonomic seating.'},
        {vid: '002', name: 'Spark Space', img:'/image/sparkspace.jpg', openTime: '9:00', closeTime: '20:00', tel: '098-765-4321', address: '456 Innovation Ave, Tech Park', description: 'A modern coworking space with high-speed internet and ergonomic seating.'},
    ];
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-5 m-4">
            {mockVenue.map((item, index) => (
                <div key={index} className="w-full h-auto rounded-lg shadow-lg bg-white border-2 border-solid p-4">
                    <div className="w-full h-[200px] relative rounded-t-lg">
                        <Image src={item.img}
                            alt={item.name}
                            fill={true}
                            className="object-cover rounded-t-lg"
                        />
                    </div>
                    <div className="mt-4">
                        <h2 className="text-blue-600 dark:text-sky-400 text-lg font-semibold">{item.name}</h2>
                        <h6 className="text-slate-600 dark:text-slate-400">{item.openTime} - {item.closeTime}</h6>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm"><strong>Tel:</strong> {item.tel}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm"><strong>Address:</strong> {item.address}</p>
                    </div>
                </div>
            ))}
        </div>
    );
    
}