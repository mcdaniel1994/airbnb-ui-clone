# UI Specification — Airbnb Clone (Teaching Project)

> **Status:** Populated from three reference screenshots (Home, Catalog, Room Detail).
> **Instructions for implementing agent:** Do not infer or invent details beyond what is documented here. If a section is empty or marked TBD, ask before proceeding. The pedagogical goal of this project (component thinking, props, typed data, reuse) takes precedence over pixel-perfect parity.

---

## 1. Overview

### 1.1 Project Name
Airbnb UI Clone — front-end teaching project.

### 1.2 Purpose / Description
A small Airbnb-style UI built to demonstrate fluency with React components, props, typed mock data, file-based routing, functional UI state, and mobile-first responsive layout. Visual fidelity is secondary to architectural clarity, but visible controls must work. The finished project should make it obvious that the author understands:

- Single-responsibility components
- Reuse of one component across multiple contexts via props (especially `ListingCard`)
- Typed data structures driving UI via `.map()`, never hardcoded JSX repetition
- Composition of pages from smaller components
- Next.js App Router conventions
- Functional controls with clear state changes, navigation, or expansion behavior

### 1.3 Target Platforms
Mobile web first (375px reference viewport from screenshots), responsive up through tablet (768px+) and desktop. No native app, no PWA features required.

### 1.4 Tech Stack / Framework Assumptions
- Next.js 16 (App Router)
- React
- TypeScript (strict)
- Tailwind CSS (utility classes only — no `@apply` abuse, no plugin themes required)
- **No third-party UI component libraries.** Specifically forbidden: shadcn/ui, MUI, Chakra, Ant Design, Bootstrap, Radix primitives, Headless UI, DaisyUI, or similar.
- Internal navigation must use `next/link` (`<Link>`). Bare `<a href="/...">` for internal routes is prohibited.
- Icons: inline SVG or a single icon dependency (e.g., `lucide-react`) is acceptable since it is not a UI component library; if used, wrap behind a single `<Icon name="..." />` component so it can be swapped.

### 1.5 Reference Screenshots
- `home_page.png` — Home page (`/`). Vertical scroll of city-grouped horizontal carousels, top search bar, category tabs, footer, bottom nav.
- `catalog_page.png` — Catalog / search results page (`/catalog`). Persistent search bar, Google map embed, vertical stack of listing cards, bottom nav.
- `room_page.png` — Room detail page (`/rooms/[id]`). Persistent search bar, image gallery, title block, amenities, Google map embed, interactive calendar, reviews, host card, footer.
- Search bar reference — segmented pill with `Where`, `When`, `Who`, `What`, and a circular search button.

### 1.6 Post-Build Audit Requirements
The following audit items are accepted scope and must be fixed before handoff:

1. Room calendar headings are data-driven (`{nightsLabel} in {city}`), never hardcoded to Dallas.
2. `Guest favorite` claims render only when the room data says `isGuestFavorite`.
3. `RoomGallery` uses a photo-gallery region, not a nested `banner` landmark inside `<main>`.
4. Footer link groups, legal links, and social links come from typed `/data` files.
5. Inspiration tab/item types live under `/types`, not inside `/data`.
6. Listing data shared across Home, Catalog, and Room stays canonical for matching ids, especially review counts, price, rating, badge, and location.

---

## 2. Layout

### 2.1 Screen Inventory

| Screen | Route | Source screenshot | Description |
|---|---|---|---|
| Home | `/` | `home_page.png` | Discover screen. Persistent segmented search bar, category tabs, multiple horizontally scrollable city sections of listing cards, "Inspiration for future getaways" tabbed link grid, footer, bottom nav. |
| Catalog | `/catalog` | `catalog_page.png` | Search results. Persistent segmented search bar, Google map embed, fee disclaimer, vertical stack of full-width listing cards, footer, bottom nav. |
| Room Detail | `/rooms/[id]` | `room_page.png` | Single listing. Persistent segmented search bar, image gallery, title/meta, rating summary, price + Reserve, highlights, description, amenities, Google map embed, interactive calendar, reviews summary, review mentions, review list, host card, things to know, related-locations grid, footer. |

### 2.2 Global Layout Structure
Each page follows this shell, mobile-first:

```
[ persistent SearchBar / SearchHeader ]
[ page-specific top region ]      ← category tabs / catalog title / gallery
[ page content (scroll) ]
[ Footer ]
[ BottomNav (fixed bottom on Home, Catalog) ]
```

- The segmented `SearchBar` is rendered on Home, Catalog, and Room Detail so it remains available after navigating from a listing card to a room page.
- `Footer` is rendered by every page.
- `BottomNav` is rendered on Home and Catalog. Room Detail does not show it in the screenshot — omit there.
- No additional persistent top header beyond the shared search region.
- Body uses `min-h-screen` and `flex-col` so footer sits at bottom on short pages.

### 2.3 Grid System
- Mobile (default, ≥375px): single column, full-width content with horizontal page padding of `16px` (`px-4`).
- Carousels on Home: horizontal flex row with `overflow-x-auto`, `gap-3`, snap optional, fixed card width (~`w-44` / 176px).
- Tablet (`md:`, ≥768px): content max-width `max-w-3xl` centered (`mx-auto`), horizontal padding `px-6`. Catalog cards become two-column grid (`md:grid md:grid-cols-2 md:gap-4`).
- Desktop (`lg:`, ≥1024px): content max-width `max-w-6xl`, three-column listing grid on Catalog, four-column on Home carousels (carousel can also reflow to grid at `lg:`).
- No external grid system or CSS framework beyond Tailwind utilities.

### 2.4 Page Regions
Named regions (used for ARIA landmarks where appropriate):

- `header` region — shared search region plus page-specific top area (category tabs, catalog title, room gallery wrapper).
- `main` region — primary scroll content. Wrap each page's content in `<main>`.
- `contentinfo` region — `Footer`.
- `navigation` region — `BottomNav` (fixed) and `CategoryTabs` (in-flow on Home).

### 2.5 Z-Index / Stacking Layers
- `0` — page content
- `10` — sticky catalog header, sticky map overlay buttons
- `20` — `BottomNav` (fixed)
- `30` — overlays inside listing cards (Favorite button, Badge)
- `40` — modals (none in scope; reserved)
- `50` — toasts (none in scope; reserved)

---

## 3. Design System

### 3.1 Color Tokens

#### 3.1.1 Light Mode

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-bg-muted` | `#F7F7F7` | Catalog map fallback, separators |
| `--color-surface` | `#FFFFFF` | Cards, modals |
| `--color-text-primary` | `#222222` | Headings, primary body |
| `--color-text-secondary` | `#717171` | Meta text ("$409 for 2 nights", dates) |
| `--color-text-tertiary` | `#B0B0B0` | Disabled, hint |
| `--color-border` | `#EBEBEB` | Card dividers, section separators |
| `--color-primary` | `#FF385C` | Brand pink — Reserve button, search icon active state, primary accents |
| `--color-primary-hover` | `#E11D48` | Reserve hover |
| `--color-badge-bg` | `rgba(255,255,255,0.95)` | "Guest favorite", "Superhost" badges (white pill) |
| `--color-badge-text` | `#222222` | Badge text |
| `--color-badge-new-bg` | `#FF385C` | "NEW" badge background |
| `--color-badge-new-text` | `#FFFFFF` | "NEW" badge text |
| `--color-favorite-idle` | `rgba(0,0,0,0.5)` | Heart outline overlay on images |
| `--color-favorite-active` | `#FF385C` | Active heart fill |
| `--color-rating-star` | `#222222` | Inline star glyph (Airbnb uses dark, not gold) |
| `--color-link` | `#222222` | Footer / inline links (underlined on hover) |

#### 3.1.2 Dark Mode
Out of scope. Do not implement. Token names are chosen so dark mode could be added later without renaming.

### 3.2 Typography

#### 3.2.1 Font Families
- Primary: system UI sans stack — `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. Tailwind's `font-sans` default is fine.
- No custom web fonts. Do not import Cereal (Airbnb's proprietary face) or any paid font.

#### 3.2.2 Type Scale
Mobile values; desktop uses the same unless noted.

| Role | Size | Line-height | Weight | Tailwind |
|---|---|---|---|---|
| `display` (Room price `$183`) | 22px | 28px | 600 | `text-[22px] leading-7 font-semibold` |
| `h1` (Room title) | 22px | 28px | 600 | `text-[22px] leading-7 font-semibold` |
| `h2` (Section headers: "Popular homes in Dallas", "What this place offers") | 18px | 24px | 600 | `text-lg font-semibold` |
| `h3` (Card title: "Apartment in Cedars") | 14px | 20px | 600 | `text-sm font-semibold` |
| `body` (Description, review text) | 16px | 24px | 400 | `text-base` |
| `meta` (Card price/rating row, dates) | 14px | 20px | 400 | `text-sm` |
| `caption` (Footer copyright, "Free cancellation") | 12px | 16px | 400 | `text-xs` |
| `badge` ("Guest favorite", "Superhost", "NEW") | 12px | 16px | 600 | `text-xs font-semibold` |
| `tab-active` (Category tab) | 12px | 16px | 600 | `text-xs font-semibold` |
| `nav` (BottomNav label) | 10px | 14px | 500 | `text-[10px] font-medium` |

#### 3.2.3 Text Styles by Role
- Card title: `text-sm font-semibold text-[--color-text-primary]`
- Card meta: `text-sm text-[--color-text-primary]` for price, secondary for "for 2 nights"
- Section header: `text-lg font-semibold text-[--color-text-primary]` with optional chevron-right action
- Footer link: `text-sm text-[--color-text-primary]` with `hover:underline`
- Meta on Room (e.g. "Entire rental unit in Dallas, Texas"): `text-sm text-[--color-text-secondary]`

### 3.3 Spacing Scale
Base unit `4px`. Use Tailwind defaults: `1=4, 2=8, 3=12, 4=16, 5=20, 6=24, 8=32, 10=40, 12=48`. Common applications:

- Page horizontal padding: `px-4` (16px) mobile, `px-6` (24px) ≥md
- Section vertical rhythm: `mb-6` (24px) between sections on Home, `mb-8` (32px) on Room
- Card internal padding (catalog): `p-3` (12px) below image
- Carousel gap: `gap-3` (12px)
- Icon–label gap: `gap-2` (8px)

### 3.4 Sizing Scale

| Element | Mobile | Desktop notes |
|---|---|---|
| Carousel card width (Home) | 176px (`w-44`) | grows to 224px (`md:w-56`) |
| Carousel card image height | 176px square (`aspect-square`) | same |
| Catalog card image height | full-width, 240px (`h-60`) | `md:h-72` |
| Room gallery height | 320px (`h-80`) | `md:h-96` |
| Reserve button | 48px tall (`h-12`), `min-w-[110px]` | same |
| BottomNav height | 64px (`h-16`) | hidden on `md:` (replace with top nav out of scope) |
| Search bar pill height | 48px (`h-12`) | same |
| Heart / Favorite hit area | 40×40 (`w-10 h-10`) | same |
| Icon (inline meta) | 20px (`w-5 h-5`) | same |
| Icon (amenities, highlights) | 24px (`w-6 h-6`) | same |
| Avatar (host, reviewer) | 48px (`w-12 h-12`) | host avatar 64px (`w-16 h-16`) on host card |

### 3.5 Border Radius

| Element | Radius | Tailwind |
|---|---|---|
| Listing card image (carousel) | 12px | `rounded-xl` |
| Listing card image (catalog) | 12px | `rounded-xl` |
| Room gallery first image | 12px | `rounded-xl` |
| Badges (pill) | full | `rounded-full` |
| Buttons (Reserve, message host) | 8px | `rounded-lg` |
| Search bar pill | full | `rounded-full` |
| Avatar | full | `rounded-full` |
| Map container | 12px | `rounded-xl` |
| Calendar day cell | full | `rounded-full` (selected day is a filled circle) |

### 3.6 Border / Stroke Widths
- Card hairline (catalog rows separator if used): `border-b border-[--color-border]`
- Section separator on Room page: `border-t border-[--color-border]` with `pt-6 mt-6`
- Buttons (secondary outline, e.g., "Show all amenities"): `border border-[--color-text-primary]`
- Heart icon stroke: 2px (use `stroke-width="2"` in SVG)

### 3.7 Shadows / Elevation
- Cards: **no shadow** by default (Airbnb uses borders + spacing). Optional very subtle shadow on hover at `md:` and up: `md:hover:shadow-md`.
- Search bar pill: `shadow-sm` to lift it off scroll content.
- Reserve button: no shadow.
- BottomNav: `shadow-[0_-1px_0_rgba(0,0,0,0.06)]` top hairline instead of a real shadow.

### 3.8 Iconography
- Set: Lucide (`lucide-react`) preferred — tree-shakable, single dependency, not a component library. Acceptable alternative: hand-rolled inline SVGs.
- Sizes: `w-5 h-5` for inline meta, `w-6 h-6` for amenity/highlight rows, `w-7 h-7` for BottomNav.
- Stroke weight: 2px (Lucide default).
- Color: `currentColor` so parent text color drives the icon.
- All icons accessed via a single `<Icon name="..." />` wrapper component (`/components/shared/Icon.tsx`) that switches on a typed `IconName` enum. This makes the icon library swap-able and keeps imports out of feature components.

### 3.9 Imagery / Illustration
- Listing photos: use Unsplash / Pexels URLs in mock data, or local `/public/images/listings/*.jpg`. Aspect ratio square for Home cards, 4:3 for Catalog cards, 16:9-ish for Room gallery first slide.
- Map: use a real embedded Google Map via iframe. Static placeholder images are acceptable only as a loading/error fallback.
- Avatars: round, initials fallback acceptable but prefer image URLs.
- All `<img>` should use `next/image` with explicit `width`/`height` or `fill` + parent `relative`. `alt` is mandatory.

### 3.10 Motion Tokens
- Standard transition: `transition-colors duration-150 ease-out` (hover, focus).
- Heart toggle: `transition-transform duration-150` with optional scale pop (`active:scale-90`).
- Carousel scroll: native, no JS animation.
- Respect `prefers-reduced-motion`: no parallax, no autoplay, no large translates. Disable scale/pop animations under reduced motion via `motion-reduce:transform-none`.

---

## 4. Components

> Each component below documents: purpose, anatomy, variants, states, props, dimensions, spacing, typography, colors, behavior, accessibility. Components live in `/components/<group>/<Name>.tsx`. Pages import them; components never import from `/app`.

### 4.1 Component Inventory

**Shared (`/components/shared/`)**
- `Footer`
- `BottomNav`
- `Badge`
- `RatingPill`
- `FavoriteButton`
- `SearchBar`
- `SectionHeader`
- `IconText`
- `Icon`

**Listing (`/components/listing/`)**
- `ListingCard` (variants: `carousel`, `stacked`)
- `ListingSection` (Home — title + horizontal carousel)
- `ListingList` (Catalog — vertical stack / responsive grid)

**Home (`/components/home/`)**
- `CategoryTabs`
- `InspirationSection`

**Catalog (`/components/catalog/`)**
- `CatalogHeader`
- `MapView`
- `PriceDisclaimer`

**Room (`/components/room/`)**
- `RoomGallery`
- `RoomHeader`
- `RoomRatingBar`
- `RoomPriceReserve`
- `RoomHighlights`
- `RoomDescription`
- `AmenitiesList`
- `RoomLocation`
- `RoomCalendar`
- `RoomReviewsSummary`
- `ReviewMentionsList`
- `ReviewCard`
- `ReviewList`
- `HostCard`
- `ThingsToKnow`
- `RelatedLocations`
- `OtherStayTypes`

### 4.2 Component Specifications

#### 4.2.1 Footer
- **Purpose:** Site-wide footer with grouped link columns, locale row, social row, copyright.
- **Anatomy / Parts:** Stacked link groups (each: title + list of links) → locale + currency row → socials row → copyright + legal links row.
- **Variants:** None.
- **States:** Default. Links: default, hover (underline), focus.
- **Props / API:**
  ```ts
  type FooterProps = {
    linkGroups: FooterLinkGroup[];
    legalLinks: FooterLink[];
    socialLinks: SocialLink[];
  };
  ```
- **Dimensions:** Full width. Vertical padding `py-8`.
- **Internal Spacing:** `gap-8` between groups, `gap-2` between links within a group.
- **Typography:** Group title `text-sm font-semibold`. Links `text-sm`.
- **Colors:** Background `--color-bg`. Text `--color-text-primary`. Border-top `--color-border`.
- **Iconography:** Globe icon next to locale, dollar icon next to currency, social icons (facebook, x, instagram).
- **Behavior Notes:** All footer links must come from typed data in `/data`; do not define repeated link arrays inside `Footer.tsx`. Internal links use `<Link>` (Next.js). External links (socials) use `<a target="_blank" rel="noreferrer">`.
- **Accessibility Notes:** Wrap in `<footer role="contentinfo">`. Each group title is an `<h3>`. Link list is a `<ul>`.

#### 4.2.2 BottomNav
- **Purpose:** Fixed bottom navigation between Explore / Wishlists / Log in.
- **Anatomy / Parts:** Row of icon + label items, each a `<Link>`. Top hairline border.
- **Variants:** None.
- **States:** Item: default, active (current route — pink color + bold), focus.
- **Props / API:**
  ```ts
  type BottomNavProps = { items: NavItem[] };
  ```
- **Dimensions:** `h-16`, fixed bottom, full width, `z-20`.
- **Internal Spacing:** Equal-width items via `flex-1`. Icon–label gap `gap-1`.
- **Typography:** Label `text-[10px] font-medium`.
- **Colors:** Background `--color-bg`. Active item `--color-primary`. Idle `--color-text-secondary`.
- **Iconography:** `search` (Explore), `heart` (Wishlists), `user-circle` (Log in). 28px.
- **Behavior Notes:** Hidden on `md:` and up (`md:hidden`). Active state determined by `usePathname()`. Explore navigates home; Wishlists and Log in must either navigate to real placeholder routes or open lightweight dialogs. Do not leave them as silent links to the current page.
- **Accessibility Notes:** `<nav aria-label="Primary">`. Active item `aria-current="page"`.

#### 4.2.3 Badge
- **Purpose:** Small pill label overlay or inline ("Guest favorite", "Superhost", "NEW").
- **Anatomy / Parts:** Single pill with text, optional leading icon.
- **Variants:** `guestFavorite`, `superhost`, `new`.
- **States:** Default only.
- **Props / API:**
  ```ts
  type BadgeProps = { kind: BadgeKind; className?: string };
  ```
- **Dimensions:** Auto-width, `h-6`, padding `px-2`.
- **Internal Spacing:** Icon–text gap `gap-1`.
- **Typography:** `text-xs font-semibold`.
- **Colors:**
  - `guestFavorite`, `superhost` → bg `--color-badge-bg`, text `--color-badge-text`.
  - `new` → bg `--color-badge-new-bg`, text `--color-badge-new-text`.
- **Iconography:** Optional. None required by screenshots.
- **Behavior Notes:** When used as image overlay, parent must be `relative` and badge is `absolute top-3 left-3`.
- **Accessibility Notes:** Decorative — text is sufficient. No `role` needed.

#### 4.2.4 RatingPill
- **Purpose:** Inline rating display, e.g., `★ 4.98 (237)`.
- **Anatomy / Parts:** Star icon + numeric rating + optional `(reviewCount)`.
- **Variants:** `inline` (default, used in cards) and `large` (used on Room rating bar — bigger numbers).
- **States:** Default only.
- **Props / API:**
  ```ts
  type RatingPillProps = { rating: number; reviewCount?: number; size?: 'inline' | 'large' };
  ```
- **Dimensions:** Inline.
- **Typography:** Inline → `text-sm`. Large → `text-2xl font-semibold` for number.
- **Colors:** Star and text `--color-text-primary`.
- **Iconography:** Filled star, 14px (inline) / 20px (large).
- **Behavior Notes:** Format rating to 2 decimals (`rating.toFixed(2)`).
- **Accessibility Notes:** Render as `<span aria-label="Rated 4.98 out of 5, 237 reviews">★ 4.98 (237)</span>`.

#### 4.2.5 FavoriteButton
- **Purpose:** Heart icon to toggle favorite state on a listing image.
- **Anatomy / Parts:** Round button with heart icon.
- **Variants:** None.
- **States:** Idle (outline), active (filled pink), focus, pressed.
- **Props / API:**
  ```ts
  type FavoriteButtonProps = { listingId: string; initialActive?: boolean };
  ```
- **Dimensions:** `w-10 h-10`, hit area large enough for touch.
- **Internal Spacing:** Centered icon.
- **Typography:** N/A.
- **Colors:** Idle stroke `white` with subtle shadow. Active fill `--color-favorite-active`.
- **Iconography:** `heart`, `w-6 h-6`, stroke 2px.
- **Behavior Notes:** Local `useState` for now. No persistence. Click bubbling stopped so it doesn't trigger card link.
- **Accessibility Notes:** `<button aria-pressed={active} aria-label="Save to wishlist">`. Keyboard activatable.

#### 4.2.6 SectionHeader
- **Purpose:** Title row above a section, optionally with a chevron-right link.
- **Anatomy / Parts:** Title + optional chevron action.
- **Variants:** `home` (h2, with chevron), `room` (h2, no chevron).
- **States:** Default. Chevron link: hover.
- **Props / API:**
  ```ts
  type SectionHeaderProps = { title: string; actionHref?: string; level?: 2 | 3 };
  ```
- **Dimensions:** Full width, `mb-3` below title before content.
- **Typography:** `text-lg font-semibold`.
- **Colors:** Text `--color-text-primary`.
- **Iconography:** Chevron-right, `w-5 h-5`.
- **Behavior Notes:** If `actionHref` provided, the entire title row is wrapped in a `<Link>`.
- **Accessibility Notes:** Heading element is `h2` (or `h3` if `level=3` passed for nested sections like in Room "What this place offers").

#### 4.2.7 IconText
- **Purpose:** Reusable icon + label (+ optional sublabel) row used in Room highlights, amenities, things-to-know bullets.
- **Anatomy / Parts:** Icon (left) + text block (label on top, sublabel below).
- **Variants:** `compact` (one line), `stacked` (label + sublabel).
- **States:** Default only.
- **Props / API:**
  ```ts
  type IconTextProps = { icon: IconName; label: string; sublabel?: string; variant?: 'compact' | 'stacked' };
  ```
- **Dimensions:** Full width row.
- **Internal Spacing:** Icon–text gap `gap-3`. Vertical row gap `py-2`.
- **Typography:** Label `text-base`. Sublabel `text-sm text-[--color-text-secondary]`.
- **Colors:** Inherited.
- **Iconography:** 24px.
- **Behavior Notes:** None.
- **Accessibility Notes:** Icon is decorative (`aria-hidden`). Text carries meaning.

#### 4.2.8 Icon
- **Purpose:** Centralized icon renderer.
- **Anatomy / Parts:** Single SVG.
- **Variants:** Driven by `name` prop.
- **States:** N/A.
- **Props / API:**
  ```ts
  type IconProps = { name: IconName; className?: string; 'aria-hidden'?: boolean };
  ```
- **Dimensions:** Defaults to `w-5 h-5`; override via `className`.
- **Colors:** `currentColor`.
- **Behavior Notes:** Single switch statement on `name`. Keeps Lucide imports (or inline SVGs) confined to one file.
- **Accessibility Notes:** Decorative by default (`aria-hidden="true"`).

#### 4.2.9 ListingCard
- **Purpose:** Display a single listing summary. The same component used on Home (small carousel cards) and Catalog (large stacked cards).
- **Anatomy / Parts:** Image (with badge overlay top-left and favorite button top-right) → title row → meta row (location/beds for catalog only) → price row → rating row.
- **Variants:**
  - `carousel` — fixed width (~176px), square image, two-line meta (title + price/rating).
  - `stacked` — full width, taller image, four-line meta (title, location/beds, price, rating + free cancellation note).
- **States:** Default, hover (image subtle zoom on `md:` and up: `md:hover:scale-[1.02]`), focus visible on the wrapping link.
- **Props / API:**
  ```ts
  type ListingCardProps = { listing: Listing; variant?: 'carousel' | 'stacked' };
  ```
- **Dimensions:** See 3.4.
- **Internal Spacing:** Image `mb-2`, between text rows `mt-1`.
- **Typography:** Title `text-sm font-semibold`. Meta `text-sm text-[--color-text-secondary]`. Price `text-sm` with bold price token. Rating inline `text-sm`.
- **Colors:** As tokens.
- **Iconography:** Heart, badge text, star.
- **Behavior Notes:** Entire card wrapped in `<Link href={`/rooms/${listing.id}`}>`. When current search query params exist, preserve them in the room link so the shared `SearchBar` keeps its values after navigation. `FavoriteButton` `stopPropagation` on click. `Badge` rendered only if `listing.badge` is set.
- **Accessibility Notes:** Link has accessible name from title. Image `alt` is the title. Favorite button is a sibling button, not nested in the link.

#### 4.2.10 ListingSection
- **Purpose:** Home-page section: title row + horizontally scrolling carousel of `ListingCard`s.
- **Anatomy / Parts:** `SectionHeader` (with optional action) + horizontal scroller of `ListingCard variant="carousel"`.
- **Variants:** None.
- **States:** Default. Scroll container snaps optionally.
- **Props / API:**
  ```ts
  type ListingSectionProps = { title: string; listings: Listing[]; actionHref?: string };
  ```
- **Dimensions:** Full width. Scroller height auto. `mb-8`.
- **Internal Spacing:** Carousel `gap-3`, horizontal padding consistent with page (`-mx-4 px-4` trick to allow edge bleed).
- **Behavior Notes:** No JS — native horizontal scroll with `overflow-x-auto scrollbar-none`. `.map()` over `listings` → `ListingCard`.
- **Accessibility Notes:** `<section aria-labelledby={titleId}>` with the heading id-linked.

#### 4.2.11 ListingList
- **Purpose:** Catalog-page list: vertical stack of `ListingCard`s, becomes responsive grid at `md:`.
- **Anatomy / Parts:** Container with `.map()` of `ListingCard variant="stacked"`.
- **Variants:** None.
- **States:** Empty state (handled in §5.5).
- **Props / API:**
  ```ts
  type ListingListProps = { listings: Listing[] };
  ```
- **Dimensions:** Full width.
- **Internal Spacing:** `space-y-6` mobile; `md:grid md:grid-cols-2 md:gap-6 md:space-y-0`; `lg:grid-cols-3`.
- **Behavior Notes:** None beyond rendering.
- **Accessibility Notes:** `<ul>` with each card in `<li>`.

#### 4.2.12 SearchBar (Shared)
- **Purpose:** Persistent segmented search control used on Home, Catalog, and Room Detail. It must remain visible after navigating from a listing card to `/rooms/[id]`.
- **Anatomy / Parts:** Rounded pill container with four segments and a circular search button:
  - `Where` / placeholder `Search destinations`
  - `When` / placeholder `Add dates`
  - `Who` / placeholder `Add guests`
  - `What` / placeholder `Add description`
- **Variants:** `segmented` desktop/tablet, `compact` mobile if the full segmented layout cannot fit cleanly at 375px.
- **States:** Default, hover, focus, filled, submitting.
- **Props / API:**
  ```ts
  type SearchValues = {
    where?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    description?: string;
  };

  type SearchBarProps = {
    initialValues?: SearchValues;
    variant?: "segmented" | "compact";
  };
  ```
- **Dimensions:** Desktop/tablet pill approximates the provided reference: full width within the page container, `min-h-16`, `rounded-full`, subtle border/shadow, segment dividers, and a `h-12 w-12` or larger circular search button. Mobile may stack or collapse labels but must keep every field reachable.
- **Typography:** Segment label `text-sm font-semibold`; placeholder/value `text-sm` to `text-base` depending on available width.
- **Colors:** Background `--color-surface`, border `--color-border`, search button `--color-primary`, text `--color-text-primary`, placeholders `--color-text-secondary`.
- **Iconography:** Search icon inside the circular submit button.
- **Behavior Notes:** This is a real form, not a decorative link. Inputs are controlled locally, submit navigates to `/catalog` with query params for provided values, and fields initialize from the current URL query where present. Clicking a segment focuses/opens that segment's input. No server-backed filtering is required, but entered values must persist visually through navigation via query params.
- **Accessibility Notes:** Use a `<form role="search">` with visible labels or associated `aria-label`s for each segment. Submit button has accessible name `Search`.

#### 4.2.13 CategoryTabs (Home)
- **Purpose:** Top-of-Home tabs (Homes / Experiences / Services), with "NEW" badges.
- **Anatomy / Parts:** Row of tab items, each with icon + label + optional NEW badge. Active tab has bottom underline.
- **Variants:** None.
- **States:** Active (Homes), idle.
- **Props / API:**
  ```ts
  type CategoryTabsProps = { items: CategoryTab[]; activeId: string };
  ```
- **Dimensions:** Full row. Item ~80px wide.
- **Typography:** Label `text-xs font-semibold`.
- **Colors:** Active text `--color-text-primary` + underline `border-b-2`. Idle `--color-text-secondary`.
- **Iconography:** Per item, decorative SVG/illustration (use emoji or simple SVG for now).
- **Behavior Notes:** For project scope, only "Homes" is active. Inactive items must either change visible state/content when clicked or be rendered as non-clickable visual items. Do not render inactive tabs as links that navigate to the same page without changing anything.
- **Accessibility Notes:** Implement as `<nav>` with a `<Link>` only for active/real routes; use non-interactive elements for visual-only items. Active item carries `aria-current="page"`. Do not use ARIA tab pattern unless the component controls a real tab panel.

#### 4.2.14 InspirationSection (Home)
- **Purpose:** "Inspiration for future getaways" — tabbed grid of city + rental-type links (Popular, Arts & culture, Beach, Mountain).
- **Anatomy / Parts:** Section header (no chevron) → horizontally scrollable tab strip → two-column grid of items (each: city name + descriptor like "Condo rentals") → "Show more" link.
- **Variants:** None.
- **States:** Tab active vs idle (active has underline).
- **Props / API:**
  ```ts
  type InspirationSectionProps = {
    tabs: InspirationTab[];
    itemsByTab: Record<string, InspirationItem[]>;
  };
  ```
- **Dimensions:** Full width. Two-column grid mobile (`grid-cols-2`), four-column `md:grid-cols-4`.
- **Typography:** City `text-sm font-semibold`. Descriptor `text-sm text-[--color-text-secondary]`.
- **Behavior Notes:** Local `useState` for active tab. Items map from `itemsByTab[activeTab]`. `InspirationTab` and `InspirationItem` types live in `/types`, not inside the data file. If items are clickable, each item has a data-driven `href`; otherwise render items as non-clickable content.
- **Accessibility Notes:** Tab strip uses `role="tablist"` only if true tab semantics; otherwise plain buttons toggling local state with `aria-pressed`.

#### 4.2.15 CatalogHeader
- **Purpose:** Catalog title row below the persistent `SearchBar`.
- **Anatomy / Parts:** Title and optional result summary derived from search query params.
- **Variants:** None.
- **States:** Default.
- **Props / API:**
  ```ts
  type CatalogHeaderProps = { title: string; resultSummary?: string };
  ```
- **Dimensions:** `h-14` minimum. If sticky, it sits below the shared search region.
- **Typography:** Title `text-base font-semibold`; summary `text-sm text-[--color-text-secondary]`.
- **Behavior Notes:** Do not duplicate dates/guests controls here; search edits belong in `SearchBar`.
- **Accessibility Notes:** Title is `<h1>` of the catalog page.

#### 4.2.16 MapView
- **Purpose:** Real embedded Google Map for Catalog search area and Room location.
- **Anatomy / Parts:** Responsive iframe embed, loading state, and fallback link to open the same location in Google Maps.
- **Variants:** None.
- **States:** Loading, loaded, fallback/error.
- **Props / API:**
  ```ts
  type MapViewProps = {
    query: string;
    title: string;
    zoom?: number;
    className?: string;
  };
  ```
- **Dimensions:** `h-64`, `w-full`, `rounded-xl`.
- **Behavior Notes:** Use a Google Maps iframe URL, not a static map image. For this teaching project, a no-key `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed` URL is acceptable; if a Google Maps Embed API key is introduced, read it from `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY` and never hardcode it. The iframe must update when `query` changes.
- **Accessibility Notes:** iframe has a meaningful `title`, e.g. `Map of Dallas, Texas` or `Map near {room.city}`. Provide a visible `View larger map` link opening Google Maps in a new tab with `rel="noreferrer"`.

#### 4.2.17 PriceDisclaimer
- **Purpose:** Pink-bordered banner: "Prices include all fees".
- **Anatomy / Parts:** Pill with text and small icon.
- **Props / API:** None (static text).
- **Dimensions:** Auto-width, centered, `h-8`, `px-3`.
- **Typography:** `text-xs font-semibold`.
- **Colors:** Border + text `--color-primary`. Background white.
- **Behavior Notes:** Static.
- **Accessibility Notes:** Plain text, no role needed.

#### 4.2.18 RoomGallery
- **Purpose:** Image carousel at top of Room page (mobile: single visible image with pagination dots, count overlay "1/7").
- **Anatomy / Parts:** Image area + back/share/save controls top + counter overlay bottom-right.
- **Variants:** None.
- **States:** Idle.
- **Props / API:**
  ```ts
  type RoomGalleryProps = { images: string[]; title: string };
  ```
- **Dimensions:** `h-80` mobile, `md:h-96`. Full bleed `-mx-4 md:-mx-6 md:rounded-xl`.
- **Behavior Notes:** Native horizontal scroll-snap (`snap-x snap-mandatory`); no JS carousel needed. Counter shows `currentIndex/total` if implementing scroll observer; otherwise display total only (`1 / 7`).
- **Accessibility Notes:** Each image has `alt={`${title} — photo ${i+1}`}`. Container is `<div role="region" aria-label="Photo gallery">`; do not place `role="banner"` inside `<main>`.

#### 4.2.19 RoomHeader
- **Purpose:** Title + subtitle (entire rental unit / city) + occupancy summary (guests · bedrooms · beds · baths).
- **Props / API:**
  ```ts
  type RoomHeaderProps = { room: Room };
  ```
- **Typography:** Title `text-[22px] font-semibold`. Subtitle `text-sm text-[--color-text-secondary]`.
- **Behavior Notes:** Render only fields present in `Room`.
- **Accessibility Notes:** Title is `<h1>` of the page.

#### 4.2.20 RoomRatingBar
- **Purpose:** Three-cell row: large rating · data-driven rating label · review count.
- **Props / API:**
  ```ts
  type RoomRatingBarProps = { rating: number; isGuestFavorite: boolean; reviewCount: number };
  ```
- **Dimensions:** Full width row, dividers between cells (`divide-x divide-[--color-border]`).
- **Typography:** Numbers `text-xl font-semibold`. Labels `text-xs`.
- **Iconography:** Laurel SVG (or two facing decorative shapes) flanking the rating label.
- **Behavior Notes:** Render `Guest favorite` only when `isGuestFavorite` is true; render an alternate label such as `Top-rated` when false.

#### 4.2.21 RoomPriceReserve
- **Purpose:** Price block + Reserve button.
- **Props / API:**
  ```ts
  type RoomPriceReserveProps = { pricePerNight: string; nightsLabel: string; dateRange: string; onReserve?: () => void };
  ```
- **Dimensions:** Full width row, button `h-12 min-w-[110px]`.
- **Typography:** Price `text-[22px] font-semibold`. Date range `text-sm`.
- **Colors:** Button `bg-[--color-primary] text-white hover:bg-[--color-primary-hover]`.
- **Behavior Notes:** Button must be functional. It can open a lightweight confirmation dialog/inline panel summarizing the selected room, dates, and guests. Full booking and payment are out of scope.
- **Accessibility Notes:** Button `<button type="button">`. Focus ring required.

#### 4.2.22 RoomHighlights
- **Purpose:** Three rows: Self check-in, Peace and quiet, City view.
- **Props / API:**
  ```ts
  type RoomHighlightsProps = { items: Highlight[] };
  ```
- **Composition:** Maps to `IconText variant="stacked"`.
- **Behavior Notes:** Pure data rendering.

#### 4.2.23 RoomDescription
- **Purpose:** Description paragraph with optional "Show more" link.
- **Props / API:**
  ```ts
  type RoomDescriptionProps = { text: string; previewChars?: number };
  ```
- **Behavior Notes:** If `text.length > previewChars`, truncate with "Show more" toggle (local `useState`).
- **Accessibility Notes:** Toggle is a `<button>` with `aria-expanded`.

#### 4.2.24 AmenitiesList
- **Purpose:** "What this place offers" — first 5 amenities + "Show all amenities" outline button.
- **Props / API:**
  ```ts
  type AmenitiesListProps = { amenities: Amenity[]; previewCount?: number; totalCount: number };
  ```
- **Composition:** Each amenity uses `IconText variant="compact"`.
- **Behavior Notes:** Show first `previewCount` (default 5). `Show all amenities` expands to the full mock amenity list and toggles back to `Show fewer amenities`. The button label must reflect the actual number of amenities available in mock data, not an inflated screenshot count unless that many items exist.
- **Accessibility Notes:** Heading `<h2>What this place offers</h2>`.

#### 4.2.25 RoomLocation
- **Purpose:** "Where you'll be" + city/country + Google map embed + caveat ("Exact location will be provided after booking.").
- **Props / API:**
  ```ts
  type RoomLocationProps = { city: string; country: string; mapQuery: string; note: string };
  ```
- **Composition:** Uses `MapView` with a query derived from the room data, such as `${city}, ${country}`.

#### 4.2.26 RoomCalendar
- **Purpose:** Interactive room-page date selector for the selected listing. From screenshot: May 2026, days 5 and 6 may be the initial selection.
- **Props / API:**
  ```ts
  type RoomCalendarProps = {
    city: string;
    month: string;
    year: number;
    initialCheckIn?: string;
    initialCheckOut?: string;
    onDateRangeChange?: (range: { checkIn?: string; checkOut?: string; nights: number }) => void;
  };
  ```
- **Anatomy / Parts:** Header (`{nightsLabel} in {city}` + selected date range) → 7-column day grid → `Clear dates` button.
- **Behavior Notes:** Day cells are buttons. First click selects check-in, second later day selects check-out, clicking an earlier day resets the range. In-range days show a light pink band, selected endpoints are filled circles, and `Clear dates` clears the local selection. The heading and date range update from state; no city may be hardcoded.
- **Accessibility Notes:** Use a `<table>` with `<th scope="col">` for weekday labels. Day buttons expose `aria-pressed` for selected endpoints and descriptive `aria-label`s.

#### 4.2.27 RoomReviewsSummary
- **Purpose:** Big rating display (laurels + rating + data-driven rating label + caption + link).
- **Props / API:**
  ```ts
  type RoomReviewsSummaryProps = { rating: number; isGuestFavorite: boolean; caption: string; learnMoreHref?: string };
  ```
- **Typography:** Rating `text-4xl font-semibold`.
- **Behavior Notes:** Render `Guest favorite` only when `isGuestFavorite` is true. For non-favorites, render neutral copy such as `Top-rated stay` or omit the claim.

#### 4.2.28 ReviewMentionsList
- **Purpose:** Horizontal scrollable chips for review categories (Accuracy, Location, etc.).
- **Props / API:**
  ```ts
  type ReviewMentionsListProps = { mentions: ReviewMention[] };
  ```
- **Behavior Notes:** Renders chips with icon + label + score.

#### 4.2.29 ReviewCard
- **Purpose:** Single review (avatar, name, tenure, date, text).
- **Props / API:**
  ```ts
  type ReviewCardProps = { review: Review; previewChars?: number };
  ```
- **Behavior Notes:** Same "Show more" pattern as `RoomDescription`.

#### 4.2.30 ReviewList
- **Purpose:** Two-column grid of `ReviewCard`s on mobile (one card visible, second peeks) — or simple stack — plus a working "Show all N reviews" outline button.
- **Props / API:**
  ```ts
  type ReviewListProps = { reviews: Review[]; previewCount?: number; totalCount: number };
  ```
- **Behavior Notes:** Maps over `reviews.slice(0, previewCount)` initially. `Show all N reviews` expands to all mock reviews and toggles back to `Show fewer reviews`. Keep total mock reviews per room between 6 and 10, and ensure `totalCount` matches `reviews.length`.

#### 4.2.31 HostCard
- **Purpose:** "Meet your host" — host avatar + reviews/rating/years stat strip + bio + Superhost note + response stats + Message host button.
- **Props / API:**
  ```ts
  type HostCardProps = { host: Host };
  ```
- **Behavior Notes:** "Message host" button must be functional. It can open a lightweight contact dialog/inline panel; real messaging is out of scope.

#### 4.2.32 ThingsToKnow
- **Purpose:** Three-column section: Cancellation policy, House rules, Safety & property.
- **Props / API:**
  ```ts
  type ThingsToKnowProps = { sections: ThingsToKnowSection[] };
  ```
- **Composition:** Each section is a column with title + bullets (each bullet uses `IconText`).

#### 4.2.33 RelatedLocations
- **Purpose:** Two-column list of nearby/related cities ("Brazos River — Vacation rentals", etc.).
- **Props / API:**
  ```ts
  type RelatedLocationsProps = { items: { id: string; name: string; descriptor: string; href: string }[] };
  ```
- **Behavior Notes:** Each item is a `<Link>`.

#### 4.2.34 OtherStayTypes
- **Purpose:** Two-column list of alternative stay types ("Dallas vacation rentals", "Fitness-friendly vacation rentals", etc.).
- **Props / API:**
  ```ts
  type OtherStayTypesProps = { items: { id: string; label: string; href: string }[] };
  ```

---

## 5. Interaction Behavior

### 5.1 Navigation Flow
- Home → Catalog: submit `SearchBar` or tap any "see more" chevron on a `ListingSection` → navigate to `/catalog`.
- Home → Room: tap any `ListingCard` → `/rooms/[id]`, preserving current search query params if present.
- Catalog → Room: tap any `ListingCard` → `/rooms/[id]`, preserving current search query params.
- Room → Home: browser back, or tap brand/Explore in `BottomNav`.
- BottomNav: Explore → `/`; Wishlists and Log in open lightweight dialogs or navigate to placeholder routes.
- The shared `SearchBar` remains visible on Home, Catalog, and Room after route changes. Search values persist through URL query params where present.

### 5.2 User Actions & Outcomes

Every clickable or focusable control must have a visible outcome. Do not ship no-op buttons or links. If a visual element is intentionally inactive, render it as non-interactive text or a disabled control with clear semantics.

| Element | Trigger | Result |
|---|---|---|
| `SearchBar` | Edit fields + submit | Navigate to `/catalog` with query params and keep values visible |
| `ListingCard` | Tap | Navigate to `/rooms/{listing.id}` |
| `FavoriteButton` | Tap | Toggle local favorite state. Stops propagation so card does not navigate. |
| Reserve button | Tap | Open reservation summary/confirmation UI using current room/date values |
| `CategoryTabs` active item | Tap | Navigate to or remain on its route |
| `CategoryTabs` inactive visual items | Tap | Either become active with visible state/content change or are rendered non-clickable |
| `InspirationSection` tab | Tap | Switch local `activeTab`, re-render items. |
| `RoomDescription` Show more | Tap | Toggle truncation. |
| `ReviewCard` Show more | Tap | Toggle truncation. |
| Show all amenities button | Tap | Expand/collapse the full amenity list. |
| `RoomCalendar` day | Tap | Select check-in/check-out dates and update displayed date range. |
| `RoomCalendar` Clear dates | Tap | Clear selected dates. |
| Show all reviews button | Tap | Expand/collapse all mock reviews for that room. |
| Message host button | Tap | Open contact dialog/inline panel. |
| Footer link | Tap | Navigate via `<Link>` (most go to `/` for now). |

### 5.3 Form Behavior
`SearchBar` is a real controlled form. It must support destination, date, guest count, and description inputs. Submit navigates to `/catalog` with query params. Catalog and Room pages initialize the form from those params so the search context remains visible after navigation.

### 5.4 Feedback & Notifications
None in scope. No toasts, no banners. The `PriceDisclaimer` on Catalog is a static informational pill, not a dismissible notification.

### 5.5 Loading & Empty States
- All app data is local mock. Google Maps iframe loading may be handled with a simple loading/fallback state; no full skeleton system required.
- Empty states:
  - `ListingList` with empty array → render `<p className="text-sm text-[--color-text-secondary]">No homes match this area.</p>`.
  - Room not found by id → call `notFound()` from `next/navigation` and render `app/rooms/[id]/not-found.tsx` with a simple "Listing not found" message + link home.

### 5.6 Error States
No app-data async error states. `MapView` should provide a fallback larger-map link if the iframe cannot load. If a future fetch is added, components should accept an optional `error?: string` prop and render a plain message.

### 5.7 Animations & Transitions

| Trigger | Target | Duration | Easing | Transform |
|---|---|---|---|---|
| Hover (md+) on `ListingCard` image | `<Image>` | 200ms | `ease-out` | `scale-[1.02]` |
| Tap `FavoriteButton` | Heart icon | 150ms | `ease-out` | `scale-90` on `:active`, color swap |
| Tap any button | bg color | 150ms | `ease-out` | `bg-*-hover` |
| `InspirationSection` tab change | content | none | — | instant swap |

Reduced-motion: disable scale transforms (`motion-reduce:transform-none`).

### 5.8 Keyboard Shortcuts
None. Standard tab navigation only.

---

## 6. Responsiveness

### 6.1 Breakpoints

| Name | Min width | Tailwind |
|---|---|---|
| `mobile` (default) | 0 | — |
| `tablet` | 768 | `md:` |
| `desktop` | 1024 | `lg:` |
| `wide` | 1280 | `xl:` |

### 6.2 Layout Behavior per Breakpoint

#### 6.2.1 Mobile
- Single column. Page padding `px-4`.
- Home: carousels horizontally scroll, one and a fraction cards visible.
- Catalog: cards stacked full-width, `space-y-6`.
- Room: gallery full bleed; each section stacked with `mt-6 pt-6 border-t`.
- `BottomNav` fixed at bottom; bottom padding on `<main>` of `pb-20` to clear it.

#### 6.2.2 Tablet
- Page padding `px-6`, content `max-w-3xl mx-auto`.
- Catalog: 2-column grid (`md:grid-cols-2 md:gap-6`).
- Home carousels remain scrollers but each card grows to `md:w-56`.
- Room: gallery becomes a 4-photo collage if time permits — otherwise keep mobile carousel. Out of scope to perfect.
- `BottomNav` hidden (`md:hidden`). No replacement nav implemented.

#### 6.2.3 Desktop
- Content `max-w-6xl mx-auto`.
- Catalog: 3-column grid (`lg:grid-cols-3`).
- Home carousels can convert to 4-up grids per section (`lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible`).
- Room: 2-column layout possible (left scroll content, right sticky reserve card) — out of scope unless time allows.

#### 6.2.4 Wide / Ultra-wide
No new behavior. `max-w-6xl` continues to constrain.

### 6.3 Component Responsive Behavior

| Component | Mobile | Tablet+ |
|---|---|---|
| `BottomNav` | Visible, fixed | Hidden |
| `ListingCard` carousel | `w-44` | `md:w-56` |
| `ListingList` | Stack | 2-col grid (`md:`), 3-col (`lg:`) |
| `RoomGallery` | Carousel | Same (gallery grid is stretch goal) |
| `RoomCalendar` | Single month | Same |
| `Footer` link groups | Stacked | 3 columns at `md:` (`md:grid-cols-3`) |
| `InspirationSection` items | 2 columns | 4 columns at `md:` |
| `CategoryTabs` | Centered row | Centered row, larger spacing |

### 6.4 Touch vs Pointer Considerations
- Minimum touch target 40×40 px for all buttons including `FavoriteButton`, BottomNav items, calendar cells.
- Hover effects (`md:hover:*`) only at `md:` and up — never on mobile.
- No tooltips. Anything currently shown on hover must also be visible by default.

---

## 7. Accessibility

### 7.1 Compliance Target
WCAG 2.2 AA where reasonably achievable for a teaching project. Not formally audited, but components must follow the rules below.

### 7.2 Semantic Structure
- One `<h1>` per page: Home → visually hidden "Discover homes"; Catalog → "Homes in map area"; Room → room title.
- Section headers use `<h2>`. Nested groupings (e.g., Room "What this place offers", "Where you'll be") are `<h2>`.
- `<main>`, `<footer>`, `<nav>` landmarks present on every page.

### 7.3 Keyboard Navigation
- Logical DOM order matches visual order.
- All interactive elements reachable via Tab.
- `FavoriteButton` is a `<button>`, not a `<div>`.
- `ListingCard` link wraps the card; favorite button is a sibling positioned absolutely (so it isn't nested in the link, which would break semantics).
- No focus traps. No keyboard shortcuts.

### 7.4 Focus Indicators
- Use Tailwind `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]` on every interactive element.
- Do not remove default focus rings without replacement.

### 7.5 ARIA Roles & Attributes
- `BottomNav`: `<nav aria-label="Primary">`, active item `aria-current="page"`.
- `SearchBar`: `<form role="search">`, each field has a visible label or `aria-label`, submit button name is `Search`.
- `RoomGallery`: `role="region" aria-label="Photo gallery"`.
- `FavoriteButton`: `aria-pressed`, `aria-label="Save to wishlist"` / `"Remove from wishlist"`.
- `RatingPill`: `aria-label="Rated {n} out of 5, {m} reviews"`; visual children `aria-hidden`.
- `MapView`: iframe has a descriptive `title`; fallback link text is meaningful.
- Decorative icons: `aria-hidden="true"` (default in `<Icon>` component).

### 7.6 Color Contrast
- `--color-text-primary` (`#222`) on `--color-bg` (`#FFF`) → AAA.
- `--color-text-secondary` (`#717171`) on `#FFF` → 4.6:1, passes AA for body, fails AAA. Acceptable for meta text.
- `--color-primary` (`#FF385C`) on white → 3.7:1; use only for large/bold text, button backgrounds (white on pink: 3.7:1 is borderline — verify with `font-semibold` and `≥16px`). On Reserve button, prefer white text at `font-semibold` ≥16px.
- Do not use secondary text as the only indicator of meaning.

### 7.7 Screen Reader Behavior
- Listing card link announces title + price + rating via accessible name composed from visible text (no extra `aria-label` needed if all text is in DOM).
- `notFound()` page announces the heading.
- No live regions in scope (no async updates).

### 7.8 Reduced Motion
- Respect `prefers-reduced-motion: reduce` via Tailwind's `motion-reduce:` modifier.
- Disable scale on hover, disable heart pop animation. Color transitions are still acceptable.

### 7.9 Internationalization / RTL
Out of scope. UI is English-only. Do not hardcode RTL-incompatible utilities (`pl-*`/`pr-*`); prefer logical equivalents (`ps-*`/`pe-*`) where convenient, but not mandatory.

---

## 8. Implementation Notes

### 8.1 Folder / File Structure

```
/app
  layout.tsx                       ← root layout, imports globals.css, defines <html>/<body>
  page.tsx                         ← Home
  catalog/
    page.tsx                       ← Catalog
  rooms/
    [id]/
      page.tsx                     ← Room detail
      not-found.tsx                ← Room not found fallback
  globals.css                      ← Tailwind directives + CSS custom properties
  favicon.ico

/components
  /shared
    Footer.tsx
    BottomNav.tsx
    Badge.tsx
    RatingPill.tsx
    FavoriteButton.tsx
    SearchBar.tsx
    SectionHeader.tsx
    IconText.tsx
    Icon.tsx
  /listing
    ListingCard.tsx
    ListingSection.tsx
    ListingList.tsx
  /home
    CategoryTabs.tsx
    InspirationSection.tsx
  /catalog
    CatalogHeader.tsx
    MapView.tsx
    PriceDisclaimer.tsx
  /room
    RoomGallery.tsx
    RoomHeader.tsx
    RoomRatingBar.tsx
    RoomPriceReserve.tsx
    RoomHighlights.tsx
    RoomDescription.tsx
    AmenitiesList.tsx
    RoomLocation.tsx
    RoomCalendar.tsx
    RoomReviewsSummary.tsx
    ReviewMentionsList.tsx
    ReviewCard.tsx
    ReviewList.tsx
    HostCard.tsx
    ThingsToKnow.tsx
    RelatedLocations.tsx
    OtherStayTypes.tsx

/types
  index.ts                         ← re-exports all
  badge.ts
  icon.ts
  listing.ts
  room.ts
  amenity.ts
  review.ts
  inspiration.ts
  search.ts
  host.ts
  highlight.ts
  thingsToKnow.ts
  footer.ts                         ← FooterLink, FooterLinkGroup, SocialLink
  nav.ts

/data
  homeSections.ts                  ← grouped listings for Home
  catalogListings.ts               ← flat listing array for Catalog
  rooms.ts                         ← Room[] keyed by id
  footerLinks.ts                   ← FooterLinkGroup[]
  footerLegalLinks.ts              ← FooterLink[]
  footerSocialLinks.ts             ← SocialLink[]
  bottomNav.ts                     ← NavItem[]
  categoryTabs.ts                  ← CategoryTab[]
  inspirationTabs.ts               ← tabs + itemsByTab

/public
  /images
    /listings                      ← jpg or svg placeholders
    /rooms
    map-placeholder.png              ← fallback only for Google Maps iframe error/loading
```

Components never import from `/app`. Pages import from `/components`, `/data`, `/types`. Data files import from `/types` only.

### 8.2 Naming Conventions
- Components: `PascalCase.tsx`. One default export per file, named the same as the file.
- Types: `PascalCase` for type aliases/interfaces (`Listing`, `Room`). Files `camelCase.ts`.
- Data: `camelCase` const exports (`export const homeSections: HomeSection[] = [...]`).
- Tailwind class strings: prefer logical grouping `layout | spacing | typography | color | state`. No `clsx` required for this scope; use template literals if conditional classes are needed.
- IDs in mock data: stable strings like `"dallas-cedars-1"`, never numeric increment, so URLs are predictable.

### 8.3 Styling Approach
- Tailwind utilities only. No CSS Modules, no styled-components, no Sass.
- CSS custom properties (color tokens) declared in `globals.css` under `:root`. Reference them in Tailwind via arbitrary values: `text-[--color-text-primary]`, `bg-[--color-primary]`.
- No global classes outside Tailwind layers.

### 8.4 Token Implementation
- Colors live in `app/globals.css`:
  ```css
  :root {
    --color-bg: #FFFFFF;
    --color-text-primary: #222222;
    --color-text-secondary: #717171;
    --color-border: #EBEBEB;
    --color-primary: #FF385C;
    --color-primary-hover: #E11D48;
    /* ... */
  }
  ```
- Type scale, spacing, radius, sizing → use Tailwind defaults; document deviations in this spec only.

### 8.5 State Management
- React local state and URL query params only. No Redux, Zustand, Context.
- Stateful interactions in scope:
  - `SearchBar` (controlled form fields initialized from URL query params).
  - `FavoriteButton` (per-card local boolean).
  - `InspirationSection` (active tab id).
  - `RoomDescription` / `ReviewCard` (expanded boolean).
  - `AmenitiesList` / `ReviewList` (show preview vs show all).
  - `RoomCalendar` (selected check-in/check-out range).
  - Lightweight reservation/contact/dialog state.
- Keep state as local as possible. If `RoomCalendar` selection needs to feed `RoomPriceReserve`, lift that date state into a small room-page client wrapper.

### 8.6 Data / API Contracts
- No live API. All data imported from `/data`.
- Listing records that appear on multiple pages must come from one canonical data source or share a canonical base object. Do not derive divergent `reviewCount`, price, rating, badge, or location values for the same listing id on Home vs Catalog vs Room.
- Room review data is intentionally small: each room has 6-10 mock reviews, and displayed review totals match the mock review array length.
- Room lookup pattern in `app/rooms/[id]/page.tsx`:
  ```ts
  import { rooms } from '@/data/rooms';
  import { notFound } from 'next/navigation';

  export default function RoomPage({ params }: { params: { id: string } }) {
    const room = rooms.find(r => r.id === params.id);
    if (!room) notFound();
    return <RoomPageView room={room} />;
  }
  ```
- If/when async is added later, components should accept already-resolved props; pages do the fetching.

### 8.7 Asset Handling
- Use `next/image` for all photos. Listing card images sized to render dimensions to avoid CLS.
- Remote image domains (Unsplash etc.) must be added to `next.config.js` `images.remotePatterns`.
- Icons via `lucide-react` (single allowed dep) wrapped in `<Icon>`.
- Fonts: system stack only — no font imports.

### 8.8 Performance Considerations
- Use `next/image` `priority` only for the first Room gallery image.
- Carousels are pure CSS — no JS scroll listeners.
- Avoid client components where not needed: any component with no state/effects/handlers should remain a Server Component (default in App Router). Client components are expected for `SearchBar`, `FavoriteButton`, `InspirationSection`, `RoomDescription`, `AmenitiesList`, `RoomCalendar`, `RoomPriceReserve` if it opens a dialog, `RoomReviewsSummary` only if interactive, `ReviewCard`, `ReviewList`, `HostCard` if it opens a dialog, and `BottomNav` (because of `usePathname` or dialogs).

### 8.9 Browser Support
Latest two versions of Chrome, Safari, Firefox, Edge. No IE. iOS Safari ≥ 16.

### 8.10 Dependencies
Required:
- `next@16`, `react`, `react-dom`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`.
- `lucide-react` (icons; allowed because it is an icon set, not a UI component library).
- Google Maps embed uses an iframe and should not require a React map library. If an API key is used, it must come from `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY`.

Forbidden:
- shadcn/ui, Radix, Headless UI, MUI, Chakra, Ant Design, Bootstrap, DaisyUI, react-bootstrap, Mantine.
- Any state management lib.
- Any carousel library — use native scroll-snap.
- Any form library.
- Any Google Maps React wrapper unless explicitly approved; iframe embed is enough for this project.

### 8.11 Out of Scope
- Authentication, accounts, login flow.
- Server-backed search, filtering, and sorting.
- Filtering / sorting on Catalog.
- Advanced map controls beyond the embedded Google Map.
- Multi-month calendar, blocked dates, pricing rules, or persistence of selected dates.
- Booking flow / payments.
- Persistence of favorites.
- Server Actions, route handlers.
- Internationalization, RTL.
- Dark mode.
- Analytics.
- Testing infrastructure (see §9 for the spec, not the implementation expectation for this teaching project).

### 8.12 Open Questions / Assumptions
- Assumed system font stack is acceptable. Confirm if a Google Font (e.g., Inter) is desired instead.
- Assumed `lucide-react` is allowed. If strict zero-dependency-icons is required, switch to inline SVGs in `<Icon>`.
- Assumed remote image hosts (Unsplash) are acceptable. Otherwise place local images in `/public/images/`.
- Confirm whether the Reserve button should open an inline panel or a modal. It must not be a no-op.
- Confirm whether Google Maps should use a no-key iframe URL or a project-provided `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY`.
- Confirm number of mock listings per Home section (spec assumes 4 per city). Catalog assumes ~12.

---

## 9. Testing and QA

### 9.1 Test Strategy
This is a teaching project — automated testing is **optional**. The spec below describes what testing would look like if implemented; do not block delivery on missing tests. Manual QA per §9.7 is the minimum bar.

### 9.2 Unit Testing
- If implemented: Vitest + React Testing Library.
- Coverage targets: `SearchBar` (submits query params and initializes from them), `ListingCard` (both variants render expected text given a `Listing`), `Badge` (renders correct kind), `RatingPill` (formats rating + handles missing reviewCount), `FavoriteButton` (toggles `aria-pressed` on click), `AmenitiesList` / `ReviewList` (show-all toggles), and `RoomCalendar` (date range selection).
- Pure presentational components without branching logic do not require tests.

### 9.3 Integration Testing
- If implemented: render each page with its mock data and assert key sections exist (e.g., Home renders ≥1 `ListingSection`, Catalog renders ≥1 `ListingCard`, Room renders title and Reserve button).
- Mock `next/link` and `next/image` per Next.js testing docs.

### 9.4 End-to-End Testing
Not required. If added later: Playwright flows — Home → submit search → Catalog with values preserved; Catalog → click first card → Room detail with search bar still visible; toggle favorite on a Catalog card; room calendar date selection; Show all amenities/reviews expansion.

### 9.5 Visual Regression Testing
Not required. If added later: Playwright screenshots at 375 × 667 and 1280 × 800 for `/`, `/catalog`, `/rooms/{first-id}`.

### 9.6 Accessibility Testing
- Manual: keyboard-only walk through each page (Tab, Shift+Tab, Enter). Verify visible focus on every step.
- Automated (optional): run `axe` against each page; expect zero serious/critical violations.
- Verify color contrast for `--color-text-secondary` and `--color-primary` against backgrounds (already documented in §7.6).

### 9.7 Manual QA Steps

**Per page:**
1. Load at 375px width (Chrome DevTools mobile). Confirm no horizontal scroll.
2. Resize to 768px and 1280px. Confirm grid reflows per §6.2.
3. Tab through all interactive elements. Focus ring visible on each.
4. Reload with throttled CPU. Confirm no flash of unstyled content (FOUC).
5. Confirm the persistent `SearchBar` is present and usable on Home, Catalog, and Room pages.

**Home:**
- Each city section has the same shape (header + carousel) and is rendered by the same component (verify in React DevTools that the component name `ListingSection` repeats).
- Carousels scroll horizontally on touch and trackpad.
- Tapping any card navigates to `/rooms/{id}`.

**Catalog:**
- Sticky header stays at top while scrolling.
- Google Map iframe loads for the search area and includes a larger-map link.
- All cards render from `catalogListings` data — verify count matches data length.
- Favorite toggle works without triggering navigation.
- Submitting the search form updates the URL query params and keeps values visible.

**Room:**
- Visiting `/rooms/{valid-id}` renders the page.
- Visiting `/rooms/does-not-exist` renders `not-found.tsx`.
- Description "Show more" toggles.
- Persistent `SearchBar` remains visible after navigating from a listing card.
- Google Map iframe loads for the room location.
- Calendar day buttons select check-in/check-out, update the heading/date range, and `Clear dates` clears selection.
- "Show all amenities" expands/collapses the full mock amenity list.
- "Show all reviews" expands/collapses all 6-10 mock reviews.
- Reserve and Message host controls open visible confirmation/contact UI.

### 9.8 Test Data & Fixtures
Reuse the mock data from `/data` for tests. No separate fixtures required.

### 9.9 Tooling
- TypeScript: strict mode (`"strict": true`, `"noUncheckedIndexedAccess": true` recommended).
- ESLint: Next.js default config + `react/jsx-key` enforced.
- Prettier: default config.
- Optional: Vitest, React Testing Library, axe-core.
- CI: not required for this scope.

### 9.10 Coverage Targets
N/A — testing is optional. If implemented, aim for 70% line coverage on `/components`, no target on `/app` or `/data`.

---

## 10. Acceptance Criteria

### 10.1 Visual Parity Checklist
- [ ] Home renders multiple city sections matching the order of `homeSections`.
- [ ] Each Home section uses the same `ListingSection` component (verifiable via React DevTools).
- [ ] Catalog renders a vertical stack (mobile) / grid (desktop) of `ListingCard variant="stacked"`.
- [ ] Room page renders all sections in §4.2 order.
- [ ] Color tokens match §3.1.1 hex values exactly.
- [ ] Type scale matches §3.2.2.
- [ ] Border radii match §3.5.
- [ ] No third-party UI component visible in the rendered tree.

### 10.2 Functional Checklist
- [ ] Persistent segmented `SearchBar` renders on Home, Catalog, and Room pages.
- [ ] Search form fields are editable, submit to `/catalog` with query params, and preserve visible values after navigation.
- [ ] Tapping any `ListingCard` navigates to `/rooms/{listing.id}` via `<Link>`.
- [ ] Navigating from a listing to a room page does not remove the search bar.
- [ ] Listing links preserve current search query params so search values remain visible on the room page.
- [ ] `FavoriteButton` toggles state and does not trigger card navigation.
- [ ] `InspirationSection` tabs change the rendered items.
- [ ] `RoomDescription` "Show more" expands and collapses.
- [ ] `AmenitiesList` "Show all amenities" expands/collapses and the label count matches actual mock data.
- [ ] `RoomCalendar` day selection, date range updates, city heading, and Clear dates all work.
- [ ] `ReviewList` has 6-10 mock reviews per room and "Show all reviews" expands/collapses them.
- [ ] Reserve and Message host controls produce visible UI, not no-ops.
- [ ] Google Map iframe renders on Catalog and Room location sections, with accessible title and fallback larger-map link.
- [ ] `app/rooms/[id]/not-found.tsx` displays for unknown ids.
- [ ] All internal navigation uses `<Link>` — no bare `<a>` for internal routes (search the codebase).
- [ ] No listing, amenity, review, or footer link is hardcoded in JSX — every repeated UI block comes from `.map()` over typed data (search for repeated literal strings).
- [ ] Footer legal/social links are defined in typed `/data` files and passed into `Footer`; they are not local arrays in the component.
- [ ] `RoomCalendar` and `RoomReviewsSummary` render room-specific data (`city`, `isGuestFavorite`) and do not hardcode Dallas or Guest favorite.
- [ ] Same listing ids share canonical price/rating/review/location values across Home, Catalog, and Room data.
- [ ] No clickable/focusable element is a silent no-op.

### 10.3 Accessibility Checklist
- [ ] One `<h1>` per page.
- [ ] All interactive elements reachable via keyboard.
- [ ] Visible focus ring on every interactive element.
- [ ] All images have meaningful or empty `alt`.
- [ ] `FavoriteButton` exposes `aria-pressed` and an `aria-label`.
- [ ] `BottomNav` active item carries `aria-current="page"`.
- [ ] No text relies on color alone to convey meaning.
- [ ] `prefers-reduced-motion` honored (no scale on hover).

### 10.4 Responsive Checklist
- [ ] No horizontal scrollbar at 375px.
- [ ] Catalog reflows to 2 columns at 768px and 3 columns at 1024px.
- [ ] `BottomNav` hidden at 768px+.
- [ ] Footer link groups become 3 columns at 768px+.
- [ ] Home carousels remain usable at all breakpoints.
- [ ] Hover states only fire on `md:` and up.

### 10.5 Handoff Checklist
- [ ] All §4.2 components exist in the documented folders.
- [ ] All §4.2 prop signatures match the spec (or deviations documented in §8.12).
- [ ] All `/types/*.ts` files exist and are re-exported from `/types/index.ts`.
- [ ] All `/data/*.ts` files exist, are typed, and contain the assumed counts (§8.12).
- [ ] CSS custom properties from §3.1.1 declared in `globals.css`.
- [ ] No forbidden dependencies in `package.json` (§8.10).
- [ ] README documents how to run (`npm install`, `npm run dev`).
- [ ] Spec open questions in §8.12 confirmed or explicitly accepted as-is.

---

## 11. Appendix

### 11.1 Glossary
- **Listing** — a card-summary representation of a place to stay (Home and Catalog).
- **Room** — the full data object for a single place to stay (Room Detail page).
- **Carousel card** vs **stacked card** — the two visual variants of `ListingCard`.
- **Section** — a titled block of content. On Home, each city group is a section. On Room, each labeled area (amenities, location, etc.) is a section.
- **Variant** — a prop-controlled visual mode of a component.

### 11.2 Change Log
- v0.1 — Initial template scaffolded.
- v0.2 — Added Screen Inventory, Testing & QA, Handoff Checklist sections.
- v1.0 — Populated from screenshots: Home, Catalog, Room Detail. Component plan, types, data files, and build order finalized.

### 11.3 References
- `home_page.png`, `catalog_page.png`, `room_page.png` — supplied screenshots.
- Next.js App Router docs: https://nextjs.org/docs/app
- Tailwind CSS docs: https://tailwindcss.com/docs
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
