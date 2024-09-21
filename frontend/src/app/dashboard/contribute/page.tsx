"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ContributeForm from "@/components/QPContribution/QPContributionForm";
import { userApi } from "@/store/api/userApi";
import Loader from "@/components/Loaders/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ContributeQPPage() {
  const router = useRouter();
  const { data: userData, isLoading } = userApi.useGetUserDetailQuery();

  useEffect(() => {
    if (userData && !userData.user.admin && userData.user.uploadCount !== 0) {
      router.push("/dashboard");
    }
  }, [userData, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (userData && !userData.user.admin && userData.user.uploadCount !== 0) {
    return null;
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Contribute Question Paper</CardTitle>
          <CardDescription>
            Here you can upload previous year question papers and earn credits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContributeForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default ContributeQPPage;
