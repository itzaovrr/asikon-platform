# ASIKON Unified Search

Make all search surfaces query real ASIKON data instead of mock fashion/shop terms.

## Sources (Supabase)
- `products` — name, description (shop items)
- `content_items` — title, summary, tags (filter `status='published'`, split by `kind`: course / digital / service)
- `mentors` — name, subjects (filter `is_active=true`)
- `posts` — content (community)

## New shared hook
`src/hooks/useGlobalSearch.ts` — debounced query (250 ms, min 2 chars) that runs the 4 selects in parallel with `.ilike` / `.or` filters and `.limit(5)` each. Returns `{ products, content, mentors, posts, isLoading }`. Cached via react-query.

## Components to update

1. **`SmartSearch`** (desktop header dropdown)
   - Replace mock arrays.
   - Empty state: trending pills derived from top categories + featured content titles (real data, single small query, cached).
   - With query: grouped results dropdown (Products, Courses, Digital, Services, Mentors, Posts) each row links to the right route (`/product/:slug`, `/content/:slug`, `/mentors`, `/profile/:userId` for post authors).
   - Enter key → navigate to `/shop?q=…` (default catch-all).
   - Persist recent searches in `localStorage` (key `asikon:recent-searches`, max 6).

2. **`MobileSearchOverlay`**
   - Same data + grouping as SmartSearch but full-screen list layout with section headers and "See all" links per group.
   - Quick Access pills updated to ASIKON nav (Courses, Digital, Services, Mentors, Community).
   - Real recent + trending from same source.

3. **List pages** (`/shop`, `/courses`, `/digital`, `/services`)
   - `/shop` already has search — leave it.
   - Add a local search input to `CoursesList`, `DigitalList`, `ServicesList` that filters the `useContentItems` result client-side by title/summary/tags (lists are small, no extra query needed).

## Files touched
- new `src/hooks/useGlobalSearch.ts`
- edit `src/components/search/SmartSearch.tsx`
- edit `src/components/search/MobileSearchOverlay.tsx`
- edit `src/pages/CoursesList.tsx`
- edit `src/pages/DigitalList.tsx`
- edit `src/pages/ServicesList.tsx`

## Out of scope
- No new tables, no edge functions, no full-text search index (ilike is fine for current data size).
- Shop's existing filter sheet stays as-is.