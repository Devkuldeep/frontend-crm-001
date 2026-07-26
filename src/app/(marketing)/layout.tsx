import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Sparkles,
  X,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";

type MarketingLayoutProps = {
  children: ReactNode;
};

const productLinks = [
  {
    label: "Features",
    href: "/#features",
  },
  {
    label: "Workflow",
    href: "/#workflow",
  },
  {
    label: "Pricing",
    href: ROUTES.marketing.pricing,
  },
  {
    label: "Integrations",
    href: "#",
  },
];

const companyLinks = [
  {
    label: "About",
    href: ROUTES.marketing.about,
  },
  {
    label: "Contact",
    href: ROUTES.marketing.contact,
  },
  {
    label: "Careers",
    href: "#",
  },
  {
    label: "Blog",
    href: "#",
  },
];

const resourceLinks = [
  {
    label: "Documentation",
    href: "#",
  },
  {
    label: "Changelog",
    href: "#",
  },
  {
    label: "Privacy",
    href: "#",
  },
  {
    label: "Terms",
    href: "#",
  },
];

export default function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden bg-[#080808] text-white selection:bg-white selection:text-black">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-5">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border border-white/[0.08] bg-[#0b0b0b]/80 px-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:px-5">
          {/* Brand */}
          <Link
            href={ROUTES.marketing.home}
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition-transform duration-300 group-hover:rotate-6">
              <Sparkles className="h-4 w-4" />
            </span>

            <span className="hidden text-[15px] font-semibold tracking-[-0.035em] sm:block">
              CRM Outreach
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            <NavLink href="/#features">Features</NavLink>

            <NavLink href="/#workflow">Workflow</NavLink>

            <NavLink href={ROUTES.marketing.pricing}>
              Pricing
            </NavLink>

            <NavLink href={ROUTES.marketing.about}>
              About
            </NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href={ROUTES.auth.login}
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/45 transition-colors duration-300 hover:text-white md:inline-flex"
            >
              Sign in
            </Link>

            <Link
              href="/dashboard"
              className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.03] sm:px-5"
            >
              Get started

              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-white/[0.06]">
        {/* Ambient effects */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute bottom-[-300px] left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-500/[0.06] blur-[130px]" />

          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-24 md:pb-10 md:pt-32">
          {/* Footer Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-12 md:gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-5">
              <Link
                href={ROUTES.marketing.home}
                className="group inline-flex items-center gap-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black transition-transform duration-300 group-hover:rotate-6">
                  <Sparkles className="h-4 w-4" />
                </span>

                <span className="text-lg font-semibold tracking-[-0.04em]">
                  CRM Outreach
                </span>
              </Link>

              <h2 className="mt-8 max-w-md text-3xl font-medium leading-[1.05] tracking-[-0.045em] md:text-4xl">
                Smarter outreach.
                <br />

                <span className="text-white/25">
                  More conversations.
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-white/35">
                AI-native sales automation for personalized campaigns, lead
                intelligence, reply management, and effortless meeting
                scheduling.
              </p>

              <div className="mt-8 flex gap-2">
                <SocialLink href="#" label="Twitter">
                  <X className="h-4 w-4" />
                </SocialLink>

                <SocialLink href="#" label="GitHub">
                  <X className="h-4 w-4" />
                </SocialLink>

                <SocialLink href="#" label="LinkedIn">
                  <X className="h-4 w-4" />
                </SocialLink>
              </div>
            </div>

            <FooterColumn
              title="Product"
              links={productLinks}
              className="col-span-1 md:col-span-2"
            />

            <FooterColumn
              title="Company"
              links={companyLinks}
              className="col-span-1 md:col-span-2"
            />

            <FooterColumn
              title="Resources"
              links={resourceLinks}
              className="col-span-2 md:col-span-3"
            />
          </div>

          {/* Large Brand Text */}
          <div className="mt-24 overflow-hidden border-b border-white/[0.06] pb-8 md:mt-32">
            <p
              aria-hidden="true"
              className="select-none whitespace-nowrap text-[clamp(4rem,12vw,10rem)] font-semibold leading-[0.75] tracking-[-0.075em] text-white/[0.035]"
            >
              CRM OUTREACH
            </p>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col gap-5 pt-7 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} CRM Outreach Inc. All rights
              reserved.
            </p>

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-full px-4 py-2 text-sm text-white/45 transition-colors duration-300 hover:bg-white/[0.05] hover:text-white"
    >
      {children}
    </Link>
  );
}

type FooterColumnProps = {
  title: string;
  className?: string;
  links: {
    label: string;
    href: string;
  }[];
};

function FooterColumn({
  title,
  className,
  links,
}: FooterColumnProps) {
  return (
    <div className={className}>
      <h3 className="text-sm font-medium text-white">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1 text-sm text-white/35 transition-colors duration-300 hover:text-white"
            >
              {link.label}

              <ArrowUpRight className="h-3 w-3 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/40 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
    >
      {children}
    </Link>
  );
}