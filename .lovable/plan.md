# Sub-Page Redesign — Native-App Minimal

Goal: bring Product, Course/Track, Lesson, Cart, Checkout, Orders, Order Detail, and Wishlist up to the same clean, native-app quality as the new MobileHeader. Mobile-first (393px) with full desktop layouts. No new business logic — presentation only.

## Shared design language

All pages adopt the same primitives so they feel like one app:

- **Page chrome**: transparent on top of scroll, frosted `bg-background/80 backdrop-blur-2xl` + 1px hairline once scrolled (reuse `useScrollTop`).
- **Type**: Space Grotesk for page titles (28/32 mobile, 40/44 desktop), Inter for body. Tight tracking on titles, no all-caps eyebrows.
- **Surfaces**: flat by default. One subtle elevation only where it earns it (sticky bars, drawers). No nested glass cards.
- **Borders**: `border-border/40` hairlines, never double-bordered.
- **Spacing**: 16px gutters mobile, 32px desktop; 24/32/48 section rhythm.
- **CTAs**: full-width primary on mobile sticky bar; inline on desktop right rail.
- **Motion**: 200ms ease, opacity + 4px translate only. No bouncy springs.

A small set of shared primitives gets added/extended:

- `PageHero` (title + subtitle + optional meta row)
- `DetailSection` (h2 + content with consistent vertical rhythm)
- `MetaRow` (icon + label + value, used for price, duration, level, etc.)
- Reuse existing `StickyActionBar`, `SectionHeader`, `Skeleton`.

## Page-by-page changes

### 1. ProductDetail (`src/pages/ProductDetail.tsx`)
- Mobile: edge-to-edge gallery (swipe), title block, price row, variant chips (size/color), trust row (COD, return), expandable description, reviews summary + top 3, related products carousel, FAQ. Sticky bottom: qty stepper + Add to cart / Buy now.
- Desktop: 60/40 split — gallery left (thumbnail rail), info column right with sticky CTA card.
- Strip nested glass cards from current 316-line file; use flat sections divided by hairlines.

### 2. TrackDetail (`src/pages/TrackDetail.tsx`)
- Hero: cover image (16:9 mobile / 21:9 desktop), title, instructor row, rating + enrollments.
- Meta row: lessons count · duration · level · language.
- Tabs: Overview · Curriculum · Reviews · FAQ.
- Curriculum: collapsible modules with lesson list, lock/complete icons.
- Sticky enroll CTA mobile; desktop sticky right card with price + Enroll.

### 3. LessonDetail (`src/pages/LessonDetail.tsx`)
- Mobile: video/content full-bleed top, title, progress bar, prev/next pager, notes accordion, "Up next" list.
- Desktop: left video column, right rail with curriculum tree (current lesson highlighted), Mark complete button.

### 4. Cart (`src/pages/Cart.tsx`)
- Clean list rows (thumbnail · title · variant · qty stepper · line price · remove icon). Hairline dividers, no card-in-card.
- Summary block: subtotal, shipping, discount input, total.
- Mobile sticky checkout bar; desktop right summary card.
- Empty state with single CTA.

### 5. Checkout (`src/pages/Checkout.tsx`)
- Single column on mobile with numbered steps (Contact → Shipping → Payment → Review). Each step a `DetailSection` with inline edit.
- Desktop: 60/40 split with order summary sticky right.
- Form inputs use existing shadcn `Input`/`Select` with `h-12` and clean labels above.

### 6. Orders (`src/pages/Orders.tsx`)
- Filter chips row (All · Processing · Shipped · Delivered · Cancelled).
- Order rows: id · date · item thumbnails stack · status badge · total · chevron.
- Empty state.

### 7. OrderDetail (`src/pages/OrderDetail.tsx`)
- Status timeline (Placed → Confirmed → Shipped → Delivered) horizontal on desktop, vertical on mobile.
- Items list, shipping address card, payment summary, support CTA.

### 8. Wishlist (`src/pages/Wishlist.tsx`)
- 2-col mobile / 4-col desktop product grid reusing `ProductCard`.
- Bulk "Move all to cart" action in header.
- Empty state.

## Out of scope
- No data model / hook changes. Pages keep reading from the same hooks.
- Cart/checkout business logic, payment integration, and order state machine are unchanged.
- Admin pages, Community, Profile, Home are not touched.
- Header, BottomNav, AppLayout untouched (already redesigned).

## Technical notes
- Add primitives under `src/components/ui/page-hero.tsx`, `detail-section.tsx`, `meta-row.tsx`.
- Keep all colors via semantic tokens (`text-foreground`, `bg-background`, `border-border`, `text-primary`). No raw hex.
- Use `embla-carousel-react` for product gallery and related carousel (matches existing carousel pattern).
- Use `Tabs` from shadcn for TrackDetail tabs.
- Skeletons for every async section using `<Skeleton />`.
- Preserve all current routes, props, and hook calls; only swap JSX/markup.

## Verification
After implementation: load each route at 393px and 1440px, confirm sticky bars, gallery swipe, tab switching, and empty states render cleanly; typecheck.

