"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { TextErea } from "@/components/ui/textErea";
import { Loader } from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addReportSchema } from "@/lib/validation";
import { API } from "@/api";

const FormComponent = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState("");
  const genders = [{ title: "Male" }, { title: "Female" }, { title: "Other" }];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addReportSchema),
  });

  // Function to handle form submission
  const addReport = async (formData) => {
    if (!userData) {
      toast({
        variant: "destructive",
        title: "Please select a gender",
      });
      return;
    }

    try {
      setLoader(true);

      const reportData = {
        testId: id,
        patientName: formData.patientName,
        phoneNumber: formData.phoneNumber,
        patientAge: formData.patientAge,
        gender: userData,
        comments: formData.comments,
        reportIssuedDate: formData.reportIssuedDate,
        testCost: formData.testCost,
      };

      console.log("Submitting Report Data:", reportData);

      const response = await API.addReport(reportData);
      console.log("API Response:", response?.data);

      if (response) {
        toast({
          variant: "success",
          title: response?.data?.message,
        });
        router.back(); // Navigate back to the previous page
      }
    } catch (error) {
      console.error("API Error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.response?.data?.message || "An unknown error occurred.",
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full mt-10 p-6 rounded-xl shadow-lg bg-white border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Add Report
      </h2>
      <form onSubmit={handleSubmit(addReport)} className="space-y-6">
        {/* Patient Name and Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="patientName">
              Patient Name
            </label>
            <Input
              id="patientName"
              name="patientName"
              register={register}
              errors={errors}
              placeholder="Enter patient name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              register={register}
              errors={errors}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* Patient Age and Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="patientAge">
              Patient Age
            </label>
            <Input
              id="patientAge"
              name="patientAge"
              register={register}
              errors={errors}
              placeholder="Enter patient age"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              value={userData}
              onChange={(e) => {
                setUserData(e.target.value);
                setValue("gender", e.target.value);
              }}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="" disabled>
                Select Gender
              </option>
              {genders.map((item, index) => (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
            {!userData && (
              <p className="text-red-500 text-sm mt-1">{errors.gender?.message}</p>
            )}
          </div>
        </div>

        {/* Comments */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="comments">
            Comments
          </label>
          <TextErea
            id="comments"
            name="comments"
            register={register}
            errors={errors}
            placeholder="Enter any comments"
            className="h-32"
            show={true}
          />
        </div>

        {/* Report Issued Date and Test Cost */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="reportIssuedDate">
              Report Issued Date
            </label>
            <Input
              id="reportIssuedDate"
              type="date"
              name="reportIssuedDate"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="testCost">
              Test Cost
            </label>
            <Input
              id="testCost"
              name="testCost"
              register={register}
              errors={errors}
              placeholder="Enter test cost"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loader}
          className="w-full bg-primary hover:bg-blue-700 text-white py-3 rounded focus:outline-none"
        >
          {loader ? <Loader loading={loader} /> : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default FormComponent;
