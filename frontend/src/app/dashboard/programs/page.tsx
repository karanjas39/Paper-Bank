"use client";

import Loader from "@/components/Loaders/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AllPrograms from "@/components/Programs/Programs";
import { userApi } from "@/store/api/userApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CreateProgram from "@/components/Programs/CreateProgram/CreateProgram";

function ProgramsPage() {
  const router = useRouter();
  const { data: userData, isLoading } = userApi.useGetUserDetailQuery();

  useEffect(() => {
    if (userData && !userData.user.admin) {
      router.push("/dashboard");
    }
  }, [userData, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (userData && !userData.user.admin) {
    return null;
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>All Programs</CardTitle>
          <CardDescription>
            Here you can create and get all the programs registered with Paper
            Bank.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <AllPrograms />
          <div className="self-end">
            <CreateProgram />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProgramsPage;
