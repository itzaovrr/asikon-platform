## Home Polish Plan (logged-out `/`)

The current page works but feels uneven: an empty Gallery panel, weak section headers, no hero anchor above the brand strip, and the masterpiece + CTA card sit with too much whitespace.

### 1. Fix the broken Gallery section
`GalleryCarousel` is rendering a huge blank panel.
- Add a non-empty fallback (skeletons → empty state with icon + copy + CTA).
- Cap height to ~280px on mobile so it can't blow up the page.
- Tighten section header to match `SectionHeader` pattern used elsewhere.

### 2. Strengthen the top of the page
`FlexiTopSection` is the first thing visible.
- Add a small eyebrow ("Welcome to ASIKON") above "Start learning today".
- Bump CTA card height + add a secondary "Browse courses" ghost link.
- Polish the right-side stat tiles: align icons, add subtle hover, show a trend dot.
- Reduce gap between CTA card and pill tiles (currently `space-y-4` → `space-y-3`).

### 3. Brand strip
- Add `INSIDE ASIKON` eyebrow + "Trusted tools we teach" subtitle.
- Mask edges with a fade gradient so logos don't hard-cut.
- Slow the marquee slightly; pause on hover.

### 4. Masterpiece showcase
- Tighten heading + reduce vertical padding.
- Move "Explore library / Read more" closer to the fanned covers.
- Add subtle floating animation to the center book only (currently static).

### 5. Final CTA card ("Learn smarter")
- Add a faint grid/dot pattern + glow blob behind the headline.
- Make the "Start learning" pill full-width on mobile, icon on the right.
- Add 3 micro trust chips below ("Instant access · Money-back · 24/7 AI tutor") to reuse the trust signal pattern.

### 6. Section rhythm + reveals
- Wrap each top-level section in `<Reveal>` with staggered delay (0/60/120ms) for a calmer entrance.
- Standardize vertical spacing: `space-y-6 lg:space-y-12` on `MobilePage`.
- Add `scroll-mt-20` to each section for anchor navigation.

### Technical notes
- Files touched: `src/pages/Index.tsx`, `src/components/home/mobile/FlexiTopSection.tsx`, `src/components/home/BrandStrip.tsx`, `src/components/home/mobile/GalleryCarousel.tsx`, `src/components/home/MasterpieceShowcase.tsx`, plus a new CTA component or inline edit.
- No new dependencies. All motion respects `prefers-reduced-motion` via existing `Reveal` + CSS guards.
- Colors stay on the Midnight Indigo tokens already defined in `index.css` — no hex values in components.

### Out of scope
- No new data sources or API changes.
- Logged-in home (greeting + mission + quick actions) — already polished last pass.
- No layout restructure of the AppLayout shell.
