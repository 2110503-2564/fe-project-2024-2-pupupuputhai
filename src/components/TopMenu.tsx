import Image from 'next/image'
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';


export default async function TopMenu() {

    return (
        <div className="w-full bg-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex items-center justify-between h-[60px]">
                {/* Logo ด้านซ้าย */}
                <Link href="/" className="flex items-center space-x-3 cursor-pointer">
                    <Image 
                        src={'/image/logo.png'}
                        alt='logo'
                        width={45} 
                        height={45}
                        className="cursor-pointer"
                    />
                    <span className="text-xl font-bold text-gray-700">MyWebsite</span>
                </Link>

                {/* เมนูด้านขวา */}
                <div className="flex items-center space-x-6">
                    <TopMenuItem title="Home" pageRef='/'/>
                    <TopMenuItem title="My Booking" pageRef='/mybooking'/>
                    <TopMenuItem title="Admin Dashboard" pageRef='/admin'/>
                </div>
            </div>
        </div>
    );
}
        // <div className="flex items-center justify-between px-4 py-2">
        //     <Image 
        //         src={'/image/logo.png'}
        //         alt='logo'
        //         width={50} 
        //         height={50}
        //     />

        //     <div className="flex items-center space-x-4 ml-auto">
                
        //         {/* ทำ check 
        //             guest ให้มี Sign In, Sign Up
        //             User, Admin มี Sign out
        //         */}
        //         {/* {session ? (
        //             <Link href="/api/auth/signout">
        //                 <div className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300">
        //                     Sign-Out
        //                 </div>
        //             </Link>
        //         ) : (
        //             <Link href="/api/auth/signin">
        //                 <div className="px-4 py-2 bg-cyan-500 text-white rounded-md shadow-md hover:bg-cyan-600 transition duration-300">
        //                     Sign-In
        //                 </div>
        //             </Link>
        //         )} */}

        //         <TopMenuItem title="Home" pageRef='/'/>
        //         <TopMenuItem title="My Booking" pageRef='/mybooking'/>
        //         {/* check permission */}
        //         <TopMenuItem title="Admin Dashboard" pageRef='/admin'/>
        //     </div>
        // </div>