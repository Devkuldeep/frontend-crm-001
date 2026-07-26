"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  Check,
  Inbox,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Bot,
    title: "AI Campaign Writer",
    description:
      "Build personalized sequences from lead context, company data, and campaign intent in seconds.",
    className: "md:col-span-7",
    accent: "from-violet-500/20",
  },
  {
    icon: Inbox,
    title: "Smart Inbox",
    description:
      "AI understands replies, summarizes conversations, and identifies the leads that actually need your attention.",
    className: "md:col-span-5",
    accent: "from-cyan-500/20",
  },
  {
    icon: CalendarDays,
    title: "Auto Scheduling",
    description:
      "Turn positive replies into booked meetings without the scheduling back-and-forth.",
    className: "md:col-span-4",
    accent: "from-emerald-500/20",
  },
  {
    icon: Users,
    title: "Lead Intelligence",
    description:
      "Score, categorize, and prioritize prospects automatically before your team starts outreach.",
    className: "md:col-span-4",
    accent: "from-orange-500/20",
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    description:
      "Understand replies, meetings, conversion, and campaign performance from one focused workspace.",
    className: "md:col-span-4",
    accent: "from-blue-500/20",
  },
];

const companies = [
  "ACME",
  "NEXUS",
  "GLOBALTECH",
  "NORTHSTAR",
  "VERTEX",
  "ORBIT",
];

const workflow = [
  {
    number: "01",
    title: "Import your leads",
    description:
      "Bring prospects from your existing workflow and let AI organize, score, and enrich the pipeline.",
  },
  {
    number: "02",
    title: "Generate campaigns",
    description:
      "Create contextual sequences personalized around each prospect instead of relying on generic templates.",
  },
  {
    number: "03",
    title: "Let AI handle replies",
    description:
      "Replies are analyzed automatically so your team can focus on conversations that move deals forward.",
  },
];

export default function MarketingHomePage() {
  const page = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-reveal", {
        y: 45,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 75%",
        },
        y: 80,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".workflow-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            scale: 0.92,
            opacity: 0.3,
          },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
            },
          }
        );

        if (i > 0) {
          gsap.set(card, {
            marginTop: "-4rem",
          });
        }
      });

      gsap.from(".cta-reveal", {
        scrollTrigger: {
          trigger: ".final-cta",
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: page }
  );

  return (
    <main
      ref={page}
      className="w-full max-w-full overflow-x-hidden bg-[#080808] text-white selection:bg-white selection:text-black"
    >
      {/* Navigation */}
      {/* <header className="absolute inset-x-0 top-0 z-50 px-5 py-6 md:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold tracking-[-0.04em]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
              <Sparkles className="h-4 w-4" />
            </span>
            Outreach
          </Link>

          <div className="hidden items-center gap-8 text-sm text-white/50 md:flex">
            <Link
              href="#features"
              className="transition-colors hover:text-white"
            >
              Features
            </Link>

            <Link
              href="#workflow"
              className="transition-colors hover:text-white"
            >
              Workflow
            </Link>

            <Link
              href="/dashboard"
              className="transition-colors hover:text-white"
            >
              Dashboard
            </Link>
          </div>

          <Link
            href="/dashboard"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
          >
            Get started
          </Link>
        </nav>
      </header> */}

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-[35%] h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.12] blur-[140px]" />

          <div className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-400/[0.08] blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 80%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
          <h1 className="hero-reveal max-w-6xl text-balance text-[clamp(3.7rem,7vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
            Turn conversations into{" "}
            <span className="bg-gradient-to-r from-white via-violet-200 to-white/40 bg-clip-text text-transparent">
              closed deals.
            </span>
          </h1>

          <p className="hero-reveal mt-8 max-w-2xl text-pretty text-base leading-7 text-white/45 md:text-lg">
            AI-powered outreach that researches leads, writes personalized
            campaigns, understands replies, and books meetings while your team
            focuses on selling.
          </p>

          <div className="hero-reveal mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/dashboard"
              className="group flex h-13 items-center justify-center gap-3 rounded-full bg-white px-7 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
            >
              Start for free

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <button className="h-13 rounded-full border border-white/15 bg-white/[0.03] px-7 text-sm font-medium text-white backdrop-blur-xl transition-colors hover:bg-white/[0.08]">
              Book a demo
            </button>
          </div>

          {/* Product preview */}
          <div className="hero-reveal group relative mt-20 w-full max-w-6xl">
            <div className="absolute -inset-8 bg-violet-500/[0.07] blur-[80px]" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#101010] p-2 shadow-2xl shadow-black">
              <div className="overflow-hidden rounded-[1.6rem] border border-white/[0.06] bg-[#0c0c0c]">
                <div className="flex h-14 items-center border-b border-white/[0.06] px-5">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>

                  <span className="mx-auto text-xs text-white/25">
                    outreach.ai/dashboard
                  </span>
                </div>

                <div className="grid min-h-[430px] md:grid-cols-[220px_1fr]">
                  <aside className="hidden border-r border-white/[0.06] p-5 md:block">
                    <div className="mb-8 h-8 w-28 rounded-lg bg-white/[0.07]" />

                    <div className="space-y-3">
                      {[75, 55, 68, 48, 60].map((width, index) => (
                        <div
                          key={index}
                          className="h-9 rounded-lg bg-white/[0.035]"
                          style={{ width: `${width}%` }}
                        />
                      ))}
                    </div>
                  </aside>

                  <div className="p-6 md:p-8">
                    <div className="mb-8 flex items-end justify-between">
                      <div>
                        <div className="mb-3 h-3 w-24 rounded-full bg-white/10" />
                        <div className="h-7 w-48 rounded-lg bg-white/15" />
                      </div>

                      <div className="hidden h-10 w-28 rounded-full bg-white text-black md:block" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      {["1,248", "38.6%", "164"].map((value, index) => (
                        <div
                          key={value}
                          className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-left"
                        >
                          <p className="text-xs text-white/30">
                            {["Active leads", "Reply rate", "Meetings"][index]}
                          </p>

                          <p className="mt-3 text-2xl font-medium tracking-tight">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 h-52 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                      <div className="flex h-full items-end gap-2">
                        {[34, 46, 40, 64, 55, 78, 66, 87, 74, 92, 84, 100].map(
                          (height, index) => (
                            <div
                              key={index}
                              className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-500/20 to-white/40"
                              style={{ height: `${height}%` }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted */}
      <section className="border-y border-white/[0.06] py-10">
        <div className="relative flex overflow-hidden">
          <div className="flex min-w-max animate-[marquee_25s_linear_infinite] items-center">
            {[...companies, ...companies].map((company, index) => (
              <div
                key={`${company}-${index}`}
                className="mx-10 text-lg font-semibold tracking-[-0.03em] text-white/20 md:mx-16 md:text-xl"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-32 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-4xl font-medium tracking-[-0.05em] md:text-6xl">
              Your sales workflow,{" "}
              <span className="text-white/30">finally working together.</span>
            </h2>

            <p className="max-w-sm text-sm leading-6 text-white/40">
              One intelligent workspace for prospecting, campaigns, replies,
              scheduling, and performance.
            </p>
          </div>

          <div className="features-grid grid grid-flow-dense gap-4 md:grid-cols-12">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className={`feature-card group relative min-h-[350px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#101010] p-8 md:p-10 ${feature.className}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.accent} via-transparent to-transparent opacity-40 transition-opacity duration-700 group-hover:opacity-80`}
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="mt-auto pt-24">
                      <h3 className="text-2xl font-medium tracking-[-0.04em]">
                        {feature.title}
                      </h3>

                      <p className="mt-3 max-w-md text-sm leading-6 text-white/40">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="absolute right-8 top-8 h-32 w-32 rounded-full border border-white/[0.05] transition-transform duration-700 ease-out group-hover:scale-125" />
                  <div className="absolute right-14 top-14 h-20 w-20 rounded-full border border-white/[0.08] transition-transform duration-700 ease-out group-hover:scale-110" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section
        id="workflow"
        className="relative px-6 py-32 md:py-48"
      >
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="lg:sticky lg:top-32">
              <h2 className="max-w-xl text-4xl font-medium tracking-[-0.05em] md:text-6xl">
                From lead list to meeting.
              </h2>

              <p className="mt-6 max-w-md leading-7 text-white/40">
                Give your team a system that handles repetitive outreach while
                keeping every conversation relevant and personal.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "Personalized at scale",
                  "Automatic reply intelligence",
                  "Human control when it matters",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-white/60"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                      <Check className="h-3 w-3" />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {workflow.map((item) => (
              <article
                key={item.number}
                className="workflow-card sticky top-28 min-h-[420px] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#111] p-8 shadow-2xl shadow-black md:p-12"
              >
                <div className="absolute right-[-10%] top-[-20%] h-72 w-72 rounded-full bg-violet-500/[0.08] blur-[90px]" />

                <div className="relative flex h-full min-h-[330px] flex-col">
                  <span className="text-sm font-medium text-white/25">
                    {item.number}
                  </span>

                  <div className="mt-auto">
                    <h3 className="max-w-xl text-3xl font-medium tracking-[-0.04em] md:text-5xl">
                      {item.title}
                    </h3>

                    <p className="mt-5 max-w-lg leading-7 text-white/40">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta px-6 py-32 md:py-48">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white px-7 py-20 text-center text-black md:px-16 md:py-28">
          <div className="absolute left-1/2 top-0 h-80 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300/40 blur-[100px]" />

          <Zap className="cta-reveal relative mx-auto mb-8 h-8 w-8" />

          <h2 className="cta-reveal relative mx-auto max-w-5xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Spend less time chasing.
            <br />
            More time closing.
          </h2>

          <p className="cta-reveal relative mx-auto mt-7 max-w-xl text-base leading-7 text-black/50">
            Build your first AI-powered campaign and turn repetitive sales work
            into an automated growth engine.
          </p>

          <div className="cta-reveal relative mt-10">
            <Link
              href="/dashboard"
              className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-black px-7 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              Get started for free

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="border-t border-white/[0.06] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-white/30 md:flex-row md:items-center">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium text-white"
          >
            <ShieldCheck className="h-4 w-4" />
            Outreach
          </Link>

          <p>AI-powered outreach built for modern sales teams.</p>

          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-white">
              Privacy
            </Link>

            <Link href="#" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </footer> */}
    </main>
  );
}