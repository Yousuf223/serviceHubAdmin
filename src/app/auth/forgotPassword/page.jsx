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
import { forgotPasswordSchema } from "@/lib/validation";

export default function ForgotPassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState:{ errors },
    reset
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema)
  }) 



  const handleChange = async (data) => {
    try {
      setLoader(true);
      delete data?.otp
      delete data?.newPassword
      const res = await API.forgotPassword(data);
      console.log('res?.datares?.data',res?.data)
      toast({
        variant: "",
        title: res?.data?.message,
      });
      reset()
      setTimeout(() => {
        router.push(`/auth/otp?email=${data?.email}&otp=${res?.data?.data}`);
      }, 1000);
    } catch (error) {
      console.log(error?.response);
      toast({
        variant: "destructive",
        description:
          error?.response?.data?.message 
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full bg-[#FCF9F9] h-screen grid grid-cols-1 place-content-center place-items-center ">
      <div className="flex-col mt-2">
        <div className="w-full justify-center flex mb-10">
          <div className="w-48 md:w-64">
            <Link href="/" className={`w-40 h-40`}>
              <Image src={logo} alt="logo" height={1000} width={1000} />
            </Link>
          </div>
        </div>

        <div>
          <Card className="w-[300px] md:w-[600px]">
            <CardHeader>
              <CardTitle>Forgot Password</CardTitle>
              {/* <CardDescription>Change password to access dashboard.</CardDescription> */}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleChange)}>
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
       
            
                </div>
                <CardFooter className="flex justify-end mt-6">
              <Button type="submit" >
                <Loader
                  className={"h-4 w-4 text-white mr-2"}
                  loading={loader}
                />
               Continue
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
