"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Check,
  Clock3,
  HeartHandshake,
  Mail,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { ROUTES } from "@/constants/routes";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    icon: Target,
    title: "Relevance over volume",
    description:
      "More messages do not automatically create more opportunities. We build around thoughtful, contextual outreach that earns attention.",
  },
  {
    icon: BrainCircuit,
    title: "AI should remove work",
    description:
      "AI belongs inside the workflow, handling repetitive research, writing, organization, and classification instead of becoming another tool to manage.",
  },
  {
    icon: HeartHandshake,
    title: "Keep humans in the conversation",
    description:
      "Automation should create more time for genuine conversations, judgment, relationships, and the moments that actually move a deal forward.",
  },
];

const workflow = [
  "Understand the prospect",
  "Create relevant outreach",
  "Recognize meaningful replies",
  "Move conversations forward",
];

export default function AboutPage() {
  const page = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-hero-reveal", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".story-card", {
        scrollTrigger: {
          trigger: ".story-grid",
          start: "top 75%",
        },
        y: 80,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".principle-card").forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 60,
            opacity: 0.25,
          },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          },
        );
      });

      gsap.from(".cta-reveal", {
        scrollTrigger: {
          trigger: ".about-cta",
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: page },
  );

  return (
    <div
      ref={page}
      className="w-full max-w-full overflow-x-hidden bg-[#080808] text-white"
    >
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden px-6 pb-28 pt-44 md:pt-52">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-[15%] top-[15%] h-[550px] w-[750px] rounded-full bg-violet-500/[0.09] blur-[150px]" />

          <div className="absolute right-[-5%] top-[30%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.05] blur-[140px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 90%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[700px] max-w-7xl flex-col justify-center">
          <h1 className="about-hero-reveal max-w-6xl text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[0.93] tracking-[-0.065em]">
            Sales technology should create{" "}
            <span className="text-white/25">
              conversations,
            </span>{" "}
            not noise.
          </h1>

          <div className="about-hero-reveal mt-12 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5 md:col-start-7">
              <p className="text-pretty text-base leading-7 text-white/45 md:text-lg md:leading-8">
                CRM Outreach is being built around a simple idea: sales teams
                should spend less time operating software and more time
                understanding people.
              </p>

              <p className="mt-5 text-pretty text-sm leading-7 text-white/30 md:text-base">
                We&apos;re bringing prospect intelligence, personalized
                outreach, reply management, and scheduling into one intelligent
                workflow.
              </p>
            </div>
          </div>

          <div className="about-hero-reveal mt-16 flex items-center gap-5">
            <div className="h-px w-16 bg-white/20" />

            <p className="text-xs text-white/25">
              Built for modern sales teams
            </p>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="border-y border-white/[0.06] px-6 py-32 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <Sparkles className="h-6 w-6 text-white/35" />
            </div>

            <div>
              <p className="max-w-5xl text-3xl font-medium leading-[1.15] tracking-[-0.045em] text-white/25 md:text-5xl md:leading-[1.1]">
                We believe the future of sales isn&apos;t about sending{" "}
                <span className="text-white">
                  thousands of generic messages.
                </span>{" "}
                It&apos;s about giving every salesperson the intelligence and
                automation to communicate{" "}
                <span className="text-white">
                  with context, timing, and purpose.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Bento */}
      <section className="px-6 py-32 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-4xl font-medium leading-[1] tracking-[-0.05em] md:text-6xl">
              One workflow instead of{" "}
              <span className="text-white/25">
                ten disconnected tools.
              </span>
            </h2>

            <p className="max-w-sm text-sm leading-6 text-white/35">
              CRM Outreach connects the repetitive parts of prospecting into
              one system designed around the conversation.
            </p>
          </div>

          <div className="story-grid grid grid-flow-dense gap-4 md:grid-cols-12">
            {/* Large */}
            <article className="story-card group relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#0d0d0d] p-8 md:col-span-7 md:p-10">
              <div className="absolute right-[-15%] top-[-20%] h-[400px] w-[400px] rounded-full bg-violet-500/[0.1] blur-[100px]" />

              <div className="relative flex h-full flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035]">
                  <Bot className="h-5 w-5" />
                </div>

                {/* Mock conversation */}
                <div className="mx-auto my-16 w-full max-w-md space-y-3">
                  <div className="mr-16 rounded-2xl rounded-bl-sm border border-white/[0.06] bg-white/[0.035] p-4">
                    <div className="mb-3 h-2 w-20 rounded-full bg-white/10" />
                    <div className="h-2 w-full rounded-full bg-white/[0.06]" />
                    <div className="mt-2 h-2 w-4/5 rounded-full bg-white/[0.06]" />
                  </div>

                  <div className="ml-16 rounded-2xl rounded-br-sm bg-white p-4">
                    <div className="mb-3 h-2 w-16 rounded-full bg-black/20" />
                    <div className="h-2 w-full rounded-full bg-black/10" />
                    <div className="mt-2 h-2 w-3/5 rounded-full bg-black/10" />
                  </div>

                  <div className="mr-24 rounded-2xl rounded-bl-sm border border-white/[0.06] bg-white/[0.035] p-4">
                    <div className="h-2 w-full rounded-full bg-white/[0.06]" />
                    <div className="mt-2 h-2 w-2/3 rounded-full bg-white/[0.06]" />
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-2xl font-medium tracking-[-0.04em] md:text-3xl">
                    Technology in the background.
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-6 text-white/35">
                    The product handles repetitive work behind the scenes while
                    your team stays focused on the conversation in front of
                    them.
                  </p>
                </div>
              </div>
            </article>

            {/* Tall */}
            <article className="story-card group relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white p-8 text-black md:col-span-5 md:p-10">
              <div className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-violet-300/50 blur-[90px]" />

              <div className="relative flex h-full flex-col">
                <Zap className="h-6 w-6" />

                <p className="mt-16 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-6xl">
                  Less busywork.
                </p>

                <p className="mt-2 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-black/25 md:text-6xl">
                  More selling.
                </p>

                <p className="mt-auto max-w-sm pt-20 text-sm leading-6 text-black/50">
                  Researching leads, drafting emails, sorting replies, and
                  coordinating calendars shouldn&apos;t consume the best hours
                  of your day.
                </p>
              </div>
            </article>

            {/* Row 2 */}
            <StoryCard
              icon={Clock3}
              title="Give time back"
              description="Automate the repetitive work that sits between finding a prospect and having a meaningful conversation."
            />

            <StoryCard
              icon={Users}
              title="Built around people"
              description="Technology should help teams understand prospects better instead of treating every lead like another row in a spreadsheet."
            />

            <StoryCard
              icon={ShieldCheck}
              title="Control stays human"
              description="AI assists the workflow, while your team keeps control over communication, decisions, and customer relationships."
            />
          </div>
        </div>
      </section>

      {/* How Product Thinks */}
      <section className="border-y border-white/[0.06] px-6 py-32 md:py-48">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <div className="lg:sticky lg:top-36">
              <h2 className="max-w-xl text-4xl font-medium leading-[1] tracking-[-0.05em] md:text-6xl">
                Designed around the{" "}
                <span className="text-white/25">
                  whole conversation.
                </span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-white/35">
                Outreach doesn&apos;t begin with an email and end with an open
                rate. The entire journey should work as one connected system.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute bottom-12 left-[23px] top-12 w-px bg-white/[0.08]" />

            <div className="space-y-5">
              {workflow.map((item, index) => (
                <div
                  key={item}
                  className="group relative flex min-h-[150px] items-center gap-7 rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-6 transition-all duration-500 hover:border-white/[0.14] hover:bg-[#111] md:p-8"
                >
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-[#0d0d0d] text-xs text-white/35 transition-colors group-hover:bg-white group-hover:text-black">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.035em]">
                      {item}
                    </h3>

                    <p className="mt-2 text-sm text-white/30">
                      {
                        [
                          "Bring context and intelligence together before outreach begins.",
                          "Turn prospect context into personalized campaigns without repetitive writing.",
                          "Understand intent automatically and surface conversations worth your attention.",
                          "Remove friction between positive replies, follow-ups, and scheduled meetings.",
                        ][index]
                      }
                    </p>
                  </div>

                  <ArrowRight className="ml-auto hidden h-4 w-4 text-white/15 transition-transform duration-300 group-hover:translate-x-1 md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-6 py-32 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20">
            <h2 className="max-w-4xl text-4xl font-medium leading-[1] tracking-[-0.05em] md:text-6xl">
              What we believe good sales software{" "}
              <span className="text-white/25">
                should feel like.
              </span>
            </h2>
          </div>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="principle-card group grid gap-8 py-10 md:grid-cols-12 md:items-center md:py-14"
                >
                  <div className="md:col-span-1">
                    <Icon className="h-5 w-5 text-white/30 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  <div className="md:col-span-4">
                    <h3 className="text-2xl font-medium tracking-[-0.04em]">
                      {principle.title}
                    </h3>
                  </div>

                  <div className="md:col-span-6 md:col-start-7">
                    <p className="max-w-xl text-sm leading-7 text-white/35 md:text-base">
                      {principle.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future */}
      <section className="px-6 pb-32 md:pb-48">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[#0d0d0d] px-7 py-20 md:px-16 md:py-28">
            <div
              aria-hidden="true"
              className="absolute right-[-15%] top-[-40%] h-[600px] w-[600px] rounded-full bg-violet-500/[0.09] blur-[130px]"
            />

            <div className="relative grid gap-16 lg:grid-cols-2 lg:items-end">
              <div>
                <BrainCircuit className="mb-10 h-7 w-7 text-white/40" />

                <h2 className="max-w-xl text-4xl font-medium leading-[1] tracking-[-0.05em] md:text-6xl">
                  We&apos;re building toward{" "}
                  <span className="text-white/25">
                    autonomous work,
                  </span>{" "}
                  not autonomous relationships.
                </h2>
              </div>

              <div className="lg:pb-1">
                <p className="max-w-lg text-base leading-8 text-white/40">
                  The repetitive parts of sales can become increasingly
                  autonomous: research, preparation, organization,
                  classification, reminders, and scheduling.
                </p>

                <p className="mt-6 max-w-lg text-base leading-8 text-white/40">
                  But trust, judgment, creativity, negotiation, and
                  relationships remain human. We want the product to create
                  more room for those things, not replace them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta px-6 pb-32 md:pb-48">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-white px-7 py-20 text-center text-black md:px-16 md:py-28">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-80 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300/50 blur-[100px]"
          />

          <Mail className="cta-reveal relative mx-auto mb-8 h-7 w-7" />

          <h2 className="cta-reveal relative mx-auto max-w-5xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Build better conversations.
          </h2>

          <p className="cta-reveal relative mx-auto mt-7 max-w-xl text-sm leading-7 text-black/50 md:text-base">
            See how CRM Outreach can remove repetitive work from your sales
            process and give your team more time to sell.
          </p>

          <div className="cta-reveal relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-7 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              Get started

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href={ROUTES.marketing.contact}
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-7 text-sm font-medium text-black transition-colors duration-300 hover:bg-black/[0.04]"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function StoryCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Clock3;
  title: string;
  description: string;
}) {
  return (
    <article className="story-card group relative min-h-[330px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#0d0d0d] p-8 md:col-span-4">
      <div className="absolute right-[-50px] top-[-50px] h-40 w-40 rounded-full bg-violet-500/[0.05] blur-[60px] transition-transform duration-700 group-hover:scale-150" />

      <div className="relative flex h-full flex-col">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035]">
          <Icon className="h-5 w-5 text-white/60" />
        </div>

        <div className="mt-auto pt-20">
          <h3 className="text-xl font-medium tracking-[-0.035em]">
            {title}
          </h3>

          <p className="mt-4 text-sm leading-6 text-white/35">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}