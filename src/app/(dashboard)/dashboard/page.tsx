import { Suspense } from "react"
import { ViewTransition } from "react"
import { MockAPI } from "@/lib/api/mock-client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Megaphone, Inbox, Calendar, TrendingUp } from "lucide-react"

async function DashboardStats() {
  const stats = await MockAPI.getDashboardStats()
  
  const statCards = [
    { title: "Total Leads", value: stats.totalLeads, icon: Users, color: "text-primary" },
    { title: "Active Campaigns", value: stats.activeCampaigns, icon: Megaphone, color: "text-ai-accent" },
    { title: "Interested Leads", value: stats.interestedLeads, icon: TrendingUp, color: "text-success" },
    { title: "Upcoming Meetings", value: stats.upcomingMeetings, icon: Calendar, color: "text-warning" },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
      <Card className="col-span-1 md:col-span-2 lg:col-span-4 bg-gradient-to-r from-primary to-ai-accent text-surface border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-surface">Revenue Forecast</CardTitle>
          <CardDescription className="text-primary-light">Projected based on interested leads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{stats.revenueForecast}</div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="h-4 w-24 bg-border rounded"></div>
            <div className="h-4 w-4 bg-border rounded-full"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 w-16 bg-border rounded mt-2"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function Dashboard() {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'slide-from-right', 'nav-back': 'slide-from-left', default: 'none' }}
      exit={{ 'nav-forward': 'slide-to-left', 'nav-back': 'slide-to-right', default: 'none' }}
      default="none"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-text-secondary mt-1">Overview of your AI-powered outreach performance.</p>
        </div>

        <Suspense fallback={<ViewTransition exit="slide-down"><StatsSkeleton /></ViewTransition>}>
          <ViewTransition enter="slide-up" default="none">
            <DashboardStats />
          </ViewTransition>
        </Suspense>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Inbox Activity</CardTitle>
              <CardDescription>AI summarized responses from leads.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 text-sm">
                  <div className="bg-success/10 text-success p-2 rounded-full"><Inbox className="h-4 w-4"/></div>
                  <div>
                    <p className="font-medium">Alice Smith <span className="text-text-secondary font-normal ml-2">2 hours ago</span></p>
                    <p className="text-text-secondary mt-1">Alice wants to schedule a demo next week.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-sm">
                  <div className="bg-warning/10 text-warning p-2 rounded-full"><Inbox className="h-4 w-4"/></div>
                  <div>
                    <p className="font-medium">Bob Johnson <span className="text-text-secondary font-normal ml-2">30 mins ago</span></p>
                    <p className="text-text-secondary mt-1">Bob needs pricing and API limit details for the startup tier.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>Scheduled product demos and syncs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 text-sm">
                  <div className="bg-primary/10 text-primary p-2 rounded-full"><Calendar className="h-4 w-4"/></div>
                  <div>
                    <p className="font-medium">Product Demo with Acme Corp</p>
                    <p className="text-text-secondary mt-1">Alice Smith • Dec 12, 2:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ViewTransition>
  )
}
