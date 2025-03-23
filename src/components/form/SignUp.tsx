"use client";

import { useState } from "react";
import { TextField } from "@mui/material"

export default function Login() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    // Add sign-up logic here
  };

  return (
    <div className="flex justify-center items-center mt-[70px] mb-[50px]">
      <div className="w-96 p-6 shadow-lg bg-white rounded-2xl">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        
        <form style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
          <TextField 
            name="Name" 
            label="Name" 
            variant="standard" 
            fullWidth 
            onChange={(e) => setName(e.target.value)}
          />
          
          <TextField 
            name="Role" 
            label="Role" 
            variant="standard" 
            fullWidth 
            onChange={(e) => setRole(e.target.value)}
          />
          
          <TextField 
            name="Tel" 
            label="Tel" 
            variant="standard" 
            fullWidth 
            onChange={(e) => setTel(e.target.value)}
          />
          
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
          
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg" 
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
        
        <div className="text-center text-sm mt-4">
          <span>Already have an account? </span>
          <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
}