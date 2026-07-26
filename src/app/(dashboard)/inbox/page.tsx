import { Suspense, ViewTransition } from "react";
import {
  Archive,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Inbox as InboxIcon,
  RefreshCw,
  Reply,
  Search,
  Sparkles,
} from "lucide-react";

import { MockAPI } from "@/lib/api/mock-client";

async function InboxList() {
  const response = await MockAPI.getInbox();

  if (!response.data.length) {
    return <EmptyInbox />;
  }

  return (
    <div className="space-y-3">
      {response.data.map((msg) => (
        <article
          key={msg.id}
          className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] transition-all duration-500 hover:border-white/[0.12] hover:bg-[#0e0e0e]"
        >
          {/* Action indicator */}
          {msg.actionRequired && (
            <div className="absolute bottom-7 left-0 top-7 w-[2px] rounded-r-full bg-violet-400/80" />
          )}

          {/* Ambient hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-violet-500/0 blur-[100px] transition-all duration-700 group-hover:bg-violet-500/[0.045]"
          />

          <div className="relative">
            {/* Message Header */}
            <div className="flex flex-col gap-5 px-5 pb-5 pt-6 sm:flex-row sm:items-start sm:justify-between sm:px-7">
              <div className="flex min-w-0 items-start gap-4">
                <SenderAvatar name={msg.senderName} />

                <div className="min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h2 className="truncate text-[14px] font-medium text-white/80 transition-colors group-hover:text-white">
                      {msg.senderName}
                    </h2>

                    {msg.actionRequired && (
                      <span className="flex items-center gap-1.5 text-[9px] font-medium text-violet-300/60">
                        <span className="h-1 w-1 rounded-full bg-violet-400" />
                        Action required
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 truncate text-[11px] text-white/25">
                    {msg.subject}
                  </p>
                </div>
              </div>

              <ClassificationStatus
                classification={msg.classification}
              />
            </div>

            {/* Original message */}
            <div className="px-5 sm:px-7">
              <div className="rounded-2xl border border-white/[0.055] bg-white/[0.018] px-5 py-4">
                <p className="text-[12px] leading-6 text-white/35">
                  &ldquo;{msg.snippet}&rdquo;
                </p>
              </div>
            </div>

            {/* AI Insight */}
            <div className="px-5 py-4 sm:px-7">
              <div className="relative overflow-hidden rounded-2xl border border-violet-400/[0.1] bg-violet-400/[0.025]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-violet-500/[0.05] blur-[70px]"
                />

                <div className="relative p-5">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-300/[0.1] bg-violet-400/[0.05]">
                      <Sparkles
                        strokeWidth={1.6}
                        className="h-3.5 w-3.5 text-violet-300/60"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium text-violet-200/50">
                        AI summary
                      </p>

                      <p className="mt-2 text-[12px] leading-6 text-white/55">
                        {msg.summary}
                      </p>

                      {msg.suggestedReply && (
                        <div className="mt-5 border-t border-violet-300/[0.08] pt-4">
                          <p className="text-[9px] font-medium uppercase tracking-[0.1em] text-white/20">
                            Suggested reply
                          </p>

                          <p className="mt-2.5 max-w-3xl text-[11px] leading-5 text-white/35">
                            {msg.suggestedReply}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 border-t border-white/[0.055] px-5 py-4 sm:flex-row sm:items-center sm:px-7">
              <button
                type="button"
                className="group/action flex h-9 items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 text-[11px] font-medium text-white/45 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.055] hover:text-white"
              >
                <Reply
                  strokeWidth={1.7}
                  className="h-3.5 w-3.5"
                />

                Reply

                <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover/action:translate-x-0.5 group-hover/action:opacity-50" />
              </button>

              {msg.classification === "Interested" && (
                <button
                  type="button"
                  className="flex h-9 items-center justify-center gap-2 rounded-xl bg-white px-4 text-[11px] font-medium text-black transition-all duration-300 hover:scale-[1.015] hover:bg-white/90"
                >
                  <CalendarDays
                    strokeWidth={1.8}
                    className="h-3.5 w-3.5"
                  />

                  Schedule meeting
                </button>
              )}

              <button
                type="button"
                className="flex h-9 items-center justify-center gap-2 rounded-xl px-3 text-[10px] font-medium text-white/20 transition-all duration-300 hover:bg-white/[0.035] hover:text-white/60 sm:ml-auto"
              >
                <Archive
                  strokeWidth={1.7}
                  className="h-3.5 w-3.5"
                />

                Archive
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function SenderAvatar({
  name,
}: {
  name: string;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-[10px] font-medium text-white/40 transition-all duration-500 group-hover:scale-105 group-hover:bg-white/[0.055] group-hover:text-white/70">
      {initials}
    </div>
  );
}

function ClassificationStatus({
  classification,
}: {
  classification: string;
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

    "Not Interested": {
      dot: "bg-red-400",
      text: "text-red-300/60",
      background: "bg-red-400/[0.06]",
    },

    Question: {
      dot: "bg-blue-400",
      text: "text-blue-300/70",
      background: "bg-blue-400/[0.06]",
    },
  };

  const style = styles[classification] ?? {
    dot: "bg-white/40",
    text: "text-white/40",
    background: "bg-white/[0.035]",
  };

  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-2.5 py-1.5 text-[9px] font-medium ${style.background} ${style.text}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
      />

      {classification}
    </span>
  );
}

function InboxSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-[#0c0c0c]"
        >
          <div className="flex items-start gap-4 px-7 pb-5 pt-6">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-white/[0.05]" />

            <div className="flex-1">
              <div className="h-3 w-32 rounded-full bg-white/[0.06]" />

              <div className="mt-3 h-2 w-48 rounded-full bg-white/[0.035]" />
            </div>

            <div className="h-6 w-20 rounded-full bg-white/[0.04]" />
          </div>

          <div className="px-7">
            <div className="h-20 rounded-2xl bg-white/[0.025]" />
          </div>

          <div className="px-7 py-4">
            <div className="h-28 rounded-2xl bg-violet-400/[0.025]" />
          </div>

          <div className="flex gap-2 border-t border-white/[0.05] px-7 py-4">
            <div className="h-9 w-24 rounded-xl bg-white/[0.04]" />
            <div className="h-9 w-32 rounded-xl bg-white/[0.04]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyInbox() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-white/[0.08] bg-white/[0.012] px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025]">
        <InboxIcon
          strokeWidth={1.5}
          className="h-5 w-5 text-white/25"
        />
      </div>

      <h2 className="mt-5 text-sm font-medium text-white/70">
        Your inbox is clear
      </h2>

      <p className="mt-2 max-w-sm text-[11px] leading-5 text-white/25">
        New lead responses and AI insights will appear here after your
        campaigns receive replies.
      </p>
    </div>
  );
}

export default function InboxPage() {
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

        <div className="relative mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 md:py-10 lg:px-8 xl:px-10">
          {/* Header */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
                AI Inbox
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/30">
                Review classified responses, understand intent, and move
                conversations forward without reading every thread.
              </p>
            </div>

            <button
              type="button"
              className="group flex h-10 w-fit items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 text-xs font-medium text-white/45 transition-all duration-300 hover:border-white/[0.13] hover:bg-white/[0.05] hover:text-white"
            >
              <RefreshCw
                strokeWidth={1.7}
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180"
              />

              Sync inbox
            </button>
          </div>

          {/* Toolbar */}
          <div className="my-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="group relative flex-1">
              <Search
                strokeWidth={1.7}
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-white/50"
              />

              <input
                type="search"
                placeholder="Search conversations..."
                aria-label="Search conversations"
                className="h-10 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-10 pr-4 text-xs text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:border-white/[0.1] hover:bg-white/[0.035] focus:border-white/[0.14] focus:bg-white/[0.04] focus:ring-4 focus:ring-white/[0.02]"
              />
            </div>

            <button
              type="button"
              className="flex h-10 shrink-0 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 text-[11px] font-medium text-white/35 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />

              Unread

              <ChevronDown className="h-3 w-3 text-white/20" />
            </button>
          </div>

          {/* Inbox */}
          <Suspense
            fallback={
              <ViewTransition exit="slide-down">
                <InboxSkeleton />
              </ViewTransition>
            }
          >
            <ViewTransition
              enter="slide-up"
              default="none"
            >
              <InboxList />
            </ViewTransition>
          </Suspense>
        </div>
      </div>
    </ViewTransition>
  );
}