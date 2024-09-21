"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar/SideBar";
import TopBar from "@/components/TopBar/TopBar";
import Loader from "../Loaders/Loader";
import { RootState } from "@/store";

interface AdminDashboardProps {
  children: React.ReactNode;
}

const DashboardProvider: React.FC<AdminDashboardProps> = ({ children }) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  if (!token) {
    return <Loader />;
  }

  return (
    <div className="w-full flex min-h-screen overflow-auto">
      <SideBar />
      <div className="flex flex-col w-full">
        <TopBar />
        <div className="flex flex-1 p-6 w-full max-h-screen overflow-scroll mb-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardProvider;
