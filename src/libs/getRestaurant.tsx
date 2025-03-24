
export default async function getRestaurant(id : string) {
    const res = await fetch(`http://localhost:5000/api/restaurants/${id}`);
    
    if(!res.ok){
        console.log(`here --------> ${id}`)
        throw new Error(`Failed to fetch restaurant : ${id}`)
    }
    return await res.json()
} 