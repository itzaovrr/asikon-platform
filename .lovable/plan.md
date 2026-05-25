## Goal
Make every page feel like it loads in ~1 second on a mid-range phone over 4G. We'll attack the three things that matter most: initial JS cost, image weight, and data-fetch waterfalls.

## What we'll change

### 1. Cut initial JavaScript
- Lazy-load `Index` (currently eagerly imported in `App.tsx`) and keep only the shell + router in the entry bundle.
- Move heavy below-the-fold home sections (`Testimonials`, `Faq`, `WhyTrust`, `HowItWorks`, `FinalCta`, curated/new-arrivals carousels) behind `React.lazy` + `IntersectionObserver` so they only load when scrolled near.
- Inside `vite.config.ts`, split `framer-motion`, `next-themes`, `sonner`, and date libs into their own chunks; drop `componentTagger` from production (already dev-only — verify).
- Replace the `lucide-react` barrel imports with per-icon imports (`lucide-react/dist/esm/icons/...`) on the 5–6 hottest pages so tree-shaking actually works.

### 2. Image weight & LCP
- Add `vite-imagetools`; serve hero/product/category images as AVIF with WebP fallback at the exact rendered size (393px viewport today).
- Add `loading="lazy"` + explicit `width`/`height` to every off-screen `<img>`; mark the hero image `fetchpriority="high"` and add a `<link rel="preload">` for it in `index.html`.
- Convert PNG assets in `src/assets` (logo, avatar, hero) to optimized WebP; remove unused ones.

### 3. Data fetching
- Wrap the app in a tuned `QueryClient` (staleTime 60s, gcTime 5m, `refetchOnWindowFocus: false`) and add `placeholderData` so navigations render instantly from cache.
- On `Index`, batch the home queries (sections, banners, categories, products, mentors) into parallel `useQueries` and prefetch on hover/visible for nav links.
- Fix the broken `posts?select=*,profiles(*)` query (PGRST200 in current logs) — it's currently retrying and blocking Community render. Switch to a manual join on `user_id` or add the FK.
- Add `<link rel="preconnect">` to the Supabase domain in `index.html` so the first REST call doesn't pay TLS cost.

### 4. Runtime polish
- Warm route chunks on idle (`requestIdleCallback`) right after first paint for the BottomNav targets (Shop, Community, Learn, Profile) so taps feel instant.
- Memoize the heaviest list renderers (product grid, post feed) with `React.memo` + stable keys.
- Guard `framer-motion` page transitions behind `prefers-reduced-motion` (already partially done) and shorten durations to 180ms to remove perceived latency.

### 5. Verify
- Run `browser--performance_profile` on Home, Shop, Community, Learn, Profile before/after and report LCP, TBT, and JS transfer size. Target: LCP < 1.2s on the 393×701 viewport, initial JS < 180KB gzipped.

## Out of scope
No business-logic, schema, or visual redesign changes — purely loading/perf. The one DB exception is fixing the broken `posts → profiles` relationship, because it's actively failing in the network log.

## Technical notes
- Files touched: `src/App.tsx`, `vite.config.ts`, `index.html`, `src/pages/Index.tsx`, `src/components/home/**`, `src/lib/queryClient.ts` (new), a handful of hot pages for icon imports, and possibly one migration to add the `posts.user_id → profiles.user_id` FK.
- No new runtime deps except `vite-imagetools` (build-time only).
