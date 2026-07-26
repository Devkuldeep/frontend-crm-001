"use client";

import { useEffect, useMemo, useState } from "react";
import { ViewTransition } from "react";
import {
  Activity,
  ArrowUpRight,
  CircleDollarSign,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { MockAPI } from "@/lib/api/mock-client";
import { AnalyticsData } from "@/lib/types/api";

const CHART_COLORS = [
  "#8b5cf6",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
];

const tooltipStyle = {
  backgroundColor: "#111111",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
  color: "#ffffff",
  fontSize: "11px",
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    MockAPI.getAnalytics().then(setData);
  }, []);

  const metrics = useMemo(() => {
    if (!data) return null;

    const latestRevenue =
      data.revenueTracking[data.revenueTracking.length - 1];

    const currentRevenue = latestRevenue?.revenue ?? 0;
    const targetRevenue = latestRevenue?.target ?? 0;

    const pipelineTotal = data.pipelineOverview.reduce(
      (total, item) => total + item.value,
      0,
    );

    const totalLeads = data.leadStatistics.reduce(
      (total, item) => total + item.count,
      0,
    );

    const targetProgress = targetRevenue
      ? Math.min((currentRevenue / targetRevenue) * 100, 100)
      : 0;

    return {
      currentRevenue,
      targetRevenue,
      pipelineTotal,
      totalLeads,
      targetProgress,
    };
  }, [data]);

  if (!data || !metrics) {
    return <AnalyticsSkeleton />;
  }

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
          <div className="absolute right-[-200px] top-[-350px] h-[750px] w-[750px] rounded-full bg-violet-500/[0.045] blur-[190px]" />

          <div className="absolute bottom-[10%] left-[-150px] h-[500px] w-[500px] rounded-full bg-blue-500/[0.018] blur-[170px]" />

          <div
            className="absolute inset-0 opacity-[0.012]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 48%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 md:py-10 lg:px-8 xl:px-10">
          {/* Header */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
                Analytics
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/30">
                Understand revenue, pipeline health, campaign engagement,
                and where your strongest leads are coming from.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-white/25">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              Analytics up to date
            </div>
          </div>

          {/* KPI Strip */}
          <div className="mt-9 grid grid-flow-dense gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Current revenue"
              value={`$${metrics.currentRevenue.toLocaleString()}`}
              description={`$${metrics.targetRevenue.toLocaleString()} target`}
              icon={CircleDollarSign}
              accent="violet"
            />

            <MetricCard
              title="Pipeline value"
              value={`$${metrics.pipelineTotal.toLocaleString()}`}
              description={`${data.pipelineOverview.length} pipeline stages`}
              icon={Target}
              accent="blue"
            />

            <MetricCard
              title="Total leads"
              value={metrics.totalLeads.toLocaleString()}
              description={`${data.leadStatistics.length} acquisition sources`}
              icon={Users}
              accent="emerald"
            />

            <MetricCard
              title="Active campaigns"
              value={data.campaignPerformance.length.toLocaleString()}
              description="Currently tracked"
              icon={Activity}
              accent="amber"
            />
          </div>

          {/* Revenue */}
          <section className="mt-4 overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c]">
            <ChartHeader
              title="Revenue performance"
              description="Revenue compared with your monthly target."
            >
              <div className="hidden items-center gap-5 sm:flex">
                <LegendItem color="bg-violet-400" label="Revenue" />
                <LegendItem color="bg-white/20" label="Target" />
              </div>
            </ChartHeader>

            <div className="grid lg:grid-cols-[1fr_240px]">
              <div className="min-w-0 px-2 pb-5 pt-4 sm:px-5">
                <div className="h-[330px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data.revenueTracking}
                      margin={{
                        top: 20,
                        right: 10,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="revenueGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.28}
                          />

                          <stop
                            offset="100%"
                            stopColor="#8b5cf6"
                            stopOpacity={0}
                          />
                        </linearGradient>

                        <linearGradient
                          id="targetGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#ffffff"
                            stopOpacity={0.06}
                          />

                          <stop
                            offset="100%"
                            stopColor="#ffffff"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        vertical={false}
                        stroke="rgba(255,255,255,0.045)"
                        strokeDasharray="4 6"
                      />

                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "rgba(255,255,255,0.22)",
                          fontSize: 10,
                        }}
                        dy={10}
                      />

                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        width={55}
                        tick={{
                          fill: "rgba(255,255,255,0.22)",
                          fontSize: 10,
                        }}
                        tickFormatter={(value) =>
                          `$${formatCompact(value)}`
                        }
                      />

                      <Tooltip
                        cursor={{
                          stroke: "rgba(255,255,255,0.08)",
                          strokeWidth: 1,
                        }}
                        contentStyle={tooltipStyle}
                        labelStyle={{
                          color: "rgba(255,255,255,0.4)",
                          marginBottom: 8,
                        }}
                        formatter={(value) => [
                          `$${Number(value).toLocaleString()}`,
                        ]}
                      />

                      <Area
                        type="monotone"
                        dataKey="target"
                        stroke="rgba(255,255,255,0.22)"
                        strokeWidth={1.5}
                        fill="url(#targetGradient)"
                        fillOpacity={1}
                        dot={false}
                        activeDot={{
                          r: 4,
                          fill: "#ffffff",
                          strokeWidth: 0,
                        }}
                      />

                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        fill="url(#revenueGradient)"
                        fillOpacity={1}
                        dot={false}
                        activeDot={{
                          r: 4,
                          fill: "#a78bfa",
                          strokeWidth: 0,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Revenue Summary */}
              <div className="border-t border-white/[0.06] p-6 lg:border-l lg:border-t-0">
                <p className="text-[9px] uppercase tracking-[0.12em] text-white/20">
                  Target progress
                </p>

                <div className="mt-4 flex items-end gap-2">
                  <span className="text-3xl font-medium tracking-[-0.05em] text-white/85">
                    {metrics.targetProgress.toFixed(0)}%
                  </span>

                  <TrendingUp className="mb-1 h-4 w-4 text-emerald-400/70" />
                </div>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                  <div
                    className="h-full rounded-full bg-violet-400 transition-all duration-1000"
                    style={{
                      width: `${metrics.targetProgress}%`,
                    }}
                  />
                </div>

                <div className="mt-8 space-y-5">
                  <RevenueValue
                    label="Revenue"
                    value={metrics.currentRevenue}
                  />

                  <RevenueValue
                    label="Target"
                    value={metrics.targetRevenue}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Secondary Charts */}
          <div className="mt-4 grid grid-flow-dense gap-4 xl:grid-cols-12">
            {/* Pipeline */}
            <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] xl:col-span-5">
              <ChartHeader
                title="Pipeline"
                description="Value distributed across deal stages."
              />

              <div className="px-3 pb-5 pt-2 sm:px-5">
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.pipelineOverview}
                      layout="vertical"
                      margin={{
                        top: 10,
                        right: 20,
                        left: 10,
                        bottom: 10,
                      }}
                    >
                      <CartesianGrid
                        horizontal={false}
                        stroke="rgba(255,255,255,0.04)"
                        strokeDasharray="4 6"
                      />

                      <XAxis
                        type="number"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "rgba(255,255,255,0.2)",
                          fontSize: 9,
                        }}
                        tickFormatter={formatCompact}
                      />

                      <YAxis
                        type="category"
                        dataKey="stage"
                        axisLine={false}
                        tickLine={false}
                        width={75}
                        tick={{
                          fill: "rgba(255,255,255,0.3)",
                          fontSize: 9,
                        }}
                      />

                      <Tooltip
                        cursor={{
                          fill: "rgba(255,255,255,0.018)",
                        }}
                        contentStyle={tooltipStyle}
                        formatter={(value) => [
                          `$${Number(value).toLocaleString()}`,
                          "Pipeline",
                        ]}
                      />

                      <Bar
                        dataKey="value"
                        fill="#8b5cf6"
                        radius={[0, 5, 5, 0]}
                        barSize={14}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Campaign Performance */}
            <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] xl:col-span-7">
              <ChartHeader
                title="Campaign engagement"
                description="Compare sends, opens, and replies."
              >
                <div className="hidden items-center gap-4 sm:flex">
                  <LegendItem
                    color="bg-white/15"
                    label="Sent"
                  />

                  <LegendItem
                    color="bg-violet-400"
                    label="Opened"
                  />

                  <LegendItem
                    color="bg-emerald-400"
                    label="Replied"
                  />
                </div>
              </ChartHeader>

              <div className="px-3 pb-5 pt-2 sm:px-5">
                <div className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.campaignPerformance}
                      margin={{
                        top: 15,
                        right: 10,
                        left: -10,
                        bottom: 5,
                      }}
                      barGap={3}
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke="rgba(255,255,255,0.04)"
                        strokeDasharray="4 6"
                      />

                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "rgba(255,255,255,0.22)",
                          fontSize: 9,
                        }}
                        dy={8}
                      />

                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "rgba(255,255,255,0.2)",
                          fontSize: 9,
                        }}
                      />

                      <Tooltip
                        cursor={{
                          fill: "rgba(255,255,255,0.018)",
                        }}
                        contentStyle={tooltipStyle}
                      />

                      <Bar
                        dataKey="sent"
                        fill="rgba(255,255,255,0.12)"
                        radius={[4, 4, 0, 0]}
                        barSize={12}
                      />

                      <Bar
                        dataKey="opened"
                        fill="#8b5cf6"
                        radius={[4, 4, 0, 0]}
                        barSize={12}
                      />

                      <Bar
                        dataKey="replied"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        barSize={12}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Lead Sources */}
            <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] xl:col-span-5">
              <ChartHeader
                title="Lead sources"
                description="Where your pipeline originates."
              />

              <div className="grid min-h-[330px] sm:grid-cols-[1fr_170px]">
                <div className="relative min-h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.leadStatistics}
                        cx="50%"
                        cy="50%"
                        innerRadius={67}
                        outerRadius={94}
                        paddingAngle={3}
                        dataKey="count"
                        nameKey="source"
                        stroke="none"
                      >
                        {data.leadStatistics.map((_, index) => (
                          <Cell
                            key={index}
                            fill={
                              CHART_COLORS[
                                index % CHART_COLORS.length
                              ]
                            }
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        contentStyle={tooltipStyle}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-medium tracking-[-0.05em] text-white/80">
                      {metrics.totalLeads.toLocaleString()}
                    </span>

                    <span className="mt-1 text-[9px] text-white/20">
                      total leads
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-4 border-t border-white/[0.06] p-5 sm:border-l sm:border-t-0">
                  {data.leadStatistics.map((source, index) => {
                    const percentage = metrics.totalLeads
                      ? (source.count / metrics.totalLeads) * 100
                      : 0;

                    return (
                      <div
                        key={source.source}
                        className="flex items-center gap-3"
                      >
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{
                            backgroundColor:
                              CHART_COLORS[
                                index % CHART_COLORS.length
                              ],
                          }}
                        />

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[10px] text-white/40">
                            {source.source}
                          </p>
                        </div>

                        <span className="text-[9px] font-medium text-white/25">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* AI Insight */}
            <section className="group relative min-h-[330px] overflow-hidden rounded-[1.75rem] border border-violet-400/[0.08] bg-[#0c0c0c] xl:col-span-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-violet-500/[0.08] blur-[130px] transition-all duration-700 group-hover:bg-violet-500/[0.11]"
              />

              <div className="relative flex h-full flex-col p-7 sm:p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/[0.1] bg-violet-400/[0.045]">
                  <Sparkles className="h-4 w-4 text-violet-300/60" />
                </div>

                <div className="mt-auto pt-16">
                  <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-violet-300/35">
                    AI insight
                  </p>

                  <h2 className="mt-4 max-w-xl text-xl font-medium leading-7 tracking-[-0.04em] text-white/80 sm:text-2xl sm:leading-8">
                    Your analytics are more useful when they tell you
                    where to focus next.
                  </h2>

                  <p className="mt-4 max-w-xl text-xs leading-6 text-white/30">
                    Use campaign engagement, pipeline distribution, and
                    acquisition data together to identify which audience
                    segments are creating the strongest sales momentum.
                  </p>

                  <button
                    type="button"
                    className="mt-7 flex h-9 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 text-[10px] font-medium text-white/40 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white"
                  >
                    View AI analysis

                    <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  accent,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  accent: "violet" | "blue" | "emerald" | "amber";
}) {
  const accents = {
    violet: "text-violet-300/60 bg-violet-400/[0.05]",
    blue: "text-blue-300/60 bg-blue-400/[0.05]",
    emerald: "text-emerald-300/60 bg-emerald-400/[0.05]",
    amber: "text-amber-300/60 bg-amber-400/[0.05]",
  };

  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-[#0c0c0c] p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-[#0e0e0e]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium text-white/25">
            {title}
          </p>

          <p className="mt-5 text-2xl font-medium tracking-[-0.05em] text-white/85">
            {value}
          </p>

          <p className="mt-2 text-[9px] text-white/20">
            {description}
          </p>
        </div>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accents[accent]}`}
        >
          <Icon
            strokeWidth={1.6}
            className="h-4 w-4"
          />
        </div>
      </div>
    </article>
  );
}

function ChartHeader({
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

function LegendItem({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-1.5 w-1.5 rounded-full ${color}`} />

      <span className="text-[9px] text-white/25">
        {label}
      </span>
    </div>
  );
}

function RevenueValue({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div>
      <p className="text-[9px] text-white/20">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-medium text-white/55">
        ${value.toLocaleString()}
      </p>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="min-h-screen bg-[#080808] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] animate-pulse">
        <div className="h-9 w-44 rounded-lg bg-white/[0.05]" />

        <div className="mt-3 h-3 w-96 max-w-full rounded bg-white/[0.025]" />

        <div className="mt-9 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[135px] rounded-[1.5rem] border border-white/[0.05] bg-[#0c0c0c]"
            />
          ))}
        </div>

        <div className="mt-4 h-[430px] rounded-[1.75rem] border border-white/[0.05] bg-[#0c0c0c]" />

        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          <div className="h-[390px] rounded-[1.75rem] border border-white/[0.05] bg-[#0c0c0c]" />

          <div className="h-[390px] rounded-[1.75rem] border border-white/[0.05] bg-[#0c0c0c]" />
        </div>
      </div>
    </div>
  );
}

function formatCompact(value: number) {
  return Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}