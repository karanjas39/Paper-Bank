"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggler({ button = true }: { button?: boolean }) {
  const { setTheme, resolvedTheme } = useTheme();

  if (!button) {
    return (
      <>
        {resolvedTheme === "light" ? (
          <SunIcon onClick={() => setTheme("dark")} />
        ) : (
          <MoonIcon onClick={() => setTheme("light")} />
        )}
      </>
    );
  }

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
