"use client";

import Loader from "@/components/Loaders/Loader";
import { userApi } from "@/store/api/userApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function UserPage() {
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

  return <div>UserPage</div>;
}

export default UserPage;
