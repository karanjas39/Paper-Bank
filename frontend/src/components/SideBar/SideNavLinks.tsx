"use client";
import React from "react";
import Logo from "../Navbar/Logo";
import Link from "next/link";
import { links } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { logoutAction } from "@/store/index";
import { userApi } from "@/store/api/userApi";
import Loader from "../Loaders/Loader";
import { ThemeToggler } from "../Theme/ThemeToggler";

export default function SideNavLinks() {
  const path: string = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const { data, isLoading } = userApi.useGetUserDetailQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  function handleLogout() {
    try {
      dispatch(logoutAction());
      router.push("/");
      toast({ description: "You have been successfully logged out." });
    } catch (error) {
      toast({ description: "Failed to logout.", variant: "destructive" });
    }
  }

  return (
    <div className="flex flex-col justify-between md:h-screen flex-1 md:p-4">
      <div>
        <div className="hidden md:block">
          <Logo />
        </div>
        {!isLoading && data ? (
          <div className="mt-10 flex flex-col gap-4 justify-center">
            {links.map(({ link, name, icon: Icon }, i) => {
              if (
                name === "Contribute" &&
                !data.user.admin &&
                data?.user?.uploadCount > 0
              ) {
                return null;
              } else if (name === "Users" && !data.user.admin) return null;
              else if (name === "Programs" && !data.user.admin) return null;
              else if (name === "Approvals" && !data.user.admin) return null;
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
            <div className="flex items-center gap-2 ml-2 text-muted-foreground hover:text-foreground cursor-pointer">
              <ThemeToggler button={false} />
              <p>Theme</p>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <Button className="w-full" variant="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
