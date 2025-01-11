
import React, { useState,useEffect } from 'react'
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
import { Loader } from '../custom/Loader';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '../ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useToast } from '../ui/use-toast';
import Image from 'next/image';

export default function BookingAction ({ row })  {
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState("");
    const [status, setStatus] = useState();
    const {toast} = useToast()
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
                  <h2 className="text-black font-semibold size-7 w-full">
                    User Detail
                  </h2>
                  <div className="w-full bg-white">
                    <div className="w-full p-6 items-center border shadow-primary rounded-md flex my-5 shadow-sm ">
                      <Avatar className="h-15 w-15 mr-3">
                        <Image
                          className="w-24 h-24 rounded-full"
                          alt='img'
                          src={details?.userId?.userProfileImage}
                        //   alt="alternatetext"
                        />
                      </Avatar>
                      <div>
                        {/* <p>First Name:</p> */}
                        <p className="text-black capitalize font-semibold size-6">
                          {details?.userId?.userFirstName}
                        </p>

                        {/* <p>Last Name:</p> */}
                        <p className="text-black capitalize font-semibold size-6">
                          {details?.userId?.userLastName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-black font-semibold size-7 w-full">
                    Handler Detail
                  </h2>
                  <div className="w-full p-6  border shadow-primary rounded-md  my-5 shadow-sm">
                    <div className="w-full items-center flex my-5  ">
                      <Avatar className="h-15 w-15">
                        {details?.handlerId?.handlerProfilePhoto == null ? (
                          <p className=" size-6">N/A</p>
                        ) : (
                          <Image
                            className="w-24 h-24 rounded-full"
                            alt='img'
                            src={details?.handlerId?.handlerProfilePhoto}
                            // alt="alternatetext"
                          />
                        )}
                        {/* <AvatarImage src={details?.userImage} /> */}
                        {/* {details?.handlerId?.handlerProfilePhoto == null ? null : <AvatarFallback>CN</AvatarFallback>} */}
                      </Avatar>
                      <p className="text-black capitalize font-semibold ml-3 size-6">
                        {details?.handlerId?.handlerName}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 ">
                      {/* tittles */}
                      {details?.handlerId?.pets?.map((item, index) => {
                        return (
                          <div key={index} className="col-span-3 grid w-full   grid-cols-2 gap-2 ">
                            <p className="text-black capitalize w-32 font-semibold size-6">{`Pet ${
                              index + 1
                            }:`}</p>
                            <p>{item?.petName}</p>
                            <p className="text-black capitalize w-32 font-semibold size-6">{`Pet Decription`}</p>
                            <p>{item?.petDescription}</p>
                          </div>
                        );
                      })}
                      <div className="col-span-3 grid w-full   grid-cols-2 gap-2 ">
                        <p className="text-black capitalize w-32 font-semibold size-6">{`Amount`}</p>
                        <p>{`$${details?.totalAmount}`}</p>
                        <p className="text-black capitalize w-32 font-semibold size-6">{`Tax`}</p>
                        <p>{`$${details?.deductionFee}`}</p>
                        <p className="text-black capitalize w-32 font-semibold size-6">{`Total Amount`}</p>
                        <p>{`$${details?.pay}`}</p>
                      </div>

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
