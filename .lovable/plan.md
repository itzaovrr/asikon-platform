## Goal
Make the /about page feel unmistakably Bangladeshi and tighten 4 weak sections. Imagery + composition only — no copy or routing changes.

## What's weak today (from screenshot review)

1. **Hero image** — generic young man in dim lighting. Could be any country. No Dhaka/Bangla cue.
2. **Mission & Vision block** — two long paragraph cards stacked. Heaviest text on the page, breaks the visual rhythm.
3. **All 8 photo assets** — none are visibly Bangladeshi. School uniforms, Bangla script, Dhaka cityscape, traditional motifs are all absent.
4. **Stats row** — flat 2-col grid on mobile, no visual anchor or BD context.
5. **Story sidebar (Founded / Based in / Built for)** — plain glass card, decent but underplays "Dhaka, BD".
6. **Bento + Endless showcase share the same dim photos** — feels repetitive scrolling down.

## Image regeneration (8 assets, all Bangladesh-rooted)

Regenerate each `src/assets/about/*.jpg` with Bangladeshi context. Premium tier for hero, fast for the rest.

| File | New direction |
|---|---|
| `hero-student.jpg` | Bangladeshi teenage girl in school uniform studying at a desk at golden hour, soft warm light, Dhaka rooftop or window with palm trees in background, cinematic, 1080×1920 |
| `story-classroom.jpg` | Bangladeshi classroom in Dhaka, students at wooden benches with notebooks, soft afternoon light through grilled windows, warm tones |
| `feature-notes.jpg` | Bangla notebook with handwritten Bangla script + phone showing a lesson on a wooden desk, cha (tea) cup nearby, top-down, natural light |
| `feature-mentor.jpg` | Bangladeshi mentor (man, kurta) sitting beside a young student pointing at a laptop screen, warm window light |
| `tile-ai-tutor.jpg` | Phone screen with AI tutor speech bubble in Bangla script, glowing softly on a desk, dark moody |
| `tile-bangla.jpg` | Bangla alphabet (অ আ ই) written in chalk or ink on textured paper, warm cream tones, light tone |
| `tile-community.jpg` | Group of Bangladeshi students collaborating around a laptop on a Dhaka rooftop or courtyard, golden hour |
| `tile-daily.jpg` | Hand holding a phone showing a 5-minute lesson card, with a Dhaka rickshaw or street softly blurred in background, dusk |

All prompts include: "natural skin tones, South Asian / Bangladeshi features, documentary photography, no text overlays, no logos."

## UI tightening (frontend only, no copy changes)

### A. Mission & Vision — make it scannable
File: `src/components/about/MissionVision.tsx`
- Keep both paragraphs but add a 2-line "essence" headline above each (`Learn faster.` / `Reach further.`) rendered large, with the full paragraph below as muted body.
- Add a subtle Bangla character (অ) as a watermark in the corner of each card at low opacity — quiet cultural cue.
- On mobile, collapse the long paragraph behind a "Read more" expand by default so the section breathes.

### B. Stats row — anchor in Bangladesh
File: `src/pages/About.tsx` `GlassStats`
- Add a 5th stat: `64 — Districts reached` (or similar BD-rooted metric).
- Above the row, add a thin tagline: "Numbers from across Bangladesh." with a small map-pin icon.
- Desktop: change from 4-col hairline to a single wide hairline band with each stat separated by a faint Bangla numeral watermark behind the digit (০ ১ ২ ৩).

### C. Story sidebar — promote Dhaka
File: `src/pages/About.tsx` `StorySection` aside
- Replace the plain "Dhaka, BD" row with a small framed monochrome Dhaka skyline silhouette (SVG) at the top of the card.
- Keep the three MetaRows but render "Dhaka, BD" with the Bangla "ঢাকা" rendered tiny above it as a subtitle.

### D. Bento gallery — visual variety
File: `src/components/about/BentoGallery.tsx`
- The hero tile (AI tutor, span-8 row-2) stays. Reorder so light-toned `tile-bangla` sits adjacent to a dark tile for contrast instead of two darks in a row.
- Add a thin Bangla glyph (অ, আ, ই) as an oversized 5%-opacity background letter on the `tile-bangla` card — purely decorative.
- Make CTAs use the same rounded-full pill style as the hero buttons for consistency (currently mixed).

## Out of scope
- Copy rewrites in MissionVision (locked via memory — use `<MissionVision />` component).
- New sections, routing, or backend changes.
- Testimonials, Principles, Endless, FinalCTA — all working well, leave alone.

## Technical notes
- Image regen via `imagegen--generate_image` writing to existing paths (overwrite). Use `premium` for `hero-student.jpg` only, `fast` for the rest.
- All UI edits are Tailwind class changes + small SVG additions; no new dependencies.
- No changes to `MissionVision` exported strings — only presentation wrapper.
