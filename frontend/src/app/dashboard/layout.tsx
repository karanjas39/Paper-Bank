import SideBar from "@/components/Dashboard/SideBar/SideBar";
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
        {children}
      </div>
    </div>
  );
}
