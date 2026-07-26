import { Sparkles } from "lucide-react";

export default function LoadingPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#080808] text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.08] blur-[120px]" />

        {/* Secondary glow */}
        <div className="absolute right-[-10%] top-[10%] h-[350px] w-[350px] rounded-full bg-blue-500/[0.04] blur-[120px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 70%)",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#080808_85%)]" />
      </div>

      {/* Loader */}
      <div
        role="status"
        aria-live="polite"
        className="relative z-10 flex flex-col items-center"
      >
        {/* Brand mark */}
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 scale-[1.8] rounded-2xl bg-white/[0.08] blur-2xl" />

          {/* Outer animated ring */}
          <div className="absolute -inset-3 animate-[spin_3s_linear_infinite] rounded-[1.35rem] border border-transparent border-t-white/30" />

          <div className="relative flex h-14 w-14 animate-[loaderPulse_2s_ease-in-out_infinite] items-center justify-center rounded-2xl bg-white text-black shadow-2xl shadow-white/5">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        {/* Brand */}
        <div className="mt-7 text-center">
          <p className="text-base font-semibold tracking-[-0.035em]">
            CRM Outreach
          </p>

          <p className="mt-2 text-xs text-white/30">
            Preparing your workspace
          </p>
        </div>

        {/* Progress */}
        <div className="mt-7 h-[2px] w-36 overflow-hidden rounded-full bg-white/[0.08]">
          <div className="h-full w-1/2 animate-[loaderProgress_1.5s_ease-in-out_infinite] rounded-full bg-white/80" />
        </div>

        <span className="sr-only">
          Loading CRM Outreach...
        </span>
      </div>
    </main>
  );
}