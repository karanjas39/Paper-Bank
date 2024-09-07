"use client";

import React from "react";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import Navbar from "@/components/Navbar/Navbar";
import { store } from "@/store/index";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        {children}
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
};
