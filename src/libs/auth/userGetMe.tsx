export default async function getUserProfile(token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    }) 

    if (!response.ok) throw new Error("Failed to login");

    return await response.json();
}