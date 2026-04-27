import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Frontend CRM",
    template: "%s | Frontend CRM",
  },
  description: "CRM application built with the Next.js App Router.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          background: "#f9fafb",
          color: "#111827",
        }}
      >
        {children}
      </body>
    </html>
  );
}
