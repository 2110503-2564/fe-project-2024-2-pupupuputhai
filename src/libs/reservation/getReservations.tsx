export default async function getReservations(token: string) {

    const res = await fetch(`${process.env.BACKEND_URL}/api/reservations/` ,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })

    if(!res.ok){
        throw new Error("Failed to fetch reservations")
    }
    return await res.json() 
}