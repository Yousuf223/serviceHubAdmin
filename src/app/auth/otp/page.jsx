"use client";
import { useEffect, useState } from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { otpSchema } from "@/lib/validation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Otp() {
  const router = useRouter();
  let timer;
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [resend, setResend] = useState(false);
  const [timerCode, setTimerCode] = useState(60);
  const searchParams = useSearchParams();
  const otpCode = searchParams.get("otp");
  const email = searchParams.get("email");
  console.log("otpCodeotpCode", otpCode);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(otpSchema),
  });
  const startInterval = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      setTimerCode((timerCode) => {
        if (timerCode > 0) {
          return timerCode - 1;
        } else {
          setResend(true);
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);
  };

  const handleOtp = async (data) => {
    try {
      setLoader(true);
      const payload = {
        email: email,
        otp: value,
      };
      const res = await API.sendOtp(payload);
      if (res?.data?.data) {
        Cookies.set("resetToken", res?.data?.data?.token);
        setOtp(res?.data?.data?.otp);
        toast({
          variant: "",
          title: "Otp Verifed",
        });
        setTimeout(() => {
          router.push(
            `/auth/resetPassword?token=${res?.data?.data?.token}&email=${email}`
          );
        }, 1000);
      }
    } catch (error) {
      console.log(error?.response);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message,
      });
    } finally {
      setLoader(false);
    }
  };
  const handleReset = async () => {
    try {
      setLoader(true);
      const payload = {
        email: email,
      };
      const res = await API.resendOtp(payload);
      if (res?.data?.data) {
        setOtp(res?.data?.data);
        if (resend) {
          setTimerCode(60);
          setResend(false);
          setValue("");
          startInterval();
        }
        toast({
          variant: "",
          title: res?.data?.message,
        });
      }
    } catch (error) {
      console.log("error-sfdhjkdfjksdgfhsdf", error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.error,
      });
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    startInterval();
    return () => {
      clearInterval(timer);
    };
  }, [value]);
  console.log('timerCodetimerCode',timerCode)
  return (
    <div className="w-full bg-[#FCF9F9] h-screen grid grid-cols-1 place-content-center place-items-center ">
      <div className="flex-col mt-2">
        <div className="w-full justify-center  flex mb-10">
          <div className="w-48 md:w-64">
            <Link href="/" className={`w-40 h-40`}>
              <Image src={logo} alt="logo" height={1000} width={1000} />
            </Link>
          </div>
        </div>
        <div>
          <Card className="w-[300px] md:w-[600px]">
            <CardHeader>
              <CardDescription
                className={"text-black text-center text-[20px] font-bold"}
              >
                Verification
              </CardDescription>
              <p className={"text-black font-light text-[18px] text-center "}>
                We have sent you an email containing 4 digits verification code.
                Please enter the code to verify your identity
              </p>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <InputOTP
                maxLength={4}
                value={value}
                onChange={(value) => setValue(value)}
                onComplete={() => handleOtp()}
                // className={'flex justify-center items-center w-full ml-10'}
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className={
                        "text-black m-2 w-10 h-11 rounded-sm border text-center border-primary"
                      }
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <p className="text-center  text-black my-4 text-sm">
                Otp Code: {otp ? otp : otpCode}
              </p>
              <div className="flex items-center">
                <div
                  onClick={() => handleReset()}
                  className={`text-center cursor-pointer  text-black my-4 text-sm`}
                >
                  {timerCode === 0 ? "Resend" : <>Resend code in: {timerCode < 10 ? "0" + timerCode : timerCode}</>}
                </div>
                {/* <div className="pl-2"> {timerCode < 10 ? "0" + timerCode : timerCode}</div> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
