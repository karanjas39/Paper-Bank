import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { RootProvider } from "@/components/Providers/RootProvider";

const fontStyle = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Paper Bank",
  description:
    "Discover and share university question papers with ease. Our platform allows students to upload, review, and access question papers for various courses, with admin-approved content ensuring quality. Built for DAV University students, this resource helps you prepare for exams by offering MSE and ESE papers categorized by programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontStyle.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
