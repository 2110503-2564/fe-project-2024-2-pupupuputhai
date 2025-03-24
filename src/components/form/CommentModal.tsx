'use client'
import React, { useEffect, useRef, useState } from 'react';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { TextField } from '@mui/material';

export default function BookingModal({ isOpen, onClose, restaurantId}:{isOpen:boolean,onClose:Function, restaurantId:string}) {
    const { data: session } = useSession();    
    const [comment ,setComment] = useState("")
    const inputRef = useRef<HTMLInputElement | null>(null);
    

    const  handlePost = async () => {
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

                <div className='w-full'>
                    <TextField
                        id="comment"
                        name="Comment"
                        label="Comment here ....."
                        variant="standard"
                        required
                        value={comment}
                        className='w-full'
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>


                <div className='w-full flex flex-row'>
                    <button
                        className="w-[15%] bg-white text-white py-2 rounded hover:bg-red-500"
                            onClick={() => {
                                handlePost();
                                // console.log(new Date(inputRef?.current?.value as string))
                                onClose();

                            }}
                    >
                        cancel
                    </button>
                     <button
                        className="w-[15%] bg-white text-white py-2 rounded hover:bg-red-500"
                            onClick={() => {
                                handlePost();
                                // console.log(new Date(inputRef?.current?.value as string))
                                onClose();

                            }}
                    >
                        post
                    </button>
                </div>
                
            </div>
        </div>
    );
}
