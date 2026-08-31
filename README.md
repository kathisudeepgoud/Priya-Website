# Priya Ice Creams & Fast Foods — Website

A cinematic Next.js site for Priya Ice Creams & Fast Foods (Proddatur, Andhra Pradesh, since 1985),
built with the stack requested in the brief:

- **Next.js 14 (App Router) + React + TypeScript**
- **Tailwind CSS** for styling, with a fine-dining palette (near-black, wine, champagne gold)
- **shadcn/ui-style primitives** (Tabs) via Radix
- **GSAP + ScrollTrigger** for scroll choreography, pinned/horizontal sections, and reveals
- **Lenis** for smooth scrolling, synced to GSAP's ticker
- **Motion** (motion.dev, the React successor to Framer Motion) for magnetic buttons and the
  animated Google rating counter
- **React Three Fiber / Three.js** for the 3D hero image rail
- **Lucide** icons

## Real brand data

- `public/priya-logo.png` and `public/priya-storefront.jpg` are your actual uploaded assets, untouched.
- `lib/menu-data.ts` is the single source of truth for every menu item and price — copied exactly
  from your menu PDF. Editing prices only requires editing this one file.
- The Google rating section shows the verified **4.1 / 336 reviews** figure you provided, clearly
  labeled "Google Reviews." To make it live, swap the static numbers in `businessInfo`
  (`lib/menu-data.ts`) for a call to the official Google Places API.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Notes / things to finish before launch

- `tel:+91` and `https://wa.me/` in `components/Location.tsx` and `Footer.tsx` are placeholders —
  no phone number was in the source material, so add the real number before publishing.
- Food photography in the hero rail, category panels, and gallery currently uses stock Unsplash
  images as placeholders for dishes not photographed yet — swap in real Priya photos when available.
- This project was generated as source code; it hasn't been run through `npm install` /
  a bundler in this environment, so do a first local build (`npm run build`) before deploying to
  catch any dependency-version edge cases.
