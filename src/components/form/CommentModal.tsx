'use client'
import React, { useEffect, useRef, useState } from 'react';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { TextField } from '@mui/material';

export default function CommentModal({ isOpen, onClose, restaurantId , name , img , posted }:{isOpen:boolean,onClose:Function, restaurantId:string,name:string,img:string,posted:Function }) {
    const { data: session } = useSession();    
    const [comment ,setComment] = useState("")
    

    const  handlePost = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/restaurants/${restaurantId}/comments/` ,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${session?.user.token as string}`,
                },
                body: JSON.stringify({
                    comment: comment,
                    nameUser: session?.user.name,
                    imagesUser: ""

                }), 
            })
            if(response.ok)posted();
        }catch (e) {
            toast.error('comment Fail')
        }
    }

    if (!isOpen) return null;

    return (
        <div
        className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
        >
            <div
                className="bg-white p-6 rounded-3xl shadow-xl w-[90%] "
            >
                
                <div className="flex flex-row relative ">
                    <div className={`size-10 rounded-full inline bg-[url(${img || '/image/bloom.jpg'})]`}/>
                    
                    <div className="flex flex-col pl-3">
                        <p className="text-black">{name}</p>
                    </div>
                </div>
                <div className='w-full'>
                    <TextField
                        id="comment"
                        name="Comment"
                        label="comment here"
                        variant="standard"
                        required
                        value={comment}
                        className='w-full'
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>


                <div className='w-full flex flex-row gap-3 mt-4 justify-end pr-5'>
                    <button
                        className="w-[5%] bg-white text-black py-2 border-2 rounded-full hover:bg-slate-300"
                            onClick={() => {
                                onClose();
                            }}
                    >
                        cancel
                    </button>
                     <button
                        className="w-[5%] bg-white text-black py-2 border-2 rounded-full hover:bg-slate-300"
                            onClick={() => {
                                if(!comment)return;
                                handlePost();
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
