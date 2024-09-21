import MyUpload from "@/components/MyUploads/MyUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function MyUploadsPage() {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>My Uploads</CardTitle>
          <CardDescription>
            Here you can find all your uploads and their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MyUpload />
        </CardContent>
      </Card>
    </div>
  );
}

export default MyUploadsPage;
