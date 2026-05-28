## Problem
`/ai-tutor` returns 404 because the route was renamed to `/learn` in the earlier copy-hygiene fixes. Internal links were updated, but external bookmarks / browser history / direct URL entry still hits the old path.

## Fix
Add a redirect route in `src/App.tsx`:
```tsx
<Route path="/ai-tutor" element={<Navigate to="/learn" replace />} />
```

This ensures anyone arriving at `/ai-tutor` (bookmarks, history, shared links) is seamlessly redirected to `/learn` with a 301-equivalent client-side replace navigation.

## Scope
- Only `src/App.tsx` — one line addition.
- No other files touched.
- No functional or visual changes to `/learn` itself.

## Out of scope
- `/shop?category=ai-tutor` links are query params on an existing route and are unaffected.
- Asset file names (`ai-tutor.webp`) are cosmetic and untouched.