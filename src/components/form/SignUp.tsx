"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TextField } from "@mui/material";

export default function SignUp() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, tel }),
      });

      const res = await response.json();
      if (!response.ok) {
        alert(res.error || "Failed to sign up.");
        return;
      }
      const res2log = await signIn("SignIn", { email, password, redirect: false });
      
      if (res2log?.error) {
        alert(res2log?.error);
      } else {
        router.push("/home");
      }
      
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <form className="flex flex-col gap-4 w-[350px] mx-auto items-center" onSubmit={handleSignUp}>
      <TextField label="Name" variant="standard" fullWidth onChange={(e) => setName(e.target.value)} />
      <TextField label="Tel" variant="standard" fullWidth onChange={(e) => setTel(e.target.value)} />
      <TextField label="Email" type="email" variant="standard" fullWidth onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" variant="standard" fullWidth onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
    </form>
  );
}
