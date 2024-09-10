"use client";

import React from "react";
import Logo from "../Navbar/Logo";
import Link from "next/link";
import { links } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { userApi } from "@/store/api/userApi";
import { clearToken } from "@/store/slices/authSlice";
import { useToast } from "@/hooks/use-toast";
import { AppDispatch } from "@/store";
import { authApi } from "@/store/api/authApi";

function SideBar() {
  return (
    <div className="w-[20%] h-screen md:block hidden dark:bg-neutral-900 bg-neutral-200">
      <SideNavLinks />
    </div>
  );
}

export default SideBar;

export function SideNavLinks() {
  const path: string = usePathname();
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  function handleLogout() {
    dispatch((dispatch) => {
      dispatch(authApi.util.resetApiState());
      dispatch(userApi.util.resetApiState());
      dispatch(clearToken());
    });
    router.replace("/");
    toast({ description: "You have been successfuly logout." });
  }

  return (
    <div className="flex flex-col justify-between md:min-h-screen flex-1 md:p-4">
      <div>
        <div className="hidden md:block">
          <Logo />
        </div>
        <div className="mt-10 flex flex-col gap-4 justify-center">
          {links.map(({ link, name, icon: Icon }, i) => {
            return (
              <Link
                href={link}
                className={cn(
                  "flex items-center gap-2 ml-2",
                  path === link
                    ? "text-foreground font-bold text-xl"
                    : "text-muted-foreground"
                )}
                key={i}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span>{name}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <Button className="w-full" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
