'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/stores/app-store'

interface Community {
  id: string
  name: string
  members: number
}

const communities: Community[] = [
  { id: 'quantum-devs', name: 'Quantum Devs', members: 12847 },
  { id: 'neural-artists', name: 'Neural Artists', members: 9523 },
  { id: 'holo-builders', name: 'Holo Builders', members: 7891 },
  { id: 'cyber-punks', name: 'Cyber Punks', members: 6234 },
  { id: 'meta-explorers', name: 'Meta Explorers', members: 5102 },
]

export default function TrendingCommunities() {
  const setSelectedCommunity = useAppStore((s) => s.setSelectedCommunity)

  return (
    <div className="surface rounded-lg p-4">
      <h3
        className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Trending
      </h3>

      <div>
        {communities.map((community, index) => (
          <motion.button
            key={community.id}
            className="w-full flex items-center gap-3 py-2.5 px-1 rounded transition-colors duration-200 hover:bg-white/[0.02] text-left group"
            onClick={() => setSelectedCommunity(community.id)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
          >
            <span
              className="text-xs text-tertiary w-4 text-right tabular-nums flex-shrink-0"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {index + 1}
            </span>
            <span className="text-sm text-[#F5F5F5] truncate flex-1 group-hover:text-[#C7FF3F] transition-colors">
              {community.name}
            </span>
            <span className="text-xs text-tertiary flex-shrink-0 tabular-nums">
              {community.members.toLocaleString()}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Separator */}
      <div className="editorial-line mt-2" />

      <motion.button
        className="w-full mt-2 py-1.5 text-left accent-text text-xs hover:underline transition-colors"
        whileTap={{ scale: 0.98 }}
      >
        View all →
      </motion.button>
    </div>
  )
}
