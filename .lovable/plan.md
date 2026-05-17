## Remove onboarding (temporary)

Strip out all onboarding wiring so the app skips straight from auth → home. Keep the copy file intact so it's easy to bring back later.

### Delete
- `src/pages/Onboarding.tsx`
- `src/features/onboarding/OnboardingWizard.tsx` (and the `src/features/onboarding/` folder if empty)

### Edit
- **`src/App.tsx`** — remove `OnboardingMod`, `Onboarding` lazy import, `<Route path="/onboarding">`, and `"/onboarding"` from `hideOn`.
- **`src/pages/Index.tsx`** — remove the onboarding gate (`<Navigate to="/onboarding" />`) so signed-in users land on Home directly.
- **`src/features/mission/TodayMissionCard.tsx`** — replace the two `<Link to="/onboarding">` ("Pick a track" / "Switch track") with `<Link to="/learn">` ("Browse tracks").
- **`src/features/tracks/TrackProgress.tsx`** — change the "Pick" link from `/onboarding` to `/learn`.
- **`src/components/about/AboutHero.tsx`** and **`src/components/about/AboutCTA.tsx`** — point the primary CTA from `/onboarding` to `/learn`.

### Keep (for future)
- `src/copy/copy.ts` `onboarding` block — kept so re-adding the flow later is a one-liner.

### Out of scope
- No DB changes, no auth changes, no nav redesign.
