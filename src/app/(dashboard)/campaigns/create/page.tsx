"use client";

import { useState } from "react";
import { ViewTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Megaphone,
  RotateCcw,
  Send,
  Sparkles,
  Users,
} from "lucide-react";

import { MockAPI } from "@/lib/api/mock-client";

export default function CreateCampaignPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    targetAudience: "",
    prompt: "",
  });

  const [aiPreview, setAiPreview] = useState("");

  const canGenerate =
    formData.name.trim() &&
    formData.targetAudience.trim() &&
    formData.prompt.trim();

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setLoading(true);

    setTimeout(() => {
      setAiPreview(
        `Subject: Special invitation for ${formData.targetAudience}

Hi {{FirstName}},

I noticed the incredible work you are doing at {{Company}} and wanted to personally reach out.

Our AI-powered CRM was built to help teams create more relevant outreach, manage conversations, and turn qualified leads into meetings without adding more manual work.

I thought this could be especially relevant for your team.

Would you be open to a quick conversation next week?

Best,
{{SenderName}}`,
      );

      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleLaunch = async () => {
    setLoading(true);

    try {
      await MockAPI.createCampaign(formData);
      router.push("/campaigns");
    } finally {
      setLoading(false);
    }
  };

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
          <div className="absolute right-[-100px] top-[-260px] h-[650px] w-[650px] rounded-full bg-violet-500/[0.045] blur-[170px]" />

          <div className="absolute bottom-[-200px] left-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.018] blur-[160px]" />

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
          <div className="flex items-start gap-4">
            <Link
              href="/campaigns"
              transitionTypes={["nav-back"]}
              aria-label="Back to campaigns"
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-white/35 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white"
            >
              <ArrowLeft
                strokeWidth={1.7}
                className="h-4 w-4"
              />
            </Link>

            <div>
              <h1 className="text-2xl font-medium tracking-[-0.045em] text-white sm:text-3xl">
                Create campaign
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/30">
                Define your audience and goal, then let AI create a
                personalized outreach template.
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="my-9 max-w-xl">
            <div className="flex items-center">
              <ProgressStep
                active={step === 1}
                complete={step > 1}
                title="Campaign setup"
              />

              <div className="mx-3 h-px flex-1 bg-white/[0.07]">
                <div
                  className={`h-full bg-white/40 transition-all duration-700 ${
                    step >= 2 ? "w-full" : "w-0"
                  }`}
                />
              </div>

              <ProgressStep
                active={step === 2}
                complete={false}
                title="Review & launch"
              />
            </div>
          </div>

          {step === 1 && (
            <ViewTransition
              enter="fade-in"
              exit="fade-out"
              default="none"
            >
              <div className="grid grid-flow-dense gap-4 xl:grid-cols-12">
                {/* Composer */}
                <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] xl:col-span-7">
                  <div className="border-b border-white/[0.06] px-6 py-5 sm:px-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025]">
                        <Megaphone
                          strokeWidth={1.6}
                          className="h-4 w-4 text-white/35"
                        />
                      </div>

                      <div>
                        <h2 className="text-[13px] font-medium text-white/75">
                          Campaign details
                        </h2>

                        <p className="mt-1 text-[10px] text-white/20">
                          Configure what AI should generate.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 p-6 sm:p-7">
                    <FormField
                      label="Campaign name"
                      description="Only visible inside your workspace."
                    >
                      <input
                        value={formData.name}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            name: event.target.value,
                          })
                        }
                        placeholder="Q4 Tech Founders Outreach"
                        className="h-11 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 text-xs text-white outline-none transition-all duration-300 placeholder:text-white/15 hover:border-white/[0.11] focus:border-white/[0.16] focus:bg-white/[0.04] focus:ring-4 focus:ring-white/[0.02]"
                      />
                    </FormField>

                    <FormField
                      label="Target audience"
                      description="Describe the leads this campaign should target."
                    >
                      <div className="relative">
                        <Users className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/20" />

                        <input
                          value={formData.targetAudience}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              targetAudience: event.target.value,
                            })
                          }
                          placeholder="SaaS founders, startup CTOs, B2B"
                          className="h-11 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-10 pr-4 text-xs text-white outline-none transition-all duration-300 placeholder:text-white/15 hover:border-white/[0.11] focus:border-white/[0.16] focus:bg-white/[0.04] focus:ring-4 focus:ring-white/[0.02]"
                        />
                      </div>
                    </FormField>

                    <FormField
                      label="Campaign context"
                      description="Tell AI what you offer, why it matters, and what action the lead should take."
                    >
                      <div className="relative">
                        <textarea
                          value={formData.prompt}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              prompt: event.target.value,
                            })
                          }
                          placeholder="We're introducing an AI-powered CRM for small sales teams. Focus on reducing manual outreach work and improving reply rates. Ask the lead to book a 15-minute demo."
                          className="min-h-[180px] w-full resize-none rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-4 text-xs leading-6 text-white outline-none transition-all duration-300 placeholder:text-white/15 hover:border-white/[0.11] focus:border-white/[0.16] focus:bg-white/[0.04] focus:ring-4 focus:ring-white/[0.02]"
                        />

                        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 text-[9px] text-white/15">
                          <Sparkles className="h-3 w-3" />
                          AI context
                        </div>
                      </div>
                    </FormField>
                  </div>

                  <div className="flex flex-col-reverse gap-2 border-t border-white/[0.06] px-6 py-4 sm:flex-row sm:justify-end sm:px-7">
                    <button
                      type="button"
                      onClick={() => router.push("/campaigns")}
                      className="h-10 rounded-xl px-4 text-[11px] font-medium text-white/25 transition-all duration-300 hover:bg-white/[0.035] hover:text-white/60"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={loading || !canGenerate}
                      className="group flex h-10 items-center justify-center gap-2 rounded-xl bg-white px-5 text-[11px] font-medium text-black transition-all duration-300 hover:scale-[1.01] hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100"
                    >
                      {loading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5" />
                      )}

                      {loading
                        ? "Generating..."
                        : "Generate preview"}

                      {!loading && (
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                      )}
                    </button>
                  </div>
                </section>

                {/* AI information */}
                <aside className="relative overflow-hidden rounded-[1.75rem] border border-violet-400/[0.08] bg-[#0c0c0c] xl:col-span-5">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-32 -top-32 h-[360px] w-[360px] rounded-full bg-violet-500/[0.07] blur-[110px]"
                  />

                  <div className="relative flex h-full min-h-[420px] flex-col p-7 lg:p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/[0.1] bg-violet-400/[0.045]">
                      <Sparkles
                        strokeWidth={1.6}
                        className="h-4 w-4 text-violet-300/60"
                      />
                    </div>

                    <h2 className="mt-8 max-w-sm text-xl font-medium leading-7 tracking-[-0.04em] text-white/80">
                      Give AI the context it needs to write like your best
                      salesperson.
                    </h2>

                    <p className="mt-4 max-w-sm text-xs leading-6 text-white/30">
                      The generated email can personalize the message using
                      lead information from your CRM while preserving your
                      campaign goal and call to action.
                    </p>

                    <div className="mt-8 space-y-3">
                      <InsightItem>
                        Personalizes copy for each lead
                      </InsightItem>

                      <InsightItem>
                        Uses company and contact context
                      </InsightItem>

                      <InsightItem>
                        Keeps your campaign goal consistent
                      </InsightItem>
                    </div>

                    <div className="mt-auto border-t border-white/[0.06] pt-6">
                      <p className="text-[10px] leading-5 text-white/20">
                        You&apos;ll review the generated template before the
                        campaign is launched.
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </ViewTransition>
          )}

          {step === 2 && (
            <ViewTransition
              enter="slide-up"
              exit="slide-down"
              default="none"
            >
              <div className="grid grid-flow-dense gap-4 xl:grid-cols-12">
                {/* Email Preview */}
                <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] xl:col-span-7">
                  <div className="flex items-center justify-between gap-5 border-b border-white/[0.06] px-6 py-5 sm:px-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-300/[0.1] bg-violet-400/[0.045]">
                        <Sparkles
                          strokeWidth={1.6}
                          className="h-4 w-4 text-violet-300/60"
                        />
                      </div>

                      <div>
                        <h2 className="text-[13px] font-medium text-white/75">
                          Generated email
                        </h2>

                        <p className="mt-1 text-[10px] text-white/20">
                          Review the message before launching.
                        </p>
                      </div>
                    </div>

                    <span className="flex items-center gap-2 rounded-full bg-emerald-400/[0.06] px-2.5 py-1.5 text-[9px] font-medium text-emerald-300/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Ready
                    </span>
                  </div>

                  <div className="p-4 sm:p-6">
                    {/* Email surface */}
                    <div className="overflow-hidden rounded-2xl border border-white/[0.065] bg-[#090909]">
                      <div className="border-b border-white/[0.055] px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-[9px] font-medium text-white/35">
                            AI
                          </div>

                          <div>
                            <p className="text-[10px] text-white/45">
                              CRM Outreach
                            </p>

                            <p className="mt-0.5 text-[9px] text-white/15">
                              Personalized campaign message
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="min-h-[360px] px-5 py-6 sm:px-7">
                        <pre className="whitespace-pre-wrap font-sans text-[12px] leading-7 text-white/45">
                          {aiPreview}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse gap-2 border-t border-white/[0.06] px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={loading}
                      className="flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-[11px] font-medium text-white/30 transition-all hover:bg-white/[0.035] hover:text-white/70 disabled:opacity-40"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Back to edit
                    </button>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={loading}
                        className="flex h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 text-[11px] font-medium text-white/35 transition-all hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-white disabled:opacity-40"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Regenerate
                      </button>

                      <button
                        type="button"
                        onClick={handleLaunch}
                        disabled={loading}
                        className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-white px-5 text-[11px] font-medium text-black transition-all hover:scale-[1.01] hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
                      >
                        {loading ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Send className="h-3.5 w-3.5" />
                        )}

                        {loading
                          ? "Launching..."
                          : "Launch campaign"}
                      </button>
                    </div>
                  </div>
                </section>

                {/* Campaign summary */}
                <aside className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] xl:col-span-5">
                  <div className="border-b border-white/[0.06] px-6 py-5">
                    <h2 className="text-[13px] font-medium text-white/70">
                      Campaign summary
                    </h2>

                    <p className="mt-1 text-[10px] text-white/20">
                      Confirm your configuration before launch.
                    </p>
                  </div>

                  <div className="divide-y divide-white/[0.055] px-6">
                    <SummaryItem
                      label="Campaign"
                      value={formData.name}
                    />

                    <SummaryItem
                      label="Audience"
                      value={formData.targetAudience}
                    />

                    <div className="py-5">
                      <p className="text-[9px] text-white/20">
                        AI context
                      </p>

                      <p className="mt-2 text-[11px] leading-5 text-white/40">
                        {formData.prompt}
                      </p>
                    </div>
                  </div>

                  <div className="m-4 rounded-2xl border border-violet-400/[0.08] bg-violet-400/[0.025] p-5">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300/50" />

                      <p className="text-[10px] leading-5 text-white/25">
                        Personalization variables such as{" "}
                        <span className="text-white/50">
                          {"{{FirstName}}"}
                        </span>{" "}
                        and{" "}
                        <span className="text-white/50">
                          {"{{Company}}"}
                        </span>{" "}
                        will be resolved for each lead when messages are
                        generated.
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </ViewTransition>
          )}
        </div>
      </div>
    </ViewTransition>
  );
}

function FormField({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2.5">
        <label className="text-[11px] font-medium text-white/55">
          {label}
        </label>

        {description && (
          <p className="mt-1 text-[9px] leading-4 text-white/20">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

function ProgressStep({
  active,
  complete,
  title,
}: {
  active: boolean;
  complete: boolean;
  title: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2.5">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-500 ${
          complete
            ? "border-white bg-white text-black"
            : active
              ? "border-white/30 bg-white/[0.08] text-white"
              : "border-white/[0.07] bg-white/[0.02] text-white/20"
        }`}
      >
        {complete ? (
          <Check className="h-3 w-3" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        )}
      </div>

      <span
        className={`hidden text-[10px] font-medium sm:block ${
          active || complete
            ? "text-white/60"
            : "text-white/20"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

function InsightItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 text-[11px] text-white/35">
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.025]">
        <Check className="h-2.5 w-2.5 text-white/40" />
      </div>

      {children}
    </div>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="py-5">
      <p className="text-[9px] text-white/20">
        {label}
      </p>

      <p className="mt-2 text-[12px] font-medium text-white/50">
        {value || "Not provided"}
      </p>
    </div>
  );
}