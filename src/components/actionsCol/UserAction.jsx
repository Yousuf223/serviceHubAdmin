import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { API } from "@/api";
import { Loader } from "../custom/Loader";

export default function UserAction({ row }) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState(null);

  const [loader, setLoader] = useState(false);
  const [classes, setClasses] = useState([]);
  console.log('classesclasses', status)
  console.log('asdshadhsad', row?.original)
  const { toast } = useToast();

  const handleView = () => {
    setOpen(true);
    setDetails(row.original);
  };

  const getClasses = async () => {
    try {
      setLoader(true);
      const res = await API.getClass();
      setClasses(res?.data?.data || []);

    } catch (error) {
      toast({
        variant: "destructive",
        description:
          error?.response?.data?.message
      });
    } finally {
      setLoader(false);
    }
  };

  const handleClassSelect = (classId) => {
    setStatus(classId);
  };

  useEffect(() => {
    getClasses();
  }, []);
  const addMemberToClass = async () => {

    try {
      const data = {
        classId: status,
        memberId: row?.original?._id
      }
      setLoader(true);
      const res = await API.addMemberClass(data);
      toast({
        variant: "",
        title: "Member added to class successfully",
      });
    } catch (error) {
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
    <div>
      <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleView}>
        <DotsHorizontalIcon className="h-4 w-4" />
      </Button>
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-primary">Add to Class</SheetTitle>
          </SheetHeader>
          <div className="mt-10 flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className={'w-48'} variant="outline">
                  {status
                    ? classes.find((item) => item._id === status)?.title || "Select Class"
                    : "Select Class"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {loader ? (
                  <DropdownMenuItem>Loading...</DropdownMenuItem>
                ) : (
                  classes.map((classItem) => (
                    <DropdownMenuItem
                      className={'w-48'}
                      key={classItem._id}
                      onClick={() => handleClassSelect(classItem._id)}
                    >
                      {classItem.title}
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex justify-center">
            <Button onClick={() => addMemberToClass()} className={'w-48 mt-10 flex '}>
              <Loader className={"h-4 w-4 text-white mr-2"}
                loading={loader} />
              Add to Class
            </Button>
          </div>

        </SheetContent>
      </Sheet>
    </div>
  );
}
