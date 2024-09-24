"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { qpType } from "@/lib/ApiTypes";
import { BACKEND_URL } from "@/lib/constants";
import { ColumnDef } from "@tanstack/react-table";
import { AtSign, Library } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

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
    header: () => {
      return <div className="text-center font-bold">Course name</div>;
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.courseName}</div>
    ),
  },
  {
    accessorKey: "courseCode",
    header: () => {
      return <div className="text-center font-bold">Course Code</div>;
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.courseCode}</div>
    ),
  },
  {
    accessorKey: "year",
    header: () => {
      return <div className="text-center font-bold">Year</div>;
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.year}</div>
    ),
  },
  {
    accessorKey: "examType",
    header: () => {
      return <div className="text-center font-bold">Exam type</div>;
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.original.examType}</div>
    ),
  },
  {
    accessorKey: "user",
    header: () => <div className="text-center font-bold">Uploaded By</div>,
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
    accessorKey: "status",
    header: () => {
      return <div className="text-center font-bold">Status</div>;
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">
        <Badge
          className="capitalize"
          variant={
            row.original.status === "pending" ? "destructive" : "primary"
          }
        >
          {row.original.status}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "fileKey",
    header: () => <div className="font-bold text-center">Actions</div>,
    cell: ({ row }) => {
      const fileKey = row.original.fileKey;
      const downloadUrl = `${BACKEND_URL}/qp/pdf/${fileKey}`;

      const handleDownload = async (e: any) => {
        e.preventDefault();
        try {
          const response = await fetch(downloadUrl);
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {row.original.status === "pending" ? (
                <>
                  <DropdownMenuLabel>QP Actions</DropdownMenuLabel>
                  <div className="flex flex-col gap-1">
                    <QuestionPaperWarning type="accept" />
                    <QuestionPaperWarning type="reject" />
                  </div>
                  <DropdownMenuSeparator />
                </>
              ) : null}
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(row.original.fileKey)
                }
              >
                Copy File Key
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload}>
                Download QP
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

function QuestionPaperWarning({ type }: { type: "accept" | "reject" }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="text-sm text-start">
          {type === "accept" ? "Accept QP" : "Reject QP"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently{" "}
            {type === "accept" ? "publish" : "delete"} question paper.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
