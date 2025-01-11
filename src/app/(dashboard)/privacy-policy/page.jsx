"use client";
import { API } from "@/api";
import { Loader } from "@/components/custom/Loader";
import TextEditor from "@/components/ui/TextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { privacySchema } from "@/lib/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function Page() {
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [privacy, setPrivacy] = useState();
  const [toggle, setToggle] = useState("User");

  console.log(privacy?._id);

  const {
    register,
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },          
  } = useForm({
    resolver: yupResolver(privacySchema),
  });

  const handleSave = async (data) => {
    console.log('hsdhsdsds',data?.privacyPolicy)
    try {
      setLoader(true);
      delete data?.data;
      const res = await API.createPrivacyPolicy(data);
      if (res) {
        setPrivacy(res?.data?.data?.privacyPolicy);
        setOpen(false);
        toast({
          variant: "",
          title: "Request Successfull.",
          description: "Privacy Policy has been updated.",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err?.data?.message || "Error in adding privacy policy",
      });
    } finally {
      setLoader(false);
    }
  };

  const getPrivacyPolicy = async () => {
    try {
      setLoader(true);
      const res = await API.getAppSettings();
      console.log(res?.data?.data?.privacyPolicy);
      setPrivacy(res?.data?.data?.privacyPolicy || "No Privacy Policy");
      setValue("data", res?.data?.data?.privacyPolicy);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getPrivacyPolicy();
  }, [toggle]);
  // console.log("privacyprivacy-----", privacy);
  return (
    <div className=" w-full justify-center">
      <h2 className="text-4xl text-start text-primary font-bold mb-12">
        Privacy Policy
      </h2>
      <div className="flex flex-col">
        <Button
          className="self-end mb-8"
          onClick={() => setOpen(true)}
          disabled={loader}
        >
          Update Policy
        </Button>
        <Card>
          {loader && (
            <CardContent className="flex justify-center items-center min-h-[400px]">
              <Loader
                className={"h-8 w-8 text-primary mr-2"}
                loading={loader}
              />
            </CardContent>
          )}
          {!loader && (
            <CardContent>
              <div
                className="flex flex-col min-h-[400px] max-h-[700px] overflow-y-auto text-start mdx  "
                dangerouslySetInnerHTML={{ __html: privacy }}
              />
            </CardContent>
          )}
        </Card>
      </div>

      {/* modal */}
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetContent>
          <SheetHeader>
            {/* <SheetTitle>Privacy Policy</SheetTitle> */}
            <SheetDescription className="mt-12">
              <form
                onSubmit={handleSubmit(handleSave)}
                className="w-full  flex justify-center"
              >
                <Card className="max-w-[800px]">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl text-start text-primary font-bold">
                        Privacy Policy
                      </h2>
                      <Button disabled={loader}>
                        <Loader
                          className={"h-4 w-4 text-white mr-2"}
                          loading={loader}
                        />
                        Save
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <TextEditor
                      name={"privacyPolicy"}
                      value={privacy}
                      register={register}
                      errors={errors}
                      label={"privacy"}
                      control={control}
                    />
                  </CardContent>
                </Card>
              </form>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
