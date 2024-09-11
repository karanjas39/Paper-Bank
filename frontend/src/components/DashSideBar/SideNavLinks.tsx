"use client";

import Logo from "../Navbar/Logo";
import Link from "next/link";
import { links } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { AppDispatch, logoutAction } from "@/store/index";

export default function SideNavLinks() {
  const path: string = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

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
      <Button className="w-full" variant="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
