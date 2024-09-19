"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ContributeForm from "@/components/Contribute/ContributeForm";
import { userApi } from "@/store/api/userApi";
import Loader from "@/components/Loaders/Loader";

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
      <ContributeForm />
    </div>
  );
}

export default ContributeQPPage;
