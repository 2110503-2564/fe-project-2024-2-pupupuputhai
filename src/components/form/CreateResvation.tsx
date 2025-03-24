"use client";

import { useState } from "react";
import { TextField, Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import DateReserve from "@/components/DateReserve";

export default function CreateReservationForm() {
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState<string>("Bloom");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการ reload หน้า

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!dateTime) {
      alert("Please select a date and time.");
      return;
    }

    console.log("Reservation Details:", {
      name,
      date: dateTime.format("YYYY-MM-DD HH:mm"), // แปลงเป็น format ที่อ่านง่าย
      location,
    });

    alert(`Reservation Created!\nName: ${name}\nDate & Time: ${dateTime.format("YYYY-MM-DD HH:mm")}\nLocation: ${location}`);
  };

  return (
    <div className="flex justify-center items-center mt-[80px] mb-[50px]">
      <div className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Create Reservation</h2>

        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <TextField
            name="Name"
            label="Your Name"
            variant="standard"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />

          <DateReserve
            onDateChange={(value: Dayjs) => setDateTime(value)}
            onLocationChange={(value: string) => setLocation(value)}
          />

          <Button type="submit" variant="contained" color="primary">
            Create Reservation
          </Button>
        </form>
      </div>
    </div>
  );
}
