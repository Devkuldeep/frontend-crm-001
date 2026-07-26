"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  X,

  Loader2,
  Mail,
  MapPin,
  MessageSquareText,
} from "lucide-react";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      // Replace with your actual contact API.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-[#080808] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <Background />

        <div className="relative mx-auto max-w-[1500px] px-6 pb-20 pt-24 sm:px-10 md:pb-28 md:pt-32 lg:px-16 lg:pb-36 lg:pt-40">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-medium leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Start a conversation.
              <span className="block text-white/25">
                We&apos;re listening.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/35 md:text-lg md:leading-8">
              Whether you&apos;re exploring CRM Outreach, need help with your
              workspace, or want to discuss your sales workflow, send us a
              message.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="relative">
        <div className="mx-auto grid max-w-[1500px] lg:grid-cols-12">
          {/* Information */}
          <div className="border-b border-white/[0.06] px-6 py-20 sm:px-10 md:py-28 lg:col-span-5 lg:border-b-0 lg:border-r lg:px-16 lg:py-32">
            <div className="max-w-md">
              <h2 className="text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
                How can we help?
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/35">
                Tell us what you&apos;re working on and what you need. We&apos;ll
                make sure your message reaches the right person.
              </p>

              {/* Contact details */}
              <div className="mt-12 space-y-2">
                <ContactItem
                  icon={Mail}
                  title="Email"
                  value="hello@crmoutreach.com"
                  href="mailto:hello@crmoutreach.com"
                />

                <ContactItem
                  icon={Clock3}
                  title="Response time"
                  value="Usually within 1 business day"
                />

                <ContactItem
                  icon={MapPin}
                  title="Availability"
                  value="Working with teams worldwide"
                />
              </div>

              {/* Social */}
              <div className="mt-12 border-t border-white/[0.06] pt-8">
                <p className="text-xs text-white/25">
                  Find us elsewhere
                </p>

                <div className="mt-4 flex gap-2">
                  <SocialLink
                    href="#"
                    label="GitHub"
                    icon={X}
                  />

                  <SocialLink
                    href="#"
                    label="LinkedIn"
                    icon={X}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="relative px-6 py-20 sm:px-10 md:py-28 lg:col-span-7 lg:px-16 lg:py-32 xl:px-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-500/[0.04] blur-[150px]"
            />

            <div className="relative mx-auto max-w-2xl">
              {isSent ? (
                <SuccessState onReset={() => setIsSent(false)} />
              ) : (
                <>
                  <div className="mb-10">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035]">
                      <MessageSquareText className="h-4 w-4 text-white/50" />
                    </div>

                    <h2 className="mt-6 text-3xl font-medium tracking-[-0.045em]">
                      Send us a message.
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-white/30">
                      Give us a little context and we&apos;ll get back to you.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        id="name"
                        label="Your name"
                        placeholder="John Doe"
                        autoComplete="name"
                        required
                      />

                      <Field
                        id="email"
                        label="Work email"
                        placeholder="john@company.com"
                        type="email"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <Field
                      id="company"
                      label="Company"
                      placeholder="Acme Inc."
                      autoComplete="organization"
                    />

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2.5 block text-xs font-medium text-white/50"
                      >
                        What can we help with?
                      </label>

                      <select
                        id="subject"
                        name="subject"
                        defaultValue=""
                        required
                        className={fieldClassName}
                      >
                        <option
                          value=""
                          disabled
                          className="bg-[#111]"
                        >
                          Select a topic
                        </option>

                        <option
                          value="sales"
                          className="bg-[#111]"
                        >
                          Sales & product
                        </option>

                        <option
                          value="support"
                          className="bg-[#111]"
                        >
                          Technical support
                        </option>

                        <option
                          value="billing"
                          className="bg-[#111]"
                        >
                          Billing
                        </option>

                        <option
                          value="partnership"
                          className="bg-[#111]"
                        >
                          Partnerships
                        </option>

                        <option
                          value="other"
                          className="bg-[#111]"
                        >
                          Something else
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2.5 block text-xs font-medium text-white/50"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        placeholder="Tell us about your team, what you're trying to achieve, or how we can help..."
                        className={`${fieldClassName} min-h-40 resize-none py-4`}
                      />
                    </div>

                    <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-xs text-[11px] leading-5 text-white/20">
                        By submitting this form, you agree that we may contact
                        you regarding your request.
                      </p>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="group flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send message

                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/[0.06] px-6 py-28 sm:px-10 md:py-36 lg:px-16 lg:py-44">
        <div className="mx-auto max-w-[1500px] text-center">
          <h2 className="mx-auto max-w-4xl text-4xl font-medium leading-[1] tracking-[-0.055em] sm:text-5xl md:text-6xl">
            Ready to put your outreach
            <span className="text-white/25"> on autopilot?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/30">
            Build a smarter sales workflow and spend more time talking to the
            people who matter.
          </p>

          <Link
            href="/register"
            className="group mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.025] hover:bg-white/90"
          >
            Get started

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}

const fieldClassName =
  "h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:bg-white/[0.035] focus:border-white/25 focus:bg-white/[0.04] focus:ring-4 focus:ring-white/[0.025]";

function Field({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
  required = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 block text-xs font-medium text-white/50"
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={fieldClassName}
      />
    </div>
  );
}

function ContactItem({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: typeof Mail;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-center gap-4 rounded-xl border border-transparent px-3 py-4 transition-all duration-300 hover:border-white/[0.06] hover:bg-white/[0.02]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] transition-colors duration-300 group-hover:bg-white/[0.06]">
        <Icon className="h-4 w-4 text-white/35 transition-colors group-hover:text-white/70" />
      </div>

      <div>
        <p className="text-[10px] text-white/20">
          {title}
        </p>

        <p className="mt-1 text-sm text-white/55 transition-colors group-hover:text-white">
          {value}
        </p>
      </div>
    </div>
  );

  return href ? (
    <Link href={href}>
      {content}
    </Link>
  ) : (
    content
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof Github;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/30 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
    >
      <Icon className="h-4 w-4" />
    </Link>
  );
}

function SuccessState({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[500px] flex-col justify-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
        <Check className="h-5 w-5" />
      </div>

      <h2 className="mt-7 text-4xl font-medium tracking-[-0.05em]">
        Message received.
      </h2>

      <p className="mt-4 max-w-md text-sm leading-7 text-white/35">
        Thanks for reaching out. We&apos;ve received your message and will get
        back to you as soon as possible.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 w-fit text-sm font-medium text-white/40 transition-colors hover:text-white"
      >
        Send another message
      </button>
    </div>
  );
}

function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <div className="absolute left-[15%] top-[-250px] h-[650px] w-[650px] rounded-full bg-violet-500/[0.08] blur-[150px]" />

      <div className="absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.035] blur-[140px]" />

      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />
    </div>
  );
}