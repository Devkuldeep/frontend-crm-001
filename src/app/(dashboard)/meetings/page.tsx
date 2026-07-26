import { Suspense, ViewTransition } from "react";
import {
  CalendarDays,
  Clock3,
  Copy,
  ExternalLink,
  Plus,
  UserRound,
  Video,
} from "lucide-react";

import { MockAPI } from "@/lib/api/mock-client";

async function MeetingsList() {
  const response = await MockAPI.getMeetings();

  if (!response.data.length) {
    return <EmptyMeetings />;
  }

  return (
    <div className="grid grid-flow-dense gap-4 md:grid-cols-2 xl:grid-cols-3">
      {response.data.map((meeting) => {
        const date = new Date(meeting.scheduledAt);

        const day = date.toLocaleDateString(undefined, {
          day: "2-digit",
        });

        const month = date.toLocaleDateString(undefined, {
          month: "short",
        });

        const weekday = date.toLocaleDateString(undefined, {
          weekday: "short",
        });

        const time = date.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
        });

        return (
          <article
            key={meeting.id}
            className="group relative flex min-h-[370px] flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-[#0e0e0e]"
          >
            {/* Ambient hover */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/0 blur-[100px] transition-all duration-700 group-hover:bg-violet-500/[0.055]"
            />

            <div className="relative flex flex-1 flex-col p-6">
              {/* Top */}
              <div className="flex items-start justify-between gap-5">
                {/* Date */}
                <div className="flex h-[66px] w-[66px] shrink-0 flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025] transition-all duration-500 group-hover:scale-[1.03] group-hover:bg-white/[0.04]">
                  <span className="text-[9px] font-medium uppercase tracking-[0.08em] text-white/25">
                    {month}
                  </span>

                  <span className="mt-0.5 text-xl font-medium tracking-[-0.05em] text-white/75">
                    {day}
                  </span>

                  <span className="text-[8px] text-white/20">
                    {weekday}
                  </span>
                </div>

                <MeetingStatus status={meeting.status} />
              </div>

              {/* Meeting information */}
              <div className="mt-7">
                <h2 className="line-clamp-2 text-lg font-medium leading-6 tracking-[-0.035em] text-white/80 transition-colors group-hover:text-white">
                  {meeting.title}
                </h2>

                <div className="mt-3 flex items-center gap-2 text-[11px] text-white/30">
                  <UserRound
                    strokeWidth={1.6}
                    className="h-3.5 w-3.5"
                  />

                  <span className="truncate">
                    {meeting.leadName}
                  </span>
                </div>
              </div>

              {/* Schedule */}
              <div className="mt-6 grid grid-cols-2 divide-x divide-white/[0.06] rounded-2xl border border-white/[0.06] bg-white/[0.018] py-4">
                <div className="px-4">
                  <p className="text-[9px] text-white/20">
                    Time
                  </p>

                  <p className="mt-2 text-xs font-medium text-white/55">
                    {time}
                  </p>
                </div>

                <div className="px-4">
                  <p className="text-[9px] text-white/20">
                    Duration
                  </p>

                  <div className="mt-2 flex items-center gap-1.5">
                    <Clock3 className="h-3 w-3 text-white/20" />

                    <p className="text-xs font-medium text-white/55">
                      {meeting.durationMinutes} min
                    </p>
                  </div>
                </div>
              </div>

              {/* Meeting link */}
              {meeting.meetingLink && (
                <a
                  href={meeting.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-4 flex h-10 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.018] px-3.5 transition-all duration-300 hover:border-white/[0.11] hover:bg-white/[0.04]"
                >
                  <Video
                    strokeWidth={1.6}
                    className="h-3.5 w-3.5 shrink-0 text-white/25 transition-colors group-hover/link:text-violet-300/70"
                  />

                  <span className="min-w-0 flex-1 truncate text-[10px] text-white/25 transition-colors group-hover/link:text-white/50">
                    {meeting.meetingLink}
                  </span>

                  <ExternalLink className="h-3 w-3 shrink-0 text-white/15 transition-colors group-hover/link:text-white/40" />
                </a>
              )}

              {/* Actions */}
              <div className="mt-auto pt-7">
                {meeting.status === "Scheduled" ? (
                  <div className="flex gap-2">
                    {meeting.meetingLink ? (
                      <a
                        href={meeting.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-white text-[11px] font-medium text-black transition-all duration-300 hover:scale-[1.01] hover:bg-white/90"
                      >
                        <Video
                          strokeWidth={1.8}
                          className="h-3.5 w-3.5"
                        />

                        Join meeting
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="flex h-10 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-white/50 text-[11px] font-medium text-black/60"
                      >
                        <Video className="h-3.5 w-3.5" />

                        No meeting link
                      </button>
                    )}

                    {meeting.meetingLink && (
                      <button
                        type="button"
                        aria-label="Copy meeting link"
                        title="Copy meeting link"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-white/30 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.055] hover:text-white"
                      >
                        <Copy
                          strokeWidth={1.7}
                          className="h-3.5 w-3.5"
                        />
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    className="flex h-10 w-full items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-[11px] font-medium text-white/40 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.055] hover:text-white"
                  >
                    View meeting notes
                  </button>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function MeetingStatus({
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
    Scheduled: {
      dot: "bg-violet-400",
      text: "text-violet-300/70",
      background: "bg-violet-400/[0.06]",
    },

    Completed: {
      dot: "bg-emerald-400",
      text: "text-emerald-300/70",
      background: "bg-emerald-400/[0.06]",
    },

    Canceled: {
      dot: "bg-red-400",
      text: "text-red-300/60",
      background: "bg-red-400/[0.06]",
    },
  };

  const style = styles[status] ?? {
    dot: "bg-white/40",
    text: "text-white/40",
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

function MeetingsSkeleton() {
  return (
    <div className="grid grid-flow-dense gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="min-h-[370px] animate-pulse rounded-[1.75rem] border border-white/[0.06] bg-[#0c0c0c] p-6"
        >
          <div className="flex justify-between">
            <div className="h-[66px] w-[66px] rounded-2xl bg-white/[0.05]" />

            <div className="h-6 w-20 rounded-full bg-white/[0.04]" />
          </div>

          <div className="mt-8 h-4 w-3/4 rounded-full bg-white/[0.06]" />

          <div className="mt-3 h-2.5 w-1/3 rounded-full bg-white/[0.035]" />

          <div className="mt-7 h-[70px] rounded-2xl bg-white/[0.025]" />

          <div className="mt-4 h-10 rounded-xl bg-white/[0.025]" />

          <div className="mt-7 h-10 rounded-xl bg-white/[0.05]" />
        </div>
      ))}
    </div>
  );
}

function EmptyMeetings() {
  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-white/[0.08] bg-white/[0.012] px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025]">
        <CalendarDays
          strokeWidth={1.5}
          className="h-5 w-5 text-white/25"
        />
      </div>

      <h2 className="mt-5 text-sm font-medium text-white/70">
        No meetings scheduled
      </h2>

      <p className="mt-2 max-w-sm text-[11px] leading-5 text-white/25">
        Schedule a meeting with a lead or let your outreach workflow book
        one automatically.
      </p>

      <button
        type="button"
        className="mt-6 flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[11px] font-medium text-black transition-all hover:scale-[1.02] hover:bg-white/90"
      >
        <Plus className="h-3.5 w-3.5" />

        Schedule meeting
      </button>
    </div>
  );
}

export default function MeetingsPage() {
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
          <div className="absolute right-[4%] top-[-300px] h-[650px] w-[650px] rounded-full bg-violet-500/[0.04] blur-[170px]" />

          <div className="absolute bottom-[10%] left-[10%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.018] blur-[150px]" />

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
                Meetings
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/30">
                Manage scheduled calls, product demos, and follow-ups from
                your outreach pipeline.
              </p>
            </div>

            <button
              type="button"
              className="group flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-white px-5 text-xs font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/90"
            >
              <Plus className="h-3.5 w-3.5" />

              Schedule meeting
            </button>
          </div>

          {/* Navigation */}
          <div className="my-8 border-b border-white/[0.06]">
            <div className="flex items-center gap-6 overflow-x-auto">
              <MeetingTab active>
                Upcoming
              </MeetingTab>

              <MeetingTab>
                Past
              </MeetingTab>

              <MeetingTab>
                Canceled
              </MeetingTab>
            </div>
          </div>

          {/* Meetings */}
          <Suspense
            fallback={
              <ViewTransition exit="slide-down">
                <MeetingsSkeleton />
              </ViewTransition>
            }
          >
            <ViewTransition
              enter="slide-up"
              default="none"
            >
              <MeetingsList />
            </ViewTransition>
          </Suspense>
        </div>
      </div>
    </ViewTransition>
  );
}

function MeetingTab({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`relative shrink-0 pb-3 text-[11px] font-medium transition-colors duration-300 ${
        active
          ? "text-white/80"
          : "text-white/25 hover:text-white/60"
      }`}
    >
      {children}

      {active && (
        <span className="absolute inset-x-0 bottom-[-1px] h-px bg-white" />
      )}
    </button>
  );
}