"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import Navbar from "@/components/Navbar/Navbar";
import { store } from "@/store/index";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDashboard, setIsDashboard] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    if (path.includes("dashboard")) setIsDashboard(true);
    else setIsDashboard(false);
  }, [path, isDashboard]);

  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {!isDashboard ? <Navbar /> : null}
        {children}
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
};
