import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment";
import { API } from "@/api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SliderReact from "../ui/sliderReact";

export default function FeedbackAction({ row, toggal }) {
  console.log(row?.original, "row");
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState();
  const [loader, setLoader] = useState(false);

  const handleView = () => {
    setOpen(true);
    setDetails(row.original);
  };
  console.log("detailsdetails", details?.FeedBackImages);
  return (
    // actions
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <div onClick={handleView}>View Feedback</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <div>
        <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className='text-primary'>Feedback Details</SheetTitle>
              <SheetDescription>
                <div className="w-full">
                  <div className="w-full flex justify-center "></div>
                  <div className="grid grid-cols-2 gap-2 mt-12">
                    {/* tittles */}

                    <p className="text-black font-medium">User Name:</p>
                    <p>
                      {details?.User?.firstName} {details?.User?.lastName}
                    </p>

                    {/* <p>Gender:</p>
                      <p>{details?.gender}</p> */}

                    <p className="text-black font-medium">Subject:</p>
                    <p>{details.subject ?? "N/A"}</p>

                    <p className="text-black font-medium">Message:</p>
                    <div className="w-[250px] ">
                      <p className="">{details?.message ?? "N/A"}</p>
                    </div>

                    {/*   
                      <p>Status:</p>
                      <p>{details?.is_blocked === 0 ? <span className="text-green-700 font-semibold">Active</span> : <span className="text-red-700 font-semibold">Blocked</span>}</p> */}
                  </div>
                </div>
                <div className={'mt-6'}>
                <SliderReact image={details?.FeedBackImages} />
                </div>
        
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </DropdownMenu>
  );
}
