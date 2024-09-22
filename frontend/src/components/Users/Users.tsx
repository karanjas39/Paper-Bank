import React, { useState, useCallback } from "react";
import Loader from "../Loaders/Loader";
import { columns } from "./columns";
import { UserTable } from "./data-table";
import { userApi } from "@/store/api/userApi";

function AllUsers() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = userApi.useGetAllUsersQuery({
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
        <UserTable
          columns={columns}
          data={data.users}
          pageCount={data.pagination.totalPages}
          pageIndex={data.pagination.currentPage - 1}
          pageSize={data.pagination.pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onSearch={handleSearch}
          totalUsers={data.pagination.totalUsers}
        />
      ) : (
        <p className="text-sm text-center text-muted-foreground">
          No user has registered yet.
        </p>
      )}
    </div>
  );
}

export default AllUsers;
