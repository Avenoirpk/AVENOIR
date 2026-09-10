# Avenoir

Fashion e-commerce website (bags, shoes, jewelry, watches, belts, hats, sunglasses, clothing) — built with **Next.js 14 (App Router)** + **Tailwind CSS**.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

> This zip only contains source code — `node_modules` is not included (per `.gitignore`). Run `npm install` after cloning/unzipping, before `npm run dev` or `npm run build`.

## What's included (working, with mock/dummy data)

- **Home** — animated hero (Swiper slider), scroll-reveal (AOS), category grid, best-seller carousel, animated stat counters, marquee announcement bar
- **Login/Signup** — dummy auth (any email + password works), **Continue as Guest** option
- **Shop** — category filter + sort, product grid
- **Product detail** — image gallery, size/color selection, add to cart / buy now
- **Cart** — quantity controls, subtotal, persisted in `localStorage`
- **Checkout** — step flow (contact → delivery → Venmo payment + **mandatory payment screenshot upload** → confirm). Order cannot be placed without the screenshot.
- **Order tracking** — step tracker by order ID
- **Account** — order history (for logged-in/guest session)
- **Admin panel** (`/admin`) — dashboard stats, orders list with **payment screenshot verification** + status updates, products list

## Not yet wired up (intentional, per current plan)

- Real authentication (Google / Facebook / Phone OTP) — buttons are placeholders
- A real backend/database — orders, users and products currently live in the browser's `localStorage` and an in-memory mock catalog (`lib/products.ts`)
- Real product photos — currently using Unsplash placeholder images; swap in your own 1400-image archive by replacing the `image`/`images` fields in `lib/products.ts`
- Image/file storage for payment screenshots — currently stored as base64 in `localStorage`; swap for real object storage (e.g. Supabase/Cloudinary free tier) before going live

## Project structure

```
app/            → pages (App Router)
components/     → shared UI + animation components
lib/            → mock product data + cart context
```

## Animation credits (per the plan discussed)

- **AOS** — scroll-reveal on sections
- **Swiper** — hero slider, best-seller carousel
- **Magic UI–inspired** — shimmer button, marquee bar, animated number ticker (hand-built, lightweight versions — no extra dependency)
- **Logo splash** — plays once per browser session on first load, skippable by tap
