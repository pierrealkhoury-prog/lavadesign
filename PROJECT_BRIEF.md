# Lava Design Platform — Build Brief for Claude Code

A multidisciplinary studio site (lavadesign.us) **plus** an e-commerce layer that sells
design services online with customer accounts, one-time purchases, and subscription
retainers. This document is the master spec. Hand it to Claude Code and build it in phases.

---

## 1. What we're building

Two things living in one app:

1. **Studio / portfolio site** — dark, molten-lava aesthetic. Home, Work (filterable case
   studies across 2D & 3D, Interiors & Architecture, Events & Activations, Engineering),
   Studio/About, Contact.
2. **Design Services store** — productized design services sold online:
   - **One-time packages**: Web Design, Artwork & Packaging, Branding Packages.
   - **Subscriptions / retainers**: monthly design retainer tiers.
   - Customer accounts, checkout, order history, file uploads (brief + deliverables),
     subscription management.

Pricing context from the existing shop: **AED**, prices shown **excl. 5% VAT**, flow is
"select service → pay → upload brief/design."

---

## 2. Recommended stack (and *why*)

The hard rule: **never hand-build authentication, card handling, or subscription billing.**
Use managed services so card data and passwords never touch our own database.

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Full-stack in one repo, great with Claude Code, easy hosting |
| Styling | **Tailwind CSS** | Fast, matches the design-token approach already used |
| Database | **PostgreSQL** (via **Supabase** or **Neon**) | Reliable relational data for orders/subscriptions |
| ORM | **Prisma** | Type-safe DB access, clean migrations |
| Auth | **Clerk** *(or Supabase Auth)* | Managed sign-in/up, sessions, password resets — we store none of it |
| Payments | **Stripe** (Checkout + Billing + Customer Portal) | Handles cards, subscriptions, retainers, invoices, VAT, refunds |
| File uploads | **UploadThing** *(or Supabase Storage)* | Customer briefs & deliverable files, safely off-app |
| Email | **Resend** | Order confirmations, receipts, status updates |
| Hosting | **Vercel** | One-click deploy for Next.js; preview URLs per change |

> ⚠️ Pierre handles all account creation and key generation himself (Stripe, Clerk,
> Supabase, etc.). Claude Code should reference keys via environment variables only and
> must **never** ask for or hardcode secrets, card numbers, or passwords.

### On Stripe + UAE / AED
Confirm Stripe availability and supported payout currency for the operating entity before
committing — if Stripe isn't viable for the UAE entity, swap in a regional gateway
(e.g. Telr, PayTabs, Network International) behind the same checkout abstraction. Build the
payment layer so the provider can be swapped without touching the rest of the app.

---

## 3. Data model (Prisma sketch)

```
User            id, email, name, role(customer|admin), createdAt        // mirror of Clerk user
Project         id, title, slug, discipline, location, year, summary,
                heroImage, gallery[], body, featured                    // portfolio case studies
Service         id, title, slug, type(one_time|subscription),
                category(web|artwork_packaging|branding|retainer),
                description, priceAED, vatRate(0.05), stripePriceId,
                tiers[], deliverables[], turnaround, active
Order           id, userId, items[], subtotalAED, vatAED, totalAED,
                status(pending|paid|in_progress|delivered|cancelled),
                stripePaymentIntentId, briefFiles[], createdAt
Subscription    id, userId, serviceId, tier, status,
                stripeSubscriptionId, currentPeriodEnd, createdAt
Upload          id, orderId, url, kind(brief|deliverable), filename
Inquiry         id, name, email, message, discipline, createdAt         // contact form
```

---

## 4. Routes

**Public**
- `/` home · `/work` portfolio grid (filter by discipline) · `/work/[slug]` case study
- `/services` overview · `/services/[slug]` service detail + buy/subscribe
- `/about` · `/contact`

**Auth (Clerk)**
- `/sign-in` · `/sign-up`

**Customer (protected)**
- `/account` dashboard · `/account/orders` · `/account/orders/[id]` (upload brief, view deliverables)
- `/account/subscriptions` → link to **Stripe Customer Portal** (manage/cancel retainers)

**Checkout**
- `/services/[slug]` → **Stripe Checkout** session → success/cancel pages
- `/api/webhooks/stripe` → mark orders paid, activate subscriptions (verify signature!)

**Admin (protected, role=admin)**
- `/admin` orders & subscriptions · `/admin/projects` CRUD case studies ·
  `/admin/services` CRUD services · upload deliverables to an order

---

## 5. Build phases (give Claude Code one phase at a time)

**Phase 0 — Scaffold.** Next.js + TS + Tailwind + Prisma. Design tokens (molten palette,
Archivo Expanded / Fraunces / Space Mono). Layout, nav, footer. Deploy to Vercel.

**Phase 1 — Studio site.** Home, Work grid + filters, `/work/[slug]` case study template,
About, Contact (saves Inquiry + emails via Resend). Seed with placeholder projects.
*(Reuse the design language from the standalone HTML prototype already built.)*

**Phase 2 — Auth + accounts.** Clerk sign-in/up, `/account` dashboard, protected routes,
admin role gate.

**Phase 3 — Services catalog.** Service model + `/services` + detail pages. Admin CRUD.
No payments yet — just display, with AED + 5% VAT math.

**Phase 4 — One-time purchases.** Stripe Checkout for Web Design / Artwork & Packaging /
Branding. Webhook → Order paid. Order detail page with brief upload (UploadThing).
Email receipts.

**Phase 5 — Subscriptions / retainers.** Stripe Billing recurring prices, tiered retainers,
Customer Portal for self-serve management. Subscription status synced via webhook.

**Phase 6 — Admin + polish.** Admin order pipeline (status, deliverable uploads), SEO meta,
sitemap, analytics, accessibility & responsive QA.

---

## 6. Getting started (commands)

```bash
npx create-next-app@latest lavadesign --typescript --tailwind --app --eslint
cd lavadesign
npm install @prisma/client prisma @clerk/nextjs stripe @stripe/stripe-js \
  resend uploadthing @uploadthing/react
npx prisma init
claude        # then: "Read PROJECT_BRIEF.md and let's start Phase 0."
```

Create a `.env.local` (never committed) with the keys you generate yourself:
`DATABASE_URL`, `CLERK_*`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
`NEXT_PUBLIC_*`, `RESEND_API_KEY`, `UPLOADTHING_TOKEN`.

---

## 7. Guardrails for the build
- Card data and passwords are handled **only** by Stripe and Clerk — never stored by us.
- All secrets live in environment variables; nothing hardcoded, nothing in git.
- Stripe webhooks must verify the signature before trusting any event.
- VAT (5%) computed server-side, never trusted from the client.
- Pierre creates all third-party accounts and enters payment/banking details himself.
```
