"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Megaphone, Inbox, Calendar, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Inbox", href: "/inbox", icon: Inbox },
  { name: "Meetings", href: "/meetings", icon: Calendar },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface shadow-sm" style={{ viewTransitionName: 'site-sidebar' }}>
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-surface font-bold">
            AI
          </div>
          <span className="text-xl font-bold tracking-tight">CRM Outreach</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`) && item.href !== "/"
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-light text-primary-dark"
                    : "text-text-secondary hover:bg-border/50 hover:text-text-primary"
                )}
                // Use Next.js 15 View Transitions type if needed, but we'll stick to standard behavior
                // transitionTypes={["nav-forward"]} 
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-border p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-border/50 hover:text-text-primary"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </div>
    </aside>
  )
}
