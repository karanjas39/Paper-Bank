"use client";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { ThemeToggler } from "../Theme/ThemeToggler";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";

function Navbar() {
  const path = usePathname();
  const token = useSelector((state: RootState) => state.auth.token);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (token) setIsLogin(true);
    else setIsLogin(false);
  }, [token, path]);

  return (
    <div className="px-6 py-4 flex items-center justify-between bg-transparent">
      <Logo />
      <div className="flex items-center gap-3">
        {isLogin ? (
          <Link href="/dashboard">
            <Button variant="primary">Dashboard</Button>
          </Link>
        ) : path === "/signin" ? (
          <Link href="/signup">
            <Button variant="primary">Sign Up</Button>
          </Link>
        ) : (
          <Link href="signin">
            <Button variant="primary">Sign In</Button>
          </Link>
        )}
        <ThemeToggler />
      </div>
    </div>
  );
}
export default Navbar;
