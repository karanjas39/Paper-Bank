import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  totalUsers: number;
}

export function DataTablePagination<TData>({
  table,
  onPageChange,
  onPageSizeChange,
  totalUsers,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageSize = table.getState().pagination.pageSize;

  const handlePageSizeChange = (value: string) => {
    const newPageSize = Number(value);
    table.setPageSize(newPageSize);
    onPageSizeChange(newPageSize);
  };

  const handlePageChange = (newPage: number) => {
    table.setPageIndex(newPage - 1);
    onPageChange(newPage);
  };

  return (
    <div className="flex sm:items-center items-start gap-1 sm:flex-row flex-col justify-between px-2 mt-3">
      <div className="flex-1 text-sm text-muted-foreground">
        {totalUsers} total users
      </div>
      <div className="flex sm:flex-row flex-col sm:items-center items-start sm:space-x-6 lg:space-x-8 sm:mt-0 mt-2 gap-2 w-full sm:w-max">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50, 60, 70, 80].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium self-end sm:self-start mb-1 sm:mb-0">
          Page {currentPage} of {table.getPageCount()}
        </div>
        <div className="flex items-center self-end sm:self-start space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === table.getPageCount()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(table.getPageCount())}
            disabled={currentPage === table.getPageCount()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
