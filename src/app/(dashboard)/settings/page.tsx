"use client";

import { useState } from "react";
import {
  Bell,
  Bot,
  Check,
  ChevronRight,
  CircleUserRound,
  Database,
  X,
  KeyRound,
  Loader2,
  Mail,
  Save,
  Settings2,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserRound,
  UsersRound,
  Webhook,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "workspace",
    label: "Workspace",
    description: "General preferences",
    icon: Settings2,
  },
  {
    id: "profile",
    label: "Profile",
    description: "Personal information",
    icon: CircleUserRound,
  },
  {
    id: "ai",
    label: "AI & Outreach",
    description: "Generation preferences",
    icon: Bot,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts and updates",
    icon: Bell,
  },
  {
    id: "integrations",
    label: "Integrations",
    description: "Connected services",
    icon: Webhook,
  },
  {
    id: "security",
    label: "Security",
    description: "Access and sessions",
    icon: ShieldCheck,
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("workspace");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setSaving(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#080808] text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute right-[-220px] top-[-320px] h-[700px] w-[700px] rounded-full bg-violet-500/[0.045] blur-[190px]" />

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
        <header className="flex flex-col gap-6 border-b border-white/[0.06] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
              Settings
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/30">
              Manage your workspace, outreach behavior, integrations, and
              account preferences.
            </p>
          </div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="h-10 rounded-full bg-violet-500 px-5 text-xs font-medium text-white shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all hover:bg-violet-400"
          >
            {saving ? (
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="mr-2 h-3.5 w-3.5" />
            )}

            {saving ? "Saving..." : "Save changes"}
          </Button>
        </header>

        {/* Layout */}
        <div className="grid gap-8 py-8 lg:grid-cols-[240px_minmax(0,1fr)] xl:gap-12">
          {/* Settings navigation */}
          <aside>
            <nav className="flex gap-1 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:flex-col lg:overflow-visible">
              {sections.map((section) => {
                const Icon = section.icon;
                const active = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "group flex min-w-max items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 lg:w-full",
                      active
                        ? "bg-white/[0.06] text-white"
                        : "text-white/35 hover:bg-white/[0.025] hover:text-white/65",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                        active
                          ? "bg-violet-400/[0.1] text-violet-300"
                          : "bg-white/[0.025] text-white/30 group-hover:text-white/60",
                      )}
                    >
                      <Icon
                        className="h-3.5 w-3.5"
                        strokeWidth={1.7}
                      />
                    </div>

                    <div className="hidden min-w-0 flex-1 lg:block">
                      <p className="text-[11px] font-medium">
                        {section.label}
                      </p>

                      <p className="mt-0.5 text-[9px] text-white/20">
                        {section.description}
                      </p>
                    </div>

                    {active && (
                      <ChevronRight className="hidden h-3 w-3 text-white/20 lg:block" />
                    )}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <main className="min-w-0">
            {activeSection === "workspace" && <WorkspaceSettings />}

            {activeSection === "profile" && <ProfileSettings />}

            {activeSection === "ai" && <AISettings />}

            {activeSection === "notifications" && (
              <NotificationSettings />
            )}

            {activeSection === "integrations" && (
              <IntegrationSettings />
            )}

            {activeSection === "security" && <SecuritySettings />}
          </main>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Workspace                                                                  */
/* -------------------------------------------------------------------------- */

function WorkspaceSettings() {
  return (
    <SettingsContent
      title="Workspace"
      description="Configure the identity and defaults used across your CRM."
    >
      <SettingsCard>
        <SettingsCardHeader
          title="Workspace details"
          description="These details are visible to members of your workspace."
        />

        <div className="grid gap-5 p-6 sm:grid-cols-2">
          <Field
            label="Workspace name"
            defaultValue="CRM Outreach"
            placeholder="Workspace name"
          />

          <Field
            label="Company"
            defaultValue="Acme Inc."
            placeholder="Company name"
          />

          <Field
            label="Workspace URL"
            defaultValue="crm-outreach"
            prefix="app.crm.com/"
            placeholder="workspace"
          />

          <SelectField
            label="Timezone"
            defaultValue="Asia/Kolkata"
            options={[
              ["Asia/Kolkata", "India Standard Time"],
              ["America/New_York", "Eastern Time"],
              ["Europe/London", "London"],
              ["Asia/Singapore", "Singapore"],
            ]}
          />
        </div>
      </SettingsCard>

      <SettingsCard>
        <SettingsCardHeader
          title="Team"
          description="Manage people who can access this workspace."
          action={
            <Button
              variant="outline"
              className="h-8 rounded-lg border-white/[0.08] bg-transparent px-3 text-[10px] text-white/50 hover:bg-white/[0.05] hover:text-white"
            >
              <UsersRound className="mr-2 h-3 w-3" />
              Invite member
            </Button>
          }
        />

        <div className="divide-y divide-white/[0.05]">
          <TeamMember
            initials="KD"
            name="Kuldeep"
            email="kuldeep@example.com"
            role="Owner"
          />

          <TeamMember
            initials="AS"
            name="Alex Smith"
            email="alex@example.com"
            role="Member"
          />
        </div>
      </SettingsCard>
    </SettingsContent>
  );
}

/* -------------------------------------------------------------------------- */
/* Profile                                                                    */
/* -------------------------------------------------------------------------- */

function ProfileSettings() {
  return (
    <SettingsContent
      title="Profile"
      description="Manage your personal information and account identity."
    >
      <SettingsCard>
        <SettingsCardHeader
          title="Profile information"
          description="Used across your workspace and outbound activity."
        />

        <div className="p-6">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/[0.12] bg-violet-400/[0.07] text-sm font-medium text-violet-200">
              KD
            </div>

            <div>
              <Button
                variant="outline"
                className="h-8 border-white/[0.08] bg-transparent text-[10px] text-white/50 hover:bg-white/[0.05] hover:text-white"
              >
                Change avatar
              </Button>

              <p className="mt-2 text-[9px] text-white/20">
                JPG or PNG. Maximum 2 MB.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Full name"
              defaultValue="Kuldeep"
              placeholder="Your name"
            />

            <Field
              label="Email address"
              defaultValue="kuldeep@example.com"
              type="email"
            />

            <Field
              label="Job title"
              defaultValue="Founder"
              placeholder="Your role"
            />

            <Field
              label="Phone"
              placeholder="+91 98765 43210"
              type="tel"
            />
          </div>
        </div>
      </SettingsCard>
    </SettingsContent>
  );
}

/* -------------------------------------------------------------------------- */
/* AI                                                                         */
/* -------------------------------------------------------------------------- */

function AISettings() {
  return (
    <SettingsContent
      title="AI & Outreach"
      description="Control how AI generates and personalizes your outreach."
    >
      <div className="relative overflow-hidden rounded-[1.5rem] border border-violet-400/[0.1] bg-[#0c0c0c] p-6">
        <div className="pointer-events-none absolute right-[-100px] top-[-130px] h-[300px] w-[300px] rounded-full bg-violet-500/[0.09] blur-[100px]" />

        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/[0.08]">
            <Sparkles className="h-4 w-4 text-violet-300/70" />
          </div>

          <h3 className="mt-5 text-sm font-medium text-white/80">
            AI personalization
          </h3>

          <p className="mt-2 max-w-lg text-[11px] leading-5 text-white/30">
            Configure the default behavior AI uses when researching leads and
            generating outreach.
          </p>
        </div>
      </div>

      <SettingsCard>
        <SettingsCardHeader
          title="Generation preferences"
          description="Default writing behavior for new campaigns."
        />

        <div className="grid gap-5 p-6 sm:grid-cols-2">
          <SelectField
            label="Writing tone"
            defaultValue="professional"
            options={[
              ["professional", "Professional"],
              ["friendly", "Friendly"],
              ["concise", "Concise"],
              ["persuasive", "Persuasive"],
            ]}
          />

          <SelectField
            label="Email length"
            defaultValue="medium"
            options={[
              ["short", "Short"],
              ["medium", "Medium"],
              ["long", "Detailed"],
            ]}
          />
        </div>

        <div className="divide-y divide-white/[0.05] border-t border-white/[0.05]">
          <ToggleRow
            title="Lead research"
            description="Research lead and company context before generating messages."
            defaultChecked
          />

          <ToggleRow
            title="Personalized opening"
            description="Generate a unique opening line for each recipient."
            defaultChecked
          />

          <ToggleRow
            title="AI follow-ups"
            description="Allow AI to generate contextual follow-up messages."
            defaultChecked
          />
        </div>
      </SettingsCard>
    </SettingsContent>
  );
}

/* -------------------------------------------------------------------------- */
/* Notifications                                                              */
/* -------------------------------------------------------------------------- */

function NotificationSettings() {
  return (
    <SettingsContent
      title="Notifications"
      description="Choose which events should get your attention."
    >
      <SettingsCard>
        <SettingsCardHeader
          title="Activity notifications"
          description="Control alerts generated by your outreach workflow."
        />

        <div className="divide-y divide-white/[0.05]">
          <ToggleRow
            title="Interested lead"
            description="Notify me when AI classifies a response as interested."
            defaultChecked
          />

          <ToggleRow
            title="Meeting booked"
            description="Notify me when a lead schedules a meeting."
            defaultChecked
          />

          <ToggleRow
            title="Campaign completed"
            description="Send an alert after a campaign finishes."
            defaultChecked
          />

          <ToggleRow
            title="Weekly report"
            description="Receive a weekly summary of outreach performance."
          />
        </div>
      </SettingsCard>

      <SettingsCard>
        <SettingsCardHeader
          title="Delivery"
          description="Choose where account notifications are delivered."
        />

        <div className="divide-y divide-white/[0.05]">
          <ToggleRow
            icon={Mail}
            title="Email"
            description="Send important notifications to your account email."
            defaultChecked
          />

          <ToggleRow
            icon={Bell}
            title="In-app"
            description="Show notifications inside your CRM workspace."
            defaultChecked
          />
        </div>
      </SettingsCard>
    </SettingsContent>
  );
}

/* -------------------------------------------------------------------------- */
/* Integrations                                                               */
/* -------------------------------------------------------------------------- */

function IntegrationSettings() {
  return (
    <SettingsContent
      title="Integrations"
      description="Connect the tools your outreach workflow depends on."
    >
      <SettingsCard>
        <IntegrationRow
          icon={Mail}
          title="Google Gmail"
          description="Send campaigns and synchronize replies."
          connected
        />

        <IntegrationRow
          icon={X}
          title="GitHub"
          description="Connect developer and company context."
        />

        <IntegrationRow
          icon={Database}
          title="CRM Data Source"
          description="Synchronize external customer and lead records."
        />

        <IntegrationRow
          icon={Webhook}
          title="Webhooks"
          description="Send CRM events to your own applications."
        />
      </SettingsCard>
    </SettingsContent>
  );
}

/* -------------------------------------------------------------------------- */
/* Security                                                                   */
/* -------------------------------------------------------------------------- */

function SecuritySettings() {
  return (
    <SettingsContent
      title="Security"
      description="Manage authentication, access, and sensitive account actions."
    >
      <SettingsCard>
        <SettingsCardHeader
          title="Authentication"
          description="Protect access to your account."
        />

        <div className="divide-y divide-white/[0.05]">
          <ActionRow
            icon={KeyRound}
            title="Password"
            description="Last changed 3 months ago."
            action="Change password"
          />

          <ActionRow
            icon={ShieldCheck}
            title="Two-factor authentication"
            description="Add another layer of protection to your account."
            action="Enable"
          />
        </div>
      </SettingsCard>

      <div className="overflow-hidden rounded-[1.5rem] border border-red-500/[0.12] bg-red-500/[0.015]">
        <div className="border-b border-red-500/[0.08] px-6 py-5">
          <h3 className="text-[13px] font-medium text-red-300/80">
            Danger zone
          </h3>

          <p className="mt-1.5 text-[10px] text-white/20">
            Destructive actions cannot be easily reversed.
          </p>
        </div>

        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-white/65">
              Delete workspace
            </p>

            <p className="mt-1 text-[10px] leading-5 text-white/25">
              Permanently remove campaigns, leads, analytics, and team data.
            </p>
          </div>

          <Button
            variant="outline"
            className="shrink-0 border-red-400/[0.15] bg-red-500/[0.04] text-[10px] text-red-300/70 hover:bg-red-500/[0.1] hover:text-red-200"
          >
            <Trash2 className="mr-2 h-3 w-3" />
            Delete workspace
          </Button>
        </div>
      </div>
    </SettingsContent>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared                                                                     */
/* -------------------------------------------------------------------------- */

function SettingsContent({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="mb-7">
        <h2 className="text-xl font-medium tracking-[-0.035em] text-white/85">
          {title}
        </h2>

        <p className="mt-1.5 text-[11px] leading-5 text-white/25">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

function SettingsCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-[#0c0c0c]">
      {children}
    </section>
  );
}

function SettingsCardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/[0.06] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-[13px] font-medium text-white/70">
          {title}
        </h3>

        <p className="mt-1.5 text-[10px] text-white/20">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}

function Field({
  label,
  prefix,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  prefix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-medium text-white/35">
        {label}
      </span>

      <div className="flex h-10 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] transition-colors focus-within:border-violet-400/30">
        {prefix && (
          <span className="flex items-center border-r border-white/[0.06] bg-white/[0.015] px-3 text-[10px] text-white/20">
            {prefix}
          </span>
        )}

        <Input
          {...props}
          className="h-full flex-1 rounded-none border-0 bg-transparent px-3 text-xs text-white/70 shadow-none placeholder:text-white/15 focus-visible:ring-0"
        />
      </div>
    </label>
  );
}

function SelectField({
  label,
  defaultValue,
  options,
}: {
  label: string;
  defaultValue: string;
  options: [string, string][];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-medium text-white/35">
        {label}
      </span>

      <select
        defaultValue={defaultValue}
        className="h-10 w-full rounded-xl border border-white/[0.07] bg-[#0e0e0e] px-3 text-xs text-white/60 outline-none transition-colors focus:border-violet-400/30"
      >
        {options.map(([value, name]) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleRow({
  title,
  description,
  icon: Icon,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center gap-4 px-6 py-5">
      {Icon && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.025] text-white/30">
          <Icon className="h-4 w-4" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-white/65">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-5 text-white/22">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked((current) => !current)}
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200",
          checked ? "bg-violet-500" : "bg-white/[0.08]",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200",
            checked ? "translate-x-[18px]" : "translate-x-0.5",
          )}
        >
          {checked && (
            <Check className="h-2.5 w-2.5 text-violet-600" />
          )}
        </span>
      </button>
    </div>
  );
}

function TeamMember({
  initials,
  name,
  email,
  role,
}: {
  initials: string;
  name: string;
  email: string;
  role: string;
}) {
  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-[10px] font-medium text-white/45">
        {initials}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-white/65">
          {name}
        </p>

        <p className="mt-0.5 truncate text-[9px] text-white/20">
          {email}
        </p>
      </div>

      <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[9px] text-white/30">
        {role}
      </span>
    </div>
  );
}

function IntegrationRow({
  icon: Icon,
  title,
  description,
  connected = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  connected?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/[0.05] p-6 last:border-0 sm:flex-row sm:items-center">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025]">
        <Icon className="h-4 w-4 text-white/40" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-white/65">
            {title}
          </p>

          {connected && (
            <span className="flex items-center gap-1 text-[9px] text-emerald-400/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Connected
            </span>
          )}
        </div>

        <p className="mt-1 text-[10px] text-white/22">
          {description}
        </p>
      </div>

      <Button
        variant="outline"
        className="h-8 border-white/[0.07] bg-transparent px-3 text-[10px] text-white/40 hover:bg-white/[0.05] hover:text-white"
      >
        {connected ? "Manage" : "Connect"}
      </Button>
    </div>
  );
}

function ActionRow({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.025]">
        <Icon className="h-4 w-4 text-white/30" />
      </div>

      <div className="flex-1">
        <p className="text-[11px] font-medium text-white/65">
          {title}
        </p>

        <p className="mt-1 text-[10px] text-white/22">
          {description}
        </p>
      </div>

      <Button
        variant="outline"
        className="h-8 border-white/[0.07] bg-transparent px-3 text-[10px] text-white/40 hover:bg-white/[0.05] hover:text-white"
      >
        {action}
      </Button>
    </div>
  );
}