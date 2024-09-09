import SideBar from "@/components/Dashboard/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex min-h-screen">
      <SideBar />
      {children}
    </div>
  );
}
