import Link from "next/link";
import type { ReactNode } from "react";
import { NavLink } from "@/components/shared/NavLink";
import { ROUTES } from "@/constants/routes";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "12px 24px",
          borderBottom: "1px solid #e5e7eb",
          background: "#fff",
        }}
      >
        <Link href={ROUTES.marketing.home} style={{ fontWeight: 700 }}>
          CRM
        </Link>
        <nav style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
          <NavLink href={ROUTES.marketing.home} exact>
            Home
          </NavLink>
          <NavLink href={ROUTES.marketing.about}>About</NavLink>
          <NavLink href={ROUTES.marketing.pricing}>Pricing</NavLink>
          <NavLink href={ROUTES.marketing.contact}>Contact</NavLink>
          <NavLink href={ROUTES.auth.login}>Login</NavLink>
        </nav>
      </header>
      <main style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>
        {children}
      </main>
    </div>
  );
}
