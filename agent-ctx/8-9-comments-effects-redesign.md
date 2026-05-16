# Task 8-9: Comments & Effects Redesign

## Agent
Effects/Comments Subagent

## Task
Complete redesign of comments system and background effects for the Nebula platform — editorial minimalism + underground techwear direction (Linear, Raycast aesthetic).

## Work Log

### Comments — `/src/components/comments/`

#### CommentItem.tsx (Complete Rewrite)
- Removed: ProfileHoverCard, emoji reactions, ThumbsUp/ThumbsDown icons, Share button, colored avatar circles, glassmorphism
- Added: ChevronUp/ChevronDown vote icons, inline author+timestamp, collapsible threads with reply count
- New color system: `#F5F5F5` author, `#555555` timestamp, `#888888` content, `#C7FF3F` accent for active upvote, `#FF4444` for active downvote
- All text-tertiary (`#555555`) action buttons with hover → `#888888`
- Border-left for nested replies: `1px solid rgba(255,255,255,0.06)`, pl-4 indentation
- Inline reply textarea: bg `#1A1A1A`, border transitions to `rgba(199,255,63,0.3)` on focus
- Subtle hover: `rgba(255,255,255,0.01)`
- No emojis, no reaction badges, no profile hover cards
- Reply submit button: accent-bg (`#C7FF3F`), disabled state with opacity

#### CommentSection.tsx (Complete Rewrite)
- Header: "Discussion" in font-display font-semibold + count badge (accent-bg-subtle, accent-text, text-xs)
- Input area: surface bg, thin border, rounded; textarea bg `#1A1A1A`, no glow, border transition to `rgba(199,255,63,0.3)` on focus
- Placeholder: "Add to discussion..."
- Submit button: accent-bg (`#C7FF3F`), text-xs, compact, disabled when empty (opacity-30)
- 5 sample comments with nested replies — all realistic HN/Reddit-style technical, opinionated, concise
- Removed: avatar circles, emoji reactions, glassmorphism, gradient buttons
- Comment interface simplified (no reactions array)

### Effects — `/src/components/effects/`

#### CursorGlow.tsx (Complete Rewrite)
- Very faint radial gradient following cursor: `rgba(199,255,63,0.03)`
- 200px diameter (was 300px)
- Spring physics: damping 30, stiffness 200 (was 25/150)
- Hidden on mobile/touch devices via useSyncExternalStore
- pointer-events-none, fixed position, z-[1]
- NOT a glowing orb — just a whisper of light

#### AmbientBackground.tsx (New File)
- Replaces: ParticleField.tsx, AuroraBackground.tsx, GlowOrbs.tsx, MeshGradient.tsx
- Fixed, full-screen, z-0, pointer-events-none
- Two barely-visible gradient orbs:
  1. Top-right: 800px, `rgba(199,255,63,0.02)`, blur 200px — hint of warmth
  2. Bottom-left: 600px, `rgba(255,255,255,0.01)`, blur 150px — whisper of atmosphere
- Slow drift animation: 35s and 40s cycles with framer-motion
- Page feels like `#0D0D0D` with just a whisper of depth

### Cleanup
- Deleted: ParticleField.tsx, AuroraBackground.tsx, GlowOrbs.tsx, MeshGradient.tsx
- Updated page.tsx: already using AmbientBackground + CursorGlow (verified)
- Updated LandingPage.tsx: added AmbientBackground import and usage
- Verified: no remaining imports of old effect files anywhere in codebase
- Lint: ✅ Clean | Dev Server: ✅ Compiling successfully

## Stage Summary
- Comments system fully redesigned: minimal, text-focused, editorial aesthetic
- Background effects replaced: from flashy particles/auroras to subtle ambient gradients
- Cursor glow redesigned: barely visible hint of light instead of glowing orb
- All old effect files deleted, no orphaned imports
- New color system (#0D0D0D, #C7FF3F) consistently applied throughout
