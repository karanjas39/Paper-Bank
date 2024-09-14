import SideBar from "@/components/SideBar/SideBar";
import TopBar from "@/components/TopBar/TopBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex h-screen overflow-auto">
      <SideBar />
      <div className="flex flex-col w-full">
        <TopBar />
        <div className="flex flex-1 p-6 w-full max-h-screen overflow-scroll mb-4">
          {children}
        </div>
      </div>
    </div>
  );
}
