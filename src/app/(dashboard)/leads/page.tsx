import { Suspense, ViewTransition } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Upload,
} from "lucide-react";

import { MockAPI } from "@/lib/api/mock-client";
import { Button } from "@/components/ui/button";

async function LeadsTable() {
  const response = await MockAPI.getLeads();

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-[#0c0c0c]">
      {/* Table header information */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <h2 className="text-[13px] font-medium text-white/70">
            All leads
          </h2>

          <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2 py-0.5 text-[9px] font-medium tabular-nums text-white/25">
            {response.data.length}
          </span>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 text-[10px] text-white/25 transition-colors hover:text-white/60"
        >
          Recently updated

          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* Scroll container */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <TableHeading className="w-[27%]">
                Lead
              </TableHeading>

              <TableHeading className="w-[20%]">
                Company
              </TableHeading>

              <TableHeading>Status</TableHeading>

              <TableHeading className="w-[17%]">
                Score
              </TableHeading>

              <TableHeading>Tags</TableHeading>

              <TableHeading className="w-16">
                <span className="sr-only">Actions</span>
              </TableHeading>
            </tr>
          </thead>

          <tbody>
            {response.data.map((lead) => (
              <tr
                key={lead.id}
                className="group border-b border-white/[0.045] transition-colors duration-300 last:border-b-0 hover:bg-white/[0.018]"
              >
                {/* Lead */}
                <td className="px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3.5">
                    <Avatar
                      firstName={lead.firstName}
                      lastName={lead.lastName}
                    />

                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-white/70 transition-colors group-hover:text-white">
                        {lead.firstName} {lead.lastName}
                      </p>

                      <p className="mt-1 max-w-[220px] truncate text-[10px] text-white/20">
                        {lead.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Company */}
                <td className="px-4 py-4">
                  <p className="max-w-[180px] truncate text-xs text-white/55">
                    {lead.company}
                  </p>

                  <p className="mt-1 max-w-[180px] truncate text-[10px] text-white/20">
                    {lead.position}
                  </p>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <LeadStatus status={lead.status} />
                </td>

                {/* Score */}
                <td className="px-4 py-4">
                  <LeadScore score={lead.score} />
                </td>

                {/* Tags */}
                <td className="px-4 py-4">
                  <div className="flex max-w-[220px] flex-wrap gap-1.5">
                    {lead.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[9px] text-white/25"
                      >
                        {tag}
                      </span>
                    ))}

                    {lead.tags.length > 2 && (
                      <span className="flex items-center px-1 text-[9px] text-white/15">
                        +{lead.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-4 text-right">
                  <button
                    type="button"
                    aria-label={`Actions for ${lead.firstName} ${lead.lastName}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/20 opacity-50 transition-all duration-300 hover:bg-white/[0.06] hover:text-white group-hover:opacity-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/[0.05] px-5 py-4 sm:px-6">
        <p className="text-[10px] text-white/20">
          Showing {response.data.length} leads
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="h-8 rounded-lg border border-white/[0.06] px-3 text-[10px] text-white/20 transition-colors hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <button
            type="button"
            className="h-8 rounded-lg border border-white/[0.06] px-3 text-[10px] text-white/35 transition-colors hover:bg-white/[0.04] hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function TableHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-4 py-3.5 text-left text-[9px] font-medium uppercase tracking-[0.08em] text-white/20 first:pl-6 ${className}`}
    >
      {children}
    </th>
  );
}

function Avatar({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`;

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-[10px] font-medium uppercase text-white/40 transition-colors duration-300 group-hover:bg-white/[0.06] group-hover:text-white/70">
      {initials}
    </div>
  );
}

function LeadStatus({
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
    Interested: {
      dot: "bg-emerald-400",
      text: "text-emerald-300/70",
      background: "bg-emerald-400/[0.06]",
    },

    "Follow-up": {
      dot: "bg-amber-400",
      text: "text-amber-300/70",
      background: "bg-amber-400/[0.06]",
    },

    Contacted: {
      dot: "bg-blue-400",
      text: "text-blue-300/70",
      background: "bg-blue-400/[0.06]",
    },

    "Closed Lost": {
      dot: "bg-red-400",
      text: "text-red-300/60",
      background: "bg-red-400/[0.06]",
    },

    New: {
      dot: "bg-violet-400",
      text: "text-violet-300/70",
      background: "bg-violet-400/[0.06]",
    },
  };

  const style = styles[status] ?? {
    dot: "bg-white/40",
    text: "text-white/40",
    background: "bg-white/[0.04]",
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

function LeadScore({
  score,
}: {
  score: number;
}) {
  return (
    <div className="flex max-w-[150px] items-center gap-3">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-white/45 transition-all duration-500"
          style={{
            width: `${Math.min(Math.max(score, 0), 100)}%`,
          }}
        />
      </div>

      <span className="w-6 text-right text-[10px] tabular-nums text-white/30">
        {score}
      </span>
    </div>
  );
}

function LeadsSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-[#0c0c0c]">
      <div className="flex h-[61px] items-center border-b border-white/[0.06] px-6">
        <div className="h-3 w-24 animate-pulse rounded-full bg-white/[0.06]" />
      </div>

      <div>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="flex h-[72px] animate-pulse items-center gap-5 border-b border-white/[0.045] px-6 last:border-0"
          >
            <div className="h-9 w-9 shrink-0 rounded-xl bg-white/[0.04]" />

            <div className="w-[25%]">
              <div className="h-2.5 w-24 rounded-full bg-white/[0.06]" />

              <div className="mt-2 h-2 w-32 rounded-full bg-white/[0.035]" />
            </div>

            <div className="w-[20%]">
              <div className="h-2.5 w-20 rounded-full bg-white/[0.05]" />

              <div className="mt-2 h-2 w-16 rounded-full bg-white/[0.03]" />
            </div>

            <div className="h-6 w-20 rounded-full bg-white/[0.04]" />

            <div className="ml-auto h-1 w-28 rounded-full bg-white/[0.05]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LeadsPage() {
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
        {/* Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute right-[5%] top-[-280px] h-[600px] w-[600px] rounded-full bg-violet-500/[0.035] blur-[160px]" />

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
          {/* Page header */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
                Leads
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/30">
                Manage prospects, track buying intent, and move the right
                conversations forward.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="group flex h-10 items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 text-xs font-medium text-white/45 transition-all duration-300 hover:border-white/[0.13] hover:bg-white/[0.05] hover:text-white"
              >
                <Upload
                  strokeWidth={1.7}
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                />

                Import CSV
              </button>
            
          <Link href="/leads/create" transitionTypes={["nav-forward"]}>
  <Button className="rounded-full">
    <Plus className="mr-2 h-4 w-4" />
    Add Lead
  </Button>
</Link>
            </div>
          </div>

          {/* Toolbar */}
          <div className="my-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="group relative w-full sm:max-w-[360px]">
              <Search
                strokeWidth={1.7}
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-white/50"
              />

              <input
                type="search"
                placeholder="Search leads..."
                aria-label="Search leads"
                className="h-10 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-10 pr-4 text-xs text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/[0.1] hover:bg-white/[0.035] focus:border-white/[0.14] focus:bg-white/[0.04] focus:ring-4 focus:ring-white/[0.02]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="group flex h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 text-[11px] font-medium text-white/35 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white"
              >
                <Filter
                  strokeWidth={1.7}
                  className="h-3.5 w-3.5"
                />

                Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <Suspense
            fallback={
              <ViewTransition exit="slide-down">
                <LeadsSkeleton />
              </ViewTransition>
            }
          >
            <ViewTransition
              enter="slide-up"
              default="none"
            >
              <LeadsTable />
            </ViewTransition>
          </Suspense>
        </div>
      </div>
    </ViewTransition>
  );
}