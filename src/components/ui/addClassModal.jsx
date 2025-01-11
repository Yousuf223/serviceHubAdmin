"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Popup from "./popup";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { Input } from "./input";
import { Label } from "./label";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addClasses } from "@/lib/validation";
import { useToast } from "./use-toast";
import { API } from "@/api";
import { Loader } from "../custom/Loader";
import { Button } from "./button";
import { TextErea } from "./textErea";


export function AddClassModal({ open, setOpen, getBooking, onClick }) {
    const { toast } = useToast();
    const [loader, setLoader] = React.useState(false);
    const { register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(addClasses)
    })
    const addClass = async (data) => {
        try {
            setLoader(true);
            const res = await API.addClass(data);
            if (res) {
                setOpen(false)
                getBooking()
            }
        } catch (error) {
            console.log('errrr', error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description:
                    error?.response?.data?.message ||
                    "There was a problem with your request.",
            });
        } finally {
            setLoader(false);
        }
    };


    return (
        <Popup open={open} setOpen={setOpen}>
            <div className="h-[380px] rounded-md">
                <div onClick={() => setOpen(false)} className="flex justify-end mr-4 cursor-pointer ">
                    <RxCross2 className="w-4 h-4 object-contain mt-4" />
                </div>
                <p className="text-center text-black text-[14px] py-3">Add A Class</p>
                <div className="mx-10 gap-2 h-[280px] overflow-y-auto ">
                    <form onSubmit={handleSubmit(addClass)}>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            register={register}
                            errors={errors}
                            placeholder="Enter Title"
                        />
                        <Label className={'mt-2'} htmlFor="classCode">Class Code</Label>
                        <Input
                            id="title"
                            name="classCode"
                            register={register}
                            errors={errors}
                            placeholder="Enter Class Code"
                        />
                        <Label className={'mt-2'} htmlFor="classCode">Description</Label>
                        <TextErea
                            className={
                                "w-full focus:outline-none  text-black text-sm rounded-md h-[160px] border p-3 border-[#727272] "
                            }
                            name="description"
                            register={register}
                            errors={errors}
                            show={true}
                            placeholder="Type Here..."
                        />
                        <Button className={'w-full mt-4 h-11'} type="submit" >
                            <Loader
                                className={"h-4 w-4 text-white mr-2"}
                                loading={loader}
                            />
                            Add
                        </Button>
                    </form>
                </div>
            </div>
        </Popup>
    );
}
