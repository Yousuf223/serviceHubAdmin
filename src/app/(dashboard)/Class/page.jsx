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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { API } from "@/api";
import { Loader } from "@/components/custom/Loader";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import moment from "moment";
import EventAction from "@/components/actionsCol/EventAction";
import { AddClassModal } from "@/components/ui/addClassModal";

function Page() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const { toast } = useToast();
  const [toggal, setToggal] = useState("Planned_Events");
  
  // const statusQuery = query.get("order_status");
  const changeStatus = (status) => {
    setToggal(status);
  };

  const getBooking = async () => {
    try {
      setLoader(true);
      const res = await API.getClass();
      setUsers(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getBooking();
  }, [toggal]);

  // table columns
  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div >
          {/* Uncomment if needed */}
          {/* <Image
            className="object-contain mr-4"
            src={row?.original?.User?.profileUrl}
            width={30}
            height={30}
            alt="Picture of the author"
          /> */}
          <div className="lowercase  text-black pt-6 pb-6">
            {`${row?.original.title}`}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "classCode",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Class Code
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("classCode")}</div>,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <Button
          className={''}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="">
          {row.getValue("description").length > 50
            ? `${row.getValue("description").slice(0, 50)}...`
            : row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">
          {moment(row.getValue("createdAt")).format("MM-DD-YYYY")}
        </div>
      ),
    },
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => <EventAction toggal={toggal} row={row} getUser={getBooking} />
    // },
  ];



  // table instance
  const table = useReactTable({
    data: users,
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

  return (
    <div className="w-full">
      <h2 className="text-4xl text-start text-primary font-bold ">Classes</h2>
      <div className="flex justify-end mt-4 w-full">
        <div onClick={()=>setOpen(true)} className="bg-primary w-40 h-11 flex justify-center items-center mb-2 rounded-md cursor-pointer ">
          <p className="text-white">Add Class</p>
        </div>
      </div>
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
                <TableCell colSpan={columns?.length} className="h-24 ">
                  <div className="w-full flex justify-center">
                    <Loader
                      className={"h-6 w-6 text-primary"}
                      loading={loader}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ) : users && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells()?.map((cell) => (
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
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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
            disabled={table?.length && !table?.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {open && <AddClassModal
        title={"Are you sure you want to delete this Add?"}
        open={open}
        getBooking={getBooking}
        setOpen={setOpen}>

      </AddClassModal>}

    </div>
  );
}

export default Page;