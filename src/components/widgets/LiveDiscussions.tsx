'use client'

import { Activity } from 'lucide-react'
import { motion } from 'framer-motion'

interface Discussion {
  id: string
  topic: string
  participants: number
  category: string
}

const discussions: Discussion[] = [
  { id: '1', topic: 'Is quantum computing ready for production?', participants: 47, category: 'Quantum' },
  { id: '2', topic: 'Neural interface breakthrough in Japan', participants: 32, category: 'Neural' },
  { id: '3', topic: 'Holographic displays: 2026 roadmap', participants: 28, category: 'Holo' },
  { id: '4', topic: 'Decentralized AI training methods', participants: 19, category: 'AI' },
]

export default function LiveDiscussions() {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-nebula-secondary" />
          <h3 className="text-sm font-semibold text-white">Live Discussions</h3>
        </div>
        <span className="text-xs text-nebula-text-secondary">{discussions.length} active</span>
      </div>

      <div className="space-y-1">
        {discussions.map((discussion, index) => (
          <motion.div
            key={discussion.id}
            className="flex items-start gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-white/[0.04] group cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
            whileHover={{
              boxShadow: '0 0 12px rgba(0, 229, 255, 0.08), 0 0 24px rgba(0, 229, 255, 0.04)',
            }}
          >
            <div className="relative flex-shrink-0 mt-1">
              <div className="w-2 h-2 rounded-full bg-nebula-success" />
              <motion.div
                className="absolute inset-0 w-2 h-2 rounded-full bg-nebula-success"
                animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate group-hover:text-nebula-secondary transition-colors">
                {discussion.topic}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-nebula-text-secondary">
                  {discussion.participants} in discussion
                </span>
                <span className="text-xs text-nebula-primary/60 px-1.5 py-0.5 rounded-full bg-nebula-primary/10">
                  {discussion.category}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
