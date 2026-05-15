'use client'

import { Hash } from 'lucide-react'
import { motion } from 'framer-motion'

interface Tag {
  name: string
  popularity: number
  color: string
  bg: string
}

const tags: Tag[] = [
  { name: 'quantum', popularity: 95, color: '#7C4DFF', bg: 'rgba(124,77,255,0.1)' },
  { name: 'neural', popularity: 88, color: '#00E5FF', bg: 'rgba(0,229,255,0.1)' },
  { name: 'holo', popularity: 82, color: '#FF4DA6', bg: 'rgba(255,77,166,0.1)' },
  { name: 'cyber', popularity: 76, color: '#7C4DFF', bg: 'rgba(124,77,255,0.08)' },
  { name: 'meta', popularity: 71, color: '#00E5FF', bg: 'rgba(0,229,255,0.08)' },
  { name: 'ai', popularity: 68, color: '#00FFB2', bg: 'rgba(0,255,178,0.08)' },
  { name: 'crypto', popularity: 62, color: '#FF4DA6', bg: 'rgba(255,77,166,0.06)' },
  { name: 'space', popularity: 55, color: '#7C4DFF', bg: 'rgba(124,77,255,0.06)' },
  { name: 'dev', popularity: 48, color: '#00E5FF', bg: 'rgba(0,229,255,0.05)' },
  { name: 'art', popularity: 42, color: '#FF4DA6', bg: 'rgba(255,77,166,0.05)' },
]

export default function PopularTags() {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-nebula-highlight" />
          <h3 className="text-sm font-semibold text-white">Popular Tags</h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => {
          const sizeClass =
            tag.popularity > 80
              ? 'text-sm px-3 py-1.5'
              : tag.popularity > 60
                ? 'text-xs px-2.5 py-1'
                : 'text-[10px] px-2 py-0.5'

          return (
            <motion.button
              key={tag.name}
              className={`rounded-full font-medium border transition-all duration-200 ${sizeClass}`}
              style={{
                color: tag.color,
                background: tag.bg,
                borderColor: `${tag.color}20`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03, duration: 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 12px ${tag.color}25`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              #{tag.name}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
