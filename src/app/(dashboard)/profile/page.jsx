"use client";

import { API } from "@/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { logo } from "@/images";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Page() {

  const [profilePic, setPic] = useState("")
  const [email, setEmail] = useState("")
  const getProfile = async ()=>{
    try{
      const res = await API.adminProfile()
      if(res){
        setPic(res?.data?.data?.profile_picture || logo)
        setEmail(res?.data?.data?.email)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getProfile()
  },[])
  return (
    <div className="w-full">
      <h2 className="text-4xl text-start text-primary font-bold mb-12">
        Profile
      </h2>
      <div className="flex justify-center w-full">
        <Card className="min-w-[500px] text-gray-500">
          <CardHeader className="text-lg font-bold ">Admin Details</CardHeader>
          <CardContent>
            <ul className="">
              <li className="flex justify-center items-center">
                <Image src={profilePic} alt="profile" width={1000} height={1000} className="rounded-full max-w-[400px] max-h-[400px] object-contain object-center"/>
                {/* <Avatar className="w-72 h-72">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar> */}
              </li>
              {/* <li>Username: Admin</li> */}
              <li className="pt-4">Email: {email}</li>
              {/* <li>Role: Super Admin</li>
              <li>Phone: +123-456-789</li> */}
            </ul>
          </CardContent>
          <CardDescription>This is an admin account</CardDescription>
        </Card>
      </div>
    </div>
  );
}
