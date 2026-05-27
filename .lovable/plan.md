## Goal
Replace the single PostCard in the "From the community" section with a 2-column desktop carousel that scrolls through community posts.

## Plan

### 1. Create `src/components/community/CommunityCarousel.tsx`
- Uses `embla-carousel-react` with `slidesToScroll: 1` and responsive sizing.
- Each carousel "page" shows **2 PostCards side-by-side** on desktop (`lg:`), 1 card on smaller screens.
- Navigation: prev/next arrow buttons (same style as `ProductCarousel`).
- Edge gradient fades on desktop.
- Reuses the existing `PostCard` component directly — no style changes to PostCard.
- Header: uses `SectionHeader` for the "From the community" title + "View all" link.

### 2. Update `src/pages/Index.tsx`
- Replace the `community` section renderer to use `<CommunityCarousel posts={mockPosts} ... />` instead of a single `<PostCard post={mockPosts[0]} />`.
- Import the new component.

### 3. Responsive behavior
- Mobile: 1 card per view, horizontal scroll with snap.
- Tablet: 1 or 2 cards depending on width.
- Desktop (`lg+`): 2 cards per view with arrow navigation.

No new dependencies needed — `embla-carousel-react` is already in use.