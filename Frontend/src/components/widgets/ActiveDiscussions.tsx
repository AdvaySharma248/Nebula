'use client'

import { motion } from 'framer-motion'

interface Discussion {
  id: string
  topic: string
  participants: number
}

const discussions: Discussion[] = [
  { id: '1', topic: 'Is quantum computing ready for production?', participants: 47 },
  { id: '2', topic: 'Neural interface breakthrough in Japan', participants: 32 },
  { id: '3', topic: 'Holographic displays: 2026 roadmap', participants: 28 },
  { id: '4', topic: 'Decentralized AI training methods', participants: 19 },
]

export default function ActiveDiscussions() {
  return (
    <div className="surface rounded-lg p-4">
      <h3
        className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Active now
      </h3>

      <div>
        {discussions.map((discussion, index) => (
          <motion.div
            key={discussion.id}
            className="flex items-center gap-3 py-2.5 px-1 rounded transition-colors duration-200 hover:bg-white/[0.02] cursor-pointer group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
          >
            {/* Pulsing dot */}
            <span className="relative flex-shrink-0 flex items-center justify-center w-1.5 h-1.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: '#C7FF3F' }}
              >
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full"
                  style={{ backgroundColor: '#C7FF3F' }}
                  animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ backgroundColor: '#C7FF3F' }}
              />
            </span>

            <span className="text-sm text-[#F5F5F5] truncate flex-1 group-hover:text-[#C7FF3F] transition-colors">
              {discussion.topic}
            </span>
            <span className="text-xs text-tertiary flex-shrink-0 tabular-nums">
              {discussion.participants}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
