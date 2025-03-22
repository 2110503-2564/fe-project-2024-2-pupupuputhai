'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Promotion() {
    const banner = ['/image/cover.jpg','/image/cover2.jpg','/image/cover3.jpg','/image/cover4.jpg',]
    const [index,setIndex] = useState(0)

    return (
        <div 
            className="relative w-full h-[200px] cursor-pointer border"
            onClick={() => setIndex(index + 1)}
        >
            <Image
                src={banner[index % banner.length]}
                alt="banner"
                fill
                priority
                className="object-cover"
            />
        </div>
    )
}