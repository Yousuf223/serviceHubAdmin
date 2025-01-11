"use client";
import {
  FaChartBar,
  FaChild,
  FaFile,
  FaHandHolding,
  FaHandshake,
  FaImages,
  FaUser,
  FaWrench,
  FaUsers
} from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { RiListCheck3 } from "react-icons/ri";
import { RiRefund2Fill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { FaHorse } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { logo } from "@/images";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { API } from "@/api";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { MdDeliveryDining } from "react-icons/md";
import { RiFeedbackFill } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
export default function Sidebar({ sidebarSize }) {
  const path = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const [profilePic, setPic] = useState("")
  const [email, setEmail] = useState("")

  // const getProfile = async ()=>{
  //   try{
  //     const res = await API.adminProfile()
  //     if(res){
  //       setPic(res?.data?.data?.profile_picture || logo)
  //       setEmail(res?.data?.data?.email)
  //     }
  //   }catch(err){
  //     console.log(err)
  //   }
  // }

  const handleLogout =  () => {
    Cookies.remove("token");
    setTimeout(() => {
      router.push("/auth");
    }, 1000);
  };

  useEffect(()=>{
    // getProfile()
  },[])



  return (
    <div className="flex-col h-full  justify-center items-center p-6">
      <div className={"mb-8"}>
        <p className="text-black font-medium">Service Hub</p>
        {/* <Link href="/" className={`w-40 h-40`}>
          <Image src={logo} alt="logo" height={1000} width={1000} />
        </Link> */}
      </div>
      {sidebarSize > 10 ? (
        // full size
        <div className="sm:text-sm">
          <Separator className="my-4" />
          <Link
            href={"/"}
            className={`flex mb-2 w-full h-9 text-center rounded-lg items-center  ${
              path == "/" ? "bg-primary" : "hover:bg-gray-400"
            }`}
          >
            <FaUsers className={`mr-2 h-4 min-w-8 ${ path == "/" ? "text-white" : "text-black"}`} />{" "}
            <p className={`sm:hidden xl:flex ${ path == "/" ? "text-white" : "text-black"}`}>Users</p>
          </Link>
          <Link
            href={"/user"}
            className={`flex  mb-2 w-full h-9 text-center rounded-lg items-center  ${
              path == "/user" ? "bg-primary" : "hover:bg-gray-400"
            }`}
          >
            <FaUsers className={`mr-2 h-4 min-w-8 ${ path == "/user" ? "text-white" : "text-black"}`} />{" "}
            <p className={`sm:hidden pl-1 xl:flex ${ path == "/user" ? "text-white" : "text-black"}`}>
              Members
            </p>
          </Link>
          <Link
            href={"/Class"}
            className={`flex  mb-2 w-full h-9 text-center rounded-lg items-center  ${
              path == "/Class" ? "bg-primary" : "hover:bg-gray-400"
            }`}
          >
            <RiRefund2Fill className={`mr-2 h-5 min-w-9 ${ path == "/Class" ? "text-white" : "text-black"}`} />{" "}
            <p className={`sm:hidden xl:flex ${ path == "/Class" ? "text-white" : "text-black"}`}>
              Classes
            </p>
          </Link>
       
          {/* <Link
            href={"/privacy-policy"}
            className={`flex mb-2 w-full py-2 text-center rounded-lg items-center ${
              path == "/privacy-policy" ? "bg-primary" : "hover:bg-gray-400 "
            }`}
          >
            <FaHandshake className={`mr-2 h-4 min-w-8 ${ path == "/privacy-policy" ? "text-white" : "text-black"}`} />
            <p className={`sm:hidden xl:flex ${ path == "/privacy-policy" ? "text-white" : "text-black"}`}>Privacy Policy</p>
          </Link>
          <Link
            href={"/terms-condition"}
            className={`flex mb-2 w-full py-2 text-center rounded-lg items-center ${
              path == "/terms-condition" ? "bg-primary" : "hover:bg-gray-400 "
            }`}
          >
            <RiListCheck3 className={`mr-2 h-4 min-w-8 ${ path == "/terms-condition" ? "text-white" : "text-black"}`} />
            <p className={`sm:hidden xl:flex ${ path == "/terms-condition" ? "text-white" : "text-black"}`}>Terms & Conditions</p>
          </Link>
          <Link
            href={"/about-app"}
            className={`flex mb-2 w-full py-2 text-center rounded-lg items-center ${
              path == "/about-app" ? "bg-primary" : "hover:bg-gray-400 "
            }`}
          >
            <MdInfo className={`mr-2 h-4 min-w-8 ${ path == "/about-app" ? "text-white" : "text-black"}`} />
            <p className={`sm:hidden xl:flex ${ path == "/about-app" ? "text-white" : "text-black"}`}>About App</p>
          </Link> */}
        </div>
      ) : (
        // small size
        <div className="flex-col gap-2 items-center text-center justify-center">
          <Separator className="my-4" />

          <Link
            href={"/"}
            className={`flex justify-center mb-2 w-full p-2 text-center rounded-lg items-center ${
              path == "/" ? "bg-primary" : "hover:bg-gray-400"
            }`}
          >
            <FaChartBar className=" h-6 min-w-8 " />
          </Link>
          <Link
            href={"/restaurant"}
            className={`flex justify-center mb-2 w-full p-2 text-center rounded-lg items-center  ${
              path == "/restaurant" ? "bg-primary" : "hover:bg-gray-400"
            }`}
          >
            <FaShop className=" h-6 min-w-8 " />
          </Link>
          <Link
            href={"/user"}
            className={`flex justify-center mb-2 w-full p-2 text-center rounded-lg items-center  ${
              path == "/user" ? "bg-primary" : "hover:bg-gray-400"
            }`}
          >
            <FaUsers className=" h-6 min-w-8 " />
          </Link>

          <Link
            href={"/category"}
            className={`flex justify-center mb-2 w-full p-2 text-center rounded-lg items-center  ${
              path == "/category" ? "bg-primary" : "hover:bg-gray-400"
            }`}
          >
            <IoFastFood className=" h-6 min-w-8 " />
          </Link>
          <Link
            href={"/order"}
            className={`flex justify-center mb-2 w-full p-2 text-center rounded-lg items-center  ${
              path == "/order" ? "bg-primary" : "hover:bg-gray-400"
            }`}
          >
            <MdDeliveryDining className=" h-6 min-w-8 " />
          </Link>
          <Separator className="my-4" />
          <Link
            href={"/profile"}
            className={`flex justify-center mb-2 w-full p-2 text-center rounded-lg items-center  ${
              path == "/profile" ? "bg-primary" : "hover:bg-gray-400"
            }`}
          >
            <FaUser className=" h-6 min-w-8 " />
          </Link>
          <Link
            href={"/settings"}
            className={`flex justify-center mb-2 w-full p-2 text-center rounded-lg items-center ${
              path == "/settings" ? "bg-primary" : "hover:bg-gray-400"
            }`}
          >
            <FaWrench className=" h-6 min-w-8 " />
          </Link>
          <Link
            href={"/privacy-policy"}
            className={`flex justify-center w-full p-2 text-center rounded-lg items-center  ${
              path == "/privacy-policy" ? "bg-primary" : "hover:bg-gray-400"
            }`}
          >
            <FaHandshake className=" h-6 min-w-8" />
          </Link>
          
          <Link
            href={"/terms-condition"}
            className={`flex justify-center w-full p-2 text-center rounded-lg items-center  ${
              path == "/terms-condition" ? "bg-primary" : "hover:bg-gray-400"
            }`}
          >
            <RiListCheck3 className=" h-6 min-w-8" />
          </Link>
          <Link
            href={"/about-app"}
            className={`flex justify-center w-full p-2 text-center rounded-lg items-center  ${
              path == "/about-app" ? "bg-primary" : "hover:bg-gray-400"
            }`}
          >
            <MdInfo className=" h-6 min-w-8" />
          </Link>
        </div>
      )}
      <div className="grid mt-24 gap-2 w-full">
              <p className="text-blue-600">{email}</p>
              <div
                onClick={handleLogout}
                className="hover:bg-primary hover:text-white cursor-pointer py-2 text-center rounded-md border border-gray-400 "
              >
                Logout
              </div>
            </div>
    </div>
  );
}
