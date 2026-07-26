import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  Check,
  Database,
  Headphones,
  Inbox,
  LockKeyhole,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";

const plans = [
  {
    name: "Starter",
    description:
      "For individuals exploring AI-powered outreach and building their first campaigns.",
    price: "INR 0",
    suffix: "/month",
    cta: "Start for free",
    href: "/dashboard",
    featured: false,
    features: [
      "250 contacts",
      "1 active campaign",
      "AI campaign writer",
      "Basic lead management",
      "Email analytics",
    ],
  },
  {
    name: "Pro",
    description:
      "For professionals who want to automate outreach and consistently turn leads into meetings.",
    price: "INR 39",
    suffix: "/month",
    cta: "Start with Pro",
    href: "/dashboard",
    featured: true,
    features: [
      "5,000 contacts",
      "Unlimited campaigns",
      "AI campaign writer",
      "Smart inbox assistant",
      "Automated scheduling",
      "Lead intelligence",
      "Advanced analytics",
    ],
  },
  {
    name: "Business",
    description:
      "For growing sales teams that need collaboration, scale, control, and higher outreach limits.",
    price: "INR 99",
    suffix: "/month",
    cta: "Choose Business",
    href: ROUTES.marketing.contact,
    featured: false,
    features: [
      "25,000 contacts",
      "Everything in Pro",
      "Team workspace",
      "Advanced permissions",
      "Priority processing",
      "Priority support",
      "API access",
    ],
  },
];

const comparison = [
  {
    feature: "Contacts",
    starter: "250",
    pro: "5,000",
    business: "25,000",
  },
  {
    feature: "Active campaigns",
    starter: "1",
    pro: "Unlimited",
    business: "Unlimited",
  },
  {
    feature: "AI campaign writer",
    starter: true,
    pro: true,
    business: true,
  },
  {
    feature: "Smart inbox",
    starter: false,
    pro: true,
    business: true,
  },
  {
    feature: "Automated scheduling",
    starter: false,
    pro: true,
    business: true,
  },
  {
    feature: "Lead intelligence",
    starter: false,
    pro: true,
    business: true,
  },
  {
    feature: "Advanced analytics",
    starter: false,
    pro: true,
    business: true,
  },
  {
    feature: "Team workspace",
    starter: false,
    pro: false,
    business: true,
  },
  {
    feature: "API access",
    starter: false,
    pro: false,
    business: true,
  },
];

const benefits = [
  {
    icon: Bot,
    title: "AI built into the workflow",
    description:
      "Generate personalized campaigns and understand replies without jumping between separate AI tools.",
  },
  {
    icon: CalendarDays,
    title: "Meetings without the chase",
    description:
      "Turn positive conversations into scheduled meetings while eliminating repetitive coordination.",
  },
  {
    icon: BarChart3,
    title: "Know what converts",
    description:
      "See campaign, reply, and meeting performance clearly so you can improve the outreach that matters.",
  },
];

const faqs = [
  {
    question: "Can I start for free?",
    answer:
      "Yes. Starter is designed to let you explore the core workflow before moving to a paid plan.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can move between plans as your outreach volume and team requirements change.",
  },
  {
    question: "What counts as a contact?",
    answer:
      "A contact is a lead stored in your CRM workspace that can be organized, analyzed, or included in outreach.",
  },
  {
    question: "Is there a plan for larger teams?",
    answer:
      "For requirements beyond the Business plan, contact us to discuss higher limits, onboarding, and custom requirements.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative w-full overflow-hidden bg-[#080808] text-white">
      {/* Hero */}
      <section className="relative px-6 pb-24 pt-44 md:pb-32 md:pt-52">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute left-1/2 top-[15%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-500/[0.09] blur-[150px]" />

          <div className="absolute right-[-10%] top-[5%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.04] blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 85%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <h1 className="text-balance text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[0.93] tracking-[-0.065em]">
              Simple pricing.
              <br />

              <span className="text-white/25">
                Serious outreach.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-white/40 md:text-lg">
              Start free, automate the repetitive work, and upgrade when your
              pipeline is ready to scale.
            </p>

            <div className="mt-9 flex items-center gap-2 text-sm text-white/35">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.06]">
                <Check className="h-3 w-3" />
              </span>

              No credit card required for Starter
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative px-6 pb-32 md:pb-48">
        <div className="mx-auto max-w-7xl">
          <div className="grid overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.02] lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={[
                  "group relative flex min-h-[620px] flex-col p-7 transition-all duration-500 md:p-9",
                  "border-b border-white/[0.08] last:border-b-0",
                  "lg:border-b-0 lg:border-r lg:last:border-r-0",
                  plan.featured
                    ? "bg-[#dad9d9a6] text-black"
                    : "bg-[#0d0d0d] hover:bg-[#111]",
                ].join(" ")}
              >
                {plan.featured && (
                  <div className="absolute right-7 top-7 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}

                <div>
                  <h2
                    className={`text-xl font-medium tracking-[-0.035em] ${
                      plan.featured ? "text-black" : "text-white"
                    }`}
                  >
                    {plan.name}
                  </h2>

                  <p
                    className={`mt-4 max-w-sm text-sm leading-6 ${
                      plan.featured ? "text-black/50" : "text-white/35"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="mt-10">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-semibold tracking-[-0.06em] md:text-6xl">
                      {plan.price}
                    </span>

                    <span
                      className={`mb-2 text-sm ${
                        plan.featured ? "text-black/40" : "text-white/30"
                      }`}
                    >
                      {plan.suffix}
                    </span>
                  </div>
                </div>

                <Link
                  href={plan.href}
                  className={[
                    "group/button mt-9 flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-transform duration-300 hover:scale-[1.02]",
                    plan.featured
                      ? "bg-black text-white"
                      : "bg-white text-black",
                  ].join(" ")}
                >
                  {plan.cta}

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                </Link>

                <div
                  className={`my-9 h-px ${
                    plan.featured ? "bg-black/10" : "bg-white/[0.08]"
                  }`}
                />

                <p
                  className={`mb-5 text-xs font-medium ${
                    plan.featured ? "text-black/40" : "text-white/25"
                  }`}
                >
                  Includes
                </p>

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-3 text-sm ${
                        plan.featured ? "text-black/65" : "text-white/55"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.featured
                            ? "bg-black text-white"
                            : "bg-white/[0.07] text-white"
                        }`}
                      >
                        <Check className="h-3 w-3" />
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-12">
                  <p
                    className={`text-xs ${
                      plan.featured ? "text-black/30" : "text-white/20"
                    }`}
                  >
                    Cancel or change your plan anytime.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-white/[0.06] px-6 py-32 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-4xl font-medium leading-[1] tracking-[-0.05em] md:text-6xl">
              More than another
              <br />

              <span className="text-white/25">
                email tool.
              </span>
            </h2>

            <p className="max-w-sm text-sm leading-6 text-white/35">
              Every plan is built around one goal: reduce repetitive sales work
              without making your outreach feel automated.
            </p>
          </div>

          <div className="mt-16 grid grid-flow-dense overflow-hidden rounded-[2rem] border border-white/[0.07] md:grid-cols-12">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="group relative min-h-[360px] border-b border-white/[0.07] bg-[#0d0d0d] p-8 last:border-b-0 md:col-span-4 md:border-b-0 md:border-r md:last:border-r-0 md:p-10"
                >
                  <div className="absolute right-[-30px] top-[-30px] h-40 w-40 rounded-full bg-violet-500/[0.05] blur-[60px] transition-transform duration-700 group-hover:scale-150" />

                  <div className="relative flex h-full flex-col">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035]">
                      <Icon className="h-5 w-5 text-white/70" />
                    </div>

                    <div className="mt-auto pt-24">
                      <h3 className="text-xl font-medium tracking-[-0.035em]">
                        {benefit.title}
                      </h3>

                      <p className="mt-4 max-w-sm text-sm leading-6 text-white/35">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 py-32 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <h2 className="max-w-3xl text-4xl font-medium tracking-[-0.05em] md:text-6xl">
              Compare every plan.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-white/35">
              Choose based on how much outreach you need today. You can move up
              when your pipeline grows.
            </p>
          </div>

          <div className="overflow-x-auto rounded-[2rem] border border-white/[0.08] bg-[#0d0d0d]">
            <div className="min-w-[760px]">
              {/* Header */}
              <div className="grid grid-cols-[1.5fr_repeat(3,1fr)] border-b border-white/[0.08]">
                <div className="p-6 md:p-8" />

                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className="border-l border-white/[0.08] p-6 md:p-8"
                  >
                    <p className="font-medium tracking-[-0.025em]">
                      {plan.name}
                    </p>

                    <p className="mt-1 text-xs text-white/25">
                      {plan.price}
                      {plan.suffix}
                    </p>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {comparison.map((row) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-[1.5fr_repeat(3,1fr)] border-b border-white/[0.06] last:border-b-0 transition-colors hover:bg-white/[0.015]"
                >
                  <div className="flex items-center p-6 text-sm text-white/50 md:px-8">
                    {row.feature}
                  </div>

                  <ComparisonValue value={row.starter} />
                  <ComparisonValue value={row.pro} />
                  <ComparisonValue value={row.business} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security / Support Strip */}
      <section className="px-6 pb-32 md:pb-48">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.025] md:grid-cols-3">
          <TrustItem
            icon={LockKeyhole}
            title="Built securely"
            description="Designed around secure access and responsible handling of your sales data."
          />

          <TrustItem
            icon={Database}
            title="Your data stays yours"
            description="Your contacts and conversations remain part of your workspace, not somebody else's campaign."
          />

          <TrustItem
            icon={Headphones}
            title="Support when needed"
            description="Get help as you configure campaigns, workflows, and your growing outreach operation."
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.06] px-6 py-32 md:py-48">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="max-w-lg text-4xl font-medium leading-[1] tracking-[-0.05em] md:text-6xl">
              Questions,
              <br />

              <span className="text-white/25">
                answered.
              </span>
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-6 text-white/35">
              Still unsure which plan fits your workflow? Talk to us and
              we&apos;ll help you choose.
            </p>

            <Link
              href={ROUTES.marketing.contact}
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-white"
            >
              Contact us

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="border-t border-white/[0.08]">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-white/[0.08]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-7 text-left [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-medium tracking-[-0.025em]">
                    {faq.question}
                  </span>

                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08]">
                    <span className="absolute h-px w-3 bg-white/60" />

                    <span className="absolute h-3 w-px bg-white/60 transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>

                <p className="max-w-2xl pb-7 pr-12 text-sm leading-7 text-white/35">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-32 md:pb-48">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-white px-6 py-20 text-center text-black md:px-16 md:py-28">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-80 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300/50 blur-[100px]"
          />

          <Zap className="relative mx-auto mb-8 h-8 w-8" />

          <h2 className="relative mx-auto max-w-5xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Start building a pipeline
            <br className="hidden md:block" /> that works for you.
          </h2>

          <p className="relative mx-auto mt-7 max-w-xl text-sm leading-7 text-black/50 md:text-base">
            Create your workspace, launch your first campaign, and see what
            AI-native outreach feels like.
          </p>

          <div className="relative mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-black px-7 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              Start for free

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href={ROUTES.marketing.contact}
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-7 text-sm font-medium text-black transition-colors hover:bg-black/[0.04]"
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ComparisonValue({
  value,
}: {
  value: boolean | string;
}) {
  return (
    <div className="flex items-center border-l border-white/[0.08] p-6 text-sm text-white/55 md:px-8">
      {typeof value === "string" ? (
        value
      ) : value ? (
        <>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
            <Check className="h-3.5 w-3.5" />
          </span>

          <span className="sr-only">Included</span>
        </>
      ) : (
        <>
          <X className="h-4 w-4 text-white/15" />

          <span className="sr-only">Not included</span>
        </>
      )}
    </div>
  );
}

function TrustItem({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof LockKeyhole;
  title: string;
  description: string;
}) {
  return (
    <article className="group border-b border-white/[0.07] p-8 last:border-b-0 md:border-b-0 md:border-r md:p-10 md:last:border-r-0">
      <Icon className="h-5 w-5 text-white/50 transition-transform duration-500 group-hover:scale-110" />

      <h3 className="mt-10 text-lg font-medium tracking-[-0.03em]">
        {title}
      </h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-white/35">
        {description}
      </p>
    </article>
  );
}