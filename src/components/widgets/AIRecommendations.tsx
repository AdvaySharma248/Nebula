'use client'

import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

interface Recommendation {
  id: string
  title: string
  type: 'post' | 'community'
  reason: string
}

const recommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Introduction to Quantum Neural Networks',
    type: 'post',
    reason: 'Based on your interest in quantum computing',
  },
  {
    id: '2',
    title: 'Holo Creators Guild',
    type: 'community',
    reason: 'Popular with Neural Artists members',
  },
  {
    id: '3',
    title: 'Building Your First Neural Interface',
    type: 'post',
    reason: 'Trending in your network',
  },
]

export default function AIRecommendations() {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-nebula-highlight" />
          <h3 className="text-sm font-semibold text-white">For You</h3>
        </div>
        <motion.div
          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-nebula-highlight/10 border border-nebula-highlight/20"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] font-medium text-nebula-highlight">AI</span>
        </motion.div>
      </div>
      <p className="text-xs text-nebula-text-secondary mb-3">Based on your interests</p>

      <div className="space-y-2">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-nebula-primary/20 transition-all duration-200 cursor-pointer group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            whileHover={{
              boxShadow: '0 0 12px rgba(124, 77, 255, 0.1)',
              y: -1,
            }}
          >
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-nebula-primary/20 to-nebula-secondary/20 border border-nebula-primary/20 flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-nebula-highlight" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate group-hover:text-nebula-primary transition-colors">
                  {rec.title}
                </p>
                <p className="text-xs text-nebula-text-secondary mt-0.5">{rec.reason}</p>
                <span className="inline-block mt-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.04] text-nebula-text-secondary capitalize">
                  {rec.type}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
