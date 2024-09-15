"use client";

import { qpApi } from "@/store/api/qpApi";
import Loader from "../Loaders/Loader";
import { AllQPTable } from "./data-table";
import { columns } from "./columns";

function QPTable() {
  const { data, isLoading } = qpApi.useAllQPsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="w-[95%] mx-auto mt-4">
      {data?.success && data?.qps.length ? (
        <AllQPTable columns={columns} data={data.qps} />
      ) : (
        <p className="text-sm text-center text-muted-foreground">
          You have not uploaded any Question Paper.
        </p>
      )}
    </div>
  );
}

export default QPTable;
