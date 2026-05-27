## What's wrong now

The current `LearnChat.tsx` is 776 lines of hand-built chat primitives (header, transcript, composer, message bubbles, typing indicator, message actions) wedged into an `absolute inset-0 flex flex-col` shell. Layout has been patched at least 4 times this session and the composer keeps falling out of place. The signed-out gate has a separate layout that broke on the last edit. There is no use of AI Elements, no proper sticky-to-bottom transcript, no safe-area handling, and density is inconsistent.

## Goal

A calm, modern, mobile-first AI chat that feels like Claude/ChatGPT — but branded for Asikon. Composer pinned to bottom (above iOS home bar), transcript fills the middle and auto-scrolls, header pinned to top, generous empty state with quick prompts. Built on AI Elements primitives so layout and streaming behavior are correct by default.

## Plan

### 1. Install AI Elements primitives
Add the source components we'll compose around:
- `conversation` — sticky-to-bottom transcript, scroll button, empty state
- `message` — user/assistant rows, markdown streaming, actions
- `prompt-input` — composer with textarea, footer, submit, attachments
- `shimmer` — "Asikon AI is thinking…" loading state
- `suggestions` (or build pills) — quick prompts

### 2. Rebuild `src/components/learn/LearnChat.tsx` from scratch

Layout (mobile-first):

```text
┌─────────────────────────────────┐
│ Header  [☰] avatar  title   ⋯  │  ← sticky top, hairline border
├─────────────────────────────────┤
│                                 │
│  Conversation (auto-scroll)     │
│  • Empty: hero + 4 quick cards  │
│  • Filled: messages + shimmer   │
│                                 │
│         [↓ jump to latest]      │  ← floating, appears on scroll up
├─────────────────────────────────┤
│ ╭───────────────────────────╮   │
│ │ Ask Asikon anything…      │   │  ← prompt-input, rounded
│ │ 📎 🎤              [ ↑ ]  │   │
│ ╰───────────────────────────╯   │
│   Asikon AI can make mistakes   │
└─────────────────────────────────┘
  ↑ pb-[env(safe-area-inset-bottom)]
```

Key behaviors:
- Use `<Conversation>` from AI Elements — handles sticky-to-bottom and the jump button automatically (removes ~40 lines of scroll logic).
- Use `<Message role="user|assistant">` + `<MessageContent>` + `<Response>` for streamed markdown rendering.
- Use `<PromptInput>` with `<PromptInputTextarea>` + `<PromptInputFooter>` + `<PromptInputSubmit status={status} />` — fixes composer sizing, submit button alignment, Enter/Shift+Enter for free.
- Use `<Shimmer>Asikon AI is thinking…</Shimmer>` instead of custom typing indicator.
- Apply `pb-[env(safe-area-inset-bottom)]` to composer for iOS home bar.
- Keep `visualViewport` keyboard-rise listener.
- Keep `useChat` from `@ai-sdk/react` and the existing `DefaultChatTransport` to Supabase edge function — no backend changes.

### 3. Empty state (signed-in, no messages)

Centered hero with:
- Asikon tutor avatar (with soft brand glow behind)
- "Hi, I'm Asikon AI" headline + 1-line subtitle
- 4 quick-prompt cards in a 2x2 grid, each with a tinted icon (blue / emerald / violet / amber) and a subtle hover lift — click sends the prompt
- "What I'm good at" row with 3 capability chips
- "Powered by Lovable AI" footnote

### 4. Filled state

- User messages: right-aligned, `bg-primary text-primary-foreground` rounded bubble, max-w-[85%]
- Assistant messages: no bubble, plain prose on background, with small `Asikon AI` label + avatar at top-left, markdown via `<Response>` / `react-markdown`
- Streaming cursor on the assistant message currently streaming
- Action row under assistant: Copy, Regenerate (last only), 👍 👎
- Action chips above composer when there are messages: "Explain like I'm 12", "In Bangla", "Quiz me", "TL;DR" — append to input

### 5. Header

- Sticky, h-14, hairline border, `bg-background/85 backdrop-blur-xl`
- Left: back button (mobile only) + thread-list sheet trigger (mobile only)
- Center: Asikon avatar with online dot + thread title + "Online · Asikon AI"
- Right: New chat (PenSquare), overflow menu (Share link, Delete chat)

### 6. Signed-out gate

Restore working layout but with the refined visual treatment from last turn (brand glow, gradient logo card, status chip, gradient headline, 3 capability tiles, primary-rounded CTA). Use simple flex column inside `flex-1 overflow-y-auto`, no nested absolute layers that broke last time.

### 7. Page shell (`src/pages/Learn.tsx`)

- Keep `StandaloneShell` (`fixed inset-0 z-50 flex flex-col`).
- Signed-in: `<div className="flex flex-1 min-h-0">` with desktop sidebar (`hidden lg:flex w-72`) + chat column (`relative flex-1 min-w-0 min-h-0`). Mount `<LearnChat>` keyed by `threadId`.
- No `absolute inset-0` inside `LearnChat` — it returns a normal `flex flex-col h-full` and lets the parent provide height.

### 8. Technical notes

- Remove the brittle `grid-rows-[auto_1fr_auto]` + `absolute inset-0` layering. With AI Elements `<Conversation>` providing the scroll region and a normal flex column shell, the composer pins to the bottom naturally.
- Keep all existing hooks: `useAiThreadMessages`, `useAiThreads`, `useCreateAiThread`, `useDeleteAiThread`, `useLearnerProgress` (session/quiz awarding), analytics tracking.
- Keep the same `threadId` route contract and `useChat({ id: threadId })`.
- No DB or edge-function changes.

### Files touched

- `src/components/learn/LearnChat.tsx` — full rewrite (~776 → ~450 lines)
- `src/pages/Learn.tsx` — simplify chat-column wrapper, restore working signed-out gate
- `src/components/ai-elements/*` — new (installed via `bunx ai-elements@latest add conversation message prompt-input shimmer`)
- `package.json` — adds AI Elements deps
