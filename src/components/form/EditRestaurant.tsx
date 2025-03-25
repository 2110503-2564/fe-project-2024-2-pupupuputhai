"use client";

import { useEffect, useState } from "react";
import { TextField, Button, LinearProgress } from "@mui/material";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function EditRestaurantForm( {Restaurant , onClose ,posted} : {Restaurant:RestaurantItem , onClose:Function , posted:Function} ) {
  const { data: session } = useSession();   
  const [name, setName] = useState(Restaurant.name || "");
  const [tel, setTel] = useState(Restaurant.tel || "");
  const [address, setAddress] = useState(Restaurant.address || "");
  const [ open , setOpen ] =useState(Restaurant.open_time || "");
  const [ close , setClose ] = useState(Restaurant.close_time || "");
  const [ file , setFile ] = useState<File | null>(null);
  const [ images , setImages ] = useState<String[]>(Restaurant.image || []);
  const [ loading, setLoading] = useState(false);
  const [ isUp , setIsUp ] = useState(false);
 
  const handleSubmit = async () => {
    if (
      name === Restaurant.name &&
      tel === Restaurant.tel &&
      address === Restaurant.address &&
      open === Restaurant.open_time &&
      close === Restaurant.close_time &&
      !isUp
    ) {
      toast.error("No updates provided.");
      return;
    }

    const reponse = await fetch(`https://backend-restaurant-project.vercel.app/api/restaurants/${Restaurant._id}`, { 
        method: "PUT",
        headers: {
          "Content-Type": "application/json" ,
          authorization: `Bearer ${session?.user.token as string}`,
        },
        body: JSON.stringify({ 
          name: name ,
          address: address ,
          tel: tel ,
          open_time: open ,
          close_time: close,
          image: images
        
        }),
    });
    if(!reponse.ok){
      toast.error('update fail')
    }else{
      toast.success('update successfully')
      posted();
      onClose();
    }
  
}
  useEffect(() => {
    if (!file) return;
    setLoading(true);
    const handleUpload = async () => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        if (!base64.startsWith("data:image")) {
          toast.error("Please upload a valid image file!");
          return;
        }
        setImages((prev) => [...prev, base64]);
        setLoading(false);
        setIsUp(true);
      };
      
    };

    handleUpload();

  }, [file]);

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"

    >
      <div className="flex justify-center items-center mt-[80px] mb-[50px]">
        <div className="w-full max-w-md p-6 shadow-lg bg-white rounded-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-4">Create Restaurant</h2>
          {loading && <p className="text-center text-lg mt-5">loading ...<LinearProgress/></p>}
          <form className="flex flex-col gap-4 w-full">
            <TextField 
              name="Name" 
              label="Restaurant Name" 
              variant="standard" 
              value={name}
              fullWidth 
              onChange={(e) => setName(e.target.value)}
            />
            
            <TextField 
              name="Tel" 
              label="Phone Number" 
              variant="standard" 
              value={tel}
              fullWidth 
              onChange={(e) => setTel(e.target.value)}
            />
            
            <TextField 
              name="Address" 
              label="Address" 
              variant="standard" 
              value={address}
              fullWidth 
              onChange={(e) => setAddress(e.target.value)}
            />

            <TextField 
              name="OpenTime" 
              label="Open-Time" 
              variant="standard" 
              value={open}
              fullWidth 
              onChange={(e) => setOpen(e.target.value)}
            />

            <TextField 
              name="CloseTime" 
              label="Close-Time" 
              variant="standard" 
              value={close}
              fullWidth 
              onChange={(e) => setClose(e.target.value)}
            />
            
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
              }} 
            />
            <div className="flex flex-row gap-4">
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleSubmit()}
              >
                Confirm Restaurant
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => onClose()}
              >
                cancel
              </Button>  
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
