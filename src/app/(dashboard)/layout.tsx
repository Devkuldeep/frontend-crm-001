import Link from "next/link";
import type { ReactNode } from "react";
import { NavLink } from "@/components/shared/NavLink";
import { ROUTES } from "@/constants/routes";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 220,
          background: "#fff",
          borderRight: "1px solid #e5e7eb",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Link
          href={ROUTES.home}
          style={{ fontWeight: 700, marginBottom: 16 }}
        >
          CRM
        </Link>
        <NavLink href={ROUTES.dashboard.root} exact>
          Dashboard
        </NavLink>
        <NavLink href={ROUTES.dashboard.leads}>Leads</NavLink>
        <NavLink href={ROUTES.dashboard.campaigns}>Campaigns</NavLink>
        <NavLink href={ROUTES.dashboard.inbox}>Inbox</NavLink>
        <NavLink href={ROUTES.dashboard.meetings}>Meetings</NavLink>
        <NavLink href={ROUTES.dashboard.analytics}>Analytics</NavLink>
        <NavLink href={ROUTES.dashboard.settings}>Settings</NavLink>
      </aside>
      <main style={{ flex: 1, padding: 32 }}>{children}</main>
    </div>
  );
}
