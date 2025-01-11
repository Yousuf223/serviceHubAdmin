"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { useTheme } from "next-themes";
import { API } from "@/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/custom/Loader";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "@/lib/validation";

export default function Page() {
  const { setTheme } = useTheme();
  const selectedMode = Cookies.get("mode");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState(selectedMode);
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const router = useRouter();

  const handleMode = () => {
    if (mode == "light") {
      setMode("dark");
      Cookies.set("mode", "dark");
      setTheme("dark");
    } else {
      setMode("light");
      Cookies.set("mode", "light");
      setTheme("light");
    }
  };

  const handleChange = async (data) => {
    try {
      setLoader(true);
      const res = await API.changePassword(data); // Await the response
  
      console.log("resresres", res);
      if (res) {
        toast({
          title: "Request Successful.",
          description: "Password has been changed successfully.",
        });
        reset();
        // Logout logic can be added back if needed
      }
    } catch (err) {
      console.log('Error: ', err);
      toast({
        description: err?.response?.data.message ,
      });
    } finally {
      setLoader(false);
    }
  };
  

  return (
    <div className="w-full">
      <h2 className="text-4xl text-start text-primary font-bold mb-12">
        Change Password
      </h2>
      <div className="flex justify-center w-full">
        <Tabs defaultValue="account_setting" className="text-lg">
          <TabsContent value="account_setting">
            <form onSubmit={handleSubmit(handleChange)}>
              <Card className={"w-[260px] sm:w-[400px]"}>
                <CardHeader>
                  {/* <CardTitle>Password</CardTitle> */}
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1 ">
                    <div className="w-full flex justify-start mb-2">
                      <Label htmlFor="oldPassword">Current password</Label>
                    </div>
                    <Input
                      name="oldPassword"
                      register={register}
                      type={showPassword ? "text" : "password"}
                      errors={errors}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="w-full flex justify-start mb-2">
                      <Label htmlFor="password">New password</Label>
                    </div>
                    <Input
                      name="password"
                      register={register}
                      type={showPassword ? "text" : "password"}
                      errors={errors}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="w-full flex justify-start mb-2">
                      <Label htmlFor="password">Confirm password</Label>
                    </div>
                    <Input
                      name="confirmPassword"
                      register={register}
                      type={showPassword ? "text" : "password"}
                      errors={errors}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="togglePassword"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                    <Label htmlFor="togglePassword" className="cursor-pointer">
                      Show Password
                    </Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit">
                    <Loader
                      loading={loader}
                      className={"w-4 h-4 text-white mr-2"}
                    />
                    Save Password
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
          <TabsContent value="dashboard_setting">
            <div className="flex justify-center w-full">
              <Card className="min-w-[500px] text-gray-500">
                <CardHeader className="text-lg ">Dashboard Settings</CardHeader>
                <CardContent>
                  <ul className="">
                    <li className="">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="toggleMode"
                          checked={mode == "dark" ? true : false}
                          onClick={handleMode}
                        />
                        <Label htmlFor="toggleMode" className="cursor-pointer">
                          Dark Mode
                        </Label>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
