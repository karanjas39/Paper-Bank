import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserDetail from "./UserDetail";

function Dashboard() {
  return (
    <Tabs defaultValue="detail" className="w-full">
      <TabsList>
        <TabsTrigger value="detail">Account Details</TabsTrigger>
        <TabsTrigger value="edit-detail">Edit Details</TabsTrigger>
      </TabsList>

      <TabsContent value="detail">
        <UserDetail />
      </TabsContent>
      <TabsContent value="edit-detail">Edit</TabsContent>
    </Tabs>
  );
}

export default Dashboard;
