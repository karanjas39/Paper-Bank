import DashboardProvider from "@/components/Providers/DashboardProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardProvider>{children}</DashboardProvider>;
}
