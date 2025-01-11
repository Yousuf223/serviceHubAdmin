import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader } from "../custom/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { API } from "@/api";
import { useToast } from "../ui/use-toast";
import Image from "next/image";
import SliderReact from "../ui/sliderReact";
import moment from "moment";

export default function RefundRequest({ row }) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState();
  const { toast } = useToast();
  const [loader, setLoader] = useState(false);
  const handleView = () => {
    setOpen(true);
    setDetails(row.original);
  };
  const handleStatus = async () => {
    try {
      setLoader(true);
      const data = {
        user_id: row?.original?.id,
      };
      const res = await API.userStatus(data);
      if (res) {
        getUser();
        toast({
          variant: "",
          title: "Request Successfull.",
          description: res?.data?.message ?? "User Status Changed",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          err?.response?.data?.message ||
          "There was a problem with your request.",
      });
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    setStatus(row?.original?.is_blocked);
  }, []);
  const onSubmit = async () => {
    if (Number(amount) == details?.pay) {
      try {
        setLoader(true);
        const data = {
          bookingId: details?.bookingId,
          amountRefund: Number(amount),
        };
        const res = await API.adminRefundToUser(data);
        if (res) {
          setOpen(false);
          toast({
            variant: "",
            title: "Request Successfull.",
            description: "Amount Send",
          });
        }
      } catch (err) {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: err?.data?.message || "Error in adding",
        });
      } finally {
        setLoader(false);
      }
    } else {
      toast({
        variant: "",
        title: "Enter Valid Amount",
        description: "Enter Valid Amount",
      });
    }
  };
  console.log("sdjfjdhfjhfds", details);
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
          <div onClick={handleView}>View Detail</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <div>
        <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
          <SheetContent>
            <SheetHeader>
              <SheetDescription>
                <h2 className="text-primary font-medium size-7 w-full">
                  User Detail
                </h2>
                <div className="w-full bg-white">
                  <div className="w-full p-6 items-center border shadow-primary rounded-md flex my-5 shadow-sm ">
                    {details?.User?.profileUrl == "" ? (
                      <div className="mr-6">N/A</div>
                    ) : (
                      <Avatar className="h-14 w-14 mr-3">
                        <AvatarImage src={details?.User?.profileUrl} />
                      </Avatar>
                    )}

                    <div>
                      {/* <p>First Name:</p> */}
                      <p className="text-black capitalize font-semibold size-6">
                        {details?.User?.firstName}
                      </p>

                      {/* <p>Last Name:</p> */}
                      <p className="text-black capitalize font-semibold size-6">
                        {details?.User?.lastName}
                      </p>
                    </div>
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
         
            <p className="text-primary font-medium pb-2 pt-2">Horse Information</p>
            <div className="w-full flex justify-between items-center border-b-2 py-2">
              <p className="text-[14px] font-medium text-black">Registration No.</p>
              <p className="text-[12px] text-gray-500">{details.registrationNumber}</p>
            </div>
            <div className="w-full flex justify-between items-center border-b-2 py-2">
              <p className="text-[14px] font-medium text-black">Height</p>
              <p className="text-[12px] text-gray-500">{details.height}</p>
            </div>
            <div className="w-full flex justify-between items-center border-b-2 py-2">
              <p className="text-[14px] font-medium text-black">Weight</p>
              <p className="text-[12px] text-gray-500">{details.weight}</p>
            </div>
            <div className="w-full flex justify-between items-center border-b-2 py-2 mb-4">
              <p className="text-[14px] font-medium text-black">Dob</p>
              <p className="text-[12px] text-gray-500">{moment(details.dob).format('MM-DD-YYYY')}</p>
            </div>
            <SliderReact image={details?.HorseImages} />
            <div className="w-full">
              <p className="text-primary font-medium">Feed</p>
              <p className="text-gray-500 leading-5 mt-2 text-[13px]  capitalize  ">
                {details?.feed}
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </DropdownMenu>
  );
}
