"use client";

import React from "react";
import { qpApi } from "@/store/api/qpApi";
import Loader from "../Loaders/Loader";
import { AllQPTable } from "./data-table";
import { columns } from "./columns";
import Link from "next/link";

function QPTable() {
  const { data, isLoading } = qpApi.useAllQPsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="w-[95%] mx-auto my-4">
      {data?.success && data?.qps.length ? (
        <AllQPTable columns={columns} data={data.qps} />
      ) : (
        <p className="text-sm text-center text-muted-foreground">
          No Question paper has been uploaded yet. Let&lsquo;s start
          contributing <Link href="/signup">Click here</Link>
        </p>
      )}
    </div>
  );
}

export default QPTable;
