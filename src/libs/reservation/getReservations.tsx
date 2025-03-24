export default async function getReservations(token: string) {

    await new Promise( (resolve) => setTimeout(resolve,300))
    const res = await fetch("https://backend-restaurant-project.vercel.app/api/reservations/" ,{
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