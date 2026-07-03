# Meeya Engineering — Corporate Website

Next.js 14 (App Router) + Tailwind CSS + Framer Motion site for **Meeya
Engineering / Heavy Power Masters**.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Adding real images

Drop these files into `public/images/` (see `public/images/README.md`):

- `logo.png` — company logo, shown in the navbar
- `owner.jpg` — portrait of Mihisara Gamage, shown in the About section

The site already has clean fallback icons in place, so it looks complete even
before you add photos — just drop the files in with those exact names and
they'll appear automatically, no code edits required.

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Fonts, metadata, global shell
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Tailwind base + custom utilities
│   └── api/appointment/route.ts # Booking form handler (mock email + WhatsApp link)
└── components/
    ├── Navbar.tsx
    ├── Hero.tsx
    ├── Services.tsx
    ├── About.tsx
    ├── Appointment.tsx
    └── Footer.tsx
```

## Wiring up real email delivery

`src/app/api/appointment/route.ts` now uses `nodemailer` with SMTP. Configure these environment variables in your deployment or local `.env`:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `EMAIL_FROM` (optional, defaults to `Meeya Engineering <mihisaragamage07@gmail.com>`)
- `ADMIN_PASSWORD` (required to protect the appointments page)
- `ADMIN_SESSION_SECRET` (required for admin session cookies)

If the SMTP settings are not configured, appointment requests will still be recorded locally or via Supabase, but email delivery will be skipped.

## Cloud-backed appointment storage

The app now supports Supabase-backed appointment storage. Configure these additional environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

If Supabase is configured, appointment data will be stored there. Otherwise, the app falls back to local file storage in `data/appointments.json`.

## Deploying

This is a standard Next.js app — it deploys as-is to Vercel, or anywhere that
supports Node.js (`npm run build && npm run start`).
