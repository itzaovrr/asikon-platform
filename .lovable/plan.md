## Custom outline/fill icon swap for BottomNav

Replace lucide icons in `src/components/layout/BottomNav.tsx` with the user-uploaded SVG pairs. Each tab gets two variants: **outline** (default) and **filled** (active). The active state swaps to the filled version instead of just changing color/stroke weight.

### Icon mapping

| Tab | Outline (inactive) | Filled (active) |
|---|---|---|
| Home | `home-1-svgrepo-com-2.svg` (stroke) | `home-1-svgrepo-com_1-2.svg` (will be adapted to filled) |
| Shop | `search-square-svgrepo-com.svg` (outline rect + search) | `search-square-svgrepo-com_1.svg` (filled square + search) |
| AI | keep current `Sparkles` from lucide (no custom asset provided) |
| Community | `community_s.svg` (outline heart) | `love-svgrepo-community.svg` (filled heart) |
| Profile | `profile-svgrepo-com.svg` (outline) | `profile-svgrepo-com_1.svg` (filled) |

Note: the two "home" SVGs the user uploaded are both outline-style. For the filled home variant I'll use the same path with `fill="currentColor"` added so the body fills with the primary color when active.

### Steps

1. Copy the 8 SVGs into `src/assets/icons/bottom-nav/` with clear names (`home-outline.svg`, `home-fill.svg`, `shop-outline.svg`, `shop-fill.svg`, `community-outline.svg`, `community-fill.svg`, `profile-outline.svg`, `profile-fill.svg`).
2. Normalize each SVG: replace hardcoded `#000000` / `#1C274C` / `#ffffff` / `white` rect backgrounds with `currentColor`, remove opaque white background rects, ensure `fill="none"` on outline variants and `fill="currentColor"` on filled variants.
3. In `BottomNav.tsx`:
   - Remove `Store`, `UsersRound`, `UserRound`, custom inline `HomeIcon` from imports/code. Keep `Sparkles` for the AI tab.
   - Define inline React components for each icon pair (`HomeOutline`/`HomeFill`, etc.) rendering the SVG JSX with `currentColor`. Inline JSX keeps it plugin-free, matching the existing pattern.
   - Update the `Tab` interface: change `icon: IconComponent` to `iconOutline: IconComponent; iconFill: IconComponent` (AI tab uses Sparkles for both).
   - Update the `tabs` array to provide both variants per tab.
   - In `NavItem`, pick `const Icon = active ? item.iconFill : item.iconOutline;` and render. Drop the `strokeWidth` toggle since fill swap now conveys active state. Keep color classes (`text-primary` when active, `text-muted-foreground` when inactive) and the top dot indicator + badge/dot logic unchanged.

### Out of scope

- Header icons, sidebar, other navigation surfaces.
- Animation/transition changes beyond the existing color transition.
- AI tab icon (no custom asset provided — stays as `Sparkles`).
