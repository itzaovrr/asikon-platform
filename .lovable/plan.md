## Goal
Make the Coming Soon cards noticeably smaller and tighter on mobile while keeping the desktop layout untouched.

## Changes (mobile only, `src/components/home/ComingSoonTrio.tsx`)

1. **Card width** — reduce from `w-[72vw] max-w-[260px]` to `w-[58vw] max-w-[200px]` so 1.7 cards peek per screen.
2. **Card height & radius** — `min-h-[210px]` → `min-h-[170px]`; `rounded-[18px]` → `rounded-[16px]`; padding `p-3` → `p-2.5`.
3. **Chip** — smaller text `text-[9px]` → `text-[8px]`, tighter padding, smaller dot.
4. **Title** — `text-[15px]` → `text-[13px]`, tighter top margin.
5. **Subtitle** — `text-[11px]` → `text-[10px]`, clamp to 2 lines.
6. **Illustration area** — container `h-[90px]` → `h-[70px]`; image `h-[120px]` → `h-[95px]`.
7. **Gap** between cards `gap-2.5` → `gap-2`.

All `sm:` classes (desktop) remain unchanged.

No other files touched.