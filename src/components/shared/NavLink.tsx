"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  exact?: boolean;
};

/**
 * Link that highlights itself when the current pathname matches `href`.
 * Use this to demonstrate active-route styling in client components.
 */
export function NavLink({ href, children, exact = false }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname?.startsWith(href);

  return (
    <Link
      href={href}
      style={{
        padding: "6px 10px",
        borderRadius: 6,
        textDecoration: "none",
        color: isActive ? "#fff" : "#1f2937",
        background: isActive ? "#2563eb" : "transparent",
        fontWeight: isActive ? 600 : 400,
      }}
    >
      {children}
    </Link>
  );
}
