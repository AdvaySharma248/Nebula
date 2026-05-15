'use client'

import TrendingCommunities from './TrendingCommunities'
import LiveDiscussions from './LiveDiscussions'
import AIRecommendations from './AIRecommendations'
import PopularTags from './PopularTags'
import ActivityHeatmap from './ActivityHeatmap'

export default function WidgetPanel() {
  return (
    <aside className="hidden lg:block w-80 flex-shrink-0">
      <div className="sticky top-4 space-y-4 max-h-[calc(100vh-2rem)] overflow-y-auto pr-1 pb-4 custom-scrollbar">
        <TrendingCommunities />
        <LiveDiscussions />
        <AIRecommendations />
        <PopularTags />
        <ActivityHeatmap />
      </div>
    </aside>
  )
}
