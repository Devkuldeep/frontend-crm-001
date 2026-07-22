"use client";

import { useEffect, useState } from "react";
import { ViewTransition } from "react";
import { MockAPI } from "@/lib/api/mock-client";
import { AnalyticsData } from "@/lib/types/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
  PieChart, Pie, Cell
} from "recharts";
import { TrendingUp, Users, Target, Activity } from "lucide-react";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--ai-accent))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--danger))'];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    MockAPI.getAnalytics().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-border rounded"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-border rounded-xl"></div>)}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-[400px] bg-border rounded-xl"></div>
          <div className="h-[400px] bg-border rounded-xl"></div>
        </div>
      </div>
    );
  }

  // Calculate top KPIs
  const currentRevenue = data.revenueTracking[data.revenueTracking.length - 1].revenue;
  const targetRevenue = data.revenueTracking[data.revenueTracking.length - 1].target;
  const pipelineTotal = data.pipelineOverview.reduce((acc, curr) => acc + curr.value, 0);
  const totalLeads = data.leadStatistics.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <ViewTransition
      enter={{ 'nav-forward': 'slide-from-right', 'nav-back': 'slide-from-left', default: 'none' }}
      exit={{ 'nav-forward': 'slide-to-left', 'nav-back': 'slide-to-right', default: 'none' }}
      default="none"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Overview</h1>
          <p className="text-text-secondary mt-1">Detailed metrics on revenue, pipeline, and campaign performance.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Current Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentRevenue.toLocaleString()}</div>
              <p className="text-xs text-text-secondary mt-1">Target: ${targetRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Pipeline Value</CardTitle>
              <Target className="h-4 w-4 text-ai-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${pipelineTotal.toLocaleString()}</div>
              <p className="text-xs text-text-secondary mt-1">Across {data.pipelineOverview.length} stages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads.toLocaleString()}</div>
              <p className="text-xs text-text-secondary mt-1">From {data.leadStatistics.length} sources</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">Active Campaigns</CardTitle>
              <Activity className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.campaignPerformance.length}</div>
              <p className="text-xs text-text-secondary mt-1">Running currently</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Revenue Tracking */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Revenue vs Target</CardTitle>
              <CardDescription>Monthly revenue tracking over the past 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.revenueTracking} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--ai-accent))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--ai-accent))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="month" stroke="hsl(var(--text-secondary))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--text-secondary))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--surface))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                      itemStyle={{ color: 'hsl(var(--text-primary))' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Area type="monotone" dataKey="target" stroke="hsl(var(--ai-accent))" fillOpacity={1} fill="url(#colorTarget)" />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pipeline Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Overview</CardTitle>
              <CardDescription>Value across different stages.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.pipelineOverview} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                    <XAxis type="number" stroke="hsl(var(--text-secondary))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis dataKey="stage" type="category" stroke="hsl(var(--text-secondary))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{fill: 'hsl(var(--border)/0.5)'}}
                      contentStyle={{ backgroundColor: 'hsl(var(--surface))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--ai-accent))" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Engagement metrics across active campaigns.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.campaignPerformance} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="name" stroke="hsl(var(--text-secondary))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--text-secondary))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{fill: 'hsl(var(--border)/0.5)'}}
                      contentStyle={{ backgroundColor: 'hsl(var(--surface))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Bar dataKey="sent" fill="hsl(var(--border))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="opened" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="replied" fill="hsl(var(--ai-accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Lead Sources */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
              <CardDescription>Distribution of lead acquisition.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.leadStatistics}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                      nameKey="source"
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {data.leadStatistics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--surface))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ViewTransition>
  );
}