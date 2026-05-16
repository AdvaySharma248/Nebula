'use client'

import TrendingCommunities from './TrendingCommunities'
import ActiveDiscussions from './ActiveDiscussions'
import PopularTags from './PopularTags'

export default function WidgetPanel() {
  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <div className="sticky top-16 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto pb-4">
        <TrendingCommunities />
        <ActiveDiscussions />
        <PopularTags />
      </div>
    </aside>
  )
}
