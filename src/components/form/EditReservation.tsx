"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import DateReserve from "@/components/DateReserve"
import { useSession } from "next-auth/react";
import editReservation from "@/libs/reservation/editReservation";
import getRestaurant from "@/libs/getRestaurant";

export default function EditReservationForm({ reservation, onClose, onUpdate }: { 
    reservation: any; 
    onClose: () => void 
    onUpdate: () => void;
}) {
    const { data: session } = useSession();
    const name = reservation.nameUser || "";
    const nameRestaurant = reservation.restaurant.name;
    const [dateTime, setDateTime] = useState(dayjs(reservation.reserDate).subtract(7, "hour"));
    const [openTime, setOpenTime] = useState('')
    const [closeTime, setCloseTime] = useState('')


    useEffect(() => {
            const fetchRestaurant = async () => {
                if (session?.user?.token) {
                    try {
                        const data = await getRestaurant(reservation.restaurant._id);
                        setOpenTime(data.data.open_time)
                        setCloseTime(data.data.close_time)
                    } catch (error) {
                        console.error("Failed to fetch restaurant:", error);
                    }
                }
            };
    
            fetchRestaurant();
    }, []); 

    const checkTime = (dateTime:Dayjs): boolean => {
        if (!openTime || !closeTime) {
            console.error("Opening and closing times are not set.");
            return false;
        }

        const openTimeObj = dayjs(`${dateTime.format('YYYY-MM-DD')}T${openTime}:00`);
        let closeTimeObj = dayjs(`${dateTime.format('YYYY-MM-DD')}T${closeTime}:00`);
        
        if (closeTimeObj.isBefore(openTimeObj)) {
            closeTimeObj = closeTimeObj.add(1, "day"); 
        }

        const isAfterOpen = dateTime.isAfter(openTimeObj); 
        const isBeforeClose = dateTime.isBefore(closeTimeObj);  
        const isWithinRange = isAfterOpen && isBeforeClose;  
        
        return isWithinRange
    };
    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!dateTime) {
            alert("Please select a date and time.");
            return;
        }

        if(!checkTime(dateTime)){
            alert("Please make a reservation during the restaurant's opening/closing hours.");
            return
        }

        try {
            if (!session?.user?.token) {
                throw new Error("User is not authenticated");
            }

            await editReservation(session.user.token, reservation._id, {
                reserDate: dateTime.add(7, "hour").toISOString(),
            });


            alert("Reservation updated successfully!");
            onUpdate()
            onClose();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Failed to update reservation:", error);
                alert(`${error.message}`);
            } else {
                console.error("An unknown error occurred:", error);
                alert("Failed to update reservation. An unknown error occurred.");
            }
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
                    <Typography variant="body1" className="p-1"><strong>Open Time :</strong> {openTime}</Typography>
                    <Typography variant="body1" className="p-1"><strong>Clost Time :</strong> {closeTime}</Typography>
                </CardContent>
            </Card>

            <div className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl">
                <h2 className="text-2xl font-semibold text-center mb-4">Edit Reservation</h2>
                <div className="flex justify-center items-center w-full">
                    <form className="flex flex-col gap-4 w-full max-w-sm items-center" onSubmit={handleEdit}>
                        <DateReserve
                            onDateChange={(value: Dayjs) => {
                                setDateTime(value)
                            }} 
                            defaultValue={dateTime}
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
