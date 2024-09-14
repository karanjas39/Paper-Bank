"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function MyUpload() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Table>
        <TableCaption>A list of your question paper uploads.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Course</TableHead>
            <TableHead className="text-center">Course Code</TableHead>
            <TableHead className="text-center">Year</TableHead>
            <TableHead className="text-center">Exam Type</TableHead>
            <TableHead className="text-center">Program</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Download</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-left">
              Fundamentals of Computer
            </TableCell>
            <TableCell className="text-center">CSE401</TableCell>
            <TableCell className="text-center">2023</TableCell>
            <TableCell className="text-center">MSE</TableCell>
            <TableCell className="text-center">BTech CSE</TableCell>
            <TableCell className="text-center">
              <Badge>Approved</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button size="sm">Download</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-left">
              Data Structures
            </TableCell>
            <TableCell className="text-center">CSE401</TableCell>
            <TableCell className="text-center">2023</TableCell>
            <TableCell className="text-center">MSE</TableCell>
            <TableCell className="text-center">BTech CSE</TableCell>
            <TableCell className="text-center">
              <Badge variant="destructive">Rejected</Badge>
            </TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default MyUpload;
