"use client";

import { Button } from "@/components/ui/button";
import { userType } from "@/lib/ApiTypes";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/helpers";

const multiFieldFilter = (row: any, columnId: string, filterValue: string) => {
  if (!filterValue) return true;

  const { name, email } = row.original;
  const lowerFilterValue = filterValue.toLowerCase();

  return (
    name.toLowerCase().includes(lowerFilterValue) ||
    email.toLowerCase().includes(lowerFilterValue)
  );
};

export const columns: ColumnDef<userType>[] = [
  {
    id: "serialNumber",
    header: () => <div className="font-bold">Sr no.</div>,
    cell: ({ row }) => {
      const index = row.index + 1;
      if (index <= 9) return `0${index}`;
      else return index;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-bold"
          >
            Name
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.name}</div>
    ),
    filterFn: multiFieldFilter,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-bold"
          >
            Email
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center lowercase">{row.original.email}</div>
    ),
    filterFn: multiFieldFilter,
  },
  {
    accessorKey: "program",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-bold"
          >
            Program
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.program.name}</div>
    ),
  },
  {
    accessorKey: "admin",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-bold"
          >
            Admin
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const isAdmin = row.original.admin;
      if (isAdmin)
        return (
          <div className="text-center capitalize">
            <Badge variant="primary">Yes</Badge>
          </div>
        );

      return (
        <div className="text-center capitalize">
          <Badge variant="destructive">No</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-bold"
          >
            Joined On
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">
        {formatDate(row.original.createdAt)}
      </div>
    ),
  },
  {
    accessorKey: "uploadCount",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-bold"
          >
            Uploads
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.uploadCount}</div>
    ),
  },
];
