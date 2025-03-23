

export default async function getRestaurants() {

    await new Promise( (resolve) => setTimeout(resolve,300))
    const res = await fetch("http://localhost:5000/api/restaurants/")
    
    if(!res.ok){
        console.log('nuh uh')
        throw new Error("Failed to fetch restaurants")
    }
    return await res.json() 
}