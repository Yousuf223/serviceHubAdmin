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
import { addLabortorySehema } from "@/lib/validation"; // Validation schema
import { useToast } from "./use-toast";
import { API } from "@/api";
import { Loader } from "../custom/Loader";
import { Button } from "./button";
import { TextErea } from "./textErea";

const sampleTypes = [
    'Blood',
    'Urine',
    'Saliva',
    'Stool',
    'Sputum',
    'Swab',
    'Skin Scraping',
    'Tissue',
    'Cerebrospinal Fluid',
    'Amniotic Fluid',
    'Hair',
    'Nail Clipping',
    'Sweat',
    'Breath',
    'Semen'
];

export function AddLaboratryModal({ open, setOpen, getDoctors, onClick }) {
    const { toast } = useToast();
    const [loader, setLoader] = React.useState(false);
    const [selectedSampleType, setSelectedSampleType] = React.useState(null);
    const { register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(addLabortorySehema)
    })

    const addDoctor = async (data) => {
        const payload = {
            testName: data?.testName,
            testFees: data?.testFees,
            sampleRequired: selectedSampleType,
            description: data?.description
        }

        console.log('payload', payload)

        try {
            setLoader(true);
            const res = await API.addLaboratory(payload);
            if (res) {
                setOpen(false)
                toast({
                    variant: "success",
                    title: res?.data?.message,
                });
            }
        } catch (error) {
            console.log('error', error);
            toast({
                variant: "destructive",
                description:
                    error?.response?.data?.message || "An error occurred."
            });
        } finally {
            setLoader(false);
        }
    };

    const handleSampleTypeChange = (e) => {
        setSelectedSampleType(e.target.value);
    };

    return (
        <Popup open={open} setOpen={setOpen}>
            <div className="h-[670px] rounded-md ">
                <div onClick={() => setOpen(false)} className="flex justify-end mr-4 cursor-pointer ">
                    <RxCross2 className="w-4 h-4 object-contain mt-4" />
                </div>
                <p className="text-center text-black text-[14px] py-1">Add A Laboratory</p>
                <div className="mx-10 gap-2 h-[430px] overflow-y-auto">
                    <form onSubmit={handleSubmit(addDoctor)}>
                        <Label className={'mt-2'} htmlFor="testName">Test Name</Label>
                        <Input
                            id="testName"
                            name="testName"
                            register={register}
                            errors={errors}
                            placeholder="Enter Test Name"
                        />
                        <Label className={'mt-2'} htmlFor="testFees">Test Fees</Label>
                        <Input
                            id="testFees"
                            name="testFees"
                            register={register}
                            errors={errors}
                            placeholder="Enter Test Fees"
                        />
                        <Label className={'mt-2'} htmlFor="sampleRequired">Sample</Label>
                        <select
                            id="sampleRequired"
                            name="sampleRequired"
                            value={selectedSampleType}
                            onChange={handleSampleTypeChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Sample Type</option>
                            {sampleTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <Label className={'mt-2'} htmlFor="description">Description</Label>
                        <TextErea
                            id="description"
                            name="description"
                            register={register}
                            errors={errors}
                            placeholder="Enter Description"
                            className={'h-[100px]'}
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
