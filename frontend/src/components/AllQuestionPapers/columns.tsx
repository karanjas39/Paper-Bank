"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { DownloadCellProps, qpType } from "@/lib/ApiTypes";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { AtSign, Library } from "lucide-react";
import { useState } from "react";
import { BACKEND_URL } from "@/lib/constants";
import ButtonLoader from "../Loaders/ButtonLoader";

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

const DownloadCell: React.FC<DownloadCellProps> = ({
  fileKey,
  courseName,
  courseCode,
  examType,
  year,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadUrl = `${BACKEND_URL}/qp/pdf/${fileKey}`;

  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDownloading(true);
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${courseName}(${courseCode})-${examType}-${year}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="text-center capitalize">
      <Button onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? (
          <>
            <span>Wait</span> <ButtonLoader />
          </>
        ) : (
          "Download"
        )}
      </Button>
    </div>
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
    accessorKey: "user",
    header: () => <div className="text-center font-bold">Contributed By</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <HoverCard>
          <HoverCardTrigger className="text-center capitalize">
            {row.original.user?.name}
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-col gap-1 w-max">
            <div className="flex items-center gap-1">
              <Library />
              <p>{row.original.user?.program.name}</p>
            </div>
            <div className="flex items-center gap-1">
              <AtSign />
              <p>{row.original.user?.email}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    ),
  },
  {
    accessorKey: "fileKey",
    header: () => <div className="font-bold text-center">Download</div>,
    cell: ({ row }) => (
      <DownloadCell
        fileKey={row.original.fileKey}
        courseName={row.original.courseName}
        courseCode={row.original.courseCode}
        examType={row.original.examType}
        year={row.original.year.toString()}
      />
    ),
  },
];
