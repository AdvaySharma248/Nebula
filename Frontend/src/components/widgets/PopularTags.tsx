'use client'

import { motion } from 'framer-motion'

const tags = ['quantum', 'ml', 'cyber', 'meta', 'holo', 'ai', 'crypto', 'space', 'dev', 'design']

export default function PopularTags() {
  return (
    <div className="surface rounded-lg p-4">
      <h3
        className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Tags
      </h3>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, index) => (
          <motion.button
            key={tag}
            className="rounded px-2 py-0.5 text-xs text-secondary transition-colors duration-200 hover:text-[#F5F5F5]"
            style={{ background: '#1A1A1A' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.03, duration: 0.2 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
