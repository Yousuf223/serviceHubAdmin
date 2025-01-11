"use client";

import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { API } from "@/api";
import { Loader } from "@/components/custom/Loader";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addsSchema } from "@/lib/validation";
import moment from "moment";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { food, plus } from "@/images";
function CreateEvent() {
  const router = useRouter();
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [saveDraft, setSaveDraft] = useState(true);
  const [complete, setComplete] = useState(false);
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(false);
  const [data, setData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(addsSchema),
  });
  const addEvent = async (data) => {
    const now = new Date().toISOString();
    const startDate = new Date(data.startDate).toISOString()
    const endDate = new Date(data.endDate).toISOString()
    // if (startDate === endDate) {
    //   toast({
    //     variant: "",
    //     title: "Start date and end date cannot be the same.",
    //   });
    //   return;
    // }
    
    // if (startDate < now) {
    //   toast({
    //     variant: "",
    //     title: "Selected start date cannot be in the past.",
    //   });
    //   return;
    // }

    if (endDate < startDate) {
      toast({
        variant: "",
        title: "End date cannot be before start date.",
      });
      return;
    } else {
      try {
        setLoader(true);
        let payload = new FormData();
        payload.append("addImage", data.image[0]);
        payload.append("startDate", data.startDate);
        payload.append("endDate", data.endDate);
        payload.append("primaryContactNumber", data.primaryNmber);
        payload.append("bussinessName", data.bussinessName);
        if (data?.secondaryNmber !== "") {
          payload.append("secondaryContactNumber", data.secondaryNmber);
        }
        if (data?.url !== "") {
          payload.append("url", data.url);
        }

        const res = await API.createAdds(payload);
        if (res) {
          router.back();
          reset();
        }
      } catch (error) {
        toast({
          variant: "",
          title:  error?.response?.data?.message,
        });
        console.log("errrr", error?.response);
      } finally {
        setLoader(false);
       
      }
    }
  };


  const picture = watch("image");   
  const draft = watch("isDraft");
  console.log(draft, "khkjljklhjkhkh");
  useEffect(() => {
    if (picture && picture.length > 0 && picture[0] instanceof File) {
      setFile(URL.createObjectURL(picture[0]));
    }
  }, [picture]);

  useEffect(() => {
    setValue("isDraft", false);
  }, []);
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div>
      <div className=" p-5 rounded-2xl mt-3 h-[800px]">
        <div className="flex items-center mb-7">
          <div onClick={() => router.back()}>
            <IoArrowBackOutline className="h-5 min-w-9 " color="#000" />
          </div>
          <h2 className="text-primary text-start text-lg  font-bold ">
            Create Adds
          </h2>
        </div>
        <div>
          <form
            className="grid grid-cols-3 gap-2"
            onSubmit={handleSubmit(addEvent)}
          >
            <div className="col-span-2">
              <div>
                <h3 className="text-start mb-3 mt-3">Business Name</h3>
                <Input
                  className={" h-[50px] border  text-sm border-[#727272] "}
                  name="bussinessName"
                  placeholder="Business Name"
                  register={register}
                  errors={errors}
                  show={true}
                />
              </div>
              <div>
                <h3 className="text-start mb-3 mt-3">Primary Number</h3>
                <Input
                  className={" h-[50px] border  text-sm border-[#727272] "}
                  name="primaryNmber"
                  placeholder="Primary Number"
                  register={register}
                  errors={errors}
                  show={true}
                  maxLength={12}
                />
              </div>
              <div>
                <p className="text-start mb-3 mt-3">
                  Secondary Number{" "}
                  <span className="text-xs">{"(Optional)"}</span>
                </p>
                <Input
                  className={" h-[50px] border  text-sm border-[#727272] "}
                  placeholder="Secondary Number"
                  name={"secondaryNmber"}
                  register={register}
                  errors={errors}
                  show={true}
                  maxLength={12}
                />
              </div>
              <div>
                <p className="text-start mb-3 mt-3">
                  Url <span className="text-xs">{"(Optional)"}</span>
                </p>
                <Input
                  className={" h-[50px] border  text-sm border-[#727272] "}
                  name="url"
                  placeholder="Url"
                  register={register}
                  errors={errors}
                  show={true}
                />
              </div>
              <div className="grid grid-cols-10 gap-3">
                <div className="col-span-5">
                  <label className="block text-left mb-3 mt-3">
                    Start Date
                  </label>
                  <Input
                    className={
                      "w-full  h-[50px] border px-3 rounded-sm text-sm border-[#727272] "
                    }
                    min={currentDate}
                    type="date"
                    name="startDate"
                    register={register}
                    errors={errors}
                    show={true}
                    placeholder="Enter Event Title"
                  />
                </div>
                <div className="col-span-5">
                  <label className="block text-left mb-3 mt-3">End Date</label>
                  <Input
                    className={
                      "w-full  h-[50px] border px-3 rounded-sm text-sm border-[#727272] "
                    }
                    min={currentDate}
                    type="date"
                    name="endDate"
                    register={register}
                    errors={errors}
                    show={true}
                    placeholder="Enter Event Title"
                  />
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <button
                  type="sumbit"
                  // onClick={() => addEvent() }
                  className={`w-36 cursor-pointer mt-2 items-center justify-center flex rounded-sm bg-primary h-12`}
                >
                  {loader && <Loader className={"h-4 w-4 text-white mr-2"} />}

                  <p className="text-white">Create</p>
                </button>
              </div>
            </div>
            <div className="w-full">
              {complete && (
                <div className="flex justify-end items-center py-3 border-b-[1px] border-[#AAAAAA]">
                  <p className="text-[#00E5FF] text-[12px] ">Published on: </p>
                  <p className="text-white text-[11px] pl-2 font-extralight">
                    {moment(data?.createdAt).format("MM-DD-YYYY")} |{" "}
                    {moment(data?.createdAt).format("hh-mm A")}
                  </p>
                </div>
              )}

              <p className="text-start mt-2 ml-2 mb-4">Add Cover Image</p>
              <label
                className="w-full h-[200px]  border ml-2 border-dashed  border-[#B2B2B2] flex items-center justify-center"
                htmlFor="file"
              >
                <div className="flex flex-col gap-2 relative w-full h-full justify-center items-center  ">
                  {/* Show the uploaded image */}
                  <Image
                    className={`${
                      file
                        ? "object-contain absolute top-0 bottom-0 right-0 left-0 h-[200px] "
                        : "w-5 h-5"
                    }`}
                    src={file || plus}
                    width={1000}
                    height={100}
                    alt="upload"
                  />
                  {/* Button to remove the selected file */}

                  {file ? (
                    <div
                      onClick={() => [setFile(null)]}
                      className="absolute cursor-pointer z-50 bg-[#000000] flex items-center justify-center w-9 h-9 rounded-full"
                    >
                      
                      <RxCross2 className="w-6 h-6" color="#FF0000" />
                    </div>
                  ) : (
                    <span>Upload Image</span>
                  )}
                  {/* Input field for selecting the file */}
                  <Input
                    type="file"
                    name="image"
                    register={register}
                    errors={errors}
                    show={true}
                    id="file"
                    className="hidden"
                  />
                </div>
              </label>

              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFile(file);
                  }
                }}
                className="hidden"
                type="file"
                id="file"
                name="image"
                register={register}
                errors={errors}
                show={true}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
