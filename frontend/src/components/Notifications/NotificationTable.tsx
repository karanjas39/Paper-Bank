"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { notificationApi } from "@/store/api/notificationApi";
import { Trash2 } from "lucide-react";
import Loader from "../Loaders/Loader";
import { formatDate } from "@/lib/helpers";

function NotificationTable() {
  const { data, isLoading } = notificationApi.useGetAllNotificationsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-4 w-full">
      {data && data.success && data.notifications.length ? (
        <>
          <div className="flex justify-end">
            <Button variant="destructive">Clear</Button>
          </div>
          <Card className="p-2">
            <Table className="w-full">
              <TableCaption>A list of your recent notifications.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Message</TableHead>
                  <TableHead className="w-[200px]">Date</TableHead>
                </TableRow>
              </TableHeader>
              {data && data.success && (
                <TableBody>
                  {data.notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>{notification.message}</TableCell>
                      <TableCell className="w-[200px]">
                        {formatDate(notification.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="destructive">
                          <Trash2 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </Card>
        </>
      ) : (
        <p className="text-center text-sm text-muted-foreground mt-4">
          There are no new notifications.
        </p>
      )}
    </div>
  );
}

export default NotificationTable;
