"use client";

import Loader from "@/components/Loaders/Loader";
import { userApi } from "@/store/api/userApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AllQpsAdmin from "@/components/AllQuestionPapersAdmin/AllQPsAdmin";

function AllQPsAdminPage() {
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
          <CardTitle>Question Papers</CardTitle>
          <CardDescription>
            Here you will find all the question papers to edit existing one or
            approve/reject new applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AllQpsAdmin />
        </CardContent>
      </Card>
    </div>
  );
}

export default AllQPsAdminPage;
