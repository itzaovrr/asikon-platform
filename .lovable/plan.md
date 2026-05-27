# Exact-match Coming Soon cards

Rebuild `src/components/home/ComingSoonTrio.tsx` so the three cards visually match the reference 1:1.

## Card specs (3-column grid, equal height, rounded-3xl)

| # | Background | Text | Chip | Illustration |
|---|---|---|---|---|
| 1 Course | Solid black `#0e0e10` | White | White pill, dark text, leading dot | Stylized 3D "course wheel" (course cards fanned out) |
| 2 Book | Light gray `#ececec` | Near-black | White pill, dark text, leading dot | 3D book + AI chip illustration overlapping the card |
| 3 Teaching | Lime green `#c8ff5a` | Near-black | White pill, dark text, leading dot | 3D "GAME ON"–style tag → swap to "BOOK NOW" tutor badge illustration |

Colors are baked in to match the reference exactly (per user request); brand red tokens are not used here.

## Layout per card (matches reference precisely)
- Padding `p-5`, fixed min-height
- Top: small white pill chip with `•` dot + label
- Big bold title (Inter/Space Grotesk, ~28px, tight tracking)
- One-line subtitle below title
- Illustration anchored bottom, slightly overflowing the bottom-right edge (negative margins + `overflow-hidden` on card)
- Card uses subtle shadow + hover lift

## Illustrations
Generate 3 PNG illustrations with transparent backgrounds via `imagegen` (premium tier for crispness):
- `src/assets/coming-soon-course.png` — playful 3D fanned course-cards wheel
- `src/assets/coming-soon-book.png` — 3D hardcover book + glowing AI chip
- `src/assets/coming-soon-teaching.png` — 3D rounded tag "BOOK NOW" + tutor avatar card, isometric

Style prompt across all 3: "playful 3D isometric illustration, soft shadows, glossy plastic and matte surfaces, clean studio render, on transparent background, modern web illustration"

## Section header
Keep the existing "What's next / New · Coming soon" header above the trio.

## Files
- Rewrite: `src/components/home/ComingSoonTrio.tsx`
- New assets: 3 PNGs in `src/assets/`

No other files change.
