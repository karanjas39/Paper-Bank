"use client";
import React from "react";
import { ThemeProvider } from "../Theme/ThemeProvider";
import Navbar from "../Navbar/Navbar";
export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
      {children}
    </ThemeProvider>
  );
};
