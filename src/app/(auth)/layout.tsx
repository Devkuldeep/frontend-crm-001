import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { ROUTES } from "@/constants/routes";
import { ViewTransition } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'slide-from-right', 'nav-back': 'slide-from-left', default: 'none' }}
      exit={{ 'nav-forward': 'slide-to-left', 'nav-back': 'slide-to-right', default: 'none' }}
      default="none"
    >
      <div className="min-h-screen w-full flex bg-background text-text-primary selection:bg-primary/20 selection:text-primary-dark">
        {/* Left Side: Branding / Visual */}
        <div className="hidden lg:flex flex-1 relative bg-surface border-r border-border overflow-hidden">
          {/* Abstract Image Background */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/auth-bg.png" 
              alt="CRM Platform Architecture" 
              fill 
              className="object-cover opacity-90"
              priority
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
          
          <div className="relative z-10 flex flex-col justify-between p-12 h-full">
            <Link href={ROUTES.marketing.home} className="flex items-center gap-2" transitionTypes={["nav-back"]}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-ai-accent text-surface font-bold shadow-lg">
                AI
              </div>
              <span className="text-2xl font-bold tracking-tight text-white drop-shadow-md">CRM Outreach</span>
            </Link>

            <div className="space-y-6 max-w-lg mb-10">
              <h1 className="text-4xl font-bold text-white drop-shadow-sm leading-tight">
                Supercharge your pipeline with intelligent automation.
              </h1>
              <p className="text-lg text-white/80 font-medium">
                Join thousands of teams using our AI-native CRM to close deals faster and manage leads effortlessly.
              </p>
              
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 rounded-full border-2 border-background bg-primary/20 backdrop-blur-sm"></div>
                  <div className="h-10 w-10 rounded-full border-2 border-background bg-ai-accent/20 backdrop-blur-sm"></div>
                  <div className="h-10 w-10 rounded-full border-2 border-background bg-success/20 backdrop-blur-sm"></div>
                </div>
                <p className="text-sm text-white/90 font-medium">Trusted by 10,000+ professionals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 xl:px-32 relative">
          <div className="absolute top-6 left-6 lg:hidden">
            <Link href={ROUTES.marketing.home} className="flex items-center gap-2" transitionTypes={["nav-back"]}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-ai-accent text-surface font-bold shadow-sm">
                AI
              </div>
              <span className="text-xl font-bold tracking-tight">CRM</span>
            </Link>
          </div>
          
          <div className="mx-auto w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
