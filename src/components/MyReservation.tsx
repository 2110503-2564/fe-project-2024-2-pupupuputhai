"use client";

import { useSession } from "next-auth/react";
import getReservations from "@/libs/reservation/getReservations";
import { useEffect, useState, useRef } from "react";
import deleteReservation from "@/libs/reservation/deleteReservation";
interface UserReservation {
    _id: string;
    reserDate: string;
    restaurant: {
        name: string;
        address: string;
    };
}

export default function MyReservation({ onEditClick }: { onEditClick: (reservation: any) => void }) {
    const { data: session } = useSession();
    const [reservations, setReservations] = useState<UserReservation[]>([])
    const fetched = useRef(false)

    const onDeleteClick = async (reservationId: string) => {
        try {
            if (!session?.user?.token) {
                throw new Error("User is not authenticated");
            }
        
            const confirmDelete = window.confirm("Are you sure you want to delete this reservation?");
            if (!confirmDelete) return;
    
            await deleteReservation(session.user.token, reservationId)

            const response = await getReservations(session.user.token);
            setReservations(response.data || []);
        } catch (error) {
            console.error("Error deleting reservation:", error);
        }
    };

    useEffect(() => {
        const fetchReservations = async () => {
            if (session?.user?.token && !fetched.current) {
                try {
                    const response = await getReservations(session.user.token)
                    setReservations(response.data || [])
                    fetched.current = true
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
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
                                    onClick={() => onEditClick(reservation)}>
                                    Edit
                                </button>
                                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
                                    onClick={() => onDeleteClick(reservation._id)}>
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
