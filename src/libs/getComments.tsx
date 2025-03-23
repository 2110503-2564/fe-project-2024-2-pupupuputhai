
export default async function getVenue(id : string) {
    const res = await fetch(`http://localhost:5000/api/restaurants/${id}`)
    if(!res.ok){
        console.log(id)
        throw new Error("Failed to fetch venues")
    }
    return await res.json()
} 