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
                    <TopMenuItem title="My Profile" pageRef='/myprofile'/>
                    <TopMenuItem title="Admin Dashboard" pageRef='/admin'/>
                </div>
            </div>
        </div>
    );
}
