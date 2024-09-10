import SideBar from "@/components/Dashboard/SideBar";
import TopBar from "@/components/Dashboard/TopBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex min-h-screen">
      <SideBar />
      <div className="flex flex-col w-full">
        <TopBar />
        <div className="flex flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}
