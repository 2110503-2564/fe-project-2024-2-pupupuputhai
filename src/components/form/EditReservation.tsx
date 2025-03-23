"use client";

import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import DateReserve from "@/components/DateReserve";

export default function EditReservationForm() {
    const existingData = {
        name: "John Doe",
        dateTime: dayjs("2025-04-01T12:00"),
        location: "Bloom",
    };

    const [name, setName] = useState(existingData.name);
    const [dateTime, setDateTime] = useState<Dayjs | null>(existingData.dateTime);
    const [location, setLocation] = useState<string>(existingData.location);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Please enter your name.");
            return;
        }

        if (!dateTime) {
            alert("Please select a date and time.");
            return;
        }

        console.log("Updated Reservation Details:", {
            name,
            date: dateTime.format("YYYY-MM-DD HH:mm"),
            location,
        });

        alert(`Reservation Updated!\nName: ${name}\nDate & Time: ${dateTime.format("YYYY-MM-DD HH:mm")}\nLocation: ${location}`);
    };

    return (
        <div className="flex flex-col items-center mt-[70px] mb-[50px] gap-6">
            {/* Show existing data */}
            <Card className="w-full max-w-md shadow-lg bg-white rounded-2xl">
                <CardContent>
                    <Typography variant="h5" className="text-center font-semibold mb-4">
                        Existing Reservation Info
                    </Typography>
                    <Typography variant="body1"><strong>Name:</strong> {existingData.name}</Typography>
                    <Typography variant="body1"><strong>Date & Time:</strong> {existingData.dateTime.format("YYYY-MM-DD HH:mm")}</Typography>
                    <Typography variant="body1"><strong>Location:</strong> {existingData.location}</Typography>
                </CardContent>
            </Card>

            {/* Edit Form */}
            <div className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl">
                <h2 className="text-2xl font-semibold text-center mb-4">Edit Reservation</h2>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                    <TextField
                        name="Name"
                        label="Your Name"
                        variant="standard"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <DateReserve
                        onDateChange={(value: Dayjs) => setDateTime(value)}
                        onLocationChange={(value: string) => setLocation(value)}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    );
}
