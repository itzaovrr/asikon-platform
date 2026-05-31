# Enhance Profile Page

The profile page is structurally complete but has three classes of issues:
visual polish gaps, a few hardcoded/no-op actions, and small UX bugs.
This plan addresses all three without touching data hooks or routing.

## 1. Visual polish (UI only)

**`ProfileHeader.tsx`**
- Soften cover overlay: replace the single bottom gradient with a top
  vignette + bottom fade so the back/share buttons stay readable on any
  cover image.
- Add a subtle ring + shadow halo around the centered avatar
  (`ring-2 ring-background shadow-elegant`) and a hover lift on own profile.
- Trust chip: upgrade to a small pill with gradient-primary-soft background
  and a tier dot (gold/silver/bronze) instead of flat secondary.

**`ProfileStats.tsx`**
- Animate numbers with a short count-up (200ms ease-out, respects
  `prefers-reduced-motion`).
- Replace the flat XP bar with `gradient-primary` fill + a soft glow when
  > 80% to next level.
- Add divider micro-labels with `font-grotesk` to match brand pairing.

**`ProfileActions.tsx`**
- Give the primary Follow / Edit button `gradient-primary` and
  `glow-primary` (matches buttons elsewhere in the app).
- Add a confirm dialog for **Block** using shadcn `AlertDialog`.

**`ProfileTabs.tsx`**
- Make the active indicator `gradient-primary` instead of flat foreground.
- Add a soft `bg-card/80 backdrop-blur` on the sticky bar so content
  scrolling underneath reads cleanly.

## 2. Make actions workable

Currently `onReport` and `onBlock` in `Profile.tsx` only fire a toast —
no DB write. Wire them to real tables.

**Migration** (single migration):
```sql
create table public.user_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reported_user_id uuid not null,
  reason text not null,
  details text,
  created_at timestamptz not null default now(),
  unique (reporter_id, reported_user_id)
);
grant select, insert on public.user_reports to authenticated;
grant all on public.user_reports to service_role;
alter table public.user_reports enable row level security;
create policy "users insert own reports" on public.user_reports
  for insert to authenticated with check (auth.uid() = reporter_id);
create policy "users read own reports" on public.user_reports
  for select to authenticated using (auth.uid() = reporter_id);

create table public.user_blocks (
  id uuid primary key default gen_random_uuid(),
  blocker_id uuid not null references auth.users(id) on delete cascade,
  blocked_id uuid not null,
  created_at timestamptz not null default now(),
  unique (blocker_id, blocked_id)
);
grant select, insert, delete on public.user_blocks to authenticated;
grant all on public.user_blocks to service_role;
alter table public.user_blocks enable row level security;
create policy "users manage own blocks" on public.user_blocks
  for all to authenticated
  using (auth.uid() = blocker_id) with check (auth.uid() = blocker_id);
```

**New hook `src/hooks/useUserModeration.ts`**
- `useReportUser()` — insert into `user_reports`, toast on success/dup.
- `useBlockUser()` — insert into `user_blocks`, invalidate
  `["followers"]` / `["following"]` for both users.
- `useIsBlocked(targetId)` — checks if current user blocked target.

**`Profile.tsx`**
- Add a `ReportDialog` with reason select (spam, harassment, impersonation,
  other) and optional details; wire to `useReportUser`.
- Wire Block to `useBlockUser` inside the AlertDialog confirm.
- Follow / Message: when not signed in, navigate to
  `/auth?redirect=/profile/${userId}` instead of just toasting.

## 3. Small UX fixes

- `Profile.tsx`: empty-state "Share your first post" currently routes to
  `/community`; change to `/create` (the consolidated content page) for
  own profile, keep `/community` for others.
- `Profile.tsx`: Tabs default to `posts`, but if a non-owner lands on a
  private tab via stale state nothing renders. Guard `renderTabContent`
  with `if (!isOwnProfile && PRIVATE_TABS.includes(activeTab)) setActiveTab("posts")`.
- `ProfileFeedTab.tsx`: video-only posts don't show the product tag —
  hoist the product link out so it overlays both image and video.
- `ProfileHeader.tsx`: website link strips `http(s)://` but `www.` is
  kept; normalize display to drop both.

## Out of scope

- No changes to `useProfile`, `useProfileData`, `usePosts`, `useFollow*`
  hooks beyond adding the new moderation hook.
- No new tabs, no routing changes, no auth flow changes.
- Existing skeletons, edit modal, lightbox, followers sheet untouched.

## Files

Create:
- `supabase/migrations/<ts>_user_reports_blocks.sql`
- `src/hooks/useUserModeration.ts`
- `src/components/profile/ReportDialog.tsx`

Edit:
- `src/pages/Profile.tsx`
- `src/components/profile/ProfileHeader.tsx`
- `src/components/profile/ProfileStats.tsx`
- `src/components/profile/ProfileActions.tsx`
- `src/components/profile/ProfileTabs.tsx`
- `src/components/profile/tabs/ProfileFeedTab.tsx`
