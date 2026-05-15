'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Share2, Bookmark } from 'lucide-react'
import { VoteButton } from './VoteButton'
import { useAppStore } from '@/stores/app-store'

export interface Post {
  id: string
  community: { name: string; avatar: string; color: string }
  author: { name: string; avatar: string }
  title: string
  content: string
  image?: string
  votes: number
  comments: number
  timestamp: string
  userVote: 'up' | 'down' | null
  isSaved: boolean
}

interface PostCardProps {
  post: Post
  index?: number
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const { setSelectedPost } = useAppStore()
  const [isSaved, setIsSaved] = useState(post.isSaved)

  const handleCardClick = () => {
    setSelectedPost(post.id)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaved((prev) => !prev)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Share logic placeholder
  }

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedPost(post.id)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -2,
        boxShadow: '0 0 30px rgba(124,77,255,0.1)',
        borderColor: 'rgba(124,77,255,0.2)',
      }}
      onClick={handleCardClick}
      className="glass-card p-4 sm:p-5 cursor-pointer transition-colors duration-200 group relative overflow-hidden"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7C4DFF]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative flex gap-3 sm:gap-4">
        {/* Vote column */}
        <div className="flex-shrink-0 pt-1">
          <VoteButton
            initialVotes={post.votes}
            initialUserVote={post.userVote}
            size="sm"
          />
        </div>

        {/* Content column */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {/* Community avatar */}
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              style={{
                backgroundColor: `${post.community.color}20`,
                border: `1.5px solid ${post.community.color}`,
                color: post.community.color,
              }}
            >
              {post.community.avatar}
            </div>

            {/* Community name */}
            <span className="text-sm font-medium text-[#7C4DFF] truncate">
              {post.community.name}
            </span>

            <span className="text-[#94A3B8] text-xs">·</span>

            {/* Author */}
            <span className="text-xs text-[#94A3B8] truncate">
              {post.author.name}
            </span>

            <span className="text-[#94A3B8] text-xs">·</span>

            {/* Timestamp */}
            <span className="text-xs text-[#94A3B8] flex-shrink-0">
              {post.timestamp}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 leading-snug">
            {post.title}
          </h3>

          {/* Content preview */}
          <p className="text-sm text-[#94A3B8] line-clamp-3 mb-3 leading-relaxed">
            {post.content}
          </p>

          {/* Optional image */}
          {post.image && (
            <div className="mb-3 relative group/img">
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#7C4DFF]/20 via-[#00E5FF]/20 to-[#7C4DFF]/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
              <img
                src={post.image}
                alt={post.title}
                className="relative w-full max-h-72 object-cover rounded-xl border border-white/5"
                loading="lazy"
              />
            </div>
          )}

          {/* Footer actions */}
          <div className="flex items-center gap-1 sm:gap-2 -ml-2">
            {/* Comments */}
            <motion.button
              onClick={handleComment}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[#94A3B8] hover:bg-white/5 hover:text-white transition-colors duration-200 text-xs sm:text-sm cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              aria-label={`${post.comments} comments`}
            >
              <MessageCircle size={16} />
              <span>{post.comments}</span>
            </motion.button>

            {/* Share */}
            <motion.button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[#94A3B8] hover:bg-white/5 hover:text-white transition-colors duration-200 text-xs sm:text-sm cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Share"
            >
              <Share2 size={16} />
              <span className="hidden sm:inline">Share</span>
            </motion.button>

            {/* Save */}
            <motion.button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors duration-200 text-xs sm:text-sm cursor-pointer ml-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              aria-label={isSaved ? 'Unsave' : 'Save'}
              style={{
                color: isSaved ? '#7C4DFF' : '#94A3B8',
                backgroundColor: isSaved ? 'rgba(124,77,255,0.1)' : 'transparent',
              }}
            >
              <Bookmark size={16} fill={isSaved ? '#7C4DFF' : 'none'} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
