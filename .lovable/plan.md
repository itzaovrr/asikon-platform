# Plan: Course → YouTube-style card, others → Product card

## Goal
- **Courses** category → YouTube video tile (thumbnail-first, channel row, views • age, no prominent price).
- **AI Tutor, Books, others** → keep the current Refined Editorial product card unchanged.

## Approach
Introduce a new presentational component `CourseVideoCard` and route between it and `ProductCard` based on the product's category. No backend/data changes.

### 1. New component `src/components/shop/CourseVideoCard.tsx`
YouTube-grid inspired layout:
- 16:9 thumbnail (`aspect-video`, `rounded-xl`), `object-cover`, hover `scale-[1.02]`.
- Bottom-right duration pill (`bg-black/80 text-white text-[11px]`).
- Below the thumbnail, two-row block (no card chrome — flat, like youtube.com):
  - Row A: 36px round channel avatar (use `product.brand` initial or brand logo fallback) + Row B content beside it.
  - Row B: 
    - Title: `font-display font-semibold text-sm md:text-base line-clamp-2 leading-snug`, hover `text-primary`.
    - Brand/channel: `text-xs text-muted-foreground` with verified ✓ when `isAuthentic`.
    - Meta line: `{reviews} students · ★ {rating}` + `· {Price}` muted/small (since this is a paid course platform, keep price inline but de-emphasized).
- Wishlist button: small ghost icon at top-right of the thumbnail, only visible on hover (desktop) / always-on mobile, smaller than current.
- Discount badge: small red pill top-left only when discount > 0.
- No quick-view overlay, no hover action bar (YouTube doesn't have one).
- Mobile: same single-column layout (already 1-col under `sm`), title stays 2 lines.

### 2. Routing logic
Add an optional prop on the existing render sites OR detect via category context.

Chosen path: pass an explicit `categorySlug` or `kind` from the caller. Cleanest spot is `Shop.tsx` where `activeCategory` is known:
- In `src/pages/Shop.tsx` grid map, branch:
  ```
  {activeCategory === "Courses" 
    ? <CourseVideoCard product={...} />
    : <ProductCard product={...} />}
  ```
- For carousels (`ProductCarousel`, `Index.tsx` sections) and category-mixed views, keep `ProductCard`. Only the Shop page when filtered to Courses (or a future dedicated Courses section) swaps in `CourseVideoCard`.

Optional follow-up: if a `Courses` carousel exists on Home, pass a `cardKind="course"` prop to `ProductCarousel` and forward to `CourseVideoCard`. (Will check during implementation; skipped if no such section exists.)

### 3. Grid spacing for courses
`grid-products` already gives 1/2/3 columns — works for YouTube tiles. No CSS change needed. If course rows feel cramped, bump `gap-3` → `gap-y-6` only inside the Courses branch via a wrapper class.

### 4. ProductCard
No changes — AI Tutor, Books, etc. keep the existing card exactly as it is today.

## Technical notes
- All colors via existing HSL tokens (`text-foreground`, `text-muted-foreground`, `text-primary`, `bg-card`, `border-border`).
- Channel avatar: simple `<div>` with brand initial in `bg-primary/10 text-primary` (cheap, no new image asset).
- Component is presentational + memoized like `ProductCard`.

## Files
- **Add**: `src/components/shop/CourseVideoCard.tsx`
- **Edit**: `src/pages/Shop.tsx` (conditional render in grid)

## Out of scope
- Schema/category data changes.
- Modifications to ProductCard, ProductQuickView, ProductCarousel.
- Detail page (`/product/:slug`) UI.
