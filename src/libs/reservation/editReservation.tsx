export default async function editReservation(token: string, reserId: string, updatedData: object) {
    const res = await fetch(`${process.env.BACKEND_URL}/api/reservations/${reserId}` ,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
    })

    if(!res.ok){
        throw new Error(`Failed to fetch reservation ${reserId}`)
    }
    return await res.json() 
}