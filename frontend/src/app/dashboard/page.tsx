"use client";
import Loader from "@/components/Loaders/Loader";
import { userApi } from "@/store/api/user";
import { setUser } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DashboardPage() {
  const { data, isLoading } = userApi.useGetUserDetailsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && data && data.success) {
      dispatch(setUser(data.user));
    }
  }, [isLoading]);

  if (isLoading) return <Loader />;

  return <div className="flex flex-1">page</div>;
}
