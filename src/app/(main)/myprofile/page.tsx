'use client'

import { useState } from "react";
import MyProfile from "@/components/MyProfile";
import MyReservation from "@/components/MyReservation";
import EditReservationForm from "@/components/form/EditReservation";


export default function Page() {
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

    return (
        <>
            <h1 className="text-3xl font-bold text-center mb-6 mt-20">My Profile</h1>
            <div className="flex justify-between px-20 gap-8">
                <MyProfile />
                <MyReservation key={refreshKey} onEditClick={handleEditClick} />
            </div>

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
        </>
    );
}
