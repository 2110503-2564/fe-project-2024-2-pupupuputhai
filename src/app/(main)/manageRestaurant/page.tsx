'use client'
import { useRouter } from "next/navigation";

export default function ManageRestaurant() {
    const route = useRouter();

    const restaurants = [
      { id: 1, name: "Restaurant A", tel: "123-456-7890" },
      { id: 2, name: "Restaurant B", tel: "987-654-3210" },
    ];
  
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Manage Restaurants</h1>
        <div className="mb-4">
          <button 
            onClick={() => route.push("/manageRestaurant/CreateRestaurant")} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create New Restaurant
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Tel</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.id} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{restaurant.name}</td>
                <td className="border border-gray-300 px-4 py-2">{restaurant.tel}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button 
                    onClick={() => route.push("/manageRestaurant/EditRestaurant")} 
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
