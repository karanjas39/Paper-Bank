"use client";

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
import Loader from "../Loaders/Loader";
import { formatDate } from "@/lib/helpers";
import DeleteNotification from "./DeleteNotification";

function NotificationTable() {
  const { data, isLoading } = notificationApi.useGetAllNotificationsQuery();

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-3">
      {data && data.success && data.notifications.length ? (
        <>
          <DeleteNotification />
          <Card className="p-2">
            <Table className="w-full">
              <TableCaption>A list of your recent notifications.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Message</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              {data && data.success && (
                <TableBody>
                  {data.notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="text-left">
                        {notification.message}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatDate(notification.createdAt)}
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
