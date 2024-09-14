"use client";
import { qpApi } from "@/store/api/qpApi";
import Loader from "../Loaders/Loader";
import { MyUploadTable } from "./data-table";
import { columns } from "./columns";

function MyUpload() {
  const { data, isLoading } = qpApi.useMyUploadsQuery();

  if (isLoading) return <Loader />;

  if (isLoading) return <Loader />;

  return (
    <div className="w-full">
      {data?.success && data?.qps.length ? (
        <MyUploadTable columns={columns} data={data.qps} />
      ) : (
        <p className="text-sm text-center text-muted-foreground">
          You have not uploaded any Question Paper.
        </p>
      )}
    </div>
  );
}

export default MyUpload;
