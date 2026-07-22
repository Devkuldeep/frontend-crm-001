// src/lib/api/mock-client.ts
import { 
  Lead, Campaign, InboxMessage, Meeting, 
  PaginatedResponse, CreateLeadInput, CreateCampaignInput, ScheduleMeetingInput 
} from '../types/api';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Dummy Data ---
let mockLeads: Lead[] = [
  { id: '1', firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', company: 'Acme Corp', position: 'CEO', tags: ['Enterprise', 'High Priority'], status: 'Interested', score: 95, createdAt: new Date().toISOString() },
  { id: '2', firstName: 'Bob', lastName: 'Johnson', email: 'bob@techstartup.io', company: 'TechStartup', position: 'CTO', tags: ['Startup', 'Tech'], status: 'New', score: 60, createdAt: new Date().toISOString() },
  { id: '3', firstName: 'Charlie', lastName: 'Brown', email: 'charlie@design.co', company: 'DesignCo', position: 'Creative Director', tags: ['Design'], status: 'Follow-up', score: 75, createdAt: new Date().toISOString() },
  { id: '4', firstName: 'Diana', lastName: 'Prince', email: 'diana@amazon.com', company: 'Amazon', position: 'VP of Sales', tags: ['Enterprise'], status: 'Contacted', score: 80, createdAt: new Date().toISOString() },
  { id: '5', firstName: 'Evan', lastName: 'Wright', email: 'evan@wright.net', company: 'Wright Net', position: 'Founder', tags: ['SMB'], status: 'Closed Lost', score: 30, createdAt: new Date().toISOString() },
];

let mockCampaigns: Campaign[] = [
  { id: '1', name: 'Q3 Enterprise Outreach', targetAudience: 'Enterprise CEOs', prompt: 'Write a persuasive email offering our AI CRM.', status: 'Active', sentCount: 1500, openCount: 450, replyCount: 80, createdAt: new Date().toISOString() },
  { id: '2', name: 'Startup Tech Founders', targetAudience: 'Tech Startup CTOs', prompt: 'Highlight developer-friendly API features.', status: 'Completed', sentCount: 800, openCount: 300, replyCount: 45, createdAt: new Date().toISOString() },
];

const mockInbox: InboxMessage[] = [
  { id: '1', senderName: 'Alice Smith', senderEmail: 'alice@example.com', subject: 'Re: Interested in your CRM', snippet: 'Hi, this looks promising. Can we schedule a quick demo next week?', classification: 'Interested', summary: 'Alice wants to schedule a demo next week.', suggestedReply: 'Hi Alice, I would be happy to show you a demo. Does Tuesday at 2 PM work for you?', actionRequired: true, receivedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: '2', senderName: 'Evan Wright', senderEmail: 'evan@wright.net', subject: 'Re: Your Outreach', snippet: 'Please remove me from your mailing list.', classification: 'Not Interested', summary: 'Evan requested to be removed from the list.', actionRequired: false, receivedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: '3', senderName: 'Bob Johnson', senderEmail: 'bob@techstartup.io', subject: 'Questions about pricing', snippet: 'We might be interested, but we need more details on your API limits for the startup tier.', classification: 'Follow-up', summary: 'Bob needs pricing and API limit details for the startup tier.', suggestedReply: 'Hi Bob, our startup tier includes 100k API calls/month. Happy to discuss further.', actionRequired: true, receivedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
];

let mockMeetings: Meeting[] = [
  { id: '1', leadId: '1', leadName: 'Alice Smith', title: 'Product Demo with Acme Corp', scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(), durationMinutes: 30, status: 'Scheduled', meetingLink: 'https://meet.google.com/abc-defg-hij' },
  { id: '2', leadId: '4', leadName: 'Diana Prince', title: 'Follow-up Chat', scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), durationMinutes: 15, status: 'Completed' },
];

// --- Mock API Client ---
export const MockAPI = {
  // Leads
  getLeads: async (): Promise<PaginatedResponse<Lead>> => {
    await delay(800);
    return { data: [...mockLeads], total: mockLeads.length, page: 1, limit: 10 };
  },
  createLead: async (input: CreateLeadInput): Promise<Lead> => {
    await delay(500);
    const newLead: Lead = {
      ...input,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New',
      score: Math.floor(Math.random() * 100),
      tags: input.tags || [],
      createdAt: new Date().toISOString()
    };
    mockLeads = [newLead, ...mockLeads];
    return newLead;
  },

  // Campaigns
  getCampaigns: async (): Promise<PaginatedResponse<Campaign>> => {
    await delay(700);
    return { data: [...mockCampaigns], total: mockCampaigns.length, page: 1, limit: 10 };
  },
  createCampaign: async (input: CreateCampaignInput): Promise<Campaign> => {
    await delay(1200); // Simulate AI generation delay
    const newCampaign: Campaign = {
      ...input,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Scheduled',
      sentCount: 0,
      openCount: 0,
      replyCount: 0,
      createdAt: new Date().toISOString()
    };
    mockCampaigns = [newCampaign, ...mockCampaigns];
    return newCampaign;
  },

  // Inbox
  getInbox: async (): Promise<PaginatedResponse<InboxMessage>> => {
    await delay(900);
    return { data: [...mockInbox], total: mockInbox.length, page: 1, limit: 10 };
  },

  // Meetings
  getMeetings: async (): Promise<PaginatedResponse<Meeting>> => {
    await delay(600);
    return { data: [...mockMeetings], total: mockMeetings.length, page: 1, limit: 10 };
  },
  scheduleMeeting: async (input: ScheduleMeetingInput): Promise<Meeting> => {
    await delay(800);
    const lead = mockLeads.find(l => l.id === input.leadId);
    const newMeeting: Meeting = {
      ...input,
      id: Math.random().toString(36).substr(2, 9),
      leadName: lead ? `${lead.firstName} ${lead.lastName}` : 'Unknown Lead',
      title: input.title || 'Scheduled Meeting',
      status: 'Scheduled',
      meetingLink: 'https://meet.google.com/new-meeting-link'
    };
    mockMeetings = [newMeeting, ...mockMeetings];
    return newMeeting;
  },

  // Dashboard Aggregations (Mock)
  getDashboardStats: async () => {
    await delay(500);
    return {
      totalLeads: mockLeads.length,
      activeCampaigns: mockCampaigns.filter(c => c.status === 'Active').length,
      interestedLeads: mockLeads.filter(l => l.status === 'Interested').length,
      upcomingMeetings: mockMeetings.filter(m => m.status === 'Scheduled').length,
      revenueForecast: '$45,000'
    };
  },

  // Analytics
  getAnalytics: async () => {
    await delay(700);
    return {
      revenueTracking: [
        { month: 'Jan', revenue: 15000, target: 12000 },
        { month: 'Feb', revenue: 18000, target: 15000 },
        { month: 'Mar', revenue: 22000, target: 20000 },
        { month: 'Apr', revenue: 25000, target: 22000 },
        { month: 'May', revenue: 31000, target: 28000 },
        { month: 'Jun', revenue: 45000, target: 35000 },
      ],
      pipelineOverview: [
        { stage: 'Prospecting', count: 120, value: 50000 },
        { stage: 'Qualification', count: 80, value: 40000 },
        { stage: 'Proposal', count: 45, value: 35000 },
        { stage: 'Negotiation', count: 20, value: 20000 },
        { stage: 'Closed Won', count: 12, value: 15000 },
      ],
      leadStatistics: [
        { source: 'Organic Search', count: 400 },
        { source: 'Referrals', count: 300 },
        { source: 'Outbound Campaigns', count: 600 },
        { source: 'Social Media', count: 200 },
      ],
      campaignPerformance: [
        { name: 'Q1 Enterprise', sent: 2000, opened: 800, replied: 150 },
        { name: 'Startup Outreach', sent: 1500, opened: 600, replied: 200 },
        { name: 'Webinar Follow-up', sent: 500, opened: 300, replied: 80 },
        { name: 'Churn Reactivation', sent: 300, opened: 100, replied: 15 },
      ]
    };
  }
};
