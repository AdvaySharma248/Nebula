'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageSquare } from 'lucide-react'
import { CommentItem, type Comment } from './CommentItem'

interface CommentSectionProps {
  postId: string
}

const sampleComments: Comment[] = [
  {
    id: '1',
    author: { name: 'Nova Sterling', avatar: 'NS', color: '#7C4DFF' },
    content:
      'This is absolutely mind-blowing! The way you integrated the neural interface with the quantum processors is next level. I\'ve been working on something similar but your approach to the entanglement layer is much more elegant.',
    timestamp: '2h ago',
    votes: 42,
    userVote: null,
    reactions: [
      { emoji: '👍', count: 12, active: false },
      { emoji: '🚀', count: 5, active: false },
      { emoji: '💡', count: 3, active: false },
    ],
    replies: [
      {
        id: '1-1',
        author: { name: 'Kai Nexus', avatar: 'KN', color: '#00E5FF' },
        content:
          'Thanks Nova! The entanglement layer was actually inspired by your paper on quantum state coherence. Your work on the stabilization algorithms was foundational.',
        timestamp: '1h ago',
        votes: 18,
        userVote: null,
        reactions: [
          { emoji: '❤️', count: 4, active: false },
          { emoji: '💡', count: 2, active: false },
        ],
        replies: [
          {
            id: '1-1-1',
            author: { name: 'Zara Flux', avatar: 'ZF', color: '#FF4DA6' },
            content:
              'The stabilization algorithms are brilliant, but have you considered the decoherence issues at scale? I ran into similar problems with my distributed node network.',
            timestamp: '45m ago',
            votes: 7,
            userVote: null,
            reactions: [{ emoji: '👍', count: 3, active: false }],
            replies: [],
          },
          {
            id: '1-1-2',
            author: { name: 'Nova Sterling', avatar: 'NS', color: '#7C4DFF' },
            content:
              'Great point Zara. The scale issue is something we addressed in v2 using adaptive error correction. Happy to share the methodology!',
            timestamp: '30m ago',
            votes: 5,
            userVote: null,
            reactions: [{ emoji: '🎉', count: 2, active: false }],
            replies: [],
          },
        ],
      },
      {
        id: '1-2',
        author: { name: 'Rex Orion', avatar: 'RO', color: '#FF6B35' },
        content:
          'The quantum processing angle is fascinating. How does this compare to traditional approaches in terms of latency?',
        timestamp: '1h ago',
        votes: 9,
        userVote: null,
        reactions: [{ emoji: '💡', count: 4, active: false }],
        replies: [],
      },
    ],
  },
  {
    id: '2',
    author: { name: 'Luna Vortex', avatar: 'LV', color: '#00E5FF' },
    content:
      'I just deployed this on our production cluster and the performance gains are unreal. 3x throughput improvement with zero downtime during the transition. The team is incredibly impressed.',
    timestamp: '3h ago',
    votes: 31,
    userVote: null,
    reactions: [
      { emoji: '🚀', count: 8, active: false },
      { emoji: '🎉', count: 6, active: false },
    ],
    replies: [
      {
        id: '2-1',
        author: { name: 'Kai Nexus', avatar: 'KN', color: '#00E5FF' },
        content:
          'That\'s awesome to hear Luna! The zero-downtime migration was a key design goal. Would love to hear more about your deployment setup.',
        timestamp: '2h ago',
        votes: 11,
        userVote: null,
        reactions: [{ emoji: '❤️', count: 3, active: false }],
        replies: [],
      },
    ],
  },
  {
    id: '3',
    author: { name: 'Ember Synth', avatar: 'ES', color: '#FF4DA6' },
    content:
      'The documentation on this is top-notch. Clear examples, great API reference, and the interactive playground makes it so easy to prototype. This is how developer tools should be built. 🎯',
    timestamp: '5h ago',
    votes: 24,
    userVote: null,
    reactions: [
      { emoji: '👍', count: 9, active: false },
      { emoji: '❤️', count: 5, active: false },
      { emoji: '💡', count: 3, active: false },
    ],
    replies: [],
  },
  {
    id: '4',
    author: { name: 'Atlas Drift', avatar: 'AD', color: '#7C4DFF' },
    content:
      'Interesting approach, but I have some concerns about the memory overhead when running at full capacity. In my benchmarks, I noticed about 15% more memory consumption compared to the baseline. Has anyone else observed this?',
    timestamp: '6h ago',
    votes: 15,
    userVote: null,
    reactions: [
      { emoji: '💡', count: 7, active: false },
    ],
    replies: [
      {
        id: '4-1',
        author: { name: 'Kai Nexus', avatar: 'KN', color: '#00E5FF' },
        content:
          'Good catch Atlas. The memory overhead is primarily from the caching layer. You can reduce it by ~40% by tuning the cache_ttl parameter. I\'ll add a section to the docs about memory optimization.',
        timestamp: '5h ago',
        votes: 8,
        userVote: null,
        reactions: [{ emoji: '👍', count: 4, active: false }],
        replies: [
          {
            id: '4-1-1',
            author: { name: 'Atlas Drift', avatar: 'AD', color: '#7C4DFF' },
            content: 'That did the trick! Down to just 5% overhead now. Thanks for the quick help! 🙏',
            timestamp: '4h ago',
            votes: 3,
            userVote: null,
            reactions: [{ emoji: '🎉', count: 1, active: false }],
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: '5',
    author: { name: 'Pixel Sage', avatar: 'PS', color: '#00E5FF' },
    content:
      'The visual debugging tools are a game-changer. Being able to see the data flow through the pipeline in real-time makes debugging so much faster. This is the kind of DX that makes me love a framework.',
    timestamp: '8h ago',
    votes: 19,
    userVote: null,
    reactions: [
      { emoji: '🚀', count: 4, active: false },
      { emoji: '❤️', count: 3, active: false },
    ],
    replies: [],
  },
]

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(sampleComments)
  const [newComment, setNewComment] = useState('')

  void postId

  const handleSubmit = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: `new-${Date.now()}`,
      author: { name: 'You', avatar: 'YU', color: '#7C4DFF' },
      content: newComment,
      timestamp: 'Just now',
      votes: 0,
      userVote: null,
      reactions: [],
      replies: [],
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  const handleVote = (_id: string, _direction: 'up' | 'down') => {
    // In a real app, this would call an API
  }

  const handleReply = (parentId: string, content: string) => {
    const addReply = (comments: Comment[]): Comment[] =>
      comments.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [
              ...c.replies,
              {
                id: `reply-${Date.now()}`,
                author: { name: 'You', avatar: 'YU', color: '#7C4DFF' },
                content,
                timestamp: 'Just now',
                votes: 0,
                userVote: null,
                reactions: [],
                replies: [],
              },
            ],
          }
        }
        return { ...c, replies: addReply(c.replies) }
      })

    setComments(addReply(comments))
  }

  const handleReact = (_id: string, _emoji: string) => {
    // In a real app, this would call an API
  }

  const commentCount = (() => {
    const count = (cs: Comment[]): number =>
      cs.reduce((acc, c) => acc + 1 + count(c.replies), 0)
    return count(comments)
  })()

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5" style={{ color: '#7C4DFF' }} />
        <h2 className="text-lg font-semibold text-white">
          Discussion
        </h2>
        <span
          className="text-sm px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(124,77,255,0.15)', color: '#7C4DFF' }}
        >
          {commentCount}
        </span>
      </div>

      {/* Comment input */}
      <div
        className="rounded-xl p-4 mb-6 border backdrop-blur-xl"
        style={{
          background: 'rgba(15,18,40,0.6)',
          borderColor: 'rgba(124,77,255,0.2)',
        }}
      >
        <div className="flex gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7C4DFF40, #7C4DFF20)',
              border: '2px solid #7C4DFF',
              color: '#fff',
            }}
          >
            YU
          </div>
          <div className="flex-1">
            <textarea
              className="w-full rounded-lg p-3 text-sm resize-none border focus:outline-none focus:ring-1 placeholder:text-slate-500"
              style={{
                background: 'rgba(6,8,22,0.6)',
                borderColor: 'rgba(124,77,255,0.15)',
                color: '#E2E8F0',
                minHeight: '80px',
              }}
              placeholder="Add to the discussion..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <motion.button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-40"
                style={{
                  background: newComment.trim()
                    ? 'linear-gradient(135deg, #7C4DFF, #00E5FF)'
                    : 'rgba(124,77,255,0.2)',
                }}
                whileHover={newComment.trim() ? { scale: 1.02 } : undefined}
                whileTap={newComment.trim() ? { scale: 0.98 } : undefined}
                onClick={handleSubmit}
                disabled={!newComment.trim()}
              >
                <Send className="w-4 h-4" />
                Post Comment
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onVote={handleVote}
            onReply={handleReply}
            onReact={handleReact}
          />
        ))}
      </div>
    </div>
  )
}
