'use client'
import Image from "next/image";
import CurvedShape from "./CurvedShape";
import { useRouter } from "next/navigation";

export default function ho(){
    const route = useRouter();
    return(
        <div className="relative h-screen w-full">
        
            <Image
                src="/image/cover.jpg"
                alt="restaurant"
                className="absolute inset-0 w-full h-full object-cover z-0"
                fill={true}
                priority
                objectFit='cover'
            />
            <CurvedShape/>
            <div className="relative z-20 h-full flex flex-col justify-center px-[100px] text-white">
                <h1 className="text-4xl md:text-5xl font-bold">Welcome to Our</h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-6">Restaurant Reservation Website</h2>
                <p>จองคิวร้านอาหารง่ายๆ ในไม่กี่คลิก! 🍽️✨</p>
                <p>หากคุณเบื่อกับการรอคิวยาวเหยียดหน้าร้านอาหาร</p>
                <p className="mb-4">หรืออยากได้โต๊ะด่วนๆ แบบไม่ต้องลุ้น เว็บไซต์นี้คือตัวช่วยที่คุณต้องมี!</p>
                <ul className="space-y-2">
                    <li>✅ รวมร้านดังมากมาย</li>
                    <li>✅ จองง่ายใช้งานสะดวก</li>
                    <li>✅ หมดปัญหารอคิวนาน</li>
                </ul>


                <button className="absolute top-1/2 right-40 transform -translate-y-1/2 bg-[#8B5E3C] text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-[#6B3F24]"
                    onClick={() => route.push("/homepage")}
                >
                    Get Started
                </button>
            </div>
        </div>
    )

}
  