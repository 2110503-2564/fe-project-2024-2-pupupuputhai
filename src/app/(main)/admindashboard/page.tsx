import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold text-center text-gray-700 mb-10">
                Admin Dashboard
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white p-6 pb-8 rounded-lg shadow-lg flex flex-col items-center">
                    <Image
                        src={'/image/logo.png'}
                        alt="Reservation Icon"
                        width={120} 
                        height={120}
                        className="mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Reservation
                    </h2>
                    <p className="text-gray-500 mb-6">
                        จัดการการจองโต๊ะของลูกค้า
                    </p>
                    <Link href="/manageReservation">
                        <span className="px-4 py-3 border-2 border-blue-500 hover:text-blue-500 hover:bg-white rounded-lg bg-blue-500 text-white transition-all duration-300 ease-in-out">
                            Manage Reservation
                        </span>
                    </Link>
                </div>

                <div className="bg-white p-6 pb-8 rounded-lg shadow-lg flex flex-col items-center">
                    <Image
                        src={'/image/logo.png'}
                        alt="Restaurant Icon"
                        width={120} 
                        height={120}
                        className="mb-4"
                    />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Restaurant
                    </h2>
                    <p className="text-gray-500 mb-6">
                        จัดการเมนูและข้อมูลร้าน
                    </p>
                    <Link href="/manageRestaurant">
                    <span className="px-4 py-3 border-2 border-blue-500 hover:text-blue-500 hover:bg-white rounded-lg bg-blue-500 text-white transition-all duration-300 ease-in-out">
                    Manage Restaurant
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}