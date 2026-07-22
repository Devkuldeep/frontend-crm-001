"use client"

import { Search, Bell, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-surface/80 px-6 backdrop-blur-md" style={{ viewTransitionName: 'site-topbar' }}>
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-secondary" />
          <Input
            type="search"
            placeholder="Search leads, campaigns..."
            className="w-full bg-background pl-9 md:w-[300px] lg:w-[400px]"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 text-text-secondary transition-colors hover:bg-border/50 hover:text-text-primary">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-danger"></span>
        </button>
        
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-primary-dark font-medium cursor-pointer">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  )
}
