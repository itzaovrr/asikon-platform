## Scope

Audit `src/components/home/mobile/FlexiTopSection.tsx` — the redesigned mobile top section on `/` containing the welcome line, "Browse courses" link, the split CTA + stats card, and the 4 pill quick-actions. Fix accessibility issues for focus, tap targets, and reduced motion. No visual redesign.

## Findings

1. **Tap targets below 44×44** — "Browse courses →" link (~24px tall) and pill labels share a `<Link>` whose hit area is just the icon tile (64×64 ✓) plus text; total interactive height is fine but link width is icon-width only (64px). The "Browse courses" link itself is the main miss.
2. **Focus ring missing on stat cells** — they're decorative (non-interactive), so OK. But the split CTA's right column (`120+ Lessons`, `24/7 AI tutor`) is non-interactive yet sits inside a card that looks tappable. Acceptable, no fix needed beyond noting.
3. **Pill `<Link>` has `focus-ring` ✓** but ring is hidden by overflow on the rounded tile because the link itself has no padding — ring sits flush to the icon. Add `p-1 -m-1` or `rounded-2xl` offset so ring is visible.
4. **Icon-only visual on split CTA** — the gradient CTA has no `aria-label`; screen readers get only "Start learning today Pick a path in one tap". That's fine, but the decorative GraduationCap should be `aria-hidden`. Same for ChevronRight and the right-column icons.
5. **"AI tuor" typo** appears twice (label + stat). Fix to "AI tutor".
6. **Reduced motion**: `animate-fade-in` on `<section>` and per-pill staggered `animationDelay` keep running under reduced-motion because inline `style={{ animationDelay }}` doesn't cancel — the global rule on line 633 disables `animate-fade-in` ✓, but the per-tile wrappers still apply `animationFillMode: backwards` leaving them invisible briefly. Need a reduced-motion guard so tiles start visible.
7. **Hover-only transforms** on `.group-hover:-translate-y-0.5` and `group-hover:scale-110` aren't covered by the global `.pressable` reduced-motion rule (they're group-hover utilities). Wrap in `motion-safe:` prefix.
8. **`active:scale-[0.98]`** on the gradient CTA also bypasses reduced-motion — switch to `motion-safe:active:scale-[0.98]`.
9. **Color-only affordance**: "Browse courses →" relies on primary color alone. Add underline on hover/focus (`hover:underline focus-visible:underline`) and a `focus-ring` class.
10. **Heading order** — `<h1>` here is fine since this is the home top section.

## Changes (single file: `FlexiTopSection.tsx`)

```text
- Add aria-hidden to decorative icons (GraduationCap in CTA, ChevronRight, BookOpen, Bot, all PillTile icons).
- "Browse courses" link: add focus-ring class, min-h-11 px-2 -mx-2 inline-flex items-center, hover:underline focus-visible:underline.
- PillTile <Link>: add min-h-11 min-w-11 (already 64px tile, OK) and ensure focus-ring is visible by adding p-1 -m-1 OR moving focus-ring to wrap the inner tile with rounded-2xl ring offset.
- Replace group-hover/active transforms with motion-safe: variants:
    motion-safe:group-hover:-translate-y-0.5
    motion-safe:group-hover:shadow-[...]
    motion-safe:group-hover:scale-110
    motion-safe:active:scale-[0.98]
- Per-tile stagger wrapper: wrap animation in motion-safe:animate-fade-in and drop inline animationFillMode under reduced motion by using a Tailwind motion-reduce:opacity-100 fallback — simplest: keep inline style but add motion-reduce:[animation:none] motion-reduce:opacity-100.
- Fix "AI tuor" → "AI tutor" (label + stat row).
- Add aria-label="Start learning — browse all courses" to the big gradient CTA so its purpose is clear without relying on visual hierarchy.
- Add role="group" aria-label="Quick actions" on the 4-pill grid for landmark clarity.
```

No changes to `index.css` are needed — the existing `prefers-reduced-motion` block already covers `.pressable`, `.animate-fade-in`, `.midnight-shine`, and `.midnight-tile`. The fixes above route the remaining hover/active transforms through Tailwind's `motion-safe:` variant so they also respect the OS setting.

## Verification

- Tab through the section: every interactive element shows a visible 2px ring with offset.
- Each tappable target measures ≥44×44 in DevTools mobile view (438px viewport).
- Toggle `prefers-reduced-motion: reduce` in DevTools rendering panel → no fade-in, no hover lift, no active scale, all tiles immediately visible.
- VoiceOver/TalkBack swipe announces: CTA → 4 quick actions with labels only (no "graphic" noise from decorative icons).
