
# Profile Page — UI/UX Improvement Plan

Goal: turn the Profile page into a focused, premium identity surface — clearer hierarchy, fewer competing blocks above the fold, more tactile interactions, better empty/loading states, and full a11y.

## Current issues (observed)

1. **Header is busy** — cover + avatar with trust-ring + online dot + verify badge + bio + 3 meta chips compete; nothing leads the eye.
2. **Stats row** uses a flat 5-cell grid with cramped labels ("XP", "Lv.") and no visual weight on the most important metrics (followers / level progress).
3. **Action row** stacks an `Edit` button + a single icon for own profile; for others, three equal-weight buttons dilute the primary "Follow" CTA.
4. **Tabs** are horizontally scrollable with a "More" popover — discoverability of Library/Orders/Wishlist is poor; tabs sit *below* stats+actions so users scroll a lot before reaching content.
5. **Empty states** in tabs are inconsistent (some show plain text, none use the new shared `EmptyState`).
6. **Mobile bleed header** has no back/share affordance when viewed from another user's link.
7. **A11y**: tablist is built with buttons but lacks `role="tablist"`; the avatar uploader button is below the avatar without contrast on light covers; trust ring has no text equivalent.
8. **Skeleton** doesn't match the new layout, causing layout shift on first paint.

## What changes

### 1. ProfileHeader — quieter, more confident
- Reduce cover height on mobile (h-32) so identity sits higher.
- Move trust score from an SVG ring around the avatar into a small **pill chip** under the name (`Trusted · 92`), with tooltip explaining the score. Frees the avatar to be a simple bordered photo.
- Consolidate verified badge + online dot into the name row only.
- Bio: cap at 3 lines with a `Show more` toggle (instead of unlimited).
- Meta row (location/website/joined) → single subtle line, no icons doubling.
- Add a discrete back button (mobile, only when viewing someone else) and a share icon to the cover top-right corner.

### 2. ProfileStats — hierarchy + progress
- Drop from 5 cells to **3 primary cells**: Posts, Followers, Following. Each shows the number large, label small. Followers/Following remain tappable to open sheet.
- Add a **separate XP / level card** below stats with a thin gradient progress bar to the next level, "Lv. X · 240/300 XP". Tapping jumps to Learning tab.
- Larger tap target (min 44px), tabular-nums, k/M formatter already present.

### 3. ProfileActions — clear primary CTA
- Own profile: full-width `Edit Profile` (primary) + secondary icon row (Share, Settings shortcut).
- Other profile: `Follow` (primary, gradient) takes 2/3 width, `Message` outline 1/3, overflow menu icon for share/report/block. When already following → button flips to outline `Following` and shows a `Message` icon-button beside it.
- Add subtle haptic-style `tap` scale + loading state on follow/unfollow.

### 4. ProfileTabs — sticky, simpler
- Keep current sticky behaviour. Reorder for own profile: `Posts · Media · Reviews · Learning · Library · Orders · Wishlist` — kill the "More" popover; instead use a horizontal scroll with a fade-edge indicator (chevron arrows on desktop). Other profiles see only the public 4 tabs.
- Add `role="tablist"` / `role="tab"` / `aria-controls` / `aria-selected` correctly; arrow-key navigation between tabs.
- Active indicator stays the underline; add a subtle background tint on hover.

### 5. Tab content — consistent empty + skeleton states
- All tabs use the new shared `<EmptyState>` primitive with a friendly icon, one-liner, and a primary CTA:
  - Posts → "Share your first post" → `/create`
  - Media → "No photos or videos yet"
  - Reviews → "No reviews yet" → `/shop`
  - Library → "Your library is empty" → `/learn`
  - Orders → "No orders yet" → `/shop`
  - Wishlist → "Save items you love" → `/shop`
- Each tab also gets a lightweight skeleton (3 card placeholders) instead of a generic spinner.

### 6. Side rail (desktop) — calmer
- Trust card + Badges + Activity feed: collapse into a single `Sticky Side Card` with three sections separated by hairlines. Reduces visual noise.

### 7. ProfileSkeleton — match new layout
- Update to mirror: short cover, centered avatar, 3 stat cells, XP bar, 2-button action row, tab strip, 3 content placeholders. Removes the layout shift on first paint.

### 8. Micro-interactions
- Cover/avatar upload: show inline progress overlay on the image itself instead of a spinner in the button label.
- Avatar click → open lightbox (already exists), add swipe-down to dismiss on mobile.
- Follower count number animates on +1 via `tabular-nums` + a quick scale-pulse using existing `animate-scale-in`.

### 9. Accessibility
- Tab strip wired with proper ARIA roles + keyboard navigation (← → Home End).
- Trust score has a visually-hidden `<span>` describing it (`Trust score 92 out of 100`).
- Cover-edit and avatar-edit buttons have visible focus ring (`.focus-ring`).
- All icon-only buttons keep `aria-label` (most already do — audit pass).
- Use `text-foreground` / `text-muted-foreground` only; remove `text-amber-400` / `stroke-emerald-400` hard-coded colors in favour of `text-warning` / `text-success` tokens (add tokens if missing).

## Files touched

- `src/components/profile/ProfileHeader.tsx` — quieter layout, trust chip, share button, mobile back.
- `src/components/profile/ProfileStats.tsx` — 3 cells + XP bar split.
- `src/components/profile/ProfileActions.tsx` — restructured CTA hierarchy.
- `src/components/profile/ProfileTabs.tsx` — drop "More" popover, add ARIA + keyboard nav, fade-edge.
- `src/components/profile/ProfileSkeleton.tsx` — match new layout.
- `src/components/profile/tabs/*` — wire shared `EmptyState`, add per-tab skeletons.
- `src/pages/Profile.tsx` — minor reordering (XP card moves out of stats), pass new props.

## Out of scope

- No data-model changes, no new queries.
- No new routes.
- Trust score calculation, follow/unfollow logic, messaging — all untouched.

## Suggested execution order

1. ProfileHeader + ProfileStats + ProfileActions (top-of-page identity block)
2. ProfileTabs (sticky strip + a11y)
3. Tab empty/loading states with shared `EmptyState`
4. ProfileSkeleton refresh
5. Side rail consolidation (desktop)

Approve and I'll start at step 1.
