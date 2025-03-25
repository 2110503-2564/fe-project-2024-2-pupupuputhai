export default async function createComment(restaurantId:string ,comment:string , token:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/restaurants/${restaurantId}/comments/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            comment: comment ,
        }), 
    }) 

    if(!response.ok) throw new Error("Failed to comment hahahahha")

    return await response.json()
}