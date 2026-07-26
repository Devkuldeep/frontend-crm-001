import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#080808] text-white">
      {/* Desktop navigation */}
      <Sidebar />

      {/* Application shell */}
      <div className="flex min-h-screen min-w-0 flex-col lg:pl-[260px]">
        {/* Sticky application header */}
        <Topbar />

        {/* Page content */}
        <main className="relative flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}