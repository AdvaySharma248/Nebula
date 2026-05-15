'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, MessageCircle, Share2, ThumbsUp, ThumbsDown } from 'lucide-react'
import { ProfileHoverCard } from '@/components/shared/ProfileHoverCard'

export interface Comment {
  id: string
  author: { name: string; avatar: string; color: string }
  content: string
  timestamp: string
  votes: number
  userVote: 'up' | 'down' | null
  replies: Comment[]
  reactions: { emoji: string; count: number; active: boolean }[]
}

interface CommentItemProps {
  comment: Comment
  depth?: number
  onVote?: (id: string, direction: 'up' | 'down') => void
  onReply?: (id: string, content: string) => void
  onReact?: (id: string, emoji: string) => void
}

export function CommentItem({
  comment,
  depth = 0,
  onVote,
  onReply,
  onReact,
}: CommentItemProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [replyOpen, setReplyOpen] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [localVote, setLocalVote] = useState<'up' | 'down' | null>(comment.userVote)
  const [localReactions, setLocalReactions] = useState(comment.reactions)
  const [voteCount, setVoteCount] = useState(comment.votes)

  const hasReplies = comment.replies.length > 0
  const maxDepth = 3

  const handleVote = (direction: 'up' | 'down') => {
    if (localVote === direction) {
      // Remove vote
      setVoteCount((v) => (direction === 'up' ? v - 1 : v + 1))
      setLocalVote(null)
    } else {
      // Switch or add vote
      if (localVote) {
        setVoteCount((v) => (localVote === 'up' ? v - 1 : v + 1))
      }
      setVoteCount((v) => (direction === 'up' ? v + 1 : v - 1))
      setLocalVote(direction)
    }
    onVote?.(comment.id, direction)
  }

  const handleReact = (emoji: string) => {
    setLocalReactions((prev) =>
      prev.map((r) =>
        r.emoji === emoji
          ? { ...r, count: r.active ? r.count - 1 : r.count + 1, active: !r.active }
          : r
      )
    )
    onReact?.(comment.id, emoji)
  }

  const handleReplySubmit = () => {
    if (!replyText.trim()) return
    onReply?.(comment.id, replyText)
    setReplyText('')
    setReplyOpen(false)
  }

  return (
    <div className="relative">
      {/* Indentation guide line */}
      {depth > 0 && (
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: 'rgba(124,77,255,0.2)', left: '-1rem' }}
        />
      )}

      <motion.div
        className="rounded-lg p-3 transition-colors duration-200 hover:bg-white/[0.02]"
        style={{ paddingLeft: depth > 0 ? '1rem' : undefined }}
        initial={false}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <ProfileHoverCard
            name={comment.author.name}
            username={comment.author.name.toLowerCase().replace(/\s/g, '')}
            avatar={comment.author.avatar}
            color={comment.author.color}
            karma={Math.floor(Math.random() * 5000) + 500}
            joinDate="Mar 2024"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${comment.author.color}40, ${comment.author.color}20)`,
                border: `2px solid ${comment.author.color}`,
                color: '#fff',
              }}
            >
              {comment.author.avatar}
            </div>
          </ProfileHoverCard>
          <span className="text-white font-medium text-sm">{comment.author.name}</span>
          <span className="text-xs" style={{ color: '#94A3B8' }}>
            {comment.timestamp}
          </span>

          {/* Collapse toggle */}
          {hasReplies && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto flex items-center gap-1 text-xs px-2 py-0.5 rounded-md transition-colors hover:bg-white/5"
              style={{ color: '#94A3B8' }}
            >
              {collapsed ? (
                <>
                  <ChevronDown className="w-3 h-3" />
                  <span>{comment.replies.length}</span>
                </>
              ) : (
                <ChevronUp className="w-3 h-3" />
              )}
            </button>
          )}
        </div>

        {/* Content */}
        <p className="text-sm leading-relaxed mb-2" style={{ color: '#E2E8F0' }}>
          {comment.content}
        </p>

        {/* Reactions */}
        {localReactions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {localReactions.map((reaction) => (
              <motion.button
                key={reaction.emoji}
                className={`
                  flex items-center gap-1 px-2 py-0.5 rounded-full text-xs
                  transition-colors border
                `}
                style={{
                  background: reaction.active
                    ? 'rgba(124,77,255,0.2)'
                    : 'rgba(255,255,255,0.03)',
                  borderColor: reaction.active
                    ? 'rgba(124,77,255,0.4)'
                    : 'rgba(255,255,255,0.06)',
                  color: reaction.active ? '#7C4DFF' : '#94A3B8',
                }}
                onClick={() => handleReact(reaction.emoji)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{reaction.emoji}</span>
                <span>{reaction.count}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Action row */}
        <div className="flex items-center gap-3">
          {/* Vote */}
          <div className="flex items-center gap-0.5">
            <motion.button
              className="p-1 rounded transition-colors hover:bg-white/5"
              onClick={() => handleVote('up')}
              whileTap={{ scale: 0.9 }}
            >
              <ThumbsUp
                className="w-3.5 h-3.5"
                style={{ color: localVote === 'up' ? '#7C4DFF' : '#94A3B8' }}
              />
            </motion.button>
            <span className="text-xs min-w-[20px] text-center" style={{ color: '#94A3B8' }}>
              {voteCount}
            </span>
            <motion.button
              className="p-1 rounded transition-colors hover:bg-white/5"
              onClick={() => handleVote('down')}
              whileTap={{ scale: 0.9 }}
            >
              <ThumbsDown
                className="w-3.5 h-3.5"
                style={{ color: localVote === 'down' ? '#FF4DA6' : '#94A3B8' }}
              />
            </motion.button>
          </div>

          {/* Reply */}
          <motion.button
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors hover:bg-white/5"
            style={{ color: '#94A3B8' }}
            onClick={() => setReplyOpen(!replyOpen)}
            whileHover={{ color: '#00E5FF' }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Reply</span>
          </motion.button>

          {/* Share */}
          <motion.button
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors hover:bg-white/5"
            style={{ color: '#94A3B8' }}
            whileHover={{ color: '#00E5FF' }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </motion.button>
        </div>

        {/* Inline reply textarea */}
        <AnimatePresence>
          {replyOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-3 ml-9">
                <textarea
                  className="w-full rounded-lg p-3 text-sm resize-none border focus:outline-none focus:ring-1 placeholder:text-slate-500"
                  style={{
                    background: 'rgba(15,18,40,0.6)',
                    borderColor: 'rgba(124,77,255,0.2)',
                    color: '#E2E8F0',
                    minHeight: '80px',
                  }}
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  autoFocus
                />
                <div className="flex gap-2 mt-2 justify-end">
                  <button
                    onClick={() => {
                      setReplyOpen(false)
                      setReplyText('')
                    }}
                    className="px-3 py-1.5 text-xs rounded-lg transition-colors"
                    style={{ color: '#94A3B8' }}
                  >
                    Cancel
                  </button>
                  <motion.button
                    className="px-4 py-1.5 text-xs rounded-lg text-white font-medium disabled:opacity-40"
                    style={{
                      background: replyText.trim()
                        ? 'linear-gradient(135deg, #7C4DFF, #00E5FF)'
                        : 'rgba(124,77,255,0.2)',
                    }}
                    whileHover={replyText.trim() ? { scale: 1.02 } : undefined}
                    whileTap={replyText.trim() ? { scale: 0.98 } : undefined}
                    onClick={handleReplySubmit}
                    disabled={!replyText.trim()}
                  >
                    Reply
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Nested replies */}
      <AnimatePresence>
        {hasReplies && !collapsed && depth < maxDepth && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="ml-4 overflow-hidden"
            style={{ borderLeft: '1px solid rgba(124,77,255,0.15)' }}
          >
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                depth={depth + 1}
                onVote={onVote}
                onReply={onReply}
                onReact={onReact}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
