"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { back, cross, edit, food, save, tic, upload, user } from "@/images";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { API } from "@/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextErea } from "@/components/ui/textErea";
import { addsSchema } from "@/lib/validation";
import moment from "moment";
import { Loader } from "@/components/custom/Loader";
import { IoArrowBackOutline } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function CreateEvent() {
  const { toast } = useToast();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(true);
  const [complete, setComplete] = useState(false);
  const [loader, setLoader] = useState(false);
  const [eventdata, setEventData] = useState({});
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
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
        if (data.image[0]) {
          payload.append("addImage", data.image[0]);
        } else {
          payload.append("imageUrl", file);
        }

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

        const res = await API.updateAdds(payload, id);
        if (res) {
          router.back();
        }
      } catch (error) {
        console.log("errrr", error?.response?.data?.error);
      } finally {
        setLoader(false);
        reset();
      }
    }
  };

  const getEventById = async () => {
    try {
      const eventId = Number(id);
      const res = await API.getAddsDetail(eventId);
      if (res) {
        setEventData(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Any cleanup code can go here
    }
  };
  useEffect(() => {
    getEventById();
  }, []);
  useEffect(() => {
    setFile(eventdata?.imageUrl);
    setValue("bussinessName", eventdata?.bussinessName);
    setValue("primaryNmber", eventdata?.primaryContactNumber);
    setValue(
      "secondaryNmber",
      eventdata?.secondaryContactNumber == null
        ? ""
        : eventdata?.secondaryContactNumber
    );
    setValue("endDate", moment(eventdata.endDate).format("YYYY-MM-DD"));
    setValue("startDate", moment(eventdata.startDate).format("YYYY-MM-DD"));
    setValue("url", eventdata?.url == null ? "" : eventdata?.url);
  }, [eventdata]);

  const picture = watch("image");
  useEffect(() => {
    if (picture && picture.length > 0 && picture[0] instanceof File) {
      setFile(URL.createObjectURL(picture[0]));
    }
  }, [picture]);
  const currentDate = new Date().toISOString().split("T")[0];
  console.log("eventdataeventdata", file);
  return (
    <div>
      <div className=" p-5 rounded-2xl mt-3 h-[800px]">
        <div className="flex items-center mb-7">
          <div onClick={() => router.back()}>
            <IoArrowBackOutline className="h-5 min-w-9 " color="#000" />
          </div>
          <h2 className="text-primary text-start text-lg  font-bold ">
            Edit Adds
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
                  className={`w-36 cursor-pointer mt-4 items-center justify-center flex rounded-sm bg-primary h-12`}
                >
                  {loader && <Loader className={"h-4 w-4 text-white mr-2"} />}

                  <p className="text-white">Update</p>
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
                  {/* <Image
                    className={`${
                      file
                        ? "object-contain absolute top-0 bottom-0 right-0 left-0 h-[200px] "
                           : "w-4 h-4"
                    }`}
                    src={file || food}
                    width={1000}
                    height={100}
                    alt="upload"
                  /> */}
                  <Avatar className={'w-full h-full'}>
                    <AvatarImage
                      className={`${
                        file
                          ? "w-full h-[200px] "
                          : "w-4 h-4"
                      }`}
                      src={file}
                    />
                  </Avatar>
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
