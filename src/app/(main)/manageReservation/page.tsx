'use client'
import { useRouter } from "next/navigation";

export default function ManageReservation() {
    const route = useRouter();

    const reservations = [
      { id: 1, restaurant: "Restaurant A", user: "John Doe", time: "2025-03-25 18:30" },
      { id: 2, restaurant: "Restaurant B", user: "Jane Smith", time: "2025-03-26 19:00" },
    ];
  
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Manage Reservations</h1>
        <div className="mb-4">
          <button 
            onClick={() => route.push("/manageReservation/CreateReservation")} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create New Reservation
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Restaurant</th>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Booking Time</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{reservation.restaurant}</td>
                <td className="border border-gray-300 px-4 py-2">{reservation.user}</td>
                <td className="border border-gray-300 px-4 py-2">{reservation.time}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button 
                    onClick={() => route.push("/manageReservation/EditReservation")} 
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}