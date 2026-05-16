# Task 7-8: Redesign Sidebar Widgets, Profile Page, and Community Page

**Agent**: Widgets/Profile/Community Redesign Subagent  
**Design Direction**: Editorial minimalism + underground techwear (Linear, Raycast, Read.cv aesthetic)

---

## Work Log

### 1. TrendingCommunities.tsx — Complete Rewrite
- Replaced glassmorphism card with `surface` class (bg #151515, subtle border)
- Title: "Trending" in `font-display text-xs font-semibold tracking-wider uppercase text-tertiary`
- 5 communities as text-only rows: rank number (font-display, text-tertiary) + name (#F5F5F5) + member count (text-tertiary)
- Removed: avatars, colored circles, sparkline charts, neon glow hover, gradient text
- Added: thin `editorial-line` separators between items, subtle hover `bg-white/[0.02]`
- "View all →" link at bottom in `accent-text text-xs`
- Framer-motion stagger reveals (0.04s delay per item)

### 2. ActiveDiscussions.tsx — New Component (replaces LiveDiscussions.tsx)
- Title: "Active now" in uppercase text-tertiary font-display
- 4 discussion items with small pulsing dot (#C7FF3F, 6px) + topic text + participant count
- Pulsing animation: `scale: [1, 2.5, 1]` with 2s infinite loop
- Minimal text-only layout, thin implicit spacing
- No category badges, no colored glows — pure text hierarchy

### 3. PopularTags.tsx — Complete Rewrite
- Title: "Tags" in uppercase text-tertiary font-display
- Tags as inline text pills: `bg #1A1A1A`, `text-xs text-secondary`, `rounded px-2 py-0.5`
- All monochrome — removed colorful gradient pills, per-tag colors, glow effects
- Tags: quantum, ml, cyber, meta, holo, ai, crypto, space, dev, design
- Subtle hover: text lightens to #F5F5F5
- No `#` prefix, no sizing variation — uniform monochrome pills

### 4. WidgetPanel.tsx — Simplified
- Container: `hidden lg:block`, `w-72`, `sticky top-16`
- Renders only: TrendingCommunities, ActiveDiscussions, PopularTags
- `gap-4` between widgets via `space-y-4`
- Removed: ActivityHeatmap, AIRecommendations — too generic SaaS
- Removed: LiveDiscussions (replaced by ActiveDiscussions)
- Proper overflow handling and scrollbar styling

### 5. ProfilePage.tsx — Complete Redesign
- **Header**: NO gradient banner. Editorial layout:
  - Large avatar (80px) with thin border, no neon glow ring
  - Name in `font-display text-2xl font-bold`, username in text-secondary
  - Bio in text-secondary text-sm max-w-md
  - Stats inline: "247 posts · 12.8K followers · 562 following" — numbers in #F5F5F5, labels in text-tertiary
  - Edit button: surface bg, text-secondary, text-xs, rounded
- **Bento grid** (grid-cols-2 gap-3):
  - Activity (col-span-2): 7 thin vertical bars, bg #1A1A1A base, active bars in accent-bg-subtle with accent-text height values
  - Achievements (1 col): 4 items — just icon + label, compact 2x2 grid, bg #1A1A1A cells
  - Metrics (1 col): "New today: 47 ↑" style — numbers in #F5F5F5, up arrows accent-text, down arrows #FF4444
  - Recent posts (col-span-2): 4 items — title + timestamp + engagement, editorial-line separators
  - Saved (col-span-2): 3 items — title + type badge (bg #1A1A1A)
- Each bento item: `surface` bg, `rounded-lg`, `p-4`
- Stagger animation via framer-motion variants (staggerChildren: 0.06)

### 6. CommunityPage.tsx — Complete Redesign
- **Header**: NO animated gradient banner. Editorial layout:
  - Community initial letter in large square (80px, accent-bg-subtle bg, accent-text font-display text-3xl font-bold)
  - Name in font-display text-2xl font-bold
  - Description in text-secondary text-sm
  - "12.8K members · 342 online" — online count in accent-text
  - Join button: accent-bg, compact
- **Tabs**: Posts | About | Members — thin bottom border (rgba(255,255,255,0.06))
  - Active tab: accent-text + 1px accent bottom border (motion layoutId spring animation)
  - Inactive: text-tertiary hover:text-secondary
- **Posts tab**: 4 community posts with clean inline layout
  - Each post: author + time, content text, engagement row (Heart/MessageCircle/Share2)
  - Editorial-line separators between posts
  - Pinned badge: accent-bg-subtle + accent-text
- **About tab**: Rules list (numbered) + moderator list (Shield icon + name + role), all text-based
- **Members tab**: Simple list with name + role badge (bg #1A1A1A)
- No glassmorphism, no gradient banners, no neon borders

### 7. page.tsx — Minor Compatibility Updates
- Fixed `sidebarCollapsed` → `sidebarExpanded` (matching the Zustand store)
- Updated sidebarWidth logic accordingly
- Updated PlaceholderView to use `surface` class and new color system
- Updated PostDetailView to use `surface rounded-lg`, new text colors, accent-bg-subtle for tags
- Removed old glass/glass-card/gradient-text/nebula-* class references

---

## Design Principles Applied
- **Editorial minimalism**: Text hierarchy over visual noise
- **Underground techwear**: Restrained accent color (#C7FF3F), used sparingly for active states and key metrics
- **No purple/cyan/pink gradients**: All monochrome with single accent
- **No glassmorphism**: Solid surface cards with subtle borders
- **No animated gradient banners**: Clean, typographic headers
- **Font system**: Space Grotesk for display/headings, Inter for body
- **CSS utility classes**: `.surface`, `.accent-text`, `.accent-bg`, `.accent-bg-subtle`, `.text-secondary`, `.text-tertiary`, `.editorial-line`, `.transition-premium`

---

## Files Modified
- `/home/z/my-project/src/components/widgets/TrendingCommunities.tsx` — Rewrite
- `/home/z/my-project/src/components/widgets/ActiveDiscussions.tsx` — New (replaces LiveDiscussions)
- `/home/z/my-project/src/components/widgets/PopularTags.tsx` — Rewrite
- `/home/z/my-project/src/components/widgets/WidgetPanel.tsx` — Rewrite
- `/home/z/my-project/src/components/profile/ProfilePage.tsx` — Rewrite
- `/home/z/my-project/src/components/community/CommunityPage.tsx` — Rewrite
- `/home/z/my-project/src/app/page.tsx` — Compatibility fixes

## Lint: ✅ Clean | Dev Server: ✅ Compiling OK
