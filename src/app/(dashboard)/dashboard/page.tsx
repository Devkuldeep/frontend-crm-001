import { Suspense, ViewTransition } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Inbox,
  Megaphone,
  TrendingUp,
  Users,
} from "lucide-react";

import { MockAPI } from "@/lib/api/mock-client";

async function DashboardStats() {
  const stats = await MockAPI.getDashboardStats();

  const statCards = [
    {
      title: "Total leads",
      value: stats.totalLeads,
      icon: Users,
      detail: "Across your workspace",
    },
    {
      title: "Active campaigns",
      value: stats.activeCampaigns,
      icon: Megaphone,
      detail: "Currently running",
    },
    {
      title: "Interested leads",
      value: stats.interestedLeads,
      icon: TrendingUp,
      detail: "Showing buying intent",
    },
    {
      title: "Upcoming meetings",
      value: stats.upcomingMeetings,
      icon: CalendarDays,
      detail: "Ready on your calendar",
    },
  ];

  return (
    <div className="space-y-4">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            detail={stat.detail}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Revenue Forecast */}
      <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c]">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-8%] top-[-150px] h-[400px] w-[400px] rounded-full bg-violet-500/[0.09] blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-180px] left-[20%] h-[350px] w-[350px] rounded-full bg-blue-500/[0.04] blur-[120px]"
        />

        <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:p-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-white/25">
              <TrendingUp className="h-3.5 w-3.5" />

              Revenue forecast
            </div>

            <div className="mt-5 text-4xl font-medium tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
              {stats.revenueForecast}
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/30">
              Projected revenue based on leads currently showing buying
              intent.
            </p>
          </div>

          {/* Decorative chart */}
          <div className="hidden h-28 w-[320px] items-end gap-1.5 lg:flex">
            {[28, 35, 31, 48, 42, 56, 50, 69, 63, 78, 74, 92].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-[3px] bg-gradient-to-t from-violet-500/15 to-white/35 transition-opacity duration-500 group-hover:opacity-80"
                  style={{
                    height: `${height}%`,
                  }}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  detail,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  detail: string;
  icon: typeof Users;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c0c0c] p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-[#0e0e0e] sm:p-6">
      {/* Hover glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-violet-500/0 blur-3xl transition-all duration-700 group-hover:bg-violet-500/[0.06]" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs font-medium text-white/30">
            {title}
          </p>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025]">
            <Icon
              strokeWidth={1.6}
              className="h-3.5 w-3.5 text-white/35 transition-colors duration-300 group-hover:text-white/70"
            />
          </div>
        </div>

        <p className="mt-7 text-3xl font-medium tracking-[-0.05em] text-white">
          {value}
        </p>

        <p className="mt-2 text-[11px] text-white/20">
          {detail}
        </p>
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-[156px] animate-pulse rounded-2xl border border-white/[0.06] bg-[#0c0c0c] p-6"
          >
            <div className="flex justify-between">
              <div className="h-2.5 w-24 rounded-full bg-white/[0.06]" />

              <div className="h-8 w-8 rounded-lg bg-white/[0.04]" />
            </div>

            <div className="mt-8 h-8 w-20 rounded-lg bg-white/[0.07]" />

            <div className="mt-3 h-2 w-28 rounded-full bg-white/[0.04]" />
          </div>
        ))}
      </div>

      <div className="h-[220px] animate-pulse rounded-[1.75rem] border border-white/[0.06] bg-[#0c0c0c]" />
    </div>
  );
}

const inboxActivity = [
  {
    name: "Alice Smith",
    time: "2 hours ago",
    description: "Wants to schedule a product demo next week.",
    status: "Interested",
  },
  {
    name: "Bob Johnson",
    time: "30 mins ago",
    description: "Requested pricing and API limits for the startup plan.",
    status: "Question",
  },
];

export default function Dashboard() {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "slide-from-right",
        "nav-back": "slide-from-left",
        default: "none",
      }}
      exit={{
        "nav-forward": "slide-to-left",
        "nav-back": "slide-to-right",
        default: "none",
      }}
      default="none"
    >
      <div className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#080808] text-white">
        {/* Ambient background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute right-[5%] top-[-250px] h-[600px] w-[600px] rounded-full bg-violet-500/[0.035] blur-[160px]" />

          <div
            className="absolute inset-0 opacity-[0.012]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 55%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 md:py-10 lg:px-8 xl:px-10">
          {/* Header */}
          <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl">
                Dashboard
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/30">
                Track your pipeline, outreach performance, conversations,
                and upcoming meetings.
              </p>
            </div>

            <Link
              href="/campaigns"
              className="group flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-white px-5 text-xs font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/90"
            >
              View campaigns

              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Stats */}
          <Suspense
            fallback={
              <ViewTransition exit="slide-down">
                <StatsSkeleton />
              </ViewTransition>
            }
          >
            <ViewTransition
              enter="slide-up"
              default="none"
            >
              <DashboardStats />
            </ViewTransition>
          </Suspense>

          {/* Operational content */}
          <div className="mt-4 grid gap-4 xl:grid-cols-12">
            {/* Inbox */}
            <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] xl:col-span-7">
              <div className="flex items-start justify-between gap-6 border-b border-white/[0.06] px-6 py-5 sm:px-7">
                <div>
                  <h2 className="text-sm font-medium text-white/80">
                    Recent inbox activity
                  </h2>

                  <p className="mt-1 text-[11px] text-white/25">
                    AI summarized replies from your leads.
                  </p>
                </div>

                <Link
                  href="/inbox"
                  className="group flex items-center gap-1.5 text-[11px] font-medium text-white/25 transition-colors hover:text-white"
                >
                  View inbox

                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div>
                {inboxActivity.map((activity, index) => (
                  <InboxActivity
                    key={activity.name}
                    {...activity}
                    last={index === inboxActivity.length - 1}
                  />
                ))}
              </div>
            </section>

            {/* Meetings */}
            <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] xl:col-span-5">
              <div className="flex items-start justify-between gap-5 border-b border-white/[0.06] px-6 py-5 sm:px-7">
                <div>
                  <h2 className="text-sm font-medium text-white/80">
                    Upcoming meetings
                  </h2>

                  <p className="mt-1 text-[11px] text-white/25">
                    Product demos and scheduled calls.
                  </p>
                </div>

                <Link
                  href="/meetings"
                  className="group flex items-center gap-1.5 text-[11px] font-medium text-white/25 transition-colors hover:text-white"
                >
                  Calendar

                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="p-4">
                <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.018] p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.03]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035]">
                      <CalendarDays
                        strokeWidth={1.6}
                        className="h-4 w-4 text-white/40"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[13px] font-medium text-white/75">
                            Product Demo
                          </p>

                          <p className="mt-1 text-xs text-white/25">
                            Acme Corp
                          </p>
                        </div>

                        <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400/80" />
                      </div>

                      <div className="mt-5 flex items-center gap-2 text-[11px] text-white/30">
                        <Clock3 className="h-3.5 w-3.5" />

                        Dec 12 · 2:00 PM
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-[11px] text-white/20">
                        <Users className="h-3.5 w-3.5" />

                        Alice Smith
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/meetings"
                    className="mt-5 flex h-9 items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] text-[11px] font-medium text-white/40 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.055] hover:text-white"
                  >
                    View meeting

                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}

function InboxActivity({
  name,
  time,
  description,
  status,
  last,
}: {
  name: string;
  time: string;
  description: string;
  status: string;
  last?: boolean;
}) {
  return (
    <Link
      href="/inbox"
      className={`group flex gap-4 px-6 py-5 transition-colors duration-300 hover:bg-white/[0.02] sm:px-7 ${
        last ? "" : "border-b border-white/[0.05]"
      }`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025]">
        <Inbox
          strokeWidth={1.6}
          className="h-3.5 w-3.5 text-white/30 transition-colors group-hover:text-white/60"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-[13px] font-medium text-white/70 transition-colors group-hover:text-white">
            {name}
          </p>

          <span className="text-[10px] text-white/20">
            {time}
          </span>
        </div>

        <p className="mt-2 max-w-xl text-xs leading-5 text-white/30">
          {description}
        </p>
      </div>

      <div className="hidden shrink-0 sm:block">
        <span className="inline-flex rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[9px] font-medium text-white/30">
          {status}
        </span>
      </div>
    </Link>
  );
}