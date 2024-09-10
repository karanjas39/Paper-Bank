"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userApi } from "@/store/api/userApi";
import Loader from "@/components/Loaders/Loader";

function UserDetail() {
  const { data, isLoading } = userApi.useGetUserDetailQuery();

  if (isLoading) return <Loader />;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
        <CardDescription>View and manage user information</CardDescription>
      </CardHeader>
      {data && data.success && (
        <CardContent>{JSON.stringify(data.user)}</CardContent>
      )}
    </Card>
  );
}

export default UserDetail;
