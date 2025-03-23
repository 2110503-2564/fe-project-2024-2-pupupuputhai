"use client";

import { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function CreateRestaurant() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);

  return (
    <div className="flex justify-center items-center mt-[80px] mb-[50px]">
      <div className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Create Restaurant</h2>
        
        <form className="flex flex-col gap-4 w-full">
          <TextField 
            name="Name" 
            label="Restaurant Name" 
            variant="standard" 
            fullWidth 
            onChange={(e) => setName(e.target.value)}
          />
          
          <TextField 
            name="Tel" 
            label="Phone Number" 
            variant="standard" 
            fullWidth 
            onChange={(e) => setTel(e.target.value)}
          />
          
          <TextField 
            name="Address" 
            label="Address" 
            variant="standard" 
            fullWidth 
            onChange={(e) => setAddress(e.target.value)}
          />
          
          <input 
            type="file" 
            accept="image/*" 
          />
          
          <Button 
            variant="contained" 
            color="primary" 
          >
            Create Restaurant
          </Button>
        </form>
      </div>
    </div>

  );
}
