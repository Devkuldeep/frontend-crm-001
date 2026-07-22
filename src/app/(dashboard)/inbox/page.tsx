import { Suspense } from "react"
import { ViewTransition } from "react"
import { MockAPI } from "@/lib/api/mock-client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Calendar, Search, Reply, Inbox as InboxIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

async function InboxList() {
  const response = await MockAPI.getInbox()
  
  return (
    <div className="space-y-4">
      {response.data.map((msg) => (
        <Card key={msg.id} className="relative overflow-hidden">
          {msg.actionRequired && <div className="absolute left-0 top-0 bottom-0 w-1 bg-ai-accent"></div>}
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {msg.senderName.charAt(0)}
                </div>
                <div>
                  <CardTitle className="text-base">{msg.senderName}</CardTitle>
                  <CardDescription>{msg.subject}</CardDescription>
                </div>
              </div>
              <Badge variant={
                msg.classification === 'Interested' ? 'success' :
                msg.classification === 'Follow-up' ? 'warning' :
                msg.classification === 'Not Interested' ? 'destructive' : 'default'
              }>
                {msg.classification}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-background border border-border rounded-md text-sm text-text-secondary italic">
              &quot;{msg.snippet}&quot;
            </div>
            
            <div className="flex gap-2 p-3 bg-ai-accent/5 border border-ai-accent/20 rounded-md">
              <Sparkles className="h-5 w-5 text-ai-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-ai-accent">AI Summary</p>
                <p className="text-sm text-text-primary mt-1">{msg.summary}</p>
                {msg.suggestedReply && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Suggested Reply</p>
                    <p className="text-sm border-l-2 border-ai-accent/30 pl-3 py-1 italic">{msg.suggestedReply}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border pt-4 flex gap-2">
            <Button variant="outline" size="sm">
              <Reply className="mr-2 h-4 w-4" /> Reply
            </Button>
            {msg.classification === 'Interested' && (
              <Button variant="ai" size="sm">
                <Calendar className="mr-2 h-4 w-4" /> Schedule Meeting
              </Button>
            )}
            <Button variant="ghost" size="sm" className="ml-auto text-text-secondary">Archive</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function InboxSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="pb-3 flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-border"></div>
            <div className="space-y-2 flex-1">
              <div className="w-32 h-5 bg-border rounded"></div>
              <div className="w-48 h-4 bg-border rounded"></div>
            </div>
            <div className="w-24 h-6 bg-border rounded-full"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-16 w-full bg-border rounded-md"></div>
            <div className="h-24 w-full bg-border rounded-md"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function InboxPage() {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'slide-from-right', 'nav-back': 'slide-from-left', default: 'none' }}
      exit={{ 'nav-forward': 'slide-to-left', 'nav-back': 'slide-to-right', default: 'none' }}
      default="none"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Inbox</h1>
            <p className="text-text-secondary mt-1">AI-classified responses and actionable insights.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <InboxIcon className="mr-2 h-4 w-4" /> Sync Now
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-secondary" />
            <Input
              placeholder="Search conversations..."
              className="pl-9 bg-surface"
            />
          </div>
          <Button variant="outline">Filter: Unread</Button>
        </div>

        <Suspense fallback={<ViewTransition exit="slide-down"><InboxSkeleton /></ViewTransition>}>
          <ViewTransition enter="slide-up" default="none">
            <InboxList />
          </ViewTransition>
        </Suspense>
      </div>
    </ViewTransition>
  )
}
