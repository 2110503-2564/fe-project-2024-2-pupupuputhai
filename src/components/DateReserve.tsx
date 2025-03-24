'use client'

import { useState, useEffect  } from "react"
import { DateTimePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from "dayjs"


export default function DateReserve({ onDateChange, defaultValue }: {onDateChange: Function, defaultValue: Dayjs}) {

    const [dateTime, setDateTime] = useState<Dayjs | null>(defaultValue || null)

    useEffect(() => {
        setDateTime(defaultValue || null);
    }, [defaultValue]);

    const changeDateTimeState = (newValue: Dayjs | null) => {
        setDateTime(newValue);
        onDateChange(newValue);
    };

    return (
        <div>

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
