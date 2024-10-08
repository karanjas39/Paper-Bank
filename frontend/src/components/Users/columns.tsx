"use client";

import { userType } from "@/lib/ApiTypes";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/helpers";
import ResetUploads from "./ResetUploads";

export const columns: ColumnDef<userType>[] = [
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
    accessorKey: "verified",
    header: () => {
      return <div className="text-center font-bold">Verified</div>;
    },
    cell: ({ row }) => {
      const isAdmin = row.original.verified;
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
  {
    accessorKey: "uploadCount",
    header: () => {
      return <div className="text-center font-bold">Actions</div>;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center capitalize">
          <ResetUploads
            id={Number(row.original.id)}
            count={row.original.uploadCount}
          />
        </div>
      );
    },
  },
];
