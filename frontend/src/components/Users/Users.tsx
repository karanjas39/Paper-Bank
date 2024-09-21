"use client";

import Loader from "../Loaders/Loader";
import { columns } from "./columns";
import { UserTable } from "./data-table";
import { userApi } from "@/store/api/userApi";

function AllUsers() {
  const { data, isLoading } = userApi.useGetAllUsersQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="w-full">
      {data?.success && data?.users.length ? (
        <UserTable columns={columns} data={data.users} />
      ) : (
        <p className="text-sm text-center text-muted-foreground">
          No user has registered yet.
        </p>
      )}
    </div>
  );
}

export default AllUsers;
