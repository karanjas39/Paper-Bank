"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "../Theme/ThemeProvider";
import Navbar from "../Navbar/Navbar";
export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};
