
export default async function getComments(id : string) {
    const res = await fetch(`http://localhost:5000/api/restaurants/${id}/comments/`)
    if(!res.ok){
        console.log(id)
        throw new Error("Failed to fetch restaurant")
    }
    return await res.json()
} 