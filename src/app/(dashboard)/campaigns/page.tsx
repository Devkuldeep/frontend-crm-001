import { Suspense } from "react"
import { ViewTransition } from "react"
import Link from "next/link"
import { MockAPI } from "@/lib/api/mock-client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Megaphone, Plus } from "lucide-react"

async function CampaignsList() {
  const response = await MockAPI.getCampaigns()
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {response.data.map((campaign) => (
        <Card key={campaign.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-ai-accent/10 flex items-center justify-center text-ai-accent mb-2">
                <Megaphone className="h-5 w-5" />
              </div>
              <Badge variant={
                campaign.status === 'Active' ? 'success' :
                campaign.status === 'Completed' ? 'secondary' :
                campaign.status === 'Scheduled' ? 'warning' : 'default'
              }>
                {campaign.status}
              </Badge>
            </div>
            <CardTitle>{campaign.name}</CardTitle>
            <CardDescription className="line-clamp-1">{campaign.targetAudience}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="grid grid-cols-3 gap-4 text-center divide-x divide-border bg-background rounded-lg p-3">
              <div>
                <p className="text-xs text-text-secondary mb-1">Sent</p>
                <p className="font-semibold">{campaign.sentCount}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Open</p>
                <p className="font-semibold text-primary">{campaign.sentCount ? Math.round((campaign.openCount / campaign.sentCount) * 100) : 0}%</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Reply</p>
                <p className="font-semibold text-ai-accent">{campaign.sentCount ? Math.round((campaign.replyCount / campaign.sentCount) * 100) : 0}%</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border pt-4">
            <Button variant="ghost" className="w-full text-text-secondary">View Analytics</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function CampaignsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse flex flex-col h-64">
          <CardHeader className="space-y-4">
            <div className="flex justify-between">
              <div className="w-10 h-10 bg-border rounded-lg"></div>
              <div className="w-16 h-6 bg-border rounded-full"></div>
            </div>
            <div className="w-3/4 h-6 bg-border rounded"></div>
            <div className="w-1/2 h-4 bg-border rounded"></div>
          </CardHeader>
          <CardContent className="flex-1"></CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function CampaignsPage() {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'slide-from-right', 'nav-back': 'slide-from-left', default: 'none' }}
      exit={{ 'nav-forward': 'slide-to-left', 'nav-back': 'slide-to-right', default: 'none' }}
      default="none"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
            <p className="text-text-secondary mt-1">Manage AI outreach campaigns and track metrics.</p>
          </div>
          <Link href="/campaigns/create" transitionTypes={["nav-forward"]}>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Create Campaign
            </Button>
          </Link>
        </div>

        <Suspense fallback={<ViewTransition exit="slide-down"><CampaignsSkeleton /></ViewTransition>}>
          <ViewTransition enter="slide-up" default="none">
            <CampaignsList />
          </ViewTransition>
        </Suspense>
      </div>
    </ViewTransition>
  )
}
