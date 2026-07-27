# Frontend CRM Outreach

A modern CRM outreach frontend built with Next.js, React, Tailwind CSS, and GSAP. This project includes a public marketing site, authentication flows, and a dashboard with campaigns, leads, inbox, meetings, analytics, and integration entry points.

## Features

- Marketing landing pages with animated hero and workflow sections
- Auth pages for login, register, forgot password, and reset password
- Dashboard app routes for analytics, campaigns, inbox, leads, meetings, and settings
- GSAP-based scroll and reveal animations
- Tailwind CSS v4 for utility-first styling
- Responsive layout and sticky workflow behavior
- Reusable component library with cards, forms, and layout primitives

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- GSAP + ScrollTrigger
- Lucide icons
- React Hook Form + Zod
- TanStack Table
- Recharts

## Getting Started

Install dependencies:

```bash
npm install
# or
bun install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` — start the Next.js development server
- `npm run build` — build the production app
- `npm run start` — start the production server after build
- `npm run lint` — run ESLint

## Project Structure

- `src/app` — application routes and page layouts
- `src/components` — reusable UI components and layout pieces
- `src/config` — app and integration configuration
- `src/database` — database migrations, seed data, and MongoDB helpers
- `src/hooks` — custom React hooks
- `src/integrations` — third-party integration helpers
- `src/lib` — shared utilities, auth, API response helpers, and validation
- `src/modules` — feature-specific modules for auth, campaigns, leads, meetings, etc.
- `src/providers` — React providers for auth, theme, and query state
- `src/store` — client-side state management stores

## Notes

- This project uses the Next.js App Router and server components by default.
- The marketing layout is under `src/app/(marketing)` and dashboard under `src/app/(dashboard)`.
- If you add environment values, follow the standard Next.js `.env` conventions.

## Deployment

This app can be deployed to Vercel, Bun Cloud, or any platform that supports Next.js. Build with:

```bash
npm run build
```

Then start with:

```bash
npm run start
```
