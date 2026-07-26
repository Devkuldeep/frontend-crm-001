"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChevronRight,
  Inbox,
  LayoutDashboard,
  Megaphone,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Leads",
    href: "/leads",
    icon: Users,
  },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: Megaphone,
  },
  {
    name: "Inbox",
    href: "/inbox",
    icon: Inbox,
  },
  {
    name: "Meetings",
    href: "/meetings",
    icon: CalendarDays,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isRouteActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const settingsActive =
    pathname === "/settings" ||
    pathname.startsWith("/settings/");

  return (
    <aside
      className="fixed inset-y-0 left-0 z-50 hidden w-[260px] flex-col border-r border-white/[0.06] bg-[#080808]/95 text-white backdrop-blur-xl lg:flex"
      style={{
        viewTransitionName: "site-sidebar",
      }}
    >
      {/* Ambient effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 55%)",
          }}
        />
      </div>

      {/* Brand */}
      <div className="relative z-10 flex h-[76px] shrink-0 items-center border-b border-white/[0.06] px-5">
        <Link
          href="/dashboard"
          className="group flex min-w-0 items-center gap-3"
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white text-black transition-transform duration-300 group-hover:rotate-6">
            <Sparkles className="h-3.5 w-3.5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold tracking-[-0.035em] text-white">
              CRM Outreach
            </p>

            <p className="mt-0.5 text-[10px] text-white/20">
              AI sales workspace
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = isRouteActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative flex h-11 items-center gap-3 overflow-hidden rounded-xl px-3.5",
                    "text-[13px] font-medium transition-all duration-300",
                    active
                      ? "bg-white/[0.075] text-white"
                      : "text-white/35 hover:bg-white/[0.035] hover:text-white/80",
                  )}
                >
                  {/* Active indicator */}
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-white transition-all duration-300",
                      active
                        ? "scale-y-100 opacity-100"
                        : "scale-y-0 opacity-0",
                    )}
                  />

                  <item.icon
                    strokeWidth={1.7}
                    className={cn(
                      "h-[17px] w-[17px] shrink-0 transition-all duration-300",
                      active
                        ? "text-white"
                        : "text-white/25 group-hover:text-white/60",
                    )}
                  />

                  <span className="flex-1">
                    {item.name}
                  </span>

                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 transition-all duration-300",
                      active
                        ? "translate-x-0 text-white/25 opacity-100"
                        : "-translate-x-1 text-white/15 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                    )}
                  />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Workspace */}
        <div className="px-3 pb-3">
          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.018]">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-medium text-white/30">
                  Monthly usage
                </p>

                <span className="text-[10px] tabular-nums text-white/20">
                  64%
                </span>
              </div>

              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-[64%] rounded-full bg-white/50" />
              </div>

              <p className="mt-3 text-[10px] leading-4 text-white/20">
                6,420 of 10,000 AI credits used
              </p>
            </div>

            <Link
              href="/settings/billing"
              className="group flex items-center justify-between border-t border-white/[0.05] px-4 py-3 text-[11px] font-medium text-white/35 transition-colors hover:bg-white/[0.025] hover:text-white"
            >
              Manage plan

              <ChevronRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Settings */}
        <div className="border-t border-white/[0.06] p-3">
          <Link
            href="/settings"
            aria-current={settingsActive ? "page" : undefined}
            className={cn(
              "group relative flex h-11 items-center gap-3 rounded-xl px-3.5 text-[13px] font-medium transition-all duration-300",
              settingsActive
                ? "bg-white/[0.075] text-white"
                : "text-white/35 hover:bg-white/[0.035] hover:text-white/80",
            )}
          >
            {settingsActive && (
              <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-white" />
            )}

            <Settings
              strokeWidth={1.7}
              className={cn(
                "h-[17px] w-[17px]",
                settingsActive
                  ? "text-white"
                  : "text-white/25 transition-colors group-hover:text-white/60",
              )}
            />

            <span className="flex-1">
              Settings
            </span>

            <ChevronRight className="h-3.5 w-3.5 -translate-x-1 text-white/15 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </aside>
  );
}