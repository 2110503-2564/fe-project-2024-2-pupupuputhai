export default async function deleteReservation(token: string, reserId: string) {
    const res = await fetch(`https://backend-restaurant-project.vercel.app/api/reservations/${reserId}` ,{
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })

    if(!res.ok){
        throw new Error(`Failed to delete reservation ${reserId}`)
    }
    return await res.json() 
}