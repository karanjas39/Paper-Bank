import NotificationTable from "@/components/Notifications/NotificationTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function NotificationsPage() {
  return (
    <Card className="max-h-max w-full">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Here you will find all your latest notifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <NotificationTable />
      </CardContent>
    </Card>
  );
}

export default NotificationsPage;
