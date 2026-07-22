import { Suspense } from "react"
import { ViewTransition } from "react"
import { MockAPI } from "@/lib/api/mock-client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Plus, Search } from "lucide-react"

async function LeadsTable() {
  const response = await MockAPI.getLeads()
  
  return (
    <div className="rounded-md border border-border bg-surface">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response.data.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">
                <div>{lead.firstName} {lead.lastName}</div>
                <div className="text-xs text-text-secondary">{lead.email}</div>
              </TableCell>
              <TableCell>
                <div>{lead.company}</div>
                <div className="text-xs text-text-secondary">{lead.position}</div>
              </TableCell>
              <TableCell>
                <Badge variant={
                  lead.status === 'Interested' ? 'success' :
                  lead.status === 'Follow-up' ? 'warning' :
                  lead.status === 'Contacted' ? 'secondary' :
                  lead.status === 'Closed Lost' ? 'destructive' : 'default'
                }>
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-ai-accent h-2 rounded-full" style={{ width: `${lead.score}%` }}></div>
                  </div>
                  <span className="text-xs text-text-secondary">{lead.score}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {lead.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] py-0">{tag}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function LeadsSkeleton() {
  return (
    <div className="rounded-md border border-border bg-surface p-4 space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-4 animate-pulse">
          <div className="h-10 flex-1 bg-border rounded"></div>
          <div className="h-10 flex-1 bg-border rounded"></div>
          <div className="h-10 w-24 bg-border rounded"></div>
        </div>
      ))}
    </div>
  )
}

export default function LeadsPage() {
  return (
    <ViewTransition
      enter={{ 'nav-forward': 'slide-from-right', 'nav-back': 'slide-from-left', default: 'none' }}
      exit={{ 'nav-forward': 'slide-to-left', 'nav-back': 'slide-to-right', default: 'none' }}
      default="none"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
            <p className="text-text-secondary mt-1">Manage and track your outreach targets.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" /> Import CSV
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Lead
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 py-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-secondary" />
            <Input
              placeholder="Search leads..."
              className="pl-9 bg-surface"
            />
          </div>
          <Button variant="outline" className="ml-auto">Filter</Button>
        </div>

        <Suspense fallback={<ViewTransition exit="slide-down"><LeadsSkeleton /></ViewTransition>}>
          <ViewTransition enter="slide-up" default="none">
            <LeadsTable />
          </ViewTransition>
        </Suspense>
      </div>
    </ViewTransition>
  )
}
