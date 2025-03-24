

export default async function getRestaurants(page:number = 1 , search:string = '') {

    await new Promise( (resolve) => setTimeout(resolve,300))
    const res = await fetch(`https://backend-restaurant-project.vercel.app/api/restaurants?page=${page}&limit=10&search=${search}`)
    // console.log(res);
    if(!res.ok){
        console.log('nuh uh')
        throw new Error("Failed to fetch restaurants")
    }
    return await res.json() 
}