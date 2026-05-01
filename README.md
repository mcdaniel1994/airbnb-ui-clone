# Airbnb UI Clone

A mobile-first Airbnb-style teaching project that renders a complete browse → results → detail flow from typed mock data. The codebase is small enough to read end-to-end in one sitting and is laid out so each concept (routing, data shaping, server vs client components, design tokens, typed props) lives in an obvious place.

## What's inside

Three routes, each rendered as a Next.js Server Component that hydrates client-only widgets where they're needed:

- `/` — home: search bar, category tabs, multiple listing sections, inspiration tabs.
- `/catalog` — search results: sticky search header, map placeholder, scrollable result list. Reads the URL query string (`?where=...&checkIn=...&checkOut=...&guests=...`).
- `/rooms/[id]` — room detail: photo gallery, highlights, amenities, calendar, reviews, host card, things-to-know, related locations. Pre-rendered for every room in `data/rooms.ts` via `generateStaticParams`.

There is no auth, no database, and no API. All content lives in `data/`. The Wishlists and Log in items in the mobile bottom nav surface a "demo" dialog by design.

## Tech stack

- **Next.js 16** (App Router, server components by default)
- **React 19**
- **TypeScript 5.7** with `noUncheckedIndexedAccess` enabled
- **Tailwind CSS 3.4** + design tokens declared as CSS variables in [app/globals.css](app/globals.css)
- **lucide-react** icons, wrapped by a single [Icon](components/shared/Icon.tsx) component
- `@/*` path alias for absolute imports from the repo root

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | What it does                                  |
|---------------------|-----------------------------------------------|
| `npm run dev`       | Start the Next.js dev server on port 3000.    |
| `npm run build`     | Production build (used to validate output).   |
| `npm run typecheck` | `tsc --noEmit` — strict type check, no emit.  |
| `npm run lint`      | ESLint with the Next.js core-web-vitals rules.|

## Project structure

```
.
├── app/                    Next.js App Router routes
│   ├── layout.tsx          Root <html>/<body> + global CSS import
│   ├── page.tsx            "/" home
│   ├── globals.css         Tailwind layers + CSS variable tokens
│   ├── catalog/page.tsx    "/catalog" search results
│   └── rooms/[id]/
│       ├── page.tsx        "/rooms/[id]" room detail
│       └── not-found.tsx   404 for unknown room ids
│
├── components/             React components
│   ├── shared/             BrandLogo, BottomNav, Footer, Icon, IconText,
│   │                       Badge, FavoriteButton, RatingPill, SearchBar,
│   │                       SectionHeader, UnavailableFeature
│   ├── home/               CategoryTabs, InspirationSection
│   ├── catalog/            CatalogHeader, MapView, PriceDisclaimer
│   ├── listing/            ListingCard, ListingList, ListingSection
│   └── room/               RoomGallery, RoomHeader, RoomBookingControls,
│                           RoomCalendar, RoomPriceReserve, RoomDescription,
│                           RoomHighlights, RoomLocation, RoomRatingBar,
│                           AmenitiesList, RoomReviewsSummary, ReviewMentionsList,
│                           ReviewCard, ReviewList, HostCard, ThingsToKnow,
│                           RelatedLocations, OtherStayTypes
│
├── data/                   Typed mock data (no fetching, no DB)
│   ├── listings.ts         Canonical listings + helpers
│   ├── catalogListings.ts  Listings shown on /catalog
│   ├── homeSections.ts     Section composition for /
│   ├── rooms.ts            Full Room objects for /rooms/[id]
│   ├── categoryTabs.ts     Top-of-page category tabs
│   ├── inspirationTabs.ts  Footer inspiration block
│   ├── bottomNav.ts        Mobile bottom navigation items
│   ├── footerLinks.ts      Footer link groups
│   ├── footerLegalLinks.ts Footer legal row
│   └── footerSocialLinks.ts Footer social icons
│
├── types/                  Domain types, re-exported from index.ts
│   └── (amenity, badge, footer, highlight, host, icon, inspiration,
│        listing, nav, review, room, search, thingsToKnow)
│
├── utils/
│   └── searchParams.ts     Parse / serialize / summarize URL search state
│
├── public/
│   └── images/map-placeholder.svg
│                           Only local asset. Listing/room imagery is remote
│                           (Unsplash, allow-listed in next.config.ts).
│
├── next.config.ts          Image remotePatterns (images.unsplash.com)
├── tailwind.config.ts      Tailwind content paths
├── tsconfig.json           Strict TS + @/* path alias
└── eslint.config.mjs       eslint-config-next
```

## Data flow

Pages are async server components. They import directly from `@/data/*`, parse the URL with `utils/searchParams.ts`, and pass strongly-typed props down. Components that need browser APIs or React state opt in with `"use client"` at the top of the file (search bar, category tabs, calendar, gallery, host card, reviews, mobile bottom nav, etc.) — everything else stays on the server.

URL state is the source of truth for search: `searchValuesFromParams` parses `?where=...&checkIn=...&checkOut=...&guests=...` into a typed `SearchValues`, and `queryStringFromParams` serializes it back so deep links (`/catalog?where=Dallas&guests=4`) round-trip cleanly.

## Conventions

- **Server components by default.** Add `"use client"` only when you need state, effects, or DOM events.
- **Design tokens, not literals.** Use CSS variables from [app/globals.css](app/globals.css) (`var(--color-text-primary)`, `var(--color-bg-muted)`, `var(--color-primary)`) instead of raw Tailwind colors like `bg-rose-50` or hex codes.
- **Icons through one component.** Add a name to `IconName` in [types/icon.ts](types/icon.ts) and map it in [components/shared/Icon.tsx](components/shared/Icon.tsx) — never import from `lucide-react` directly in feature code.
- **Mobile-first Tailwind.** Style for narrow screens, then layer `md:` / `lg:` overrides.
- **Imports.** Use `@/...` for cross-directory imports; relative paths only inside the same folder.
- **Data is typed.** Every entry in `data/` conforms to a type from `types/`.

## Demo limitations

This is intentionally a UI-only project:

- No auth, no persistence, no payments. The Reserve button just shows a summary card.
- Mobile bottom nav: **Explore** routes to `/catalog`. **Wishlists** and **Log in** open an explanatory dialog rather than navigating.
- Footer link groups, category-tab "Experiences"/"Services", and most secondary CTAs are placeholders.
- Listing and room imagery is hot-linked from Unsplash; a network outage will leave image placeholders.
