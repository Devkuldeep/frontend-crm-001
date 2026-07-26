"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen w-full max-w-full items-center justify-center overflow-hidden bg-[#080808] px-6 text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Main glow */}
        <div className="absolute left-1/2 top-[45%] h-[550px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.07] blur-[140px]" />

        {/* Secondary glow */}
        <div className="absolute right-[-10%] top-[5%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.04] blur-[130px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 75%)",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#080808_90%)]" />
      </div>

      {/* Brand */}
      <Link
        href="/"
        className="group absolute left-6 top-6 z-20 flex items-center gap-3 md:left-10 md:top-8"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition-transform duration-300 group-hover:rotate-6">
          <Sparkles className="h-4 w-4" />
        </span>

        <span className="text-sm font-semibold tracking-[-0.035em]">
          CRM Outreach
        </span>
      </Link>

      {/* Error content */}
      <section
        role="alert"
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center py-32 text-center"
      >
        {/* Error visual */}
        <div className="relative mb-10">
          <div className="absolute inset-0 scale-[2] rounded-full bg-violet-500/[0.08] blur-3xl" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.04] shadow-2xl shadow-black backdrop-blur-xl">
            <div className="relative h-7 w-7">
              <span className="absolute left-1/2 top-1/2 h-[2px] w-7 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-white/70" />

              <span className="absolute left-1/2 top-1/2 h-[2px] w-7 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-white/70" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-balance text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.065em]">
          Something went{" "}
          <span className="text-white/25">
            off track.
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-pretty text-sm leading-6 text-white/40 md:text-base md:leading-7">
          We couldn&apos;t complete your request. It may be a temporary issue,
          so trying again should get you back on track.
        </p>

        {/* Actions */}
        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-white px-6 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#080808]"
          >
            <RefreshCw className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />

            Try again
          </button>

          <Link
            href="/"
            className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />

            Back to home
          </Link>
        </div>

        {/* Support */}
        <p className="mt-10 text-xs text-white/20">
          If the problem continues, please contact support.
        </p>

        {/* Optional digest */}
        {error.digest && (
          <p className="mt-3 font-mono text-[10px] tracking-wide text-white/15">
            Reference: {error.digest}
          </p>
        )}
      </section>

      {/* Bottom status */}
      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[11px] text-white/20">
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        CRM Outreach
      </div>
    </main>
  );
}