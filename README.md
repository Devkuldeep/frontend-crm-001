# Frontend CRM Outreach

A polished, modern CRM outreach experience built with Next.js, React, Tailwind CSS, and GSAP. This project brings together a marketing website, authentication flows, and a full-featured dashboard for campaigns, leads, inbox, meetings, analytics, and integrations.

<p align="center">
  <img src="public/screenshots/home.png" alt="CRM outreach landing page preview" width="100%" />
</p>

[![Watch the project showcase video on YouTube](public/screenshots/home.png)](https://youtu.be/ynkMrjhZme4)

## 📸 Screenshots Gallery

### Marketing Pages

<div align="center">
  <img src="public/screenshots/home.png" alt="Home landing page" width="32%" />
  <img src="public/screenshots/marketing-home.png" alt="Marketing home" width="32%" />
  <img src="public/screenshots/marketing-about.png" alt="Marketing about" width="32%" />
  <br />
  <img src="public/screenshots/marketing-contact.png" alt="Marketing contact" width="32%" />
  <img src="public/screenshots/marketing-pricing.png" alt="Marketing pricing" width="32%" />
  <img src="public/screenshots/pricing.png" alt="Pricing page" width="32%" />
  <br />
  <img src="public/screenshots/about.png" alt="About page" width="32%" />
  <img src="public/screenshots/contact.png" alt="Contact page" width="32%" />
</div>

### Authentication Flow

<div align="center">
  <img src="public/screenshots/auth-login.png" alt="Login page" width="32%" />
  <img src="public/screenshots/auth-register.png" alt="Register page" width="32%" />
  <img src="public/screenshots/auth-forgot-password.png" alt="Forgot password page" width="32%" />
  <br />
  <img src="public/screenshots/auth-reset-password.png" alt="Reset password page" width="32%" />
</div>

### Dashboard Experience

<div align="center">
  <img src="public/screenshots/dashboard-home.png" alt="Dashboard home" width="32%" />
  <img src="public/screenshots/dashboard-analytics.png" alt="Analytics dashboard" width="32%" />
  <img src="public/screenshots/dashboard-campaigns.png" alt="Campaigns dashboard" width="32%" />
  <br />
  <img src="public/screenshots/dashboard-inbox.png" alt="Inbox dashboard" width="32%" />
  <img src="public/screenshots/dashboard-leads.png" alt="Leads dashboard" width="32%" />
  <img src="public/screenshots/dashboard-settings.png" alt="Settings dashboard" width="32%" />
</div>

## ✨ Highlights

- Beautiful marketing pages with animated sections and smooth motion
- Secure auth flows for login, register, forgot password, and reset password
- A rich dashboard for analytics, campaigns, inbox, leads, meetings, and settings
- Responsive UI designed for desktop and mobile experiences
- Reusable component system with polished forms, cards, and layout primitives

## 🧰 Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Lucide Icons
- React Hook Form + Zod
- TanStack Table
- Recharts

## 🚀 Getting Started

Install dependencies:

```bash
npm install
# or
bun install
# or
pnpm install
```

Start the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

- `npm run dev` — start the Next.js development server
- `npm run build` — build the production app
- `npm run start` — start the production server after build
- `npm run lint` — run ESLint

## 📁 Project Structure

- `src/app` — application routes and page layouts
- `src/components` — reusable UI components and layout primitives
- `src/config` — app and integration configuration
- `src/database` — migrations, seed data, and MongoDB helpers
- `src/hooks` — custom React hooks
- `src/integrations` — third-party integration helpers
- `src/lib` — shared utilities, auth, API response helpers, and validation
- `src/modules` — feature-specific modules for auth, campaigns, leads, meetings, and more
- `src/providers` — React providers for auth, theme, and query state
- `src/store` — client-side state management stores

## 🌐 Deployment

This app can be deployed to Vercel, Bun Cloud, or any platform that supports Next.js.

```bash
npm run build
npm run start
```

## 📝 Notes

- The app uses the Next.js App Router and server components by default.
- Marketing pages live under `src/app/(marketing)` and the dashboard under `src/app/(dashboard)`.
- Environment variables should follow standard Next.js `.env` conventions.
