"use client";

import { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import DateReserve from "@/components/DateReserve"
import { useSession } from "next-auth/react";
import editReservation from "@/libs/reservation/editReservation";


export default function EditReservationForm({ reservation, onClose, onUpdate }: { 
    reservation: any; 
    onClose: () => void 
    onUpdate: () => void;
}) {
    const { data: session } = useSession();
    const name = session?.user.name || "";
    const [dateTime, setDateTime] = useState(dayjs(reservation.reserDate));
    const nameRestaurant = reservation.restaurant.name;
    
    

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!dateTime) {
            alert("Please select a date and time.");
            return;
        }

        try {
            if (!session?.user?.token) {
                throw new Error("User is not authenticated");
            }

            await editReservation(session.user.token, reservation._id, {
                reserDate: dateTime.toISOString(),
            });

            alert("Reservation updated successfully!");
            onUpdate()
            onClose();
        } catch (error) {
            console.error("Failed to update reservation:", error);
            alert("Failed to update reservation.");
        }
    };

    return (
        <div className="flex flex-col items-center mt-[70px] mb-[50px] gap-6">
            <Card className="w-full max-w-md shadow-lg bg-white rounded-2xl">
                <CardContent>
                    <Typography variant="h5" className="text-center font-semibold mb-4 p-4">
                        Existing Reservation Info
                    </Typography>
                    <Typography variant="body1" className="p-1"><strong>Name :</strong> {name}</Typography>
                    <Typography variant="body1" className="p-1"><strong>Last Date & Time :</strong> {dateTime.format("YYYY-MM-DD HH:mm")}</Typography>
                    <Typography variant="body1" className="p-1"><strong>Restaurant Name :</strong> {nameRestaurant}</Typography>
                </CardContent>
            </Card>

            <div className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl">
                <h2 className="text-2xl font-semibold text-center mb-4">Edit Reservation</h2>
                <div className="flex justify-center items-center w-full">
                    <form className="flex flex-col gap-4 w-full max-w-sm items-center" onSubmit={handleEdit}>
                        <DateReserve
                            defaultValue={dateTime}
                            onDateChange={(value: Dayjs) => setDateTime(value)} 
                        />
                        <Button type="submit" variant="contained" color="primary" className="w-[80%]">
                            Save Changes
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
