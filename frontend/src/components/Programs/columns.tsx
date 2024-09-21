"use client";

import { Button } from "@/components/ui/button";
import { ProgramType } from "@/lib/ApiTypes";
import { formatDate } from "@/lib/helpers";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

const multiFieldFilter = (row: any, columnId: string, filterValue: string) => {
  if (!filterValue) return true;

  const { name } = row.original;
  const lowerFilterValue = filterValue.toLowerCase();

  return name.toLowerCase().includes(lowerFilterValue);
};

export const columns: ColumnDef<ProgramType>[] = [
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
            Program Name
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
    accessorKey: "createdAt",
    header: () => <div className="text-center font-bold">Created On</div>,
    cell: ({ row }) => (
      <div className="text-center capitalize">
        {formatDate(row.original.createdAt)}
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center font-bold">Actions</div>,
    cell: () => (
      <div className="text-center capitalize">
        <Button variant="secondary" size="sm">
          Edit program
        </Button>
      </div>
    ),
  },
];
