"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { qpType } from "@/lib/ApiTypes";
import { BACKEND_URL } from "@/lib/constants";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

const multiFieldFilter = (row: any, columnId: string, filterValue: string) => {
  if (!filterValue) return true;

  const { courseName, courseCode, exampType } = row.original;
  const lowerFilterValue = filterValue.toLowerCase();

  return (
    courseName.toLowerCase().includes(lowerFilterValue) ||
    courseCode.toLowerCase().includes(lowerFilterValue) ||
    exampType.toLowerCase().includes(lowerFilterValue)
  );
};

export const columns: ColumnDef<qpType>[] = [
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
    accessorKey: "courseName",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-bold"
          >
            Course Name
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
      <div className="text-center capitalize">{row.original.courseName}</div>
    ),
    filterFn: multiFieldFilter,
  },
  {
    accessorKey: "courseCode",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-bold"
          >
            Course Code
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
      <div className="text-center capitalize">{row.original.courseCode}</div>
    ),
    filterFn: multiFieldFilter,
  },
  {
    accessorKey: "year",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold"
        >
          Year
          {column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.year}</div>
    ),
  },
  {
    accessorKey: "examType",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold"
        >
          Exam Type
          {column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.examType}</div>
    ),
    filterFn: multiFieldFilter,
  },
  {
    accessorKey: "program",
    header: ({ column }) => (
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
    ),
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.program.name}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold"
        >
          Status
          {column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const myStatus = row.original.status;

      if (myStatus === "pending")
        return (
          <div className="text-center capitalize">
            <Badge variant="secondary">{row.original.status}</Badge>
          </div>
        );
      else if (myStatus === "approved")
        return (
          <div className="text-center capitalize">
            <Badge>{row.original.status}</Badge>
          </div>
        );
      else
        return (
          <div className="text-center capitalize">
            <Badge variant="destructive">{row.original.status}</Badge>
          </div>
        );
    },
  },
  {
    accessorKey: "fileKey",
    header: () => <div className="font-bold text-center">Download</div>,
    cell: ({ row }) => {
      const fileKey = row.original.fileKey;
      const downloadUrl = `${BACKEND_URL}/qp/pdf/${fileKey}`;
      const status = row.original.status;
      const { toast } = useToast();

      const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (status === "pending")
          return toast({
            description: "This question paper is not yet approved.",
            variant: "destructive",
          });

        if (status === "rejected")
          return toast({
            description: "This question paper is rejected.",
            variant: "destructive",
          });

        e.preventDefault();
        try {
          const response = await fetch(downloadUrl);
          if (!response.ok)
            toast({
              description: "Failed to download Question Paper",
              variant: "destructive",
            });
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = `${row.original.courseName}(${row.original.courseCode})-${row.original.examType}-${row.original.year}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error("Download failed:", error);
        }
      };

      return (
        <div className="text-center capitalize">
          <Button variant="outline" onClick={handleDownload}>
            Download
          </Button>
        </div>
      );
    },
  },
];
