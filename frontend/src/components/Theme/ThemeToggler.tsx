"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggler() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <>
      {resolvedTheme === "light" ? (
        <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem]" />
        </Button>
      )}
    </>
  );
}
