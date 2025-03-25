'use client'
import EditRestaurantForm from "@/components/form/EditRestaurant";
import getRestaurantsAll from "@/libs/getRestaurantsAll";
import { LinearProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManageRestaurant() {
    const { data: session } = useSession();  
    const [openEditModal, setOpenEditModal] = useState<string | null>(null);

    const toggleEditModal = (restaurantId: string) => {
        setOpenEditModal(openEditModal === restaurantId ? null : restaurantId);
    };

    const route = useRouter();
    const [restaurants,setRestaurants] = useState<RestaurantItem[]>([])
   
    const [isPosted, setIsPosted] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
          const Restaurants = await getRestaurantsAll();
          setRestaurants(Restaurants.data);
          
      };
      fetchData();  
    }, [isPosted]);

    const  handleDelete = async (id:string) => {
      try {
          const response = await fetch(`https://backend-restaurant-project.vercel.app/api/restaurants/${id}` ,{
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${session?.user.token as string}`,
              },
          })
          if(response.ok){
              setIsPosted(prev => !prev)
              toast.success('delete Successfully ')
          }
          
      }catch (e) {
          toast.error('comment Fail')
      }
  }

    if(restaurants.length == 0)return(
            <p className="text-center text-lg mt-5">loading ...<LinearProgress/></p>
    ) 
  
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
            {restaurants.map((restaurant:RestaurantItem) => (
              
              <tr key={restaurant._id} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{restaurant.name}</td>
                <td className="border border-gray-300 px-4 py-2">{restaurant.tel}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button 
                    onClick={() => {
                        toggleEditModal(restaurant._id);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                    {(openEditModal === restaurant._id) && 
                      <EditRestaurantForm
                          Restaurant={restaurant}
                          onClose={() => toggleEditModal(restaurant._id)}
                          posted={() => setIsPosted(prev => !prev)}
                      />
                    }

                  <button className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(restaurant._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
                
            ))}
          </tbody>
        </table>

      </div>
    )
}
