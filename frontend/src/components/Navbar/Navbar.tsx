"use client";

import { useEffect } from "react";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { ThemeToggler } from "../Theme/ThemeToggler";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { initializeAuth } from "@/store/slices/authSlice";

function Navbar() {
  const path = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { token, isInitialized } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeAuth());
    }
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return null;
  }

  return (
    <div className="px-6 py-4 flex items-center justify-between bg-transparent">
      <Logo />
      <div className="flex items-center gap-3">
        {token ? (
          <Link href="/dashboard">
            <Button variant="primary" size="sm">
              Dashboard
            </Button>
          </Link>
        ) : path === "/signin" ? (
          <Link href="/signup">
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </Link>
        ) : (
          <Link href="signin">
            <Button variant="primary" size="sm">
              Sign In
            </Button>
          </Link>
        )}
        <ThemeToggler />
      </div>
    </div>
  );
}
export default Navbar;
