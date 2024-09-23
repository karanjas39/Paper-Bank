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

function ApprovalsPage() {
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
          <CardTitle>Question Paper Approval</CardTitle>
          <CardDescription>
            Here you can do the approval and rejection of question papers.
          </CardDescription>
        </CardHeader>
        <CardContent>Approvals</CardContent>
      </Card>
    </div>
  );
}

export default ApprovalsPage;
