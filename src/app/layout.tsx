import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Frontend CRM",
    template: "%s | Frontend CRM",
  },
  description: "AI-Powered CRM Outreach Platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen bg-background text-text-primary`}>
        {children}
      </body>
    </html>
  );
}
