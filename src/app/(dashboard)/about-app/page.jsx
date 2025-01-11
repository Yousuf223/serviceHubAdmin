"use client";
import { API } from "@/api";
import { Loader } from "@/components/custom/Loader";
import TextEditor from "@/components/ui/TextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { aboutSchema } from "@/lib/validation";
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

export default function Page() {
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [aboutApp, setAboutapp] = useState('');
  const [btn, setBtn] = useState("Add About");

  const {
    register,
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(aboutSchema),
  });

  const handleSave = async (data) => {
    try {
      setLoader(true);
      delete data?.data;
      const res = await API.createTermsAndConditionHandler(data);
      if (res) {
        setAboutapp(res?.data?.data?.aboutApp);
        setOpen(false);
        toast({
          variant: "",
          title: "Request Successfull.",
          description: "About App has been updated.",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err?.data?.message || "Error in adding terms and condition",
      });
    } finally {
      setLoader(false);
    }
  };
  const getAboutData = async () => {
    try {
      setLoader(true);
      const res = await API.getAppSettings();
      // setBtn(res?.data?.data ? "Update About" : "Add About");
      setAboutapp(res?.data?.data?.aboutApp || "No About App");
      setValue("data", res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getAboutData();
  }, []);

  return (
    <div className=" w-full justify-center">
      <h2 className="text-4xl text-start text-primary font-bold mb-12">
        About App
      </h2>

      <div className="flex flex-col">
        <Button
          className="self-end mb-8"
          onClick={() => setOpen(true)}
          disabled={loader}
        >
          {btn}
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
                dangerouslySetInnerHTML={{ __html: aboutApp }}
              />
            </CardContent>
          )}
        </Card>
      </div>

      {/* modal */}
      {open && (
        <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
          <SheetContent>
            <SheetHeader>
              <SheetDescription className="mt-12">
                <form
                  onSubmit={handleSubmit(handleSave)}
                  className="w-full  flex justify-center"
                >
                  <Card className="max-w-[800px]">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl text-start text-primary font-bold">
                          About Us
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
                        name={"aboutApp"}
                        value={aboutApp}
                        register={register}
                        errors={errors}
                        label={"aboutApp"}
                        control={control}
                      />
                    </CardContent>
                  </Card>
                </form>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
