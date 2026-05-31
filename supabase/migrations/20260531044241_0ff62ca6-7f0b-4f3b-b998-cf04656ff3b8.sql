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