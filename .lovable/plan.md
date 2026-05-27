# Phase 15 — Premium AI Surface (Home + /learn)

Goal: make Apu feel like a **first-class AI product** — calmer than the old red-glow card, more polished than today's stripped-back monochrome. A subtle dark-glass identity surface for the AI hero/header, a clean transcript, and a cleaner thread list. No regressions to chat behavior.

## Direction (locked across both surfaces)

- **Identity layer**: dark, near-black gradient surface (`from-foreground/[0.06] via-foreground/[0.02] to-transparent`) bordered with a thin hairline (`border-border`) and an inner highlight line. One soft radial accent behind the avatar instead of a hard glow. No primary-red wash.
- **Apu avatar**: real `tutorAvatar` image inside a circular ring with a small live "online" dot. No blur halos.
- **Typography**: `font-display` for "Apu" / titles, `tabular-nums` for counters, 14–15px body.
- **Composer**: a single elevated card — soft shadow + hairline border, focus state uses `border-foreground/40` (not primary). Send button = `bg-foreground text-background` round.
- **Chips & quick prompts**: neutral pill chips, icon tiles tinted with `bg-secondary text-foreground` (no `bg-primary/10`).
- **User bubble**: keep the high-contrast filled bubble (uses `bg-foreground text-background`) — clean and readable in both themes; remove the red drop shadow.
- **Assistant**: no background — text rendered directly on canvas with prose styles.

## 1) Home — `AiAssistantBox`

Replace the small `bg-card` box with a richer "AI tutor" hero:

```text
┌────────────────────────────────────────────┐
│  [avatar●]  Apu · AI Tutor                 │
│             Online · Bangla & English      │
│                                            │
│  [ Ask anything…                    [↑] ]  │
│                                            │
│  · Explain SSC Physics · Make a study plan │  ← scrollable chip row
└────────────────────────────────────────────┘
```

- Surface: `relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-foreground/[0.05] via-transparent to-transparent`.
- One soft radial behind the avatar (foreground at ~8% opacity, not primary).
- Move the input to its own line so the box feels like a real chat entry, not a label+field.
- Submit icon: `bg-foreground text-background` rounded square.
- Chips: detinted (remove `hover:text-primary`), already mostly there.

## 2) `/learn` Header

Already calm — small refinements:

- Add a thin radial highlight behind the Apu avatar in the header (`from-foreground/[0.08] to-transparent`), 24px circle.
- Title block: name in `font-display` semibold, subtitle in `tabular-nums`-free muted.
- Keep PanelLeft / PenSquare / MoreHorizontal as ghost icon buttons.

## 3) `/learn` Empty State (`EmptyState`)

- Replace `bg-primary/8 text-primary` icon tile with `bg-secondary text-foreground` + a subtle hairline ring.
- Tile hover: `border-foreground/30`.
- Capability icons: `text-foreground` (not primary).
- Add a 1-line "Powered by Lovable AI" footnote under the capability row (small, muted).
- Hero avatar: behind it, place a single soft radial (`foreground/8 → transparent`) at 140px so the avatar pops without primary tint.

## 4) Signed-out hero (in `Learn.tsx`)

- Replace plain `rounded-3xl bg-card` block with the same gradient identity surface as the home entry, so signed-out users see a cohesive "AI app" identity.
- Sign-in button: default `Button` (already neutral).

## 5) User bubble & streaming cursor

- Bubble: `bg-foreground text-background` (instead of `bg-primary text-primary-foreground`) with no colored shadow — keeps Apple-calm.
- Streaming caret: `bg-foreground` (not `bg-primary`).
- "Jump to latest" pill: `bg-background/90 border-border text-foreground` (already close).

## 6) `ThreadList`

- "New chat" button: drop `gradient-primary text-primary-foreground` → use default `Button` (which in our system is `bg-foreground text-background` after Phase 12).
- Active thread row: `bg-secondary text-foreground` (not `bg-primary/10`).
- Active icon: `text-foreground` (not `text-primary`).
- Search input: keep, just `bg-card` border-border.

## 7) `MessageActions`

- Copy "check" success: use `text-foreground` instead of `text-primary`.
- Thumbs-up active: `text-foreground` instead of `text-primary` (keep thumbs-down `text-destructive`).

## 8) Markdown prose

- `prose-a:text-primary` → `prose-a:text-foreground prose-a:underline prose-a:underline-offset-4` for calmer link styling.
- `prose-pre:bg-secondary` stays.

## Files changed

- `src/components/home/workspace/AiAssistantBox.tsx`
- `src/pages/Learn.tsx` (signed-out hero surface)
- `src/components/learn/LearnChat.tsx` (header avatar, empty state, user bubble, streaming caret, prose links, MessageActions)
- `src/components/learn/ThreadList.tsx` (New chat button + active row tokens)

## Out of scope

- No changes to AI SDK transport, `useChat`, message persistence, thread CRUD, or tool wiring.
- No new routes.
- No primary-color reintroduction anywhere.
- No memory file changes.

Reply **Approve** to implement, or tell me what to adjust (e.g. keep the primary user bubble, swap to a true glassmorphism panel, add a model picker, etc.).
