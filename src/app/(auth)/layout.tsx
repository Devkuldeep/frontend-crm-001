import Link from "next/link";
import type { ReactNode } from "react";
import { ROUTES } from "@/constants/routes";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        <Link href={ROUTES.home} style={{ fontWeight: 700 }}>
          ← CRM
        </Link>
        <div style={{ marginTop: 16 }}>{children}</div>
      </div>
    </div>
  );
}
