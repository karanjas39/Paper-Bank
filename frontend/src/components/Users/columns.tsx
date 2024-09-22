"use client";

import { userType } from "@/lib/ApiTypes";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/helpers";

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
    header: () => {
      return <div className="text-center font-bold">Name</div>;
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => {
      return <div className="text-center font-bold">Email</div>;
    },
    cell: ({ row }) => (
      <div className="text-center lowercase">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "program",
    header: () => {
      return <div className="text-center font-bold">Program</div>;
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.program.name}</div>
    ),
  },
  {
    accessorKey: "admin",
    header: () => {
      return <div className="text-center font-bold">Admin</div>;
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
    header: () => {
      return <div className="text-center font-bold">Joined On</div>;
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">
        {formatDate(row.original.createdAt)}
      </div>
    ),
  },
  {
    accessorKey: "uploadCount",
    header: () => {
      return <div className="text-center font-bold">Uploads</div>;
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.uploadCount}</div>
    ),
  },
];
