
export default async function getComments(id : string) {
    const res = await fetch(`https://backend-restaurant-project.vercel.app/api/restaurants/${id}/comments/`)
    if(!res.ok){
        throw new Error("Failed to fetch restaurant")
    }
    return await res.json()
} 