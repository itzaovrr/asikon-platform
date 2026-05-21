## Goal
Make the AI Tutor page (`/learn`) a standalone full-screen experience with no app header and no bottom navigation.

## Changes

**`src/pages/Learn.tsx`**
- Replace `<AppLayout showBottomNav fillViewport>` with a standalone shell that does NOT render `MobileHeader`, `DesktopHeader`, `DesktopSidebar`, or `BottomNav`.
- Use a plain full-viewport wrapper (`h-[100dvh] w-full flex flex-col bg-background`) so the chat fills the screen.
- Add a minimal slim top bar inside the page itself with:
  - Back button (← navigates to `/game`)
  - "Apu · AI Tutor" title
  - Optional "New chat" button
- Keep `<Helmet>` SEO tags unchanged.
- Apply the same standalone treatment to the loading and signed-out states so there's no flash of header/nav.

**No other files modified.** `AppLayout`, `BottomNav`, and routing stay untouched — only the Learn page opts out of the shell.

## Result
- `/learn` and `/learn/:threadId` render as a dedicated full-screen chat with its own slim back bar — no global header, no bottom nav.
- All other routes keep the existing header + bottom nav behavior.
