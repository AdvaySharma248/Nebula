'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Share2, Bookmark } from 'lucide-react'
import { VoteButton } from './VoteButton'
import { useAppStore } from '@/stores/app-store'
import { useAuthStore } from '@/stores/auth-store'
import { toast } from 'sonner'

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
  const { user, setAuthModalOpen } = useAuthStore()

  const handleCardClick = () => {
    setSelectedPost(post.id)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) {
      toast.error("Authentication required", {
        description: "Please sign in to save posts."
      })
      setAuthModalOpen(true, 'login')
      return
    }
    const nextSavedState = !isSaved
    setIsSaved(nextSavedState)
    toast.success(nextSavedState ? "Post saved to Bookmarks" : "Post removed from Bookmarks")
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedPost(post.id)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={handleCardClick}
      className="surface rounded-lg cursor-pointer transition-premium group"
      whileHover={{
        y: -1,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      <div className="flex gap-3 p-4">
        {/* Vote column */}
        <div className="flex-shrink-0 pt-0.5">
          <VoteButton
            initialVotes={post.votes}
            initialUserVote={post.userVote}
            size="sm"
          />
        </div>

        {/* Content column */}
        <div className="flex-1 min-w-0">
          {/* Header row: community · author · time */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <span className="accent-text text-xs font-medium">
              {post.community.name}
            </span>
            <span className="text-tertiary text-xs">·</span>
            <span className="text-secondary text-xs">
              {post.author.name}
            </span>
            <span className="text-tertiary text-xs">·</span>
            <span className="text-tertiary text-xs flex-shrink-0">
              {post.timestamp}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-display font-semibold text-base leading-snug mb-1 line-clamp-2"
            style={{ color: '#F5F5F5' }}
          >
            {post.title}
          </h3>

          {/* Content preview */}
          <p className="text-secondary text-sm line-clamp-2 leading-relaxed mb-3">
            {post.content}
          </p>

          {/* Optional image */}
          {post.image && (
            <div className="mb-3">
              <img
                src={post.image}
                alt={post.title}
                className="w-full max-h-64 object-cover rounded border border-white/[0.06]"
                loading="lazy"
              />
            </div>
          )}

          {/* Footer: small text actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleComment}
              className="flex items-center gap-1 text-tertiary text-xs hover:text-secondary transition-colors duration-150 cursor-pointer"
              aria-label={`${post.comments} comments`}
            >
              <MessageCircle size={13} />
              <span>{post.comments}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-tertiary text-xs hover:text-secondary transition-colors duration-150 cursor-pointer"
              aria-label="Share"
            >
              <Share2 size={13} />
              <span>Share</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-1 text-xs transition-colors duration-150 cursor-pointer ml-auto"
              style={{
                color: isSaved ? '#C7FF3F' : '#555555',
              }}
              onMouseEnter={(e) => {
                if (!isSaved) (e.currentTarget as HTMLElement).style.color = '#888888'
              }}
              onMouseLeave={(e) => {
                if (!isSaved) (e.currentTarget as HTMLElement).style.color = '#555555'
              }}
              aria-label={isSaved ? 'Unsave' : 'Save'}
            >
              <Bookmark size={13} fill={isSaved ? '#C7FF3F' : 'none'} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
