'use client'

import { TrendingUp, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/stores/app-store'

interface Community {
  id: string
  name: string
  members: number
  color: string
  growth: number
  sparkline: number[]
}

const communities: Community[] = [
  { id: 'quantum-devs', name: 'Quantum Devs', members: 12847, color: '#7C4DFF', growth: 24, sparkline: [30, 45, 35, 60, 50, 70, 85] },
  { id: 'neural-artists', name: 'Neural Artists', members: 9523, color: '#00E5FF', growth: 18, sparkline: [20, 35, 55, 45, 65, 60, 78] },
  { id: 'holo-builders', name: 'Holo Builders', members: 7891, color: '#FF4DA6', growth: 15, sparkline: [40, 30, 50, 45, 55, 70, 65] },
  { id: 'cyber-punks', name: 'Cyber Punks', members: 6234, color: '#00FFB2', growth: 12, sparkline: [25, 40, 35, 55, 50, 60, 72] },
  { id: 'meta-explorers', name: 'Meta Explorers', members: 5102, color: '#FF5C7A', growth: 9, sparkline: [15, 25, 40, 35, 50, 45, 60] },
]

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 48
  const height = 20

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((val - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} className="opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function TrendingCommunities() {
  const setSelectedCommunity = useAppStore((s) => s.setSelectedCommunity)

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-nebula-primary" />
          <h3 className="text-sm font-semibold text-white">Trending Communities</h3>
        </div>
      </div>

      <div className="space-y-1">
        {communities.map((community, index) => (
          <motion.button
            key={community.id}
            className="w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-white/[0.04] group text-left"
            onClick={() => setSelectedCommunity(community.id)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{
              boxShadow: `0 0 15px ${community.color}15, 0 0 30px ${community.color}08`,
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
              style={{ background: `${community.color}25`, border: `1px solid ${community.color}40` }}
            >
              {community.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate group-hover:text-nebula-primary transition-colors">
                {community.name}
              </p>
              <p className="text-xs text-nebula-text-secondary">
                {community.members.toLocaleString()} members
              </p>
            </div>

            <div className="flex items-center gap-2">
              <MiniSparkline data={community.sparkline} color={community.color} />
              <span className="text-xs font-medium text-nebula-success">+{community.growth}%</span>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.button
        className="w-full mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-center gap-1 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-sm gradient-text font-medium">View All</span>
        <ChevronRight className="w-3 h-3 text-nebula-primary group-hover:translate-x-0.5 transition-transform" />
      </motion.button>
    </div>
  )
}
