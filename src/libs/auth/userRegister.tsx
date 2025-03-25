export default async function userRegister(
    name: string,
    email: string,
    password: string,
    tel: string
  ) {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role: "user",
          password,
          tel,
        }),
      }
    );
  
    if (!response.ok) throw new Error("Failed to register");
  
    return await response.json();
  }
  