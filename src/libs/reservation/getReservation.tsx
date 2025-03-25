export default async function getReservation(token: string, reserId: string) {
    const res = await fetch(`${process.env.BACKEND_URL}/api/reservations/${reserId}` ,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })

    if(!res.ok){
        throw new Error(`Failed to fetch reservation ${reserId}`)
    }
    return await res.json() 
}