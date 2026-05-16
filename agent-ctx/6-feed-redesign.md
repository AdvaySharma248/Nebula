# Task 6 — Feed & Post Card Redesign

## Agent: Feed Redesign Subagent
## Task ID: 6

### Work Log

#### VoteButton.tsx — Complete Rewrite
- Removed: circular neon buttons, radial gradient glow bursts, AnimatePresence glow effects
- Added: Clean chevron-only buttons with no container circles
- Upvote active: #C7FF3F (accent-text), Downvote active: #FF4444 (error)
- Default state: #555555 (text-tertiary)
- Vote count: font-display, tabular-nums, color matches vote state
- Scale animation: 1 → 1.15 → 1 over 200ms (subtle, no glow)
- Size variants: sm (compact for cards, 14px icons, 11px count) and default (16px, text-xs)

#### PostCard.tsx — Complete Rewrite
- Removed: glassmorphism (glass-card), gradient overlays, neon hover, circular community avatars with borders
- Added: `.surface` class for #151515 bg + rgba(255,255,255,0.06) border, rounded-lg
- Layout: horizontal — vote left, content right
- Header: community name (accent-text text-xs) · author (text-secondary text-xs) · time (text-tertiary text-xs)
- Title: font-display, font-semibold, text-base, #F5F5F5, line-clamp-2
- Content: text-secondary, text-sm, line-clamp-2
- Image: rounded, border rgba(255,255,255,0.06), no glow
- Footer: text-xs actions — Comments · Share · Save, all text-tertiary → text-secondary on hover
- Save: accent-text when active
- Hover: translateY(-1px) + box-shadow: 0 4px 20px rgba(0,0,0,0.3) — realistic shadow

#### FeedContent.tsx — Complete Rewrite
- Removed: gradient tab indicator, glassmorphism header, "edge of nebula" end text, gradient CTA buttons
- Added: Clean sticky header at top-16, bg #0D0D0D, thin bottom border
- Header layout: "Feed" (font-display font-semibold) | Tab buttons | "Thread" button (accent-bg)
- Tabs: "For You" | "Trending" | "Latest" — accent-text + 1px #C7FF3F bottom border when active
- Inactive tabs: text-tertiary, hover → text-secondary
- 10 sample posts with authentic-sounding tech content (Hacker News / Reddit style):
  - r/qdev: IBM Heron processor hands-on, Qiskit transpiler optimization
  - r/ml: Benchmark gaming problems, LoRA fine-tuning practicality
  - r/cyber: TPM bypass CVE, enterprise security
  - r/aifuture: Synthetic data scaling laws
  - r/metaverse: Vision Pro spatial personas for remote work
  - r/holo: DIY light field display build log
  - r/spacetech: Relativity Space Terran R tank printing
  - r/crypto: SP1 zkVM performance benchmarks
- End of feed: thin editorial-line + "You're caught up" text-tertiary text-xs

#### CreatePostModal.tsx — Complete Rewrite
- Removed: glass-strong styling, gradient header, gradient post button, image upload section
- Added: #151515 bg, border rgba(255,255,255,0.06), rounded-lg
- Header: "New thread" (font-display font-semibold text-sm), thin bottom border, h-12
- Fields: #1A1A1A bg, border rgba(255,255,255,0.06), focus → rgba(199,255,63,0.3) border
- Labels: text-[10px] uppercase tracking-wider, #555555 color
- Community dropdown: #1A1A1A bg, same border styling
- Footer: Cancel (text-secondary) + Post (accent-bg when valid, disabled when empty)
- Entrance: fade + scale from 0.98

### Design Decisions
- No glassmorphism, no neon, no gradients — pure editorial minimalism
- Accent color (#C7FF3F) used sparingly: active tab, active votes, save state, thread button
- Realistic shadow on hover instead of glow effects
- Font-display (Space Grotesk) for titles/counts, font-inter for body text
- All interactive elements use transition-colors duration-150 for snappy feel

### Lint Status
✅ Clean — no errors or warnings
