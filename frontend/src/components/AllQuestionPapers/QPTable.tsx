"use client";

import React from "react";
import { qpApi } from "@/store/api/qpApi";
import Loader from "../Loaders/Loader";
import { AllQPTable } from "./data-table";
import { columns } from "./columns";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function QPTable() {
  const { data, isLoading } = qpApi.useAllQPsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="w-[95%] mx-auto my-4">
      <ScrollArea className="w-full overflow-auto py-4">
        <div className="min-w-[600px]">
          {data?.success && data?.qps.length ? (
            <AllQPTable columns={columns} data={data.qps} />
          ) : (
            <p className="text-sm text-center text-muted-foreground">
              No Question paper has been uploaded yet. Let&lsquo;s start
              contributing <Link href="/signup">Click here</Link>
            </p>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default QPTable;
