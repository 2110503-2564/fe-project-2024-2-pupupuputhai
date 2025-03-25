export default async function getRestaurants(page:number = 1 ,limit:number = 10, search:string = '') {

    await new Promise( (resolve) => setTimeout(resolve,300))
    const res = await fetch(`https://backend-restaurant-project.vercel.app/api/restaurants?page=${page}&limit=${limit}&search=${search}`)

    if(!res.ok){
        throw new Error("Failed to fetch restaurants")
    }
    return await res.json() 
}