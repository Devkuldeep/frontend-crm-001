"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Mail,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setApiError("Enter your email address.");
      return;
    }

    setIsLoading(true);
    setApiError("");

    try {
      // Replace with your actual forgot-password API.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setEmailSent(true);
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Unable to send the reset link. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthCard>
        <div className="flex flex-col items-center py-4 text-center">
          <div className="relative">
            <div className="absolute inset-0 scale-[1.8] rounded-full bg-violet-500/[0.08] blur-2xl" />

            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
              <Check className="h-5 w-5" />
            </div>
          </div>

          <h1 className="mt-7 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
            Check your inbox.
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-white/35">
            If an account exists for{" "}
            <span className="font-medium text-white/60">
              {email}
            </span>
            , we&apos;ve sent instructions to reset your password.
          </p>

          <Link
            href={ROUTES.auth.login}
            className="group mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.015] hover:bg-white/90"
          >
            Back to login

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <button
            type="button"
            onClick={() => {
              setEmailSent(false);
              setApiError("");
            }}
            className="mt-5 text-xs text-white/25 transition-colors duration-300 hover:text-white/60"
          >
            Try another email
          </button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      {/* Heading */}
      <div>
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
          <Mail className="h-4 w-4 text-white/60" />
        </div>

        <h1 className="text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
          Forgot your password?
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-white/35">
          Enter the email associated with your account and we&apos;ll send you
          a link to reset your password.
        </p>
      </div>

      {/* Error */}
      {apiError && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-red-400/15 bg-red-400/[0.06] px-4 py-3.5 text-sm leading-5 text-red-200"
        >
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />

          <span>{apiError}</span>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8"
      >
        <div>
          <label
            htmlFor="email"
            className="mb-2.5 block text-xs font-medium text-white/55"
          >
            Email address
          </label>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);

                if (apiError) {
                  setApiError("");
                }
              }}
              placeholder="name@example.com"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              required
              disabled={isLoading}
              className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:bg-white/[0.035] focus:border-white/25 focus:bg-white/[0.04] focus:ring-4 focus:ring-white/[0.025] disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.015] hover:bg-white/90 disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />

              Sending reset link...
            </>
          ) : (
            <>
              Send reset link

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      {/* Back */}
      <div className="mt-8 flex justify-center">
        <Link
          href={ROUTES.auth.login}
          className="group inline-flex items-center gap-2 text-sm text-white/30 transition-colors duration-300 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />

          Back to login
        </Link>
      </div>
    </AuthCard>
  );
}

function AuthCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0d0d0d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 md:p-9">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-120px] top-[-120px] h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[100px]"
      />

      <div className="relative">
        {children}
      </div>
    </div>
  );
}