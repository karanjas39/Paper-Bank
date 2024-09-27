"use client";

import React from "react";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import Navbar from "@/components/Navbar/Navbar";
import { store } from "@/store/index";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  return (
    <Provider store={store}>
      <SpeedInsights />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {!path.includes("dashboard") && !path.includes("admin") ? (
          <Navbar />
        ) : null}
        {children}
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
};
