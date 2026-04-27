# Low-Level Design (LLD)

## Project: AI-Powered CRM Outreach, Inbox Intelligence & Meeting Automation Platform

---

# 1. Introduction

This document defines the detailed technical implementation of the platform including:

* Module-level architecture
* Database schema design
* API contracts
* Service interactions
* Background jobs
* External integrations
* Security controls
* Deployment-level implementation

---

# 2. Detailed Module Breakdown

# 2.1 Authentication Module

## Components

```txt
auth/
├── controllers/
├── services/
├── repositories/
├── dto/
├── validators/
├── hooks/
└── auth.module.ts
```

## Responsibilities

* Register/login
* Google OAuth
* JWT/session handling
* Token refresh
* Password reset
* Role management
* Session persistence

## Collections

### users

```ts
{
  _id,
  name,
  email,
  passwordHash,
  role,
  googleId,
  teamId,
  createdAt,
  updatedAt
}
```

### sessions

```ts
{
  _id,
  userId,
  accessToken,
  refreshToken,
  expiresAt
}
```

---

# 2.2 Lead Management Module

## Components

```txt
leads/
├── controllers/
├── services/
├── repositories/
├── dto/
├── schemas/
├── validators/
└── leads.module.ts
```

## Features

* CSV upload
* CSV parsing
* Deduplication
* Validation
* Tagging
* Lead scoring
* Search/filter
* Lead status updates

## Collections

### leads

```ts
{
  _id,
  userId,
  firstName,
  lastName,
  email,
  company,
  position,
  tags: [],
  source,
  status,
  notes,
  score,
  createdAt,
  updatedAt
}
```

### lead_import_jobs

```ts
{
  _id,
  userId,
  fileName,
  totalRecords,
  successfulImports,
  failedImports,
  status,
  createdAt
}
```

---

# 2.3 Campaign Module

## Features

* Campaign creation
* Audience segmentation
* Template selection
* AI email generation
* Scheduling
* Gmail bulk sending
* Tracking

## Collections

### campaigns

```ts
{
  _id,
  userId,
  name,
  targetAudience,
  prompt,
  templateId,
  status,
  scheduledAt,
  createdAt
}
```

### campaign_leads

```ts
{
  _id,
  campaignId,
  leadId,
  generatedEmail,
  sendStatus,
  openStatus,
  replyStatus,
  sentAt
}
```

---

# 2.4 AI Outreach Module

## Services

* Prompt builder
* Audience analyzer
* Event contextualizer
* Email generator
* Tone optimizer
* Follow-up generator

## Inputs

```ts
{
  leadProfile,
  eventDescription,
  audienceType,
  campaignGoal,
  tone
}
```

## Outputs

```ts
{
  subject,
  body,
  CTA,
  personalizationFactors
}
```

## Prompt Flow

```txt
Lead Data + Event + Audience + Goal → Prompt Engine → OpenAI API → Generated Outreach
```

---

# 2.5 Gmail Integration Module

## Responsibilities

* OAuth2 authentication
* Gmail token storage
* Bulk email sending
* Delivery monitoring
* Inbox sync
* Webhook handlers

## Collections

### integrations

```ts
{
  _id,
  userId,
  provider,
  accessToken,
  refreshToken,
  expiry,
  scopes,
  status
}
```

### emails

```ts
{
  _id,
  userId,
  leadId,
  campaignId,
  gmailMessageId,
  subject,
  body,
  deliveryStatus,
  opened,
  replied,
  createdAt
}
```

## Queue Jobs

* send-email
* retry-email
* sync-email-status
* fetch-replies

---

# 2.6 Inbox Assistant Module

## Responsibilities

* Fetch replies
* Parse email content
* AI classify
* Summarize
* Suggest actions
* Suggest replies

## Classification Labels

* Interested
* Not Interested
* Follow-Up Required
* Spam
* Meeting Request

## Collections

### inbox_messages

```ts
{
  _id,
  userId,
  gmailMessageId,
  sender,
  subject,
  content,
  classification,
  summary,
  suggestedReply,
  priority,
  actionRequired,
  processedAt
}
```

## AI Flow

```txt
Incoming Email → Parser → OpenAI Classification → Summary → Suggested Action → Dashboard
```

---

# 2.7 Meeting Scheduler Module

## Responsibilities

* Calendar sync
* Availability lookup
* Meeting booking links
* Event creation
* Reminder generation
* Follow-up workflows

## Collections

### meetings

```ts
{
  _id,
  userId,
  leadId,
  campaignId,
  googleEventId,
  scheduledAt,
  timezone,
  meetingLink,
  status,
  notes
}
```

---

# 2.8 Dashboard Module

## Widgets

* Lead funnel
* Campaign KPIs
* Inbox insights
* AI summaries
* Meeting pipeline
* Revenue forecast

## Aggregations

* Total leads
* Active campaigns
* Open rates
* Interested leads
* Meetings booked
* Team productivity

---

# 3. API Design

# Authentication APIs

```txt
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

# Lead APIs

```txt
POST   /api/leads/upload-csv
GET    /api/leads
POST   /api/leads
PATCH  /api/leads/:id
DELETE /api/leads/:id
```

# Campaign APIs

```txt
POST /api/campaigns
GET  /api/campaigns
POST /api/campaigns/:id/send
GET  /api/campaigns/:id/analytics
```

# Inbox APIs

```txt
GET /api/inbox
GET /api/inbox/:id
POST /api/inbox/:id/reply
```

# Meeting APIs

```txt
POST /api/meetings/schedule
GET  /api/meetings
PATCH /api/meetings/:id
```

---

# 4. Queue & Background Job Design

## BullMQ Queues

### lead-import-queue

* CSV parsing
* Validation
* Deduplication

### email-queue

* Bulk sending
* Retry failed sends
* Scheduling

### inbox-sync-queue

* Poll inbox
* Sync replies
* AI process emails

### meeting-reminder-queue

* Reminder notifications
* Follow-up reminders

---

# 5. Security Design

## Implementation

* NextAuth
* OAuth token encryption
* Mongo field encryption for tokens
* CSRF protection
* RBAC guards
* Audit logs
* Rate limiting
* Input sanitization

## Sensitive Data

* Gmail tokens encrypted
* Calendar tokens encrypted
* API keys server-only

---

# 6. Redis Usage

## Purpose

* Job queues
* Session cache
* Dashboard caching
* AI response caching
* Rate limiting

---

# 7. Logging Design

## Events Logged

* User login
* CSV imports
* Campaign sends
* AI generation
* Email failures
* Inbox classifications
* Meeting bookings
* Security incidents

---

# 8. Monitoring

## Metrics

* API latency
* Queue failures
* Gmail quota errors
* OpenAI latency
* Calendar failures
* Uptime

---

# 9. File Storage

## Stored Assets

* CSV uploads
* Email templates
* Campaign attachments

## Options

* AWS S3 / R2 / Cloudinary

---

# 10. Deployment Design

## Environments

### Development

* Local MongoDB
* Local Redis

### Staging

* Cloud test integrations

### Production

* Vercel / Docker
* MongoDB Atlas
* Redis Cloud
* Secret manager

---

# 11. Error Recovery Strategies

## CSV Failures

* Partial import reports
* Row-level validation

## Email Failures

* Retry with exponential backoff
* Bounce logging

## AI Failures

* Retry fallback
* Manual generation option

## Calendar Failures

* Conflict detection
* Alternate scheduling

---

# 12. Future Technical Extensions

* Multi-tenant architecture
* Team collaboration
* Workflow automation engine
* SMS/WhatsApp outreach
* CRM integrations
* White-labeling
* Microservice decomposition

---

# 13. Sequence Example: Outreach Campaign

```txt
User Uploads Leads
    ↓
CSV Import Queue
    ↓
Lead Validation + DB Storage
    ↓
User Creates Campaign
    ↓
AI Generates Emails
    ↓
Gmail Queue Sends Emails
    ↓
Delivery Tracking
    ↓
Inbox Sync
    ↓
AI Classifies Replies
    ↓
Meeting Scheduling Trigger
    ↓
Dashboard Updates
```

---

# 14. Final Engineering Goals

## System Should Be:

* Modular
* Testable
* Scalable
* Secure
* Fault-tolerant
* Maintainable
* SaaS-ready
* AI-first

This LLD serves as the engineering blueprint for implementation across frontend, backend, DevOps, and integrations.
