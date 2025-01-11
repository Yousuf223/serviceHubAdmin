"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { API } from "@/api";
import { Loader } from "@/components/custom/Loader";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { food } from "@/images";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "@/lib/validation";
import Link from "next/link";
import moment from "moment";
import { ConfirmationModal } from "@/components/ui/confirmationModal";
import { useRouter } from "next/navigation";

const DataTableRestaurant = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [loader, setLoader] = useState(false);
  const [categories, setCategories] = useState([]);
  const [add, setAdd] = useState(false);
  const [addLoader, setAddloader] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const { toast } = useToast();
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const handleAdd = async (data) => {
    try {
      setAddloader(true);
      const res = await API.addCategory(data);
      if (res) {
        getCategory();
        toast({
          variant: "",
          title: "Request Successfull.",
          description: res?.data?.message ?? "User Status Changed",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          err?.response?.data?.message ||
          "There was a problem with your request.",
      });
    } finally {
      setAdd(false);
      setAddloader(false);
      reset();
    }
  };

  const getCategory = async () => {
    try {
      setLoader(true);
      const res = await API.getAdds();
      console.log("resresres", res?.data);
      setCategories(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const columns = [
    {
      accessorKey: "bussinessName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Business Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        console.log("hdksahdksadjs", row?.original?.imageUrl),
        (
          <div className="capitalize flex justify-evenly items-center">
            <Avatar>
              <AvatarImage
                className={"w-16 h-16 "}
                src={row?.original?.imageUrl}
              />
            </Avatar>
            {/* <Image width={1000} height={1000} src={row?.original?.imageUrl} /> */}
            <p>{row.getValue("bussinessName")}</p>
          </div>
        )
      ),
    },
    {
      accessorKey: "primaryContactNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Primary Number
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("primaryContactNumber")}</div>
      ),
    },
    {
      accessorKey: "secondaryContactNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Secondary Number
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("secondaryContactNumber")}
        </div>
      ),
    },
    {
      accessorKey: "views",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Views
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("views")}</div>
      ),
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>{moment(row.getValue("startDate")).format("MM-DD-YYYY")}</div>
      ),
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>{moment(row.getValue("endDate")).format("MM-DD-YYYY")}</div>
      ),
    },
    {
      accessorKey: "url",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          URL
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div onClick={() =>router.push(`${row.original.url}`) } className="underline cursor-pointer">{row.getValue("url")}</div>
      ),
    },
    {
      accessorKey: "is_deleted",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-between">
          <Link
            className="cursor-pointer"
            href={`/adds/UpdateAdds?id=${row.original.id}`}
          >
            <p>
              <span className="text-red-700 px-2  font-semibold">Edit</span>
            </p>
          </Link>
          <div
            className="cursor-pointer"
            onClick={() => [setOpen(true), setId(row.original.id)]}
          >
            <p>
              <span className="text-red-700  font-semibold">Delete</span>
            </p>
          </div>
        </div>
      ),
    },
  ];
  // table instance
  const table = useReactTable({
    data: categories,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const deleteAdds = async () => {
    try {
      // setLoader(true);
      const res = await API.deleteAdds(id);
      if (res) {
        setOpen(false);
        getCategory();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="w-full">
      {/* title */}
      <h2 className="text-4xl text-start text-primary font-bold ">Adds</h2>

      {/* header */}
      <div className="flex justify-end items-center py-4 w-full">
        <div className="flex justify-end items-center py-4 w-full">
          <Link
            className={"bg-primary text-white p-2 rounded-sm font-medium"}
            href={"/adds/CreateAdd"}
          >
            Create Adds
          </Link>
        </div>
      </div>

      {/* add category */}
      <div>
        <Sheet open={add} onOpenChange={(open) => setAdd(open)}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Category</SheetTitle>
              <SheetDescription>
                <div className="w-full">
                  <div className="w-full flex justify-center ">
                    <Avatar className="h-32 w-32">
                      <Image
                        src={food}
                        alt="food"
                        className="rounded-full w-full h-full object-center object-contain"
                      />
                    </Avatar>
                  </div>
                  <form
                    onSubmit={handleSubmit(handleAdd)}
                    className="grid grid-cols-2 gap-2 mt-12 place-content-center"
                  >
                    <Input
                      placeholder={"Title"}
                      name={"title"}
                      register={register}
                      errors={errors}
                    />
                    <Button className="w-full">
                      <Loader
                        loading={addLoader}
                        className={"text-white w-6 h-6 mr-4"}
                      />
                      Add
                    </Button>
                  </form>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      {/* table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loader ? (
              <TableRow className="">
                <TableCell colSpan={columns.length} className="h-24 ">
                  <div className="w-full flex justify-center">
                    <Loader
                      className={"h-6 w-6 text-primary"}
                      loading={loader}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {open && (
        <ConfirmationModal
          onClick={() => deleteAdds()}
          title={"Are you sure you want to delete this Add?"}
          open={open}
          setOpen={setOpen}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default DataTableRestaurant;
