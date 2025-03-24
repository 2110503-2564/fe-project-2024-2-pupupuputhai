export default async function createComment(restaurantId:string ,date:Date , token:string) {
    const response = await fetch(`https://backend-restaurant-project.vercel.app/api/restaurants/${restaurantId}/comments/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            reserDate: date ,
        }), 
    }) 

    if(!response.ok) throw new Error("Failed to comment hahahahha")

    return await response.json()
}