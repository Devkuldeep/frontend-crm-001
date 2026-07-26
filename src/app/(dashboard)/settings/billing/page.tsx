"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Download,
  FileText,
  Gauge,
  Infinity,
  Loader2,
  Mail,
  MoreHorizontal,
  ReceiptText,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const usage = [
  {
    label: "AI generations",
    value: 7420,
    limit: 10000,
    icon: Bot,
  },
  {
    label: "Emails sent",
    value: 18640,
    limit: 25000,
    icon: Mail,
  },
  {
    label: "Team members",
    value: 6,
    limit: 10,
    icon: Users,
  },
];

const invoices = [
  {
    id: "INV-2026-007",
    date: "Jul 12, 2026",
    amount: "$49.00",
    status: "Paid",
  },
  {
    id: "INV-2026-006",
    date: "Jun 12, 2026",
    amount: "$49.00",
    status: "Paid",
  },
  {
    id: "INV-2026-005",
    date: "May 12, 2026",
    amount: "$49.00",
    status: "Paid",
  },
  {
    id: "INV-2026-004",
    date: "Apr 12, 2026",
    amount: "$49.00",
    status: "Paid",
  },
];

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function BillingPage() {
  const [billingCycle, setBillingCycle] =
    useState<"monthly" | "yearly">("monthly");

  const [loading, setLoading] = useState(false);

  const handlePortal = async () => {
    setLoading(true);

    // Replace with Stripe / Razorpay billing portal redirect.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setLoading(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#080808] text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute right-[-250px] top-[-350px] h-[750px] w-[750px] rounded-full bg-violet-500/[0.045] blur-[190px]" />

        <div className="absolute bottom-[-250px] left-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.018] blur-[170px]" />

        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 45%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 md:py-10 lg:px-8 xl:px-10">
        {/* Header */}
        <header className="flex flex-col gap-6 border-b border-white/[0.06] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/settings"
              className="mb-5 inline-flex items-center gap-2 text-[10px] text-white/25 transition-colors hover:text-white/60"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to settings
            </Link>

            <h1 className="text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
              Plan & billing
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/30">
              Manage your subscription, usage, payment method, and
              billing history.
            </p>
          </div>

          <Button
            onClick={handlePortal}
            disabled={loading}
            variant="outline"
            className="h-10 rounded-full border-white/[0.08] bg-white/[0.025] px-5 text-xs text-white/55 hover:bg-white/[0.06] hover:text-white"
          >
            {loading ? (
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
            ) : (
              <CreditCard className="mr-2 h-3.5 w-3.5" />
            )}

            Manage billing
          </Button>
        </header>

        {/* Main billing summary */}
        <div className="mt-8 grid grid-flow-dense gap-4 xl:grid-cols-12">
          {/* Current Plan */}
          <section className="group relative overflow-hidden rounded-[1.75rem] border border-violet-400/[0.1] bg-[#0c0c0c] xl:col-span-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-36 -top-48 h-[520px] w-[520px] rounded-full bg-violet-500/[0.09] blur-[150px] transition-all duration-700 group-hover:bg-violet-500/[0.12]"
            />

            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/[0.1] bg-violet-400/[0.07]">
                      <Sparkles className="h-4 w-4 text-violet-300/70" />
                    </div>

                    <div>
                      <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-violet-300/35">
                        Current plan
                      </p>

                      <h2 className="mt-1 text-lg font-medium tracking-[-0.03em] text-white/85">
                        Pro
                      </h2>
                    </div>
                  </div>

                  <div className="mt-8 flex items-end gap-2">
                    <span className="text-4xl font-medium tracking-[-0.06em] text-white">
                      $49
                    </span>

                    <span className="mb-1 text-xs text-white/25">
                      / month
                    </span>
                  </div>

                  <p className="mt-3 max-w-lg text-[11px] leading-5 text-white/30">
                    Advanced AI outreach for growing sales teams with
                    higher sending limits, automation, analytics, and
                    team collaboration.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/[0.1] bg-emerald-400/[0.04] px-3 py-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>

                  <span className="text-[9px] font-medium text-emerald-300/60">
                    Active
                  </span>
                </div>
              </div>

              {/* Included features */}
              <div className="mt-9 grid gap-3 border-t border-white/[0.06] pt-6 sm:grid-cols-2">
                <PlanFeature text="10,000 AI generations / month" />
                <PlanFeature text="25,000 outreach emails / month" />
                <PlanFeature text="10 workspace members" />
                <PlanFeature text="AI inbox classification" />
                <PlanFeature text="Advanced campaign analytics" />
                <PlanFeature text="Automated follow-ups" />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="h-10 rounded-full bg-violet-500 px-5 text-xs text-white shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:bg-violet-400">
                  Upgrade plan
                  <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                </Button>

                <Button
                  variant="outline"
                  className="h-10 rounded-full border-white/[0.08] bg-transparent px-5 text-xs text-white/45 hover:bg-white/[0.04] hover:text-white"
                >
                  Compare plans
                </Button>
              </div>
            </div>
          </section>

          {/* Billing Summary */}
          <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] xl:col-span-4">
            <div className="border-b border-white/[0.06] px-6 py-5">
              <p className="text-[13px] font-medium text-white/70">
                Billing summary
              </p>

              <p className="mt-1.5 text-[10px] text-white/20">
                Your next subscription charge.
              </p>
            </div>

            <div className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.025]">
                <CalendarDays className="h-4 w-4 text-white/35" />
              </div>

              <p className="mt-7 text-[9px] uppercase tracking-[0.12em] text-white/20">
                Next payment
              </p>

              <p className="mt-2 text-xl font-medium tracking-[-0.04em] text-white/80">
                August 12, 2026
              </p>

              <div className="mt-6 flex items-end justify-between border-t border-white/[0.05] pt-6">
                <div>
                  <p className="text-[9px] text-white/20">
                    Amount due
                  </p>

                  <p className="mt-1.5 text-2xl font-medium tracking-[-0.05em] text-white/80">
                    $49.00
                  </p>
                </div>

                <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[9px] text-white/30">
                  Monthly
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Usage */}
        <section className="mt-4 overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c]">
          <SectionHeader
            title="Plan usage"
            description="Usage resets at the beginning of your next billing period."
          >
            <div className="flex items-center gap-2 text-[9px] text-white/25">
              <Gauge className="h-3.5 w-3.5" />
              Resets Aug 12
            </div>
          </SectionHeader>

          <div className="grid divide-y divide-white/[0.05] md:grid-cols-3 md:divide-x md:divide-y-0">
            {usage.map((item) => (
              <UsageCard
                key={item.label}
                {...item}
              />
            ))}
          </div>
        </section>

        {/* Billing cycle + payment */}
        <div className="mt-4 grid grid-flow-dense gap-4 xl:grid-cols-12">
          {/* Billing cycle */}
          <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] xl:col-span-7">
            <SectionHeader
              title="Billing cycle"
              description="Choose how often your subscription renews."
            />

            <div className="grid gap-3 p-6 sm:grid-cols-2">
              <BillingCycleCard
                title="Monthly"
                description="Pay month to month"
                price="$49"
                suffix="/ month"
                selected={billingCycle === "monthly"}
                onClick={() => setBillingCycle("monthly")}
              />

              <BillingCycleCard
                title="Yearly"
                description="Save with annual billing"
                price="$470"
                suffix="/ year"
                selected={billingCycle === "yearly"}
                onClick={() => setBillingCycle("yearly")}
                badge="Save 20%"
              />
            </div>
          </section>

          {/* Payment Method */}
          <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] xl:col-span-5">
            <SectionHeader
              title="Payment method"
              description="Used for your subscription charges."
            />

            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-16 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025]">
                  <CreditCard className="h-4 w-4 text-white/40" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white/65">
                    Visa ending in 4242
                  </p>

                  <p className="mt-1 text-[9px] text-white/20">
                    Expires 09/29
                  </p>
                </div>

                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white/25 transition-colors hover:bg-white/[0.04] hover:text-white/60"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              <Button
                variant="outline"
                className="mt-6 h-9 w-full rounded-xl border-white/[0.07] bg-transparent text-[10px] text-white/40 hover:bg-white/[0.04] hover:text-white"
              >
                Update payment method
              </Button>
            </div>
          </section>
        </div>

        {/* Billing history */}
        <section className="mt-4 overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c]">
          <SectionHeader
            title="Billing history"
            description="View and download previous subscription invoices."
          />

          {/* Desktop */}
          <div className="hidden md:block">
            <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_40px] border-b border-white/[0.05] px-6 py-3">
              <TableLabel>Invoice</TableLabel>
              <TableLabel>Date</TableLabel>
              <TableLabel>Amount</TableLabel>
              <TableLabel>Status</TableLabel>
              <span />
            </div>

            <div className="divide-y divide-white/[0.05]">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="group grid grid-cols-[1.2fr_1fr_1fr_1fr_40px] items-center px-6 py-4 transition-colors hover:bg-white/[0.015]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.025]">
                      <FileText className="h-3.5 w-3.5 text-white/25" />
                    </div>

                    <span className="text-[10px] font-medium text-white/50">
                      {invoice.id}
                    </span>
                  </div>

                  <span className="text-[10px] text-white/25">
                    {invoice.date}
                  </span>

                  <span className="text-[10px] font-medium text-white/50">
                    {invoice.amount}
                  </span>

                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/[0.08] bg-emerald-400/[0.035] px-2.5 py-1 text-[9px] text-emerald-300/55">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      {invoice.status}
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-label={`Download ${invoice.id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white/20 transition-colors hover:bg-white/[0.05] hover:text-white/60"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="divide-y divide-white/[0.05] md:hidden">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.025]">
                      <ReceiptText className="h-3.5 w-3.5 text-white/30" />
                    </div>

                    <div>
                      <p className="text-[10px] font-medium text-white/55">
                        {invoice.id}
                      </p>

                      <p className="mt-1 text-[9px] text-white/20">
                        {invoice.date}
                      </p>
                    </div>
                  </div>

                  <button className="text-white/25">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-white/60">
                    {invoice.amount}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/[0.04] px-2.5 py-1 text-[9px] text-emerald-300/55">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    Paid
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cancel */}
        <section className="mt-4 flex flex-col gap-5 rounded-[1.5rem] border border-red-500/[0.09] bg-red-500/[0.012] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-white/55">
              Cancel subscription
            </p>

            <p className="mt-1.5 max-w-xl text-[10px] leading-5 text-white/20">
              Your Pro features will remain available until the end of
              your current billing period.
            </p>
          </div>

          <Button
            variant="outline"
            className="shrink-0 border-red-400/[0.12] bg-red-500/[0.025] text-[10px] text-red-300/60 hover:bg-red-500/[0.08] hover:text-red-200"
          >
            Cancel subscription
          </Button>
        </section>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

function PlanFeature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-400/[0.07]">
        <Check className="h-2.5 w-2.5 text-violet-300/70" />
      </div>

      <span className="text-[10px] text-white/35">
        {text}
      </span>
    </div>
  );
}

function UsageCard({
  label,
  value,
  limit,
  icon: Icon,
}: {
  label: string;
  value: number;
  limit: number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const percentage = Math.min((value / limit) * 100, 100);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.025]">
          <Icon className="h-4 w-4 text-white/30" />
        </div>

        <span className="text-[9px] font-medium text-white/20">
          {percentage.toFixed(0)}%
        </span>
      </div>

      <p className="mt-6 text-[10px] text-white/25">
        {label}
      </p>

      <div className="mt-2 flex items-end gap-1.5">
        <span className="text-xl font-medium tracking-[-0.04em] text-white/70">
          {value.toLocaleString()}
        </span>

        <span className="mb-0.5 text-[9px] text-white/20">
          / {limit.toLocaleString()}
        </span>
      </div>

      <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className="h-full rounded-full bg-violet-400 transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function BillingCycleCard({
  title,
  description,
  price,
  suffix,
  selected,
  badge,
  onClick,
}: {
  title: string;
  description: string;
  price: string;
  suffix: string;
  selected: boolean;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative rounded-2xl border p-5 text-left transition-all duration-300",
        selected
          ? "border-violet-400/30 bg-violet-400/[0.045]"
          : "border-white/[0.06] bg-white/[0.015] hover:border-white/[0.11] hover:bg-white/[0.025]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={cn(
              "text-xs font-medium",
              selected
                ? "text-white/80"
                : "text-white/50",
            )}
          >
            {title}
          </p>

          <p className="mt-1 text-[9px] text-white/20">
            {description}
          </p>
        </div>

        <div
          className={cn(
            "flex h-4 w-4 items-center justify-center rounded-full border",
            selected
              ? "border-violet-400 bg-violet-500"
              : "border-white/15",
          )}
        >
          {selected && (
            <Check className="h-2.5 w-2.5 text-white" />
          )}
        </div>
      </div>

      <div className="mt-7 flex items-end gap-1.5">
        <span className="text-2xl font-medium tracking-[-0.05em] text-white/75">
          {price}
        </span>

        <span className="mb-0.5 text-[9px] text-white/20">
          {suffix}
        </span>
      </div>

      {badge && (
        <span className="mt-4 inline-flex rounded-full bg-emerald-400/[0.05] px-2.5 py-1 text-[8px] font-medium text-emerald-300/60">
          {badge}
        </span>
      )}
    </button>
  );
}

function SectionHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-[13px] font-medium text-white/70">
          {title}
        </h2>

        <p className="mt-1.5 text-[10px] text-white/20">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

function TableLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="text-[9px] font-medium uppercase tracking-[0.08em] text-white/15">
      {children}
    </span>
  );
}