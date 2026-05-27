# Community page refinement (v2 — Modern minimal editorial)

Apply a calm, editorial pass on `/community`: tighter rhythm, cleaner card chrome, neutral trust signals, and clearer separation between content types — staying inside the existing Apple-quiet design tokens (no indigo/purple primaries on every chrome). Mobile-first; desktop unaffected beyond card spacing.

## Scope (files)

- `src/components/community/CommunityTabs.tsx`
- `src/components/community/PostCard.tsx`
- `src/components/community/VideoCard.tsx`
- `src/components/community/ReviewCard.tsx`
- `src/components/community/ShortCard.tsx`
- `src/components/community/CreatorCard.tsx`
- `src/components/community/VerifiedBuyerBadge.tsx`
- `src/components/community/ProductTag.tsx`
- `src/components/community/tabs/MyFeedTab.tsx`

## Visual changes

### Tabs (`CommunityTabs.tsx`)
- Tighten to `gap-5`, `py-2.5`, font `text-[13px]`. Active indicator becomes a `h-[2px] w-6 mx-auto` foreground pill centered under the label (current full-width bar feels heavy).
- Keep sticky glass header.

### Story rail (`MyFeedTab.tsx` stories)
- Add Story tile: dashed `border-border` neutral surface (drop secondary fill).
- Add subtle uppercase tracking on labels (`text-[10.5px] tracking-[0.04em]`), single line, truncate at 8ch.
- `pt-3 pb-4` for breathing room; gap stays 3.

### PostCard
- Verified badge: replace the red `bg-primary text-primary-foreground` checkmark with `<BadgeCheck className="h-3.5 w-3.5 text-foreground/60" />` (matches CreatorCard treatment everywhere else).
- Action button active state: drop `bg-primary/10`, use `bg-secondary`. Liked heart keeps the red fill (intentional affordance).
- "Shop the look" pill: tighten to `text-[11.5px]`, `px-2.5 py-1`, drop the icon's `text-foreground/70` to plain foreground for legibility.
- Caption: bump line-height to `leading-[1.55]`; tighten top padding from `pt-2` to `pt-1.5`.

### VideoCard
- Wrap container in `rounded-2xl` to match PostCard; bump padding to `p-4 space-y-3.5`.
- Title: `font-semibold text-[14.5px] leading-snug` (was `text-sm`).
- Meta row: dot separator as a `w-1 h-1 rounded-full bg-muted-foreground/40` instead of `•` glyph.
- Play badge: shrink to `w-11 h-11`, `bg-background/70 backdrop-blur-md ring-1 ring-border`. Hover scale `1.05`.
- Verified pill on thumbnail moves to top-right with `bg-background/85 backdrop-blur` ring (neutral, not emerald flood).

### ReviewCard
- Move VerifiedBuyerBadge to the top-right of the header (clear trust placement).
- Card chrome: `rounded-2xl border border-border bg-card p-4 space-y-3.5` (replaces `border-b` strip).
- Rating row: stars stay gold, but title sits BELOW the stars on its own line with `font-semibold text-[14px]`.
- Body: `text-[13.5px] text-foreground/80 leading-relaxed`.
- Helpful button: separated by `border-t border-border pt-3`, with neutral `text-muted-foreground` and the helpful count in `tabular-nums`.
- Image thumbnails: `w-20 h-20 rounded-xl` (down from `w-24 h-24 rounded-lg`).

### ShortCard
- Detint Verified pill from `bg-emerald-500/90` to `bg-background/85 text-foreground backdrop-blur ring-1 ring-border` for the calm pass (trust signal still readable; emerald reserved for VerifiedBuyerBadge component only).
- Product chip: drop `var(--gradient-primary)`; use `bg-background/90 text-foreground ring-1 ring-border` with the Price in semibold. Less shouty above the caption.
- Center play badge already neutral — keep.
- Corner radius bump to `rounded-2xl` consistent with other cards.

### CreatorCard
- Default variant: drop `ring-2 ring-primary/20` on avatar (no brand-red halo); use `ring-1 ring-border`.
- Verified icon: `text-foreground/60` (already used in compact), unify across variants.

### VerifiedBuyerBadge
- Switch from filled `bg-success/20 text-success` chip to outline: `bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/30 px-2 py-0.5 rounded-full`. Trust-green stays, but as a refined ring chip.

### ProductTag (inline)
- Card-like surface: `bg-card border border-border rounded-xl p-2.5` (was `bg-secondary/50 rounded-lg p-3`).
- Title `text-[12.5px] font-semibold`, truncate.
- CTA button: `h-8 w-8 rounded-full bg-foreground text-background` (calm, not primary red).

### MyFeedTab — "Trending Shorts" shelf
- Section header row: `flex items-center justify-between`, title `font-semibold text-[14px]`, optional muted "See all" placeholder (`text-[11px] uppercase tracking-[0.12em] text-muted-foreground`).
- Edge-to-edge rail: replace `flex gap-3 overflow-x-auto` with `-mx-4 px-4` so the scroll bleeds to the screen edge. Tile width up to `w-36` for legibility.
- Outer container padding `py-2`.

### Spacing rhythm
- Feed container: change `space-y-4` to `space-y-5` between mixed cards for editorial breathing room.
- Wrap PostCard/ReviewCard with consistent `px-4` so all cards sit on the same gutter (PostCard already self-handles; ensure ReviewCard wrapper aligns).

## Out of scope

- No new tabs, no new content types, no data shape changes.
- No new dependencies or animation libraries.
- No CommunityRightRail changes (desktop sidebar).
- No FAB / CreateContent flow changes.
- No memory file changes.
