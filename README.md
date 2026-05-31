Portfolio — personal project showcase built with Next.js + TypeScript

Overview
--------

This repository contains a personal portfolio built on the Next.js App Router, authored in TypeScript and styled with Tailwind CSS.

Key features

- Modern Next.js app router setup (`src/app`)
- Responsive hero with modular subcomponents
- Projects section that fetches repository metadata from GitHub (`src/lib/github.ts`)
- Contact form with server API that sends email via Nodemailer (SMTP) or Resend as a fallback (`src/app/api/contact/route.ts`)
- Masonry-like skills grid and a lightweight browser mockup UI component
- Modularized components and small UI primitives under `src/components` and `src/ui`

Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Nodemailer / Resend for contact emails

Getting started (local)
-----------------------

Prerequisites

- Node.js 18+ (or your project's required Node version)
- npm, yarn, or pnpm

Install

```bash
npm install
# or
pnpm install
```

Run the dev server

```bash
npm run dev
# or
pnpm dev
```

Open <http://localhost:3000> to view the site.

Environment variables
---------------------

Copy `.env.example` to `.env.local` and fill in values relevant to your environment.

Important variables

- `RESEND_API_KEY` — optional; used when Resend is preferred for sending emails
- `CONTACT_EMAIL` — default recipient email used by the contact API
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — when present, the contact API will prefer Nodemailer (SMTP) for delivery
- `FROM_EMAIL` / `TO_EMAIL` — optional overrides for outbound messages when using SMTP
- `GITHUB_TOKEN` — optional GitHub token to increase API rate limits when fetching repo metadata via `src/lib/github.ts`

The contact API behavior (in `src/app/api/contact/route.ts`) is:

- If `SMTP_HOST` + `SMTP_USER` + `SMTP_PASS` exist, the API uses Nodemailer to send via SMTP.
- Otherwise the API falls back to the Resend client using `RESEND_API_KEY`.

Install Nodemailer (if you plan to use SMTP)

```bash
npm install nodemailer
```

Project structure (high level)
-----------------------------

- `src/app` — Next.js app routes and pages
- `src/components` — React components (Hero, Projects, Contact, About, Skills)
- `src/ui` — small UI primitives (BrowserMockup, SectionTag, etc.)
- `src/lib` — utilities and data fetchers (`github.ts`, `format.ts`)
- `src/styles` — global styles and CSS modules
- `public` — static assets

Development notes & conventions
------------------------------

- Tailwind CSS v4 tokens and semantic utilities are used; prefer token-based classes to avoid lint issues.
- Framer Motion `Variants` typings require numeric easing arrays to be typed as readonly tuples (e.g. `as const`) to avoid TypeScript complaints.
- The Projects section fetches GitHub repositories using `getGitHubRepos()` in `src/lib/github.ts`. If you expect heavy fetching during development or CI, set `GITHUB_TOKEN` to avoid rate limiting.
- The contact form is a self-contained component and submits to the API route at `/api/contact`.

Deployment
----------

- Vercel is recommended for seamless Next.js deployments. Ensure your environment variables are set in the Vercel dashboard.
- If you use SMTP in production, set the SMTP env vars in your hosting provider.

Troubleshooting
---------------

- If emails are not arriving and you have `SMTP_*` set, check your SMTP provider logs and ensure `FROM_EMAIL` is an allowed sender for that provider.
- If GitHub data is empty, verify `GITHUB_TOKEN` (optional) and check GitHub API status/rate-limits.

Further improvements (ideas)
--------------------------

- Add server-side queued sending and retry logic for SMTP deliverability.
- Add automated visual regression tests or screenshots for responsive audits.
- Extract more small UI primitives (Tag, Button) to further DRY up the codebase.

Where to look in the repo
-------------------------

- `src/components/Projects.tsx` — projects section and featured projects layout
- `src/components/ProjectCard.tsx` — project card UI
- `src/app/api/contact/route.ts` — contact form API with Nodemailer/Resend logic
- `src/lib/github.ts` — GitHub fetch helpers
- `src/styles/globals.css` — theme and global tokens

If you'd like, I can also add a short "How to configure SMTP with Gmail/App Passwords" section or add CI checks that verify env variables before build. Which would you prefer next?
