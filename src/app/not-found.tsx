import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen w-full max-w-full items-center justify-center overflow-x-hidden bg-[#080808] px-6 text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[100px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="absolute left-0 top-0 z-20 flex w-full items-center justify-between px-6 py-7 md:px-10">
        <Link
          href="/"
          className="text-lg font-semibold tracking-[-0.03em] transition-opacity hover:opacity-60"
        >
          YourBrand
        </Link>

        <Link
          href="/"
          className="text-sm text-white/50 transition-colors hover:text-white"
        >
          Home
        </Link>
      </nav>

      {/* Error content */}
      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center py-32 text-center">
        <div className="relative select-none">
          <h1 className="bg-gradient-to-b from-white via-white/80 to-white/10 bg-clip-text text-[clamp(8rem,25vw,20rem)] font-semibold leading-[0.72] tracking-[-0.09em] text-transparent">
            404
          </h1>

          <div className="absolute left-[57%] top-[2%] h-2 w-2 rounded-full bg-white shadow-[0_0_30px_8px_rgba(255,255,255,0.25)]" />
        </div>

        <div className="relative z-10 -mt-2 flex max-w-3xl flex-col items-center md:-mt-5">
          <h2 className="max-w-5xl text-balance text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">
            This page drifted into the unknown.
          </h2>

          <p className="mt-5 max-w-lg text-pretty text-sm leading-6 text-white/45 md:text-base md:leading-7">
            The page you&apos;re looking for may have moved, been removed, or
            never existed in the first place.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03]"
            >
              Back to home

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 text-sm font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.07]"
            >
              Contact support
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 z-20 flex w-full items-center justify-between px-6 py-7 text-xs text-white/25 md:px-10">
        <span>Lost, but not stuck.</span>
        <span>404</span>
      </footer>
    </main>
  );
}