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
import { useRouter, useSearchParams } from "next/navigation";
import { API } from "@/api";
import { Loader } from "@/components/custom/Loader";
import { useToast } from "@/components/ui/use-toast";
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { changeSchema } from "@/lib/validation";

export default function ForgotPassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  console.log('afdhsajfhjsd',token,'hellow',email)
  const {
    register,
    handleSubmit,
    formState:{ errors },
    reset
  } = useForm({
    resolver: yupResolver(changeSchema)
  }) 



  const handleChange = async (data) => {
    try {
      setLoader(true);
      const payload = {
        password:data?.password,
        confirmPassword:data?.confirmPassword,
        email:email,
        token:token
      }
      const res = await API.resetPassword(payload);
      // Cookies.set("token", res?.data?.data?.access_token);
      // Cookies.set("refreshToken", res?.data?.data?.refresh_token)
      toast({
        variant: "",
        title: res?.data?.message,
      });
      reset()
      setTimeout(() => {
        router.push("/auth");
      }, 1000);
    } catch (error) {
      console.log(error);
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
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>Reset password to access dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleChange)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      register={register}
                      errors={errors}
                      placeholder="Password of your account"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      register={register}
                      errors={errors}
                      placeholder="Password of your account"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id={"showPassword"} onClick={() => setShowPassword(!showPassword)} />
                    <Label htmlFor="showPassword" className="cursor-pointer">Show Password</Label>
                  </div>
                </div>
                <CardFooter className="flex justify-end">
              <Button type="submit" >
                <Loader
                  className={"h-4 w-4 text-white mr-2"}
                  loading={loader}
                />
                Change Password
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
