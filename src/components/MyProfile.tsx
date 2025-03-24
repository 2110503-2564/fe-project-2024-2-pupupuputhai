"use client";

import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/auth/userGetMe";
import { useEffect, useState } from "react";

interface UserProfile {
    name: string;
    email: string;
    tel: string;
}

export default function MyProfile() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<UserProfile | null>(null);

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

    if (!session || !session.user.token) {
        return null
    }

    return (
        <div className="w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">User Information</h2>
            <div className="space-y-2">
                <div><strong>Name:</strong> {profile?.name || "Loading..."}</div>
                <div><strong>Email:</strong> {profile?.email || "Loading..."}</div>
                <div><strong>Phone:</strong> {profile?.tel || "Loading..."}</div>
            </div>
        </div>
    );
}
