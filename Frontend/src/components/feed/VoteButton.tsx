'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { toast } from 'sonner'

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
  const [animatingDirection, setAnimatingDirection] = useState<'up' | 'down' | null>(null)
  const { user, setAuthModalOpen } = useAuthStore()

  const handleVote = (direction: 'up' | 'down') => {
    let newVote: 'up' | 'down' | null = null
    let voteDelta = 0

    if (userVote === direction) {
      newVote = null
      voteDelta = direction === 'up' ? -1 : 1
    } else if (userVote === null) {
      newVote = direction
      voteDelta = direction === 'up' ? 1 : -1
    } else {
      newVote = direction
      voteDelta = direction === 'up' ? 2 : -2
    }

    setAnimatingDirection(direction)
    setTimeout(() => setAnimatingDirection(null), 200)

    setUserVote(newVote)
    setVotes((prev) => prev + voteDelta)
    onVote?.(newVote)
  }

  const iconSize = size === 'sm' ? 14 : 16
  const countClass = size === 'sm' ? 'text-[11px]' : 'text-xs'
  const gap = size === 'sm' ? 'gap-[2px]' : 'gap-0.5'

  return (
    <div className={`flex flex-col items-center ${gap}`}>
      {/* Upvote */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          if (!user) {
            toast.error("Authentication required", {
              description: "Please sign in to upvote posts."
            })
            setAuthModalOpen(true, 'login')
            return
          }
          handleVote('up')
        }}
        className="flex items-center justify-center cursor-pointer p-0.5 rounded transition-colors duration-150"
        style={{
          color: userVote === 'up' ? '#C7FF3F' : '#555555',
        }}
        whileHover={{ color: userVote === 'up' ? '#C7FF3F' : '#888888' }}
        animate={
          animatingDirection === 'up'
            ? { scale: [1, 1.15, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 0.2, ease: 'easeOut' }}
        aria-label="Upvote"
      >
        <ChevronUp size={iconSize} strokeWidth={2.5} />
      </motion.button>

      {/* Count */}
      <motion.span
        className={`font-display tabular-nums font-medium ${countClass} leading-none`}
        key={votes}
        animate={{
          color:
            userVote === 'up'
              ? '#C7FF3F'
              : userVote === 'down'
                ? '#FF4444'
                : '#888888',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {votes}
      </motion.span>

      {/* Downvote */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation()
          if (!user) {
            toast.error("Authentication required", {
              description: "Please sign in to downvote posts."
            })
            setAuthModalOpen(true, 'login')
            return
          }
          handleVote('down')
        }}
        className="flex items-center justify-center cursor-pointer p-0.5 rounded transition-colors duration-150"
        style={{
          color: userVote === 'down' ? '#FF4444' : '#555555',
        }}
        whileHover={{ color: userVote === 'down' ? '#FF4444' : '#888888' }}
        animate={
          animatingDirection === 'down'
            ? { scale: [1, 1.15, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 0.2, ease: 'easeOut' }}
        aria-label="Downvote"
      >
        <ChevronDown size={iconSize} strokeWidth={2.5} />
      </motion.button>
    </div>
  )
}
