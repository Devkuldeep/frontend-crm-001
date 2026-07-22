import { Suspense } from "react"
import { ViewTransition } from "react"
import { MockAPI } from "@/lib/api/mock-client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Plus, Link as LinkIcon, Video } from "lucide-react"

async function MeetingsList() {
  const response = await MockAPI.getMeetings()
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {response.data.map((meeting) => (
        <Card key={meeting.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Calendar className="h-5 w-5" />
              </div>
              <Badge variant={
                meeting.status === 'Scheduled' ? 'default' :
                meeting.status === 'Completed' ? 'success' :
                meeting.status === 'Canceled' ? 'destructive' : 'default'
              }>
                {meeting.status}
              </Badge>
            </div>
            <CardTitle className="text-lg">{meeting.title}</CardTitle>
            <CardDescription className="line-clamp-1 font-medium text-text-primary">{meeting.leadName}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="text-sm text-text-secondary">
              {new Date(meeting.scheduledAt).toLocaleString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })} • {meeting.durationMinutes} mins
            </div>
            {meeting.meetingLink && (
              <div className="flex items-center gap-2 p-2 bg-background border border-border rounded-md text-sm text-primary">
                <Video className="h-4 w-4" />
                <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                  {meeting.meetingLink}
                </a>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t border-border pt-4 flex gap-2">
            {meeting.status === 'Scheduled' && (
              <>
                <Button className="w-full">Join Meeting</Button>
                <Button variant="outline" size="icon"><LinkIcon className="h-4 w-4" /></Button>
              </>
            )}
            {meeting.status !== 'Scheduled' && (
              <Button variant="outline" className="w-full">View Notes</Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function MeetingsSkeleton() {
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
          <CardContent className="flex-1 space-y-2">
            <div className="w-full h-4 bg-border rounded"></div>
            <div className="w-full h-10 bg-border rounded"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function MeetingsPage() {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'slide-from-right', 'nav-back': 'slide-from-left', default: 'none' }}
      exit={{ 'nav-forward': 'slide-to-left', 'nav-back': 'slide-to-right', default: 'none' }}
      default="none"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
            <p className="text-text-secondary mt-1">Manage scheduled calls and automated follow-ups.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Schedule Meeting
          </Button>
        </div>

        <div className="flex border-b border-border mb-6">
          <button className="px-4 py-2 border-b-2 border-primary text-primary font-medium">Upcoming</button>
          <button className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors">Past</button>
          <button className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors">Canceled</button>
        </div>

        <Suspense fallback={<ViewTransition exit="slide-down"><MeetingsSkeleton /></ViewTransition>}>
          <ViewTransition enter="slide-up" default="none">
            <MeetingsList />
          </ViewTransition>
        </Suspense>
      </div>
    </ViewTransition>
  )
}
