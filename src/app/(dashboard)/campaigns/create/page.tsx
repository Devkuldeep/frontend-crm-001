"use client"

import { useState } from "react"
import { ViewTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MockAPI } from "@/lib/api/mock-client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react"

export default function CreateCampaignPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ name: '', targetAudience: '', prompt: '' })
  const [aiPreview, setAiPreview] = useState('')

  const handleGenerate = async () => {
    setLoading(true)
    // Simulate AI Generation
    setTimeout(() => {
      setAiPreview(`Subject: Special invitation for ${formData.targetAudience}

Hi {{FirstName}},

I noticed the incredible work you are doing at {{Company}} and wanted to personally reach out. Our new AI-Powered CRM was built specifically with your goals in mind...`)
      setLoading(false)
      setStep(2)
    }, 1500)
  }

  const handleLaunch = async () => {
    setLoading(true)
    await MockAPI.createCampaign(formData)
    setLoading(false)
    router.push('/campaigns')
  }

  return (
    <ViewTransition
      enter={{ 'nav-forward': 'slide-from-right', 'nav-back': 'slide-from-left', default: 'none' }}
      exit={{ 'nav-forward': 'slide-to-left', 'nav-back': 'slide-to-right', default: 'none' }}
      default="none"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/campaigns" transitionTypes={["nav-back"]}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create AI Campaign</h1>
            <p className="text-sm text-text-secondary">Configure audience and AI prompt.</p>
          </div>
        </div>

        {step === 1 && (
          <ViewTransition enter="fade-in" exit="fade-out" default="none">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
                <CardDescription>Enter the parameters for the AI generation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Name</label>
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    placeholder="e.g. Q4 Tech Founders Outreach" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Audience (Tags)</label>
                  <Input 
                    value={formData.targetAudience} 
                    onChange={e => setFormData({...formData, targetAudience: e.target.value})} 
                    placeholder="e.g. Startup, Tech" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">AI Prompt / Event Context</label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    value={formData.prompt}
                    onChange={e => setFormData({...formData, prompt: e.target.value})}
                    placeholder="Describe the goal of the email. What are we selling? What is the call to action?"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t border-border pt-4">
                <Button variant="outline" onClick={() => router.push('/campaigns')}>Cancel</Button>
                <Button variant="ai" onClick={handleGenerate} disabled={loading || !formData.name || !formData.prompt}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Generate AI Preview
                </Button>
              </CardFooter>
            </Card>
          </ViewTransition>
        )}

        {step === 2 && (
          <ViewTransition enter="slide-up" exit="slide-down" default="none">
            <Card className="border-ai-accent">
              <CardHeader className="bg-ai-accent/5">
                <CardTitle className="text-ai-accent flex items-center gap-2">
                  <Sparkles className="h-5 w-5" /> AI Generated Preview
                </CardTitle>
                <CardDescription>Review the generated template before launching.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="p-4 rounded-lg bg-background border border-border text-sm whitespace-pre-wrap font-mono">
                  {aiPreview}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-border pt-4">
                <Button variant="ghost" onClick={() => setStep(1)}>Back to Edit</Button>
                <Button onClick={handleLaunch} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Launch Campaign'}
                </Button>
              </CardFooter>
            </Card>
          </ViewTransition>
        )}
      </div>
    </ViewTransition>
  )
}
