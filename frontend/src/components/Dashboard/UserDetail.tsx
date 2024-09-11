"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { userApi } from "@/store/api/userApi";
import Loader from "@/components/Loaders/Loader";
import { formatDate } from "@/lib/helpers";

function UserDetail() {
  const { data, isLoading } = userApi.useGetUserDetailQuery();

  if (isLoading) return <Loader />;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
        <CardDescription>View and manage user information</CardDescription>
      </CardHeader>
      {data && data.success ? (
        <CardContent className="flex flex-col gap-2">
          <CardContentDiv title="Name" data={data.user.name} />
          <CardContentDiv title="Email" data={data.user.email} />
          <CardContentDiv title="Program" data={data.user.program.name} />
          <CardContentDiv title="Verified" data={data.user.verified} />
          <CardContentDiv
            title="Joined Us On"
            data={formatDate(data.user.createdAt)}
          />
        </CardContent>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          No user details found.
        </p>
      )}
    </Card>
  );
}

function CardContentDiv({
  title,
  data,
}: {
  title: string;
  data: string | boolean;
}) {
  return (
    <div className="flex items-center md:justify-between gap-2 text-sm">
      <p className="font-bold text-muted-foreground">{title}</p>
      {title !== "Verified" ? (
        <p>{data}</p>
      ) : (
        <Badge variant={data ? "secondary" : "destructive"}>
          {data ? "Yes" : "No"}
        </Badge>
      )}
    </div>
  );
}

export default UserDetail;
