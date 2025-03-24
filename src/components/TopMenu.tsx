"use client"; // ทำให้เป็น Client Component

import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function TopMenu() {
    const { data: session } = useSession(); 

    return (
        <div className="w-full bg-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex items-center justify-between h-[60px]">
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

                <div className="flex items-center space-x-6">
                    <TopMenuItem title="Home" pageRef='/home' />
                    <TopMenuItem title="My Profile" pageRef='/myprofile' />
                    <TopMenuItem title="Admin Dashboard" pageRef='/admindashboard' />
                </div>

                <div className="px-4">
                    {session ? (
                        <button
                            onClick={() => signOut()}
                            className="text-brown-700 text-sm font-semibold relative hover:underline"
                        >
                            Sign-Out of {session.user?.name}
                        </button>
                    ) : (
                        <Link href="/login" className="text-brown-700 text-sm font-semibold relative hover:underline">
                            Sign-In
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
