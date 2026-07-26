"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  X,
  Loader2,
  LockKeyhole,
  UserRound,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";
import {
  loginSchema,
  type LoginInput,
} from "@/lib/validations/auth";

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<
    "google" | "github" | null
  >(null);

  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setApiError("");

    try {
      // Replace with your authentication API.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (data.email === "error@example.com") {
        throw new Error("Invalid username/email or password.");
      }

      router.push(ROUTES.dashboard.root);
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (
    provider: "google" | "github",
  ) => {
    setOauthLoading(provider);
    setApiError("");

    try {
      /*
       * Replace this with your auth provider.
       *
       * Better Auth example:
       *
       * await authClient.signIn.social({
       *   provider,
       *   callbackURL: ROUTES.dashboard.root,
       * });
       */

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : `Unable to continue with ${provider}.`,
      );

      setOauthLoading(null);
    }
  };

  const loading = isLoading || oauthLoading !== null;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0d0d0d]/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8 md:p-9">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-120px] top-[-120px] h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[100px]"
      />

      <div className="relative">
        {/* Heading */}
        <div>
          <h1 className="text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
            Welcome back.
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/35">
            Sign in to continue to your CRM Outreach workspace.
          </p>
        </div>

        {/* OAuth */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <OAuthButton
            onClick={() => handleOAuth("google")}
            disabled={loading}
          >
            {oauthLoading === "google" ? (
              <Loader2 className="h-[18px] w-[18px] animate-spin" />
            ) : (
              <GoogleIcon />
            )}

            <span>Google</span>
          </OAuthButton>

          <OAuthButton
            onClick={() => handleOAuth("github")}
            disabled={loading}
          >
            {oauthLoading === "github" ? (
              <Loader2 className="h-[18px] w-[18px] animate-spin" />
            ) : (
              <X className="h-[18px] w-[18px]" />
            )}

            <span>GitHub</span>
          </OAuthButton>
        </div>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/[0.07]" />

          <span className="text-[11px] text-white/20">
            or sign in with credentials
          </span>

          <div className="h-px flex-1 bg-white/[0.07]" />
        </div>

        {/* API Error */}
        {apiError && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-red-400/15 bg-red-400/[0.06] px-4 py-3.5 text-sm leading-5 text-red-200"
          >
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />

            <span>{apiError}</span>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Username / Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2.5 block text-xs font-medium text-white/55"
            >
              Username or email
            </label>

            <div className="relative">
              <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />

              <input
                id="email"
                type="text"
                placeholder="Username or email"
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect="off"
                disabled={loading}
                {...register("email")}
                className={[
                  "h-12 w-full rounded-xl border bg-white/[0.025] pl-11 pr-4",
                  "text-sm text-white outline-none transition-all duration-300",
                  "placeholder:text-white/20",
                  "hover:bg-white/[0.035]",
                  "focus:border-white/25 focus:bg-white/[0.04]",
                  "focus:ring-4 focus:ring-white/[0.025]",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  errors.email
                    ? "border-red-400/40"
                    : "border-white/[0.08]",
                ].join(" ")}
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-xs leading-5 text-red-300">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-2.5 flex items-center justify-between gap-4">
              <label
                htmlFor="password"
                className="text-xs font-medium text-white/55"
              >
                Password
              </label>

              <Link
                href={ROUTES.auth.forgotPassword}
                className="text-xs font-medium text-white/35 transition-colors duration-300 hover:text-white"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
                {...register("password")}
                className={[
                  "h-12 w-full rounded-xl border bg-white/[0.025] pl-11 pr-4",
                  "text-sm text-white outline-none transition-all duration-300",
                  "placeholder:text-white/20",
                  "hover:bg-white/[0.035]",
                  "focus:border-white/25 focus:bg-white/[0.04]",
                  "focus:ring-4 focus:ring-white/[0.025]",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  errors.password
                    ? "border-red-400/40"
                    : "border-white/[0.08]",
                ].join(" ")}
              />
            </div>

            {errors.password && (
              <p className="mt-2 text-xs leading-5 text-red-300">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.015] hover:bg-white/90 disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Register */}
        <p className="mt-8 text-center text-sm text-white/30">
          New to CRM Outreach?{" "}
          <Link
            href={ROUTES.auth.register}
            className="font-medium text-white transition-opacity duration-300 hover:opacity-65"
          >
            Create account
          </Link>
        </p>

        {/* Terms */}
        <p className="mx-auto mt-6 max-w-xs text-center text-[10px] leading-5 text-white/15">
          By continuing, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}

function OAuthButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="group flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 text-sm font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />

      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />

      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />

      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}