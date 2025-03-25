'use client'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getReservations from "@/libs/reservation/getReservations";
import deleteReservation from "@/libs/reservation/deleteReservation";
import EditReservationForm from "@/components/form/EditReservation";

export default function ManageReservation() {
    const { data: session } = useSession();
    const token = session?.user.token || "";
    const [reservations, setReservations] = useState<ReservationResponse | null>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0)

    
    const handleEditClick = (reservation: any) => {
        setSelectedReservation(reservation);
        setIsEditing(true);
    };

    const handleClose = () => {
        setIsEditing(false);
        setSelectedReservation(null);
    };

    const handleUpdate = () => {
        setRefreshKey((prev) => prev + 1); 
    }

    
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
        const fetchData = async () => {
            const data = await getReservations(token);
            setReservations(data || []);
        };
        fetchData();
    }, [token]);



    return (
        <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Manage Reservations</h1>
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Restaurant</th>
                    <th className="border border-gray-300 px-4 py-2">User</th>
                    <th className="border border-gray-300 px-4 py-2">Booking Time</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
            {reservations && reservations.data?.length > 0 ? (
                reservations.data.map((reservation) => (
                    <tr key={reservation._id} className="border border-gray-300">
                        <td className="border border-gray-300 px-4 py-2">{reservation.restaurant.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{reservation.nameUser || "Unknown Name"}</td>
                        <td className="border border-gray-300 px-4 py-2">{new Date(reservation.reserDate).toLocaleString()}</td>
                        <td className="border border-gray-300 px-4 py-2 space-x-2">
                            <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleEditClick(reservation)}>Edit</button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => onDeleteClick(reservation._id)}>Delete</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={4} className="text-center py-4">No reservations found</td>
                </tr>
            )}
            </tbody>
        </table>

        {isEditing && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                    <EditReservationForm 
                        reservation={selectedReservation} 
                        onClose={handleClose}
                        onUpdate={handleUpdate}
                    />
                </div>
            </div>
        )}
        </div>
    );
}