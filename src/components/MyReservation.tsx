"use client";

import { useSession } from "next-auth/react";
import getReservations from "@/libs/reservation/getReservations";
import { useEffect, useState } from "react";

interface UserReservation {
    _id: string;
    reserDate: string;
    restaurant: {
        name: string;
        address: string;
    };
}

export default function MyReservation() {
    const { data: session } = useSession();
    const [reservations, setReservations] = useState<UserReservation[]>([])

    useEffect(() => {
        const fetchReservations = async () => {
            if (session?.user?.token) {
                try {
                    const response = await getReservations(session.user.token)
                    console.log("Fetched Data:", response.data)
                    setReservations(response.data || [])
                } catch (error) {
                    console.error("Failed to fetch reservations:", error)
                }
            }
        };

        fetchReservations();
    }, [session]);

    if (!session || !session.user.token) {
        return null;
    }

    return (
        <div className="w-2/3 bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Reservations</h2>

            {reservations.length > 0 ? (
                <ul className="space-y-4">
                    {reservations.map((reservation) => (
                        <li key={reservation._id} className="p-4 border border-gray-300 bg-white rounded-lg shadow-sm">
                            <div><strong>Date:</strong> {new Date(reservation.reserDate).toLocaleString()}</div>
                            <div><strong>Restaurant:</strong> {reservation.restaurant.name}</div>
                            <div><strong>Address:</strong> {reservation.restaurant.address}</div>
                            
                            <div className="flex space-x-3 mt-4">
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
                                    Edit
                                </button>
                                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow">
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No reservations yet.</p>
            )}
        </div>
    );
}
