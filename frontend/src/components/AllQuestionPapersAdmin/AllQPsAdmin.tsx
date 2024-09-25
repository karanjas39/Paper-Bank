import React, { useState, useCallback } from "react";
import Loader from "../Loaders/Loader";
import { columns } from "./columns";
import { AllQPsAdminTable } from "./data-table";
import { qpApi } from "@/store/api/qpApi";

function AllQpsAdmin() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = qpApi.useAllQPsAdminQuery({
    page,
    pageSize,
    searchTerm,
  });

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  }, []);

  const handleSearch = useCallback((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setPage(1);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full">
      {data?.success ? (
        <AllQPsAdminTable
          columns={columns}
          data={data.qps}
          pageCount={data.pagination.totalPages}
          pageIndex={data.pagination.currentPage - 1}
          pageSize={data.pagination.pageSize}
          totalQPs={data.pagination.totalQps}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onSearch={handleSearch}
        />
      ) : (
        <p className="text-sm text-center text-muted-foreground">
          No question paper has been uploaded yet.
        </p>
      )}
    </div>
  );
}

export default AllQpsAdmin;
