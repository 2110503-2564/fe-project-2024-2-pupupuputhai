export default async function getRestaurantsAll() {

    await new Promise( (resolve) => setTimeout(resolve,300))
    const res = await fetch(`https://backend-restaurant-project.vercel.app/api/restaurants/`)

    if(!res.ok){
        throw new Error("Failed to fetch restaurants")
    }
    return await res.json() 
}