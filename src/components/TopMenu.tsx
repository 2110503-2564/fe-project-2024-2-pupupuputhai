"use client"; // Ensures this component is treated as a client-side component

import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import getUserProfile from "@/libs/auth/userGetMe";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 

interface UserProfile {
    name: string;
    email: string;
    tel: string;
    role: string;
}

export default function TopMenu() {
    const { data: session } = useSession(); 
    const [profile, setProfile] = useState<UserProfile | null>(null);
    
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            if (session?.user?.token) {
                try {
                    const data = await getUserProfile(session.user.token);
                    setProfile(data.data);
                } catch (error) {
                    console.error("Failed to fetch profile:", error);
                }
            }
        };

        fetchProfile();
    }, [session]);

    const handleSignOut = async () => {
        await signOut({ redirect: false }); 
        router.push('/home'); 
    };

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
                    {session ? (
                        <button
                            onClick={handleSignOut} 
                            className="hover:underline"
                        >
                            Sign-Out of {session.user?.name}
                        </button>
                    ) : (
                        <Link href="/login" className="hover:underline">
                            Sign-In
                        </Link>
                    )}
                    {(session && profile?.role!='admin') ? (
                        <TopMenuItem title="My Profile" pageRef='/myprofile' />
                    ) : (null)}
                    {(session && profile?.role=='admin') ? (
                        <TopMenuItem title="Admin Dashboard" pageRef='/admindashboard' />
                    ) : (null)}
                </div>
            </div>
        </div>
    );
}
