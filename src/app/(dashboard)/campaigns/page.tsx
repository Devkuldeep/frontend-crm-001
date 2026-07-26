import { Suspense, ViewTransition } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Megaphone,
  Plus,
  Send,
  Users,
} from "lucide-react";

import { MockAPI } from "@/lib/api/mock-client";

async function CampaignsList() {
  const response = await MockAPI.getCampaigns();

  return (
    <div className="grid grid-flow-dense gap-4 md:grid-cols-2 xl:grid-cols-3">
      {response.data.map((campaign) => {
        const openRate = campaign.sentCount
          ? Math.round(
              (campaign.openCount / campaign.sentCount) * 100,
            )
          : 0;

        const replyRate = campaign.sentCount
          ? Math.round(
              (campaign.replyCount / campaign.sentCount) * 100,
            )
          : 0;

        return (
          <article
            key={campaign.id}
            className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.13] hover:bg-[#0e0e0e]"
          >
            {/* Hover ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/0 blur-[90px] transition-all duration-700 group-hover:bg-violet-500/[0.07]"
            />

            <div className="relative flex flex-1 flex-col p-6">
              {/* Top */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] transition-all duration-500 group-hover:scale-105 group-hover:bg-white/[0.055]">
                  <Megaphone
                    strokeWidth={1.6}
                    className="h-4 w-4 text-white/40 transition-colors group-hover:text-white/70"
                  />
                </div>

                <CampaignStatus status={campaign.status} />
              </div>

              {/* Information */}
              <div className="mt-7">
                <h2 className="text-lg font-medium tracking-[-0.035em] text-white/80 transition-colors group-hover:text-white">
                  {campaign.name}
                </h2>

                <div className="mt-2 flex items-center gap-2 text-[11px] text-white/25">
                  <Users className="h-3 w-3 shrink-0" />

                  <p className="truncate">
                    {campaign.targetAudience}
                  </p>
                </div>
              </div>

              {/* Performance */}
              <div className="mt-8 grid grid-cols-3 divide-x divide-white/[0.06] rounded-2xl border border-white/[0.06] bg-white/[0.018] py-4">
                <Metric
                  label="Sent"
                  value={campaign.sentCount.toLocaleString()}
                />

                <Metric
                  label="Open"
                  value={`${openRate}%`}
                />

                <Metric
                  label="Reply"
                  value={`${replyRate}%`}
                />
              </div>

              {/* Reply performance */}
              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-white/20">
                    Reply performance
                  </p>

                  <span className="text-[10px] tabular-nums text-white/30">
                    {replyRate}%
                  </span>
                </div>

                <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-white/45 transition-all duration-700"
                    style={{
                      width: `${Math.min(
                        Math.max(replyRate, 0),
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between pt-8">
                <div className="flex items-center gap-2 text-[10px] text-white/20">
                  <Send className="h-3 w-3" />

                  {campaign.sentCount.toLocaleString()} delivered
                </div>

                <Link
                  href={`/campaigns/${campaign.id}`}
                  className="group/action flex items-center gap-1.5 text-[11px] font-medium text-white/30 transition-colors hover:text-white"
                >
                  Analytics

                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/action:translate-x-1" />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="px-3 text-center">
      <p className="text-[9px] text-white/20">
        {label}
      </p>

      <p className="mt-2 text-lg font-medium tracking-[-0.04em] tabular-nums text-white/70">
        {value}
      </p>
    </div>
  );
}

function CampaignStatus({
  status,
}: {
  status: string;
}) {
  const styles: Record<
    string,
    {
      dot: string;
      text: string;
      background: string;
    }
  > = {
    Active: {
      dot: "bg-emerald-400",
      text: "text-emerald-300/70",
      background: "bg-emerald-400/[0.06]",
    },

    Completed: {
      dot: "bg-white/35",
      text: "text-white/35",
      background: "bg-white/[0.035]",
    },

    Scheduled: {
      dot: "bg-amber-400",
      text: "text-amber-300/70",
      background: "bg-amber-400/[0.06]",
    },

    Draft: {
      dot: "bg-violet-400",
      text: "text-violet-300/70",
      background: "bg-violet-400/[0.06]",
    },
  };

  const style = styles[status] ?? {
    dot: "bg-white/35",
    text: "text-white/35",
    background: "bg-white/[0.035]",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[9px] font-medium ${style.background} ${style.text}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
      />

      {status}
    </span>
  );
}

function CampaignsSkeleton() {
  return (
    <div className="grid grid-flow-dense gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="min-h-[360px] animate-pulse rounded-[1.75rem] border border-white/[0.06] bg-[#0c0c0c] p-6"
        >
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 rounded-xl bg-white/[0.05]" />

            <div className="h-6 w-20 rounded-full bg-white/[0.04]" />
          </div>

          <div className="mt-8 h-4 w-2/3 rounded-full bg-white/[0.06]" />

          <div className="mt-3 h-2.5 w-1/2 rounded-full bg-white/[0.035]" />

          <div className="mt-8 grid h-[72px] grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.05]">
            {[1, 2, 3].map((metric) => (
              <div
                key={metric}
                className="bg-[#0c0c0c] p-4"
              >
                <div className="mx-auto h-2 w-8 rounded-full bg-white/[0.035]" />

                <div className="mx-auto mt-3 h-4 w-10 rounded-full bg-white/[0.055]" />
              </div>
            ))}
          </div>

          <div className="mt-8 h-1 w-full rounded-full bg-white/[0.04]" />
        </div>
      ))}
    </div>
  );
}

export default function CampaignsPage() {
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
          <div className="absolute right-[3%] top-[-300px] h-[650px] w-[650px] rounded-full bg-violet-500/[0.04] blur-[170px]" />

          <div className="absolute bottom-[10%] left-[15%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.02] blur-[150px]" />

          <div
            className="absolute inset-0 opacity-[0.012]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 50%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 md:py-10 lg:px-8 xl:px-10">
          {/* Header */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
                Campaigns
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/30">
                Build personalized outreach, monitor engagement, and turn
                campaigns into conversations.
              </p>
            </div>

            <Link
              href="/campaigns/create"
              transitionTypes={["nav-forward"]}
              className="group flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-white px-5 text-xs font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/90"
            >
              <Plus className="h-3.5 w-3.5" />

              Create campaign
            </Link>
          </div>

          {/* Overview */}
          <div className="my-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-white/[0.05] py-4">
            <OverviewItem
              icon={Megaphone}
              text="AI personalized outreach"
            />

            <OverviewItem
              icon={Users}
              text="Audience targeting"
            />

            <OverviewItem
              icon={CalendarDays}
              text="Automated scheduling"
            />
          </div>

          {/* Campaigns */}
          <Suspense
            fallback={
              <ViewTransition exit="slide-down">
                <CampaignsSkeleton />
              </ViewTransition>
            }
          >
            <ViewTransition
              enter="slide-up"
              default="none"
            >
              <CampaignsList />
            </ViewTransition>
          </Suspense>
        </div>
      </div>
    </ViewTransition>
  );
}

function OverviewItem({
  icon: Icon,
  text,
}: {
  icon: typeof Megaphone;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[10px] text-white/20">
      <Icon
        strokeWidth={1.6}
        className="h-3.5 w-3.5"
      />

      {text}
    </div>
  );
}