"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  CircleUserRound,
  Globe2,
  
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Sparkles,
  Tag,
  UserRound,
  WandSparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type LeadForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  website: string;
  linkedin: string;
  location: string;
  source: string;
  status: string;
  score: number;
  notes: string;
};

const initialForm: LeadForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  position: "",
  website: "",
  linkedin: "",
  location: "",
  source: "Manual",
  status: "New",
  score: 50,
  notes: "",
};

const suggestedTags = [
  "SaaS",
  "Founder",
  "Decision Maker",
  "Enterprise",
  "Warm Lead",
];

export default function CreateLeadPage() {
  const router = useRouter();

  const [form, setForm] = useState<LeadForm>(initialForm);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [enriching, setEnriching] = useState(false);

  const fullName = useMemo(
    () =>
      [form.firstName, form.lastName].filter(Boolean).join(" ") ||
      "New lead",
    [form.firstName, form.lastName],
  );

  const initials = useMemo(() => {
    const first = form.firstName.charAt(0);
    const last = form.lastName.charAt(0);

    return `${first}${last}`.toUpperCase() || "NL";
  }, [form.firstName, form.lastName]);

  const updateField = <K extends keyof LeadForm>(
    key: K,
    value: LeadForm[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const addTag = (value: string) => {
    const tag = value.trim();

    if (!tag || tags.includes(tag)) return;

    setTags((current) => [...current, tag]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags((current) => current.filter((item) => item !== tag));
  };

  const handleEnrich = async () => {
    if (!form.email && !form.company && !form.linkedin) return;

    setEnriching(true);

    // Replace with your enrichment API.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setForm((current) => ({
      ...current,
      company: current.company || "Acme Technologies",
      position: current.position || "Founder & CEO",
      website: current.website || "https://acme.com",
      location: current.location || "San Francisco, CA",
      score: Math.max(current.score, 82),
    }));

    setTags((current) => [
      ...new Set([...current, "Decision Maker", "SaaS"]),
    ]);

    setEnriching(false);
  };

  const handleSubmit = async () => {
    if (!form.firstName || !form.email) return;

    setSaving(true);

    try {
      const payload = {
        ...form,
        tags,
      };

      console.log("Creating lead:", payload);

      // Replace with:
      // await MockAPI.createLead(payload);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/leads");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#080808] text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute right-[-260px] top-[-360px] h-[760px] w-[760px] rounded-full bg-violet-500/[0.045] blur-[190px]" />

        <div className="absolute bottom-[-300px] left-[15%] h-[550px] w-[550px] rounded-full bg-blue-500/[0.018] blur-[180px]" />

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
              href="/leads"
              className="mb-5 inline-flex items-center gap-2 text-[10px] text-white/25 transition-colors hover:text-white/60"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to leads
            </Link>

            <h1 className="max-w-3xl text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
              Create lead
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/30">
              Add a prospect to your CRM and prepare them for personalized
              outreach.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => router.push("/leads")}
              className="h-10 rounded-full border-white/[0.08] bg-transparent px-5 text-xs text-white/40 hover:bg-white/[0.04] hover:text-white"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={saving || !form.firstName || !form.email}
              className="h-10 rounded-full bg-violet-500 px-5 text-xs text-white shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:bg-violet-400"
            >
              {saving ? (
                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="mr-2 h-3.5 w-3.5" />
              )}

              {saving ? "Creating..." : "Create lead"}
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="mt-8 grid grid-flow-dense gap-4 xl:grid-cols-12">
          {/* Main Form */}
          <div className="space-y-4 xl:col-span-8">
            {/* Contact */}
            <FormCard>
              <FormHeader
                icon={UserRound}
                title="Contact information"
                description="Basic details used to identify and contact this lead."
              />

              <div className="grid gap-5 p-6 sm:grid-cols-2">
                <Field
                  label="First name"
                  required
                  placeholder="John"
                  value={form.firstName}
                  onChange={(value) =>
                    updateField("firstName", value)
                  }
                />

                <Field
                  label="Last name"
                  placeholder="Anderson"
                  value={form.lastName}
                  onChange={(value) =>
                    updateField("lastName", value)
                  }
                />

                <Field
                  icon={Mail}
                  label="Email address"
                  required
                  type="email"
                  placeholder="john@company.com"
                  value={form.email}
                  onChange={(value) => updateField("email", value)}
                />

                <Field
                  icon={Phone}
                  label="Phone"
                  type="tel"
                  placeholder="+1 555 012 3456"
                  value={form.phone}
                  onChange={(value) => updateField("phone", value)}
                />
              </div>
            </FormCard>

            {/* Company */}
            <FormCard>
              <FormHeader
                icon={Building2}
                title="Company details"
                description="Add professional context for better targeting and personalization."
              />

              <div className="grid gap-5 p-6 sm:grid-cols-2">
                <Field
                  icon={Building2}
                  label="Company"
                  placeholder="Acme Inc."
                  value={form.company}
                  onChange={(value) =>
                    updateField("company", value)
                  }
                />

                <Field
                  icon={BriefcaseBusiness}
                  label="Job title"
                  placeholder="VP of Sales"
                  value={form.position}
                  onChange={(value) =>
                    updateField("position", value)
                  }
                />

                <Field
                  icon={Globe2}
                  label="Company website"
                  placeholder="https://company.com"
                  value={form.website}
                  onChange={(value) =>
                    updateField("website", value)
                  }
                />

                <Field
                  icon={X}
                  label="LinkedIn"
                  placeholder="linkedin.com/in/john"
                  value={form.linkedin}
                  onChange={(value) =>
                    updateField("linkedin", value)
                  }
                />

                <div className="sm:col-span-2">
                  <Field
                    icon={MapPin}
                    label="Location"
                    placeholder="San Francisco, CA"
                    value={form.location}
                    onChange={(value) =>
                      updateField("location", value)
                    }
                  />
                </div>
              </div>
            </FormCard>

            {/* CRM */}
            <FormCard>
              <FormHeader
                icon={Sparkles}
                title="Lead qualification"
                description="Organize this prospect and define their initial priority."
              />

              <div className="grid gap-5 p-6 sm:grid-cols-2">
                <SelectField
                  label="Lead status"
                  value={form.status}
                  onChange={(value) =>
                    updateField("status", value)
                  }
                  options={[
                    "New",
                    "Contacted",
                    "Interested",
                    "Follow-up",
                    "Qualified",
                  ]}
                />

                <SelectField
                  label="Lead source"
                  value={form.source}
                  onChange={(value) =>
                    updateField("source", value)
                  }
                  options={[
                    "Manual",
                    "CSV Import",
                    "LinkedIn",
                    "Website",
                    "Referral",
                    "Campaign",
                  ]}
                />

                <div className="sm:col-span-2">
                  <ScoreField
                    value={form.score}
                    onChange={(value) =>
                      updateField("score", value)
                    }
                  />
                </div>

                <div className="sm:col-span-2">
                  <TagsField
                    tags={tags}
                    value={tagInput}
                    onChange={setTagInput}
                    onAdd={addTag}
                    onRemove={removeTag}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-medium text-white/35">
                      Notes
                    </span>

                    <textarea
                      value={form.notes}
                      onChange={(event) =>
                        updateField("notes", event.target.value)
                      }
                      placeholder="Add context, pain points, previous conversations, or anything useful for future outreach..."
                      className="min-h-32 w-full resize-none rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-xs leading-6 text-white/65 outline-none transition-colors placeholder:text-white/15 focus:border-violet-400/30"
                    />
                  </label>
                </div>
              </div>
            </FormCard>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 xl:col-span-4">
            {/* Preview */}
            <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c]">
              <div className="border-b border-white/[0.06] px-6 py-5">
                <p className="text-[13px] font-medium text-white/70">
                  Lead preview
                </p>

                <p className="mt-1.5 text-[10px] text-white/20">
                  Preview how this contact will appear in your CRM.
                </p>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/[0.12] bg-violet-400/[0.06] text-xs font-medium text-violet-200">
                    {initials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white/75">
                      {fullName}
                    </p>

                    <p className="mt-1 truncate text-[10px] text-white/25">
                      {form.position || "Job title"}
                      {form.company && ` at ${form.company}`}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <PreviewRow
                    icon={Mail}
                    value={form.email || "Email not added"}
                  />

                  <PreviewRow
                    icon={Building2}
                    value={form.company || "Company not added"}
                  />

                  <PreviewRow
                    icon={MapPin}
                    value={form.location || "Location not added"}
                  />
                </div>

                <div className="mt-6 border-t border-white/[0.05] pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/25">
                      Lead score
                    </span>

                    <span
                      className={cn(
                        "text-xs font-medium",
                        form.score >= 75
                          ? "text-emerald-300/70"
                          : form.score >= 45
                            ? "text-amber-300/70"
                            : "text-white/40",
                      )}
                    >
                      {form.score}/100
                    </span>
                  </div>

                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-violet-400 transition-all duration-500"
                      style={{
                        width: `${form.score}%`,
                      }}
                    />
                  </div>
                </div>

                {tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[8px] text-white/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* AI Enrichment */}
            <section className="group relative overflow-hidden rounded-[1.75rem] border border-violet-400/[0.11] bg-[#0c0c0c]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-500/[0.1] blur-[100px] transition-transform duration-700 group-hover:scale-105"
              />

              <div className="relative p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/[0.08]">
                  <WandSparkles className="h-4 w-4 text-violet-300/70" />
                </div>

                <h2 className="mt-5 text-sm font-medium text-white/75">
                  Enrich with AI
                </h2>

                <p className="mt-2 text-[10px] leading-5 text-white/25">
                  Use the lead&apos;s email, company, or LinkedIn profile to
                  discover additional context for personalized outreach.
                </p>

                <div className="mt-5 space-y-2">
                  <EnrichmentFeature text="Company information" />
                  <EnrichmentFeature text="Role and seniority" />
                  <EnrichmentFeature text="Lead qualification" />
                  <EnrichmentFeature text="Relevant tags" />
                </div>

                <Button
                  type="button"
                  onClick={handleEnrich}
                  disabled={
                    enriching ||
                    (!form.email &&
                      !form.company &&
                      !form.linkedin)
                  }
                  className="mt-6 h-10 w-full rounded-xl bg-violet-500 text-[10px] text-white hover:bg-violet-400"
                >
                  {enriching ? (
                    <>
                      <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                      Enriching lead...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-3.5 w-3.5" />
                      Enrich lead
                    </>
                  )}
                </Button>

                {!form.email &&
                  !form.company &&
                  !form.linkedin && (
                    <p className="mt-3 text-center text-[8px] text-white/15">
                      Add an email, company, or LinkedIn profile first.
                    </p>
                  )}
              </div>
            </section>

            {/* Suggestions */}
            <section className="rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c] p-6">
              <div className="flex items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-white/25" />

                <p className="text-[11px] font-medium text-white/55">
                  Suggested tags
                </p>
              </div>

              <p className="mt-2 text-[9px] leading-5 text-white/20">
                Quickly classify the lead for campaign targeting.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {suggestedTags.map((tag) => {
                  const selected = tags.includes(tag);

                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() =>
                        selected ? removeTag(tag) : addTag(tag)
                      }
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[8px] transition-all",
                        selected
                          ? "border-violet-400/20 bg-violet-400/[0.07] text-violet-200/70"
                          : "border-white/[0.06] bg-white/[0.02] text-white/25 hover:border-white/[0.1] hover:text-white/50",
                      )}
                    >
                      {selected ? (
                        <Check className="h-2.5 w-2.5" />
                      ) : (
                        <Plus className="h-2.5 w-2.5" />
                      )}

                      {tag}
                    </button>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Form Components                                                            */
/* -------------------------------------------------------------------------- */

function FormCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0c0c0c]">
      {children}
    </section>
  );
}

function FormHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-white/[0.06] px-6 py-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.025]">
        <Icon className="h-4 w-4 text-white/30" />
      </div>

      <div>
        <h2 className="text-[13px] font-medium text-white/70">
          {title}
        </h2>

        <p className="mt-1 text-[10px] leading-5 text-white/20">
          {description}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1 text-[10px] font-medium text-white/35">
        {label}

        {required && (
          <span className="text-violet-300/60">*</span>
        )}
      </span>

      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/18" />
        )}

        <Input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-10 rounded-xl border-white/[0.07] bg-white/[0.02] text-xs text-white/65 shadow-none placeholder:text-white/15 focus-visible:border-violet-400/30 focus-visible:ring-0",
            Icon && "pl-10",
          )}
        />
      </div>
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-medium text-white/35">
        {label}
      </span>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-full appearance-none rounded-xl border border-white/[0.07] bg-[#0e0e0e] px-3 pr-9 text-xs text-white/60 outline-none transition-colors focus:border-violet-400/30"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/20" />
      </div>
    </label>
  );
}

function ScoreField({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium text-white/35">
            Lead score
          </p>

          <p className="mt-1 text-[9px] text-white/18">
            Initial estimate of lead quality and priority.
          </p>
        </div>

        <span className="text-xs font-medium text-violet-300/70">
          {value}/100
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
        className="mt-4 h-1 w-full cursor-pointer accent-violet-500"
      />

      <div className="mt-2 flex justify-between text-[8px] text-white/15">
        <span>Low priority</span>
        <span>High priority</span>
      </div>
    </div>
  );
}

function TagsField({
  tags,
  value,
  onChange,
  onAdd,
  onRemove,
}: {
  tags: string[];
  value: string;
  onChange: (value: string) => void;
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
}) {
  return (
    <div>
      <span className="mb-2 block text-[10px] font-medium text-white/35">
        Tags
      </span>

      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-2 transition-colors focus-within:border-violet-400/30">
        <div className="flex min-h-7 flex-wrap items-center gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-lg border border-violet-400/[0.1] bg-violet-400/[0.05] px-2 py-1 text-[9px] text-violet-200/60"
            >
              {tag}

              <button
                type="button"
                onClick={() => onRemove(tag)}
                className="text-violet-200/30 transition-colors hover:text-white"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </span>
          ))}

          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === ",") {
                event.preventDefault();
                onAdd(value);
              }
            }}
            onBlur={() => {
              if (value.trim()) onAdd(value);
            }}
            placeholder={
              tags.length ? "Add another..." : "Type and press Enter..."
            }
            className="h-7 min-w-[150px] flex-1 bg-transparent px-2 text-[10px] text-white/60 outline-none placeholder:text-white/15"
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar Components                                                         */
/* -------------------------------------------------------------------------- */

function PreviewRow({
  icon: Icon,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/[0.018] px-3 py-2.5">
      <Icon className="h-3.5 w-3.5 shrink-0 text-white/18" />

      <span className="truncate text-[9px] text-white/30">
        {value}
      </span>
    </div>
  );
}

function EnrichmentFeature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-violet-400/[0.07]">
        <Check className="h-2 w-2 text-violet-300/60" />
      </div>

      <span className="text-[9px] text-white/30">
        {text}
      </span>
    </div>
  );
}