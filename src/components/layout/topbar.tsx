"use client";

import {
  Bell,
  Command,
  Search,
  User,
} from "lucide-react";

export function Topbar() {
  return (
    <header
      className="sticky top-0 z-40 flex h-[76px] items-center border-b border-white/[0.06] bg-[#080808]/85 px-4 text-white backdrop-blur-xl sm:px-6 lg:px-8"
      style={{
        viewTransitionName: "site-topbar",
      }}
    >
      {/* Ambient highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
      />

      <div className="flex w-full items-center justify-between gap-4">
        {/* Search */}
        <div className="flex min-w-0 flex-1 items-center">
          <div className="group relative w-full max-w-[440px]">
            <Search
              strokeWidth={1.7}
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20 transition-colors duration-300 group-focus-within:text-white/50"
            />

            <input
              type="search"
              placeholder="Search leads, campaigns..."
              aria-label="Search"
              className="h-10 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-10 pr-16 text-[13px] text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/[0.1] hover:bg-white/[0.035] focus:border-white/[0.14] focus:bg-white/[0.04] focus:ring-4 focus:ring-white/[0.02]"
            />

            {/* Keyboard shortcut */}
            <div className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-white/[0.07] bg-white/[0.035] px-1.5 py-1 text-white/20 sm:flex">
              <Command className="h-2.5 w-2.5" />

              <span className="text-[9px] font-medium">
                K
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-white/30 transition-all duration-300 hover:bg-white/[0.045] hover:text-white"
          >
            <Bell
              strokeWidth={1.7}
              className="h-[17px] w-[17px] transition-transform duration-300 group-hover:-rotate-6"
            />

            {/* Notification indicator */}
            <span className="absolute right-[9px] top-[8px] h-[5px] w-[5px] rounded-full bg-violet-400 ring-[2px] ring-[#080808]" />
          </button>

          {/* Separator */}
          <div className="mx-1 hidden h-5 w-px bg-white/[0.07] sm:block" />

          {/* Profile */}
          <button
            type="button"
            aria-label="Open account menu"
            className="group flex items-center gap-3 rounded-xl p-1.5 pr-2 transition-all duration-300 hover:bg-white/[0.035]"
          >
            {/* Avatar */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.055]">
              <User
                strokeWidth={1.7}
                className="h-3.5 w-3.5 text-white/50 transition-colors group-hover:text-white/80"
              />

              {/* Online */}
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-[2px] border-[#080808] bg-emerald-400" />
            </div>

            {/* User details */}
            <div className="hidden min-w-0 text-left md:block">
              <p className="max-w-[120px] truncate text-[12px] font-medium leading-none text-white/70 transition-colors group-hover:text-white">
                Your account
              </p>

              <p className="mt-1.5 text-[9px] leading-none text-white/20">
                Workspace admin
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}