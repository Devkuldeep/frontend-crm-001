"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setApiError("");

    if (password.length < 8) {
      setApiError(
        "Password must contain at least 8 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setApiError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your actual password reset API.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Unable to reset your password. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0d0d0d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 md:p-9">
        <AmbientGlow />

        <div className="relative flex flex-col items-center py-5 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white text-black">
            <Check className="h-5 w-5" />
          </div>

          <h1 className="mt-7 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
            Password updated.
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/35">
            Your password has been changed successfully. You can
            now sign in using your new password.
          </p>

          <button
            type="button"
            onClick={() => router.push(ROUTES.auth.login)}
            className="group mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.015] hover:bg-white/90"
          >
            Continue to login

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0d0d0d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 md:p-9">
      <AmbientGlow />

      <div className="relative">
        {/* Heading */}
        <div>
          <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
            <LockKeyhole className="h-4 w-4 text-white/60" />
          </div>

          <h1 className="text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
            Set a new password.
          </h1>

          <p className="mt-3 max-w-sm text-sm leading-6 text-white/35">
            Choose a secure password you haven&apos;t used before.
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
          className="mt-8 space-y-5"
        >
          {/* Password */}
          <PasswordInput
            id="password"
            label="New password"
            placeholder="Enter a new password"
            value={password}
            onChange={setPassword}
            show={showPassword}
            onToggle={() =>
              setShowPassword((current) => !current)
            }
            disabled={isLoading}
            autoComplete="new-password"
          />

          {/* Confirm Password */}
          <PasswordInput
            id="confirm-password"
            label="Confirm password"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={setConfirmPassword}
            show={showConfirmPassword}
            onToggle={() =>
              setShowConfirmPassword((current) => !current)
            }
            disabled={isLoading}
            autoComplete="new-password"
          />

          {/* Password hint */}
          <div className="flex items-center gap-2 text-[11px] text-white/20">
            <span
              className={[
                "flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                password.length >= 8
                  ? "border-white bg-white text-black"
                  : "border-white/[0.08]",
              ].join(" ")}
            >
              {password.length >= 8 && (
                <Check className="h-2.5 w-2.5" />
              )}
            </span>

            Use at least 8 characters
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.015] hover:bg-white/90 disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating password...
              </>
            ) : (
              <>
                Reset password

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
      </div>
    </div>
  );
}

function PasswordInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  show,
  onToggle,
  disabled,
  autoComplete,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggle: () => void;
  disabled: boolean;
  autoComplete: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2.5 block text-xs font-medium text-white/55"
      >
        {label}
      </label>

      <div className="relative">
        <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />

        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className="h-12 w-full rounded-xl border border-white/[0.08] bg-white/[0.025] pl-11 pr-12 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 hover:bg-white/[0.035] focus:border-white/25 focus:bg-white/[0.04] focus:ring-4 focus:ring-white/[0.025] disabled:cursor-not-allowed disabled:opacity-50"
        />

        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          aria-label={
            show ? "Hide password" : "Show password"
          }
          className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-white/20 transition-colors hover:text-white/60 disabled:pointer-events-none"
        >
          {show ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

function AmbientGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-120px] top-[-120px] h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[100px]"
    />
  );
}