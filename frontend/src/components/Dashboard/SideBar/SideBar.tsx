"use client";

import React from "react";
import Logo from "../../Navbar/Logo";
import SideBarBottom from "./UserAvatar";
import Link from "next/link";
import { links } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function SideBar() {
  return (
    <div className="w-[20%] h-screen md:block hidden dark:bg-neutral-900 bg-neutral-200">
      <SideItems />
    </div>
  );
}

export default SideBar;

export function SideItems() {
  const path: string = usePathname();

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
      <SideBarBottom />
    </div>
  );
}
