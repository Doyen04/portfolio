Portfolio — personal project showcase built with Next.js + TypeScript

Overview
--------

This repository contains a personal portfolio built on the Next.js App Router, authored in TypeScript and styled with Tailwind CSS.

Key features

- Modern Next.js app router setup (`src/app`)
- Responsive hero with modular subcomponents
- Projects section driven by admin-managed content (no GitHub API dependency)
- Password-protected admin dashboard at `/doyen` for editing projects, skills, About, Contact and the CV
- Contact form with server API that sends email via Nodemailer (SMTP) (`src/app/api/contact/route.ts`)
- Masonry-like skills grid and a lightweight browser mockup UI component
- Modularized components and small UI primitives under `src/components` and `src/ui`

Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Nodemailer for contact emails (SMTP)

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

- `ADMIN_PASSWORD` — password for the admin dashboard login (at `/doyen`)
- `ADMIN_SESSION_SECRET` — random secret used to sign the admin session cookie
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob token; content and uploads are stored there in both dev and production
- `CONTACT_EMAIL` — default recipient email used by the contact API
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — when present, the contact API will prefer Nodemailer (SMTP) for delivery
- `FROM_EMAIL` / `TO_EMAIL` — optional overrides for outbound messages when using SMTP

The contact API behavior (in `src/app/api/contact/route.ts`) is:

- Uses Nodemailer to send via SMTP, configured by the `SMTP_*` variables above (e.g. Gmail with an app password).

Install Nodemailer (if you plan to use SMTP)

```bash
npm install nodemailer
```

Project structure (high level)
-----------------------------

- `src/app` — Next.js app routes and pages (`admin/*` is the dashboard, `doyen` is the login)
- `src/components` — React components (Hero, Projects, Contact, About, Skills)
- `src/ui` — small UI primitives (SiteScreenshot, logo, floatNavBar)
- `src/lib` — content store abstraction, content getters/setters, seeded defaults and session auth (`store.ts`, `content.ts`, `defaults.ts`, `session.ts`)
- `src/types` — shared content types (`content.ts`)
- `src/styles` — global styles and CSS modules
- `public` — static assets

Development notes & conventions
------------------------------

- Tailwind CSS v4 tokens and semantic utilities are used; prefer token-based classes to avoid lint issues.
- Framer Motion `Variants` typings require numeric easing arrays to be typed as readonly tuples (e.g. `as const`) to avoid TypeScript complaints.
- Portfolio content lives in files (JSON + uploaded media) stored in Vercel Blob when `BLOB_READ_WRITE_TOKEN` is set; seeded defaults in `src/lib/defaults.ts` are used until the first admin save.
- The contact form is a self-contained component and submits to the API route at `/api/contact`.

Deployment
----------

- Vercel is recommended for seamless Next.js deployments. Ensure your environment variables are set in the Vercel dashboard.
- If you use SMTP in production, set the SMTP env vars in your hosting provider.

Troubleshooting
---------------

- If emails are not arriving and you have `SMTP_*` set, check your SMTP provider logs and ensure `FROM_EMAIL` is an allowed sender for that provider.
- If your edits on the dashboard aren't showing on the site, confirm `BLOB_READ_WRITE_TOKEN` is set on the environment you're viewing (dev uses `.env.local`, production uses Vercel env vars).

Further improvements (ideas)
--------------------------

- Add server-side queued sending and retry logic for SMTP deliverability.
- Add automated visual regression tests or screenshots for responsive audits.
- Extract more small UI primitives (Tag, Button) to further DRY up the codebase.

Where to look in the repo
-------------------------

- `src/components/Projects.tsx` — projects section and featured projects layout
- `src/components/ProjectCard.tsx` — project card UI
- `src/app/admin/actions.ts` — admin CRUD server actions
- `src/lib/store.ts` — Vercel Blob / local folder storage abstraction
- `src/lib/content.ts` — content getters and setters
- `src/app/api/contact/route.ts` — contact form API with Nodemailer logic
- `src/styles/globals.css` — theme and global tokens

If you'd like, I can also add a short "How to configure SMTP with Gmail/App Passwords" section or add CI checks that verify env variables before build. Which would you prefer next?
