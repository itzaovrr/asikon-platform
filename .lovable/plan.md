## Redesign SiteFooter to match reference

Rebuild `src/components/layout/SiteFooter.tsx` to mirror the uploaded reference: a vibrant gradient CTA card stacked above the link grid, then a clean light footer with brand, link columns, newsletter, social icons, and a bottom bar.

### Layout

```
┌─────────────────────────────────────────────────┐
│  ROUNDED GRADIENT CTA CARD (brand red gradient) │
│      "Learn smarter. Build faster."             │
│      subtitle copy                               │
│         [ Start learning  › ]  (pill btn)       │
└─────────────────────────────────────────────────┘

┌──────────────┬──────────┬──────────┬───────────┐
│ ⚡ ASIKON    │ Company  │ Product  │ Newsletter│
│ tagline      │ Home     │ Shop     │ blurb     │
│ social icons │ About    │ Learn    │ [email]   │
│              │ Contact  │ Mentors  │ [Subscribe]│
│              │ Help     │ Community│           │
└──────────────┴──────────┴──────────┴───────────┘

── © 2026 ASIKON ────  Privacy · Terms · Refund ──
```

### Implementation notes

- Keep file path `src/components/layout/SiteFooter.tsx` and existing `hidden md:block` (desktop-only) gating. No changes to consumers.
- CTA card: `rounded-3xl` with brand dark-red gradient (`--gradient-primary` / brand tokens already in `index.css`); white headline using `font-display font-black`; white pill CTA with dark text and chevron, links to `/learn`.
- Link grid: light card surface (`bg-card` / cream), 4 columns on lg, 2 on sm. Column headings bold, links muted-foreground → foreground on hover. Consolidate current 5 columns into 3 (Company / Product / Newsletter) by merging Learn+Shop+Community into "Product" and keeping About/Help/Contact under "Company". Legal links move to the bottom bar.
- Newsletter: email input + filled primary `Subscribe` button with chevron icon (no backend wiring — submit handler is a no-op toast or `console.log`, matching the rest of the static footer).
- Socials: Twitter / Instagram / Facebook / GitHub / Email as small circular icon buttons under the brand block.
- Bottom bar: thin divider, left `© 2026 ASIKON. Made in Dhaka.`, right `Privacy · Terms · Refund` (links preserved).
- Use only semantic tokens (`bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-primary`, `text-primary-foreground`, `var(--gradient-primary)`). No raw hex.
- No other files touched; brand fonts (Space Grotesk display, Inter body) already global.

### Out of scope

- Mobile footer (component stays desktop-only).
- Wiring newsletter to Supabase.
- Changing route targets beyond mapping current links into the new column layout.
