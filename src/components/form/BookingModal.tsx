'use client'
import React, { useEffect, useRef, useState } from 'react';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { useSession } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';

export default function BookingModal({ isOpen, onClose, minTime , maxTime , restaurantId}:{isOpen:boolean,onClose:Function,minTime:string,maxTime:string, restaurantId:string}) {
    const { data: session } = useSession();    
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [people, setPeople] = useState(1);
    useEffect(() => {
        if (!isOpen || !inputRef.current) return;
        
        const [minHour, minMinute] = minTime.split(':').map(Number);
        const [maxHour, maxMinute] = maxTime.split(':').map(Number);
    
        const picker = new AirDatepicker(inputRef.current, {
            timepicker: true,
            minutesStep: 15,
            dateFormat: 'yyyy-MM-dd HH:mm', 
            minDate: new Date(),
            minHours: minHour,
            minMinutes: minMinute,
            maxHours: maxHour,
            maxMinutes: maxMinute,
            locale: {
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                months: [
                    'January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'
                ],
                monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                today: 'Today',
                clear: 'Clear',
                dateFormat: 'yyyy-MM-dd HH:mm',
                firstDay: 0
            },
            onSelect({ formattedDate }) {
                let cleanedDate = "";
                if (Array.isArray(formattedDate)) {
                    cleanedDate = formattedDate[0]; 
                } else {
                    cleanedDate = formattedDate.split(" ")[0] + " " + formattedDate.split(" ")[1]; 
                }
                if (inputRef.current) {
                    inputRef.current.value = cleanedDate;
                }
            }
        });
    
        return () => picker.destroy();
    }, [isOpen, minTime, maxTime]);
    

    const  handleCheckOut = async () => {
        try {
            const response = await fetch(`https://backend-restaurant-project.vercel.app/api/restaurants/${restaurantId}/comments/` ,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${session?.user.token as string}`,
                },
                body: JSON.stringify({
                    reserDate: inputRef?.current?.value
                }), 
            })
            toast.success('Reserve Successfully ')
        }catch (e) {
            toast.error('Reserve Fail')
            console.log('reserve fail',e)
        }
    }

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            onClick={() => {onClose();}}
        >
            <div
                className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-4">Booking</h2>

                <label className="block mb-2 text-sm">Select Date-Time</label>
                <input
                    type="text"
                    ref={inputRef}
                    className="w-full border rounded px-4 py-2 mb-4"
                    readOnly
                />

                <div className="flex items-center justify-between text-left m-4">
                    <span>how many people?</span>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setPeople((p) => Math.max(p - 1, 1))}
                            className="w-8 h-8 rounded-full border text-lg"
                        >
                            -
                        </button>
                        <span className="w-6 text-center">{people}</span>
                        <button
                            onClick={() => setPeople((p) => p+1)}
                            className="w-8 h-8 rounded-full border text-green-600 text-lg"
                        >
                            +
                        </button>
                    </div>
                </div>

                <button
                className="w-full bg-red-400 text-white py-2 rounded hover:bg-red-500"
                    onClick={() => {
                        handleCheckOut();
                        // console.log(new Date(inputRef?.current?.value as string))
                        onClose();

                    }}
                >
                    Check out
                </button>
            </div>
        </div>
    );
}
