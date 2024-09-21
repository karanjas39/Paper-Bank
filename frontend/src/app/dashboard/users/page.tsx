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
import AllUsers from "@/components/Users/Users";

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

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Here you can find all users registered with Paper Bank.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AllUsers />
        </CardContent>
      </Card>
    </div>
  );
}

export default UserPage;
