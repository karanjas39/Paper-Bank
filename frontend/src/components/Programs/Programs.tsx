"use client";
import Loader from "../Loaders/Loader";
import { columns } from "./columns";
import { ProgramsTable } from "./data-table";
import { programApi } from "@/store/api/programApi";

function AllPrograms() {
  const { data, isLoading } = programApi.useGetProgramsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="w-full">
      {data?.success && data?.programs.length ? (
        <ProgramsTable columns={columns} data={data.programs} />
      ) : (
        <p className="text-sm text-center text-muted-foreground">
          You have not created any program yet.
        </p>
      )}
    </div>
  );
}

export default AllPrograms;
