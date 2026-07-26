import Link from "next/link";
import type { ReactNode } from "react";
import { ViewTransition } from "react";
import {
  ArrowLeft,
  BarChart3,
  Check,
  Mail,
  Sparkles,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
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
      <main className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#080808] text-white selection:bg-white selection:text-black">
        {/* Ambient background */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0"
        >
          <div className="absolute -left-[15%] top-[10%] h-[700px] w-[700px] rounded-full bg-violet-500/[0.08] blur-[160px]" />

          <div className="absolute -right-[10%] bottom-[-15%] h-[600px] w-[600px] rounded-full bg-blue-500/[0.04] blur-[150px]" />

          <div
            className="absolute inset-0 opacity-[0.022]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage:
                "radial-gradient(circle at center, black, transparent 85%)",
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#080808_95%)]" />
        </div>

        {/* Desktop shell */}
        <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1600px] lg:grid-cols-12">
          {/* Left */}
          <aside className="relative hidden min-h-screen overflow-hidden border-r border-white/[0.06] lg:col-span-7 lg:flex lg:flex-col">
            {/* Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.07] blur-[130px]" />

              <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#080808] to-transparent" />
            </div>

            {/* Brand */}
            <div className="relative z-10 flex items-center justify-between px-10 pt-9 xl:px-14">
              <Link
                href={ROUTES.marketing.home}
                transitionTypes={["nav-back"]}
                className="group flex items-center gap-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black transition-transform duration-300 group-hover:rotate-6">
                  <Sparkles className="h-4 w-4" />
                </span>

                <span className="text-[15px] font-semibold tracking-[-0.035em]">
                  CRM Outreach
                </span>
              </Link>

              <Link
                href={ROUTES.marketing.home}
                transitionTypes={["nav-back"]}
                className="group flex items-center gap-2 text-xs text-white/25 transition-colors duration-300 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />

                Back to website
              </Link>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-1 flex-col justify-center px-10 py-16 xl:px-14 2xl:px-20">
              <div className="max-w-2xl">
                <h1 className="max-w-xl text-5xl font-medium leading-[0.96] tracking-[-0.055em] xl:text-6xl">
                  Your pipeline,
                  <br />
                  <span className="text-white/25">
                    working smarter.
                  </span>
                </h1>

                <p className="mt-7 max-w-lg text-base leading-7 text-white/35">
                  Bring prospect intelligence, personalized outreach, reply
                  management, and meeting scheduling into one intelligent
                  workflow.
                </p>
              </div>

              {/* Product preview */}
              <div className="relative mt-12 max-w-2xl 2xl:mt-16">
                <div className="absolute -inset-12 rounded-full bg-violet-500/[0.06] blur-[100px]" />

                <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0d0d0d]/90 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
                  <div className="overflow-hidden rounded-[1.6rem] border border-white/[0.06] bg-[#090909]">
                    {/* Window bar */}
                    <div className="flex h-11 items-center border-b border-white/[0.06] px-4">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-white/10" />
                        <span className="h-2 w-2 rounded-full bg-white/10" />
                        <span className="h-2 w-2 rounded-full bg-white/10" />
                      </div>

                      <div className="mx-auto h-1.5 w-20 rounded-full bg-white/[0.05]" />
                    </div>

                    <div className="grid min-h-[300px] grid-cols-[120px_1fr] xl:grid-cols-[140px_1fr]">
                      {/* Sidebar */}
                      <div className="border-r border-white/[0.06] p-4">
                        <div className="mb-7 flex h-8 items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-black">
                            <Sparkles className="h-2.5 w-2.5" />
                          </span>

                          <span className="h-2 w-12 rounded-full bg-white/10" />
                        </div>

                        <div className="space-y-2">
                          <MockNavigation active width="75%" />
                          <MockNavigation width="60%" />
                          <MockNavigation width="70%" />
                          <MockNavigation width="52%" />
                        </div>
                      </div>

                      {/* Dashboard */}
                      <div className="p-5 xl:p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="h-1.5 w-16 rounded-full bg-white/[0.06]" />

                            <div className="mt-3 h-4 w-32 rounded bg-white/10" />
                          </div>

                          <div className="flex h-8 items-center gap-2 rounded-full bg-white px-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-black" />

                            <span className="h-1.5 w-12 rounded-full bg-black/25" />
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-7 grid grid-cols-3 gap-2.5">
                          <DashboardStat
                            label="Leads"
                            value="1,248"
                          />

                          <DashboardStat
                            label="Replies"
                            value="38.6%"
                          />

                          <DashboardStat
                            label="Meetings"
                            value="164"
                          />
                        </div>

                        {/* Chart */}
                        <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.018] p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[8px] text-white/20">
                                Campaign performance
                              </p>

                              <p className="mt-1 text-xs font-medium">
                                Engagement
                              </p>
                            </div>

                            <BarChart3 className="h-3.5 w-3.5 text-white/20" />
                          </div>

                          <div className="mt-5 flex h-20 items-end gap-1.5">
                            {[
                              38, 54, 45, 68, 52, 76, 61, 87, 70,
                              95, 78, 100,
                            ].map((height, index) => (
                              <span
                                key={index}
                                className="flex-1 rounded-t-[2px] bg-gradient-to-t from-violet-500/20 to-white/40 transition-opacity duration-300 group-hover:opacity-80"
                                style={{
                                  height: `${height}%`,
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Activity */}
                        <div className="mt-3 grid grid-cols-2 gap-2.5">
                          <div className="rounded-xl border border-white/[0.06] bg-white/[0.018] p-3">
                            <div className="flex items-center gap-2">
                              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05]">
                                <Mail className="h-3 w-3 text-white/40" />
                              </span>

                              <div>
                                <div className="h-1.5 w-12 rounded-full bg-white/10" />

                                <div className="mt-1.5 h-1 w-8 rounded-full bg-white/[0.05]" />
                              </div>
                            </div>
                          </div>

                          <div className="rounded-xl border border-white/[0.06] bg-white/[0.018] p-3">
                            <div className="flex items-center gap-2">
                              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05]">
                                <Check className="h-3 w-3 text-white/40" />
                              </span>

                              <div>
                                <div className="h-1.5 w-14 rounded-full bg-white/10" />

                                <div className="mt-1.5 h-1 w-10 rounded-full bg-white/[0.05]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature proof */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  "AI-powered outreach",
                  "Smart reply intelligence",
                  "Automated scheduling",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-[11px] text-white/25"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025]">
                      <Check className="h-2.5 w-2.5" />
                    </span>

                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-between px-10 pb-8 text-[10px] text-white/15 xl:px-14">
              <p>
                © {new Date().getFullYear()} CRM Outreach
              </p>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />

                Secure workspace
              </div>
            </div>
          </aside>

          {/* Auth */}
          <section className="relative flex min-h-screen flex-col lg:col-span-5">
            {/* Mobile header */}
            <header className="flex h-20 items-center justify-between px-6 lg:hidden">
              <Link
                href={ROUTES.marketing.home}
                transitionTypes={["nav-back"]}
                className="group flex items-center gap-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition-transform duration-300 group-hover:rotate-6">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>

                <span className="text-sm font-semibold tracking-[-0.035em]">
                  CRM Outreach
                </span>
              </Link>

              <Link
                href={ROUTES.marketing.home}
                transitionTypes={["nav-back"]}
                aria-label="Back to website"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
            </header>

            {/* Child page */}
            <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:px-12 xl:px-16">
              <div className="w-full max-w-[460px]">
                {children}
              </div>
            </div>

            {/* Mobile bottom */}
            <div className="px-6 pb-7 text-center text-[10px] text-white/15 lg:hidden">
              © {new Date().getFullYear()} CRM Outreach
            </div>
          </section>
        </div>
      </main>
    </ViewTransition>
  );
}

function MockNavigation({
  width,
  active = false,
}: {
  width: string;
  active?: boolean;
}) {
  return (
    <div
      className={[
        "flex h-7 items-center rounded-md px-2.5",
        active
          ? "bg-white/[0.07]"
          : "bg-transparent",
      ].join(" ")}
    >
      <span
        className={
          active
            ? "h-1.5 rounded-full bg-white/25"
            : "h-1.5 rounded-full bg-white/[0.06]"
        }
        style={{ width }}
      />
    </div>
  );
}

function DashboardStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 xl:p-4">
      <p className="text-[8px] text-white/20">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-medium tracking-[-0.03em] xl:text-base">
        {value}
      </p>
    </div>
  );
}