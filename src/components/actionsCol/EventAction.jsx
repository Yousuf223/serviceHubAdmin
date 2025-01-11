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

export default function EventAction({ row, toggal }) {
  console.log(row?.original, "row");
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState();
  const [loader, setLoader] = useState(false);

  const handleView = () => {
    setOpen(true);
    setDetails(row.original);
  };
  console.log("detailsdetails", toggal);
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
          <div onClick={handleView}>View Event</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <div>
        <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className='text-primary'>Event Details</SheetTitle>
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

                    <p className="text-black font-medium">Title:</p>
                    <p>{details.title ?? "N/A"}</p>
                    {toggal == "Calendar_Events" && (
                      <>
                        <p className="text-black font-medium">Address:</p>
                        <p>{details?.address ?? "N/A"}</p>
                      </>
                    )}

                    <p className="text-black font-medium">Event Date:</p>
                    <p>{moment(details?.date).format("MM-DD-YYYY") ?? "N/A"}</p>
                    {toggal == "Calendar_Events" && (
                      <>
                        <p className="text-black font-medium">Start Time:</p>
                        <p>
                          {moment(details?.startDate).format("hh:mm A") ??
                            "N/A"}
                        </p>
                        <p className="text-black font-medium">End Time:</p>
                        <p>
                          {moment(details?.endDate).format("hh:mm A") ?? "N/A"}
                        </p>
                      </>
                    )}

                    <p className="text-black font-medium">Description:</p>
                    <p className="max-w-[250px]">
                      {details?.description ?? "N/A"}
                    </p>
                    {/*   
                      <p>Status:</p>
                      <p>{details?.is_blocked === 0 ? <span className="text-green-700 font-semibold">Active</span> : <span className="text-red-700 font-semibold">Blocked</span>}</p> */}
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </DropdownMenu>
  );
}
