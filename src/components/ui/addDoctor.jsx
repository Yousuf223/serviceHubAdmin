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
import { addDoctorSehema } from "@/lib/validation"; // Validation schema
import { useToast } from "./use-toast";
import { API } from "@/api";
import { Loader } from "../custom/Loader";
import { Button } from "./button";
import { TextErea } from "./textErea";
import { MultiSelect } from "./select";
import Multiselect from "multiselect-react-dropdown";

export function AddDoctorModal({ open, setOpen, getDoctors, onClick }) {
    const { toast } = useToast();
    const [loader, setLoader] = React.useState(false);
    const [selectedDays, setSelectedDays] = React.useState([]);
    const { register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(addDoctorSehema)
    })
    const [days, setDays] = React.useState([
        { name: 'Monday', id: 1 },
        { name: 'Tuesday', id: 2 },
        { name: 'Wednesday', id: 3 },
        { name: 'Thursday', id: 4 },
        { name: 'Friday', id: 5 },
        { name: 'Saturday', id: 6 },
        { name: 'Sunday', id: 7 },
    ]);

    const onSelect = (selectedList, selectedItem) => {
        setSelectedDays(selectedList);
    };

    const onRemove = (selectedList, removedItem) => {
        setSelectedDays(selectedList);
    };

    const timings = Array.from({ length: 15 }, (_, i) => `${i + 5}:00 AM`).concat(
        Array.from({ length: 12 }, (_, i) => `${i + 12}:00 PM`)
    );

    const addDoctor = async (data) => {
        console.log('datadatadata', data)
        console.log('selectedDaysselectedDays', selectedDays)
    
        // Convert 24-hour time to 12-hour format (e.g., 14:00 to 2:00 PM)
        const startTime = convertTime(data?.startTime);
        const endTime = convertTime(data?.endTime);
    
        // Create payload with formatted data
        const payload = {
            doctorName: data?.doctorName,
            clinicTimings: `${startTime} ${endTime}`,
            category: data?.category,
            fees: data?.fees,
            days: selectedDays.map(day => day.name), 
        }
    
        console.log('payloadpayload', payload)
    
        try {
            setLoader(true);
            const res = await API.addDoctor(payload);
            if (res) {
                setOpen(false)
                toast({
                    variant: "success",
                    title: res?.data?.message,
                });
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
    
    // Function to convert 24-hour time to 12-hour format
    const convertTime = (time24) => {
        const [hours, minutes] = time24.split(':').map(Number);
        const ampm = hours < 12 ? 'AM' : 'PM';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    };
    

    return (
        <Popup open={open} setOpen={setOpen}>
            <div className="h-[670px] rounded-md ">
                <div onClick={() => setOpen(false)} className="flex justify-end mr-4 cursor-pointer ">
                    <RxCross2 className="w-4 h-4 object-contain mt-4" />
                </div>
                <p className="text-center text-black text-[14px] py-1">Add A Doctor</p>
                <div className="mx-10 gap-2 h-[430px] overflow-y-auto">
                    <form onSubmit={handleSubmit(addDoctor)}>
                        <Label htmlFor="doctorName">Doctor Name</Label>
                        <Input
                            id="doctorName"
                            name="doctorName"
                            register={register}
                            errors={errors}
                            placeholder="Enter Doctor Name"
                        />
                        <Label className={'mt-2'} htmlFor="days">Days</Label>
                        <Multiselect
                            options={days}
                            selectedValues={selectedDays}
                            onSelect={onSelect}
                            onRemove={onRemove}
                            displayValue="name"
                            className="z-50"
                        />
                        <Label className={'mt-2'} htmlFor="clinicTimings">Clinic Timings</Label>
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <Input
                                id="startTime"
                                name="startTime"
                                register={register}
                                errors={errors}
                                // options={timings}
                                type={'time'}
                                className={'w-full'}
                            />
                            <Input
                                id="endTime"
                                name="endTime"
                                register={register}
                                errors={errors}
                                // options={timings}
                                type={'time'}
                                className={'w-full'}
                            />
                        </div>
                        <Label className={'mt-2'} htmlFor="category">Specialistion</Label>
                        <Input id="feecategorys"
                            name="category"
                            register={register}
                            errors={errors} placeholder='Specialistion' />
                        <Label className={'mt-2'} htmlFor="fees">Fees</Label>
                        <Input
                            id="fees"
                            name="fees"
                            register={register}
                            errors={errors}
                            placeholder="Enter Fees"
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
