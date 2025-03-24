'use client'

import { useState } from "react"
import { DateTimePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Select, MenuItem } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"

export default function DateReserve({ onDateChange, onLocationChange }: { onDateChange: Function, onLocationChange: Function }) {

    const [dateTime, setDateTime] = useState<Dayjs | null>(null);
    const [location, setLocation] = useState("Bloom");

    const changeLocationState = (e: any) => {
        const newLocation = e.target.value;
        setLocation(newLocation);
        onLocationChange(newLocation);
    }

    const changeDateTimeState = (newValue: Dayjs | null) => {
        setDateTime(newValue);
        onDateChange(newValue);
    }

    return (
        <div>
            <div className="flex flex-col gap-2 w-full pt-5 pb-5">
                <Select variant="standard" name="venue" id="venue" className="h-[2em] w-[200px]" value={location} onChange={changeLocationState}>
                    <MenuItem value="" disabled>Select a venue</MenuItem>
                    <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                    <MenuItem value="Spark">Spark Space</MenuItem>
                    <MenuItem value="GrandTable">The Grand Table</MenuItem>
                </Select>
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Select Date & Time"
                    value={dateTime}
                    onChange={changeDateTimeState}
                    ampm={false} 
                />
            </LocalizationProvider>
        </div>
    );
}
