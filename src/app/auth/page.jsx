"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logo } from "@/images";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { API } from "@/api";
import { Loader } from "@/components/custom/Loader";
import { useToast } from "@/components/ui/use-toast";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { loginSchema  } from "@/lib/validation";

export default function Page() {
  const router = useRouter();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "email") {
  //     setEmail(value);
  //   } else if (name === "password") {
  //     setPassword(value);
  //   }
  // };

  const {register,
    handleSubmit,
    formState:{ errors },
    reset
  } = useForm({
    resolver: yupResolver(loginSchema)
  }) 



  const handleLogin = async (data) => {
    try {
      console.log('datadata',data)
      let payload = {
        email:data?.email,
        password:data?.password,
        role:'SERVICEPROVIDER'
      };
      setLoader(true);
      const res = await API.loginUser(payload);
     
      if(res){
        Cookies.set("token", res?.data?.token);
        Cookies.set("adminProfile", res?.data?.data)
        toast({
          variant: "",
          title: "Request Successfull.",
          description: "Admin Logged In.",    
        });
        if(window && window !== undefined){
          window.location.href ="/"
        }
      }
        

    } catch (error) {
      console.log('errrr',error);
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
    <div className="w-full bg-[#FCF9F9] h-screen grid grid-cols-1 place-content-center place-items-center ">
      <div className="flex-col mt-2">


        <div>
          <Card className="w-[300px] md:w-[600px] ">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to access dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      register={register}
                      errors={errors}
                      placeholder="Email address of your account"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      register={register}
                      errors={errors}
                      placeholder="Password of your account"
                    />
                  </div>
                  <div className="flex flex-row justify-between items-center pb-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="showPassword" onClick={() => setShowPassword(!showPassword)} />
                    <Label htmlFor="showPassword" className="cursor-pointer text-[12px] md:text-lg">Show Password</Label>
                  </div>
                  </div>
                </div>
                <CardFooter className="flex justify-end">
              <Button type="submit" >
                <Loader
                  className={"h-4 w-4 text-white mr-2"}
                  loading={loader}
                />
                Login
              </Button>
            </CardFooter>
              </form>
            </CardContent>
            
          </Card>
        </div>
      </div>
    </div>
  );
}
