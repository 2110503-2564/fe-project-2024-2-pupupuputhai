import React from 'react';

export default function MyBooking() {
    // ตัวอย่างข้อมูลผู้ใช้
    const userInfo = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        tel: '123-456-7890',
    };

    const reservations = [
        { id: 1, date: '2025-03-20', time: '10:00 AM', restaurant: 'Spa Treatment' },
        { id: 2, date: '2025-03-22', time: '02:00 PM', restaurant: 'Haircut' },
    ];

    return (
    <div className="flex pl-[80px] pr-[80px] pt-8 space-x-8">
       <div className="w-1/3 h-1/2 flex-none bg-gray-100 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">User Information</h2>
            <div className="space-y-2">
                <div><strong>Name:</strong> {userInfo.name}</div>
                <div><strong>Email:</strong> {userInfo.email}</div>
                <div><strong>Phone:</strong> {userInfo.tel}</div>
            </div>
        </div>

        <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-lg mb-5">
            <h2 className="text-2xl font-semibold mb-4">Reservations</h2>
            {reservations.length > 0 ? (
                <ul className="space-y-4">
                {reservations.map((reservation) => (
                    <li key={reservation.id} className="p-4 border border-gray-300 rounded-lg">
                    <div><strong>Date:</strong> {reservation.date}</div>
                    <div><strong>Time:</strong> {reservation.time}</div>
                    <div><strong>Restaurant:</strong> {reservation.restaurant}</div>
                    <div className="flex space-x-3 mt-2">
                        <button className="px-12 py-3 bg-blue-500 text-white rounded">Edit</button>
                        <button className="px-12 py-3 bg-red-500 text-white rounded">Delete</button>
                    </div>
                    </li>
                ))}
                </ul>

            ) : (
                <p>No reservations yet.</p>
            )}
        </div>
    </div>
    );
};