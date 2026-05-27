# Fix Supabase security warnings

## What's wrong
The linter flagged 8 warnings:
- 7 `SECURITY DEFINER` functions are exposed via PostgREST RPC to signed-in users
- Leaked password protection is disabled in Supabase Auth

## Plan

### 1. Migration: revoke RPC access on internal helpers
These functions are only meant to be called from RLS policies or triggers, never directly by the client. We revoke `EXECUTE` from `anon`, `authenticated`, and `PUBLIC`. RLS policies that reference them still work because policy evaluation runs as the table owner, not the caller.

Functions to lock down:
- `public.has_role(uuid, app_role)` — used in RLS policies
- `public.can_view_profile(uuid, uuid)` — used in profile RLS
- `public.can_message_user(uuid, uuid)` — used in messaging RLS
- `public.has_content_access(uuid, uuid)` — used in content RLS + edge function (edge uses service role, unaffected)
- `public.protect_pod_design_fields()` — trigger function, never called directly
- `public.protect_post_immutable_fields()` — trigger function, never called directly

SQL pattern per function:
```sql
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;
```

### 2. `redeem_reward` — keep callable, mark as accepted
This one is *intentionally* called by the client (`supabase.rpc('redeem_reward', ...)`) to spend coins. The function already validates `auth.uid()` and the reward price server-side. Revoking would break the rewards UI.

Action: keep the grant, mark this specific finding as ignored with explanation via `security--manage_security_finding`.

### 3. Leaked password protection
This is a project-level Auth setting — cannot be toggled from code/migrations. We'll point you to the dashboard:
- https://supabase.com/dashboard/project/tdbqeecjvitorxamzlok/auth/providers
- Auth → Policies → enable "Leaked password protection"

## Risk
Low. All locked-down functions are either internal helpers or trigger functions. RLS/triggers continue to work because they don't go through PostgREST.

## Files touched
- new migration: revokes on 6 functions
- security finding for `redeem_reward` marked ignored with rationale
- no app code changes