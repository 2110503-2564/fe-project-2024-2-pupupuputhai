"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TextField } from "@mui/material"

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("SignIn", { email, password, redirect: false });

    if (res?.error) {
      alert(res?.error);
    } else {
      router.push("/home");
    }
  }

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-4 w-[350px] mx-auto items-center">

        <TextField 
            name="Email" 
            label="Email" 
            type="email" 
            variant="standard" 
            fullWidth 
            onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
            name="Password" 
            label="Password" 
            type="password" 
            variant="standard" 
            fullWidth 
            onChange={(e) => setPassword(e.target.value)}
        />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Sign In
      </button>
    </form>
  );
}
