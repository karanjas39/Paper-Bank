import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function MyUploadsPage() {
  return (
    <Tabs defaultValue="approved" className="w-full">
      <TabsList>
        <TabsTrigger value="approved">Approved Uploads</TabsTrigger>
        <TabsTrigger value="pending">Pending Uploads</TabsTrigger>
      </TabsList>

      <TabsContent value="approved">approved</TabsContent>
      <TabsContent value="pending">Edit</TabsContent>
    </Tabs>
  );
}

export default MyUploadsPage;
