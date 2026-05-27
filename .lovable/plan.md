## Problem
The AI input is not actually broken by its own styles now — the Learn page shell is not giving the chat area a reliable full-height container on mobile. Because of that, the empty transcript state collapses and the composer renders near the top instead of the bottom.

## Plan
1. **Fix the Learn page height chain**
   - Update the outer Learn route wrappers so the chat column has a resolved viewport-height container, not just `flex-1`.
   - Make sure the direct parent of `LearnChat` can stretch to the full fixed shell height on mobile.

2. **Tighten the chat layout for the empty state**
   - Keep the existing 3-row chat structure in `LearnChat`, but make the middle transcript row fill the available height even when there are no messages.
   - Ensure the empty state centers inside the scroll area without affecting the composer row.

3. **Validate against the reported case**
   - Check the exact `/learn/:threadId` mobile layout in the current viewport.
   - Verify the composer sits at the bottom with no messages, with messages, and while the keyboard-safe viewport logic is active.

## Files I’ll touch
- `src/pages/Learn.tsx` — fix the page/shell height contract.
- `src/components/learn/LearnChat.tsx` — tighten the transcript/empty-state/composer layout.

## Technical details
The likely root cause is the classic `h-full`/grid-inside-flex issue: `LearnChat` is using a full-height grid, but one of its parents in `Learn.tsx` only has flexible sizing, not a resolved height. That makes the grid size itself to content, so the composer appears directly under the header. I’ll fix the height propagation first, then only make the minimum layout adjustment needed inside the chat component.