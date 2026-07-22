// src/lib/types/api.ts

// --- Generic Types ---
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// --- Auth Types ---
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  teamId?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// --- Lead Management ---
export type LeadStatus = 'New' | 'Contacted' | 'Interested' | 'Follow-up' | 'Closed Lost';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  position: string;
  tags: string[];
  status: LeadStatus;
  score: number;
  createdAt: string;
}

export interface CreateLeadInput {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  position: string;
  tags?: string[];
}

// --- Campaigns & Outreach ---
export type CampaignStatus = 'Draft' | 'Scheduled' | 'Active' | 'Completed';

export interface Campaign {
  id: string;
  name: string;
  targetAudience: string;
  prompt: string;
  status: CampaignStatus;
  sentCount: number;
  openCount: number;
  replyCount: number;
  createdAt: string;
}

export interface CreateCampaignInput {
  name: string;
  targetAudience: string;
  prompt: string;
}

// --- Inbox Assistant ---
export type EmailClassification = 'Interested' | 'Not Interested' | 'Follow-up' | 'Spam' | 'Meeting Request';

export interface InboxMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  classification: EmailClassification;
  summary: string;
  suggestedReply?: string;
  actionRequired: boolean;
  receivedAt: string;
}

// --- Meetings ---
export type MeetingStatus = 'Scheduled' | 'Completed' | 'Canceled';

export interface Meeting {
  id: string;
  leadId: string;
  leadName: string;
  title: string;
  scheduledAt: string;
  durationMinutes: number;
  status: MeetingStatus;
  meetingLink?: string;
}

export interface ScheduleMeetingInput {
  leadId: string;
  scheduledAt: string;
  durationMinutes: number;
  title?: string;
}

// --- Analytics ---
export interface RevenueDataPoint {
  month: string;
  revenue: number;
  target: number;
}

export interface PipelineStageData {
  stage: string;
  count: number;
  value: number;
}

export interface LeadSourceData {
  source: string;
  count: number;
}

export interface CampaignMetrics {
  name: string;
  sent: number;
  opened: number;
  replied: number;
}

export interface AnalyticsData {
  revenueTracking: RevenueDataPoint[];
  pipelineOverview: PipelineStageData[];
  leadStatistics: LeadSourceData[];
  campaignPerformance: CampaignMetrics[];
}
