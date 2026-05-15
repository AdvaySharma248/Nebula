'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface VoteButtonProps {
  initialVotes: number
  initialUserVote: 'up' | 'down' | null
  onVote?: (vote: 'up' | 'down' | null) => void
  size?: 'sm' | 'default'
}

export function VoteButton({
  initialVotes,
  initialUserVote,
  onVote,
  size = 'default',
}: VoteButtonProps) {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(initialUserVote)
  const [votes, setVotes] = useState(initialVotes)
  const [isAnimating, setIsAnimating] = useState<'up' | 'down' | null>(null)

  const handleVote = (direction: 'up' | 'down') => {
    let newVote: 'up' | 'down' | null = null
    let voteDelta = 0

    if (userVote === direction) {
      // Unvote
      newVote = null
      voteDelta = direction === 'up' ? -1 : 1
    } else if (userVote === null) {
      // Fresh vote
      newVote = direction
      voteDelta = direction === 'up' ? 1 : -1
    } else {
      // Switch vote
      newVote = direction
      voteDelta = direction === 'up' ? 2 : -2
    }

    setIsAnimating(direction)
    setTimeout(() => setIsAnimating(null), 300)

    setUserVote(newVote)
    setVotes((prev) => prev + voteDelta)
    onVote?.(newVote)
  }

  const buttonSize = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8'
  const iconSize = size === 'sm' ? 14 : 16
  const countSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <div className="flex flex-col items-center gap-0.5">
      {/* Upvote button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          handleVote('up')
        }}
        className={`${buttonSize} rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer
          ${userVote === 'up'
            ? 'bg-[#00FFB2]/20 text-[#00FFB2]'
            : 'bg-white/5 text-[#94A3B8] hover:bg-white/10 hover:text-white'
          }`}
        whileTap={{ scale: 0.9 }}
        animate={
          isAnimating === 'up'
            ? { scale: [1, 1.3, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        aria-label="Upvote"
      >
        <ChevronUp size={iconSize} />
        {/* Glow burst */}
        <AnimatePresence>
          {isAnimating === 'up' && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                background: 'radial-gradient(circle, rgba(0,255,178,0.4) 0%, transparent 70%)',
              }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Vote count */}
      <motion.span
        className={`${countSize} font-bold min-w-[2ch] text-center tabular-nums`}
        key={votes}
        initial={{ y: votes > (initialVotes - 2) ? 5 : -5, opacity: 0.5 }}
        animate={{
          y: 0,
          opacity: 1,
          color:
            userVote === 'up'
              ? '#00FFB2'
              : userVote === 'down'
                ? '#FF5C7A'
                : '#94A3B8',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {votes}
      </motion.span>

      {/* Downvote button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          handleVote('down')
        }}
        className={`${buttonSize} rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer
          ${userVote === 'down'
            ? 'bg-[#FF5C7A]/20 text-[#FF5C7A]'
            : 'bg-white/5 text-[#94A3B8] hover:bg-white/10 hover:text-white'
          }`}
        whileTap={{ scale: 0.9 }}
        animate={
          isAnimating === 'down'
            ? { scale: [1, 1.3, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        aria-label="Downvote"
      >
        <ChevronDown size={iconSize} />
        {/* Glow burst */}
        <AnimatePresence>
          {isAnimating === 'down' && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                background: 'radial-gradient(circle, rgba(255,92,122,0.4) 0%, transparent 70%)',
              }}
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
