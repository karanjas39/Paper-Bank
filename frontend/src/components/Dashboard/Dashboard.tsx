"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userApi } from "@/store/api/userApi";
import Loader from "../Loaders/Loader";

function Dashboard() {
  const { data, isLoading } = userApi.useGetUserDetailsQuery();

  if (isLoading) return <Loader />;

  return (
    <Tabs defaultValue="detail" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="detail">Account Details</TabsTrigger>
        <TabsTrigger value="edit-detail">Edit Details</TabsTrigger>
      </TabsList>
      {data?.success && (
        <TabsContent value="detail">{JSON.stringify(data.user)}</TabsContent>
      )}
      <TabsContent value="edit-detail">Edit</TabsContent>
    </Tabs>
  );
}

export default Dashboard;
