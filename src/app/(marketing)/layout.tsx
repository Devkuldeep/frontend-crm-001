import Link from "next/link";
import type { ReactNode } from "react";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary selection:bg-primary/20 selection:text-primary-dark">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-12">
          <Link href={ROUTES.marketing.home} className="flex items-center gap-2" transitionTypes={["nav-forward"]}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-ai-accent text-surface font-bold shadow-sm">
              AI
            </div>
            <span className="text-xl font-bold tracking-tight">CRM Outreach</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
              Customers
            </Link>
            <Link href={ROUTES.marketing.pricing} className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href={ROUTES.auth.login} className="hidden sm:inline-block text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
              Sign In
            </Link>
            <Link href="/dashboard" transitionTypes={["nav-forward"]}>
              <Button className="rounded-full shadow-sm hover:shadow-md transition-all">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-surface py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 grid gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-[10px] text-surface font-bold">
                AI
              </div>
              <span className="text-lg font-bold tracking-tight">CRM Outreach</span>
            </div>
            <p className="text-sm text-text-secondary max-w-xs">
              The AI-native CRM platform that writes personalized emails, manages leads, and schedules meetings for you.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href={ROUTES.marketing.pricing} className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href={ROUTES.marketing.about} className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href={ROUTES.marketing.contact} className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-sm text-text-secondary">
          <p>© {new Date().getFullYear()} CRM Outreach Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-primary transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
