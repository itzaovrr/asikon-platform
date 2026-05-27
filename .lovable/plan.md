# Product Detail — Desktop UI Refresh

Restyle the desktop layout of `src/pages/ProductDetail.tsx` to match the structure and feel of the attached BloxElite reference (warm soft-amber backdrop, framed gallery, compact info column, grouped detail cards). Mobile stays as-is. Digital-only constraints (no shipping, no size for non-apparel) are preserved.

## Reference takeaways

- Two-column hero: large framed image on the left with vertical thumbnail strip below; tight info column on the right.
- Soft amber/cream gradient backdrop only behind the hero block — gives the "studio" feel.
- Stacked info: title → rating row → price row (with strike) → variant selector pills → stock line → quantity + primary CTA + heart icon.
- Below the CTA: two grouped cards — "Description" and "Product Details" (2×2 icon grid: Delivery / Size Table / Champion / Maintenance).
- Section below: "Boxing Also Bought" → maps to our existing related products carousel, restyled with a sectional header.

## Desktop changes (lg+ only)

1. **Hero band**
   - Wrap the gallery + info grid in a section with a subtle warm gradient (`bg-gradient-to-br from-amber-50/40 via-background to-background dark:from-amber-950/10`), rounded-3xl, generous padding.
   - Gallery: keep aspect-square but frame with `rounded-3xl` + soft inner ring, add a thin highlight bar at the very top of the image (decorative, matches reference).
   - Thumbnail strip stays beneath the gallery, larger (20×20) with active ring in primary color.

2. **Info column** (tighter, more grouped like reference)
   - Title uses display font, slightly larger, uppercase tracking optional.
   - Rating row: filled stars + `4.9/5 (3,470 Reviews)` style.
   - Price row: current price big + strike price inline.
   - For apparel: keep size pills (rounded full, outlined). For courses/books: hide size, keep quantity.
   - Stock line: "Instant access · delivered to your library" with check icon (replaces reference's "In stock — can be backordered" with digital equivalent).
   - CTA row: quantity stepper + full-width primary `Add to cart` / `Enroll now` + circular heart button (matches reference layout).

3. **Two grouped cards below CTA**
   - **Description card**: rounded-2xl, border, label "Description" + chevron, body = `product.description`.
   - **Product Details card**: rounded-2xl, header "Product Details" + chevron, body = 2×2 grid of mini icon tiles. Digital-adapted tiles:
     - `Zap` — Instant Access · Unlock now
     - `ShieldCheck` — Secure Checkout · SSL + bKash
     - `RotateCcw` — 7-Day Refund · No questions
     - `Award` — Verified · Trusted creator
   - Each tile: rounded-xl muted background, small icon in circle, bold label + muted sublabel.

4. **Below the hero band** (unchanged structure, restyled headers)
   - Course-only sections (What you will learn, Curriculum, Instructor) remain.
   - Reviews + FAQ remain.
   - Related products → section title styled like "Boxing Also Bought" (bold display, with "See all" link to `/shop`).

## Out of scope

- Mobile layout (sticky CTA, single column) stays exactly as today.
- No data/business logic changes — cart, auth, pricing, variants all unchanged.
- No new components extracted; edits live in `src/pages/ProductDetail.tsx` using existing tokens, shadcn primitives, and lucide icons.
- No new color tokens; reuse `--primary`, `--muted`, `--success`, amber from tailwind palette for the hero backdrop only.

## Files

- `src/pages/ProductDetail.tsx` — desktop JSX restructure inside the existing `lg:` grid; mobile branches untouched.
