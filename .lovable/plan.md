## Apply ComingSoonTrio color scheme across home page

The scheme from `ComingSoonTrio`:
- **Outer panel**: cream `#f6f5f0` with rounded `rounded-[22px] sm:rounded-[32px]`, soft drop shadow
- **Card tones** (3 variants):
  - `dark` — `bg-[#111114] text-white`
  - `gray` — `bg-[#ececec] text-[#111]`
  - `primary` — `bg-primary text-primary-foreground` (brand)
- **Chip**: `bg-white text-black` pill with dark dot
- **CTA pill**: white stacked pill wrapping a `bg-primary` button
- **Typography**: `font-grotesk`, ultra-bold, tight tracking

### Sections to restyle

1. **`HowItWorks`** (`src/components/home/sections/HowItWorks.tsx`)
   - Wrap in cream panel
   - Each step card cycles through dark / gray / primary tones
   - Chip-style step number, grotesk heading

2. **`WhyTrust`** (`src/components/home/sections/WhyTrust.tsx`)
   - Cream panel container
   - Trust pillar cards using the 3-tone rotation
   - White chip labels

3. **`FinalCta`** (`src/components/home/sections/FinalCta.tsx`)
   - Cream panel with grotesk headline
   - Stacked white pill CTA wrapping `bg-primary` button (same construction as ComingSoonTrio hero)

4. **`Testimonials`** (`src/components/home/sections/Testimonials.tsx`)
   - Cream panel; testimonial cards use dark/gray/primary tone rotation
   - White chip for author role

5. **`Faq`** (`src/components/home/sections/Faq.tsx`)
   - Cream panel
   - Each accordion item gets a white card with subtle border + grotesk question; active state uses primary accent

### Shared utility

Create `src/components/home/_panel.ts` (or inline constants per file) exporting:
- `TONES` map (dark / gray / primary)
- `panelClass` for outer cream container
- `chipClass` for white pill

Reuse across the 5 sections to keep code DRY.

### Out of scope (untouched)

- Product carousels, mobile-only sliders, workspace blocks, hero bento, brand strip — these have their own established designs and changing them would break the e-commerce/data UX.
- No copy changes, no behavior changes.

### Technical notes

- All colors use semantic tokens (`bg-primary`, `text-primary-foreground`) where possible; the cream/dark/gray neutrals stay as fixed hex since they're not in the design system yet.
- Responsive: same `sm:` breakpoint pattern as `ComingSoonTrio` (mobile keeps the 3-column scaled grid where applicable, desktop expands).
- `font-grotesk` already exists in the project.