"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Popup from "./popup";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";


export function ConfirmationModal     ({ open, setOpen,title,onClick }) {
  return (
    <Popup open={open} setOpen={setOpen}>
    <div className="h-[190px] rounded-md">
      <div onClick={()=> setOpen(false)} className="flex justify-end mr-4 cursor-pointer ">
      <RxCross2 className="w-4 h-4 object-contain mt-4" />
      </div>
      <p className="text-center text-black text-[14px] py-3">{title}</p>
      <div  className="flex cursor-pointer justify-center mt-5">
        <div onClick={onClick} className={`w-[150px] h-12 flex items-center cursor-pointer border mx-6 rounded-sm border-primary justify-center bg-white`}>
          <p className="text-primary">Yes, Delete</p>
        </div>
        <div onClick={()=> setOpen(false)} className={`w-[150px] h-12 flex items-center cursor-pointer justify-center rounded-sm bg-primary`}>
          <p className="text-white">No</p>
        </div>
      </div>
    </div>
  </Popup>
  );
}
