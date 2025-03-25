
export default async function getRestaurant(id : string) {
    const res = await fetch(`https://backend-restaurant-project.vercel.app/api/restaurants/${id}`);
    
    if(!res.ok){
        throw new Error(`Failed to fetch restaurant : ${id}`)
    }
    return await res.json()
} 