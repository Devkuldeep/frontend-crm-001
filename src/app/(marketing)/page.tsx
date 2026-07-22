"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Inbox, Calendar, Zap, Users, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MarketingHomePage() {
  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full pt-24 pb-32 md:pt-32 md:pb-40 flex flex-col items-center justify-center text-center px-6">
        {/* Background Gradients */}
        <div className="absolute top-0 inset-x-0 h-full w-full bg-background overflow-hidden -z-10">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-ai-accent/20 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border/50 text-sm font-medium text-text-secondary mb-8 shadow-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-ai-accent animate-pulse" />
          Introducing AI-Powered Outreach v2.0
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-text-primary leading-[1.1]"
        >
          Close more deals with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-ai-accent">intelligent</span> automation.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl"
        >
          Stop writing manual follow-ups. Our AI analyzes your leads, crafts personalized campaigns, and automatically schedules meetings in your calendar.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/dashboard" transitionTypes={["nav-forward"]}>
            <Button size="lg" className="w-full sm:w-auto text-base rounded-full shadow-lg hover:shadow-primary/25 transition-all">
              Start for free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto text-base rounded-full bg-surface/50 backdrop-blur-sm">
            Book a Demo
          </Button>
        </motion.div>
      </section>

      {/* Stats/Social Proof */}
      <section className="w-full border-y border-border/50 bg-surface/30 py-10 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm font-medium text-text-secondary mb-6 uppercase tracking-wider">Trusted by innovative sales teams</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock Company Logos */}
            <div className="flex justify-center items-center font-bold text-xl font-serif">Acme Corp</div>
            <div className="flex justify-center items-center font-bold text-xl tracking-tighter">GlobalTech</div>
            <div className="flex justify-center items-center font-bold text-xl italic">Innovate.io</div>
            <div className="flex justify-center items-center font-bold text-xl uppercase">Nexus</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-full py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to scale your outreach</h2>
            <p className="text-lg text-text-secondary">A complete toolset designed to put your lead generation and follow-ups on autopilot without losing the human touch.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="h-full border-border/50 bg-surface/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-md transition-all">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <Bot className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">AI Campaign Writer</h3>
                  <p className="text-text-secondary leading-relaxed">Instantly generate hyper-personalized email sequences based on target audience profiles and context prompts.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="h-full border-border/50 bg-surface/50 backdrop-blur-sm hover:border-ai-accent/30 hover:shadow-md transition-all">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-xl bg-ai-accent/10 flex items-center justify-center text-ai-accent mb-6">
                    <Inbox className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Smart Inbox Assistant</h3>
                  <p className="text-text-secondary leading-relaxed">Automatically categorize incoming replies as interested, follow-up, or not interested. Get concise AI summaries of long threads.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="h-full border-border/50 bg-surface/50 backdrop-blur-sm hover:border-success/30 hover:shadow-md transition-all">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center text-success mb-6">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Automated Scheduling</h3>
                  <p className="text-text-secondary leading-relaxed">Seamlessly integrate with Google Calendar. Let the AI suggest meeting times and handle the booking flow directly within the thread.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="h-full border-border/50 bg-surface/50 backdrop-blur-sm hover:border-warning/30 hover:shadow-md transition-all">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center text-warning mb-6">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Lead Intelligence</h3>
                  <p className="text-text-secondary leading-relaxed">Upload CSVs and let the system automatically score leads, assign tags, and prioritize your daily outreach targets.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="h-full border-border/50 bg-surface/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-md transition-all">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-xl bg-primary-light flex items-center justify-center text-primary-dark mb-6">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Actionable Analytics</h3>
                  <p className="text-text-secondary leading-relaxed">Track open rates, reply rates, and meeting conversions in real-time. Forecast your pipeline revenue accurately.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="h-full border-border/50 bg-surface/50 backdrop-blur-sm hover:border-border hover:shadow-md transition-all">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-xl bg-border flex items-center justify-center text-text-primary mb-6">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Enterprise Grade</h3>
                  <p className="text-text-secondary leading-relaxed">Built with robust API contracts, modular architecture, and secure mock data simulations for testing and scaling.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-surface border border-primary/20 rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-ai-accent/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            
            <Zap className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to transform your sales workflow?</h2>
            <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto">
              Join thousands of professionals saving 10+ hours a week and closing more deals with AI.
            </p>
            <Link href="/dashboard" transitionTypes={["nav-forward"]}>
              <Button size="lg" className="rounded-full text-lg px-8 py-6 shadow-xl hover:shadow-primary/30 transition-all">
                Get Started for Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
