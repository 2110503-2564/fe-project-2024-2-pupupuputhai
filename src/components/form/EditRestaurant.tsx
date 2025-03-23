"use client";

import { useState } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";


export default function EditRestaurantForm() {
  const existingData = {
    name: "Sample Restaurant",
    tel: "123-456-7890",
    address: "123 Main St, City, Country",
    image: ""
  };
  const [name, setName] = useState(existingData.name);
  const [tel, setTel] = useState(existingData.tel);
  const [address, setAddress] = useState(existingData.address);
  const [image, setImage] = useState(null);

  return (
    <div className="flex flex-col items-center mt-[70px] mb-[50px] gap-6">
      {/* แสดงข้อมูลเดิม */}
      <Card className="w-full max-w-md shadow-lg bg-white rounded-2xl">
        <CardContent>
          <Typography variant="h5" className="text-center font-semibold mb-4">
            Existing Restaurant Info
          </Typography>
          <Typography variant="body1"><strong>Name:</strong> {existingData.name}</Typography>
          <Typography variant="body1"><strong>Phone:</strong> {existingData.tel}</Typography>
          <Typography variant="body1"><strong>Address:</strong> {existingData.address}</Typography>
          {existingData.image && <img src={existingData.image} alt="Restaurant" className="mt-4 w-full h-auto rounded-lg" />}
        </CardContent>
      </Card>

      {/* ฟอร์มแก้ไขข้อมูล */}
      <div className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl">
        <h2 className="text-2xl font-semibold text-center mb-4">Edit Restaurant</h2>
        
        <form className="flex flex-col gap-4 w-full">
          <TextField 
            name="Name" 
            label="Restaurant Name" 
            variant="standard" 
            fullWidth 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
          
          <TextField 
            name="Tel" 
            label="Phone Number" 
            variant="standard" 
            fullWidth 
            value={tel} 
            onChange={(e) => setTel(e.target.value)}
          />
          
          <TextField 
            name="Address" 
            label="Address" 
            variant="standard" 
            fullWidth 
            value={address} 
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
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
