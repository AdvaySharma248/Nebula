'use client'

import { useState } from 'react'
import { CommentItem, type Comment } from './CommentItem'

interface CommentSectionProps {
  postId: string
}

const sampleComments: Comment[] = [
  {
    id: '1',
    author: { name: 'dstruct', avatar: 'DS', color: '#C7FF3F' },
    content:
      'The surface code approach is solid but I keep coming back to the same question — what\'s the qubit overhead when you account for the logical error rate they actually measured? 99.9% sounds great until you realize the sampling was done on a 72-qubit system with heavy postselection.',
    timestamp: '2h ago',
    votes: 47,
    userVote: null,
    replies: [
      {
        id: '1-1',
        author: { name: 'qbit_flip', avatar: 'QF', color: '#888888' },
        content:
          'Exactly. They excluded ~30% of shots in the supplemental material. Still impressive, but the headline number is doing a lot of work. Compare to Google\'s 2023 results where they reported 99.6% without postselection — more honest benchmark.',
        timestamp: '1h ago',
        votes: 23,
        userVote: null,
        replies: [
          {
            id: '1-1-1',
            author: { name: 'error_corr', avatar: 'EC', color: '#555555' },
            content:
              'The postselection caveat is fair but you\'re comparing different code distances. Google was d=3, IBM is d=5. At d=5 even Google\'s numbers would look different. The scaling argument is what matters here.',
            timestamp: '45m ago',
            votes: 11,
            userVote: null,
            replies: [],
          },
          {
            id: '1-1-2',
            author: { name: 'dstruct', avatar: 'DS', color: '#C7FF3F' },
            content:
              'Fair point on code distance. I\'d just like to see both numbers reported side by side instead of burying one in supplementary. The community needs better norms around this.',
            timestamp: '30m ago',
            votes: 8,
            userVote: null,
            replies: [],
          },
        ],
      },
      {
        id: '1-2',
        author: { name: 'lambda_calc', avatar: 'LC', color: '#888888' },
        content:
          'Anyone have the breakdown on coherence times per qubit? The T1 numbers in their previous chip were all over the place — 80us to 300us depending on location.',
        timestamp: '1h ago',
        votes: 14,
        userVote: null,
        replies: [],
      },
    ],
  },
  {
    id: '2',
    author: { name: 'sys_op', avatar: 'SO', color: '#888888' },
    content:
      'Ran the reference implementation on our cluster last night. 3.2x throughput improvement on the decoding step alone. The parallelized MWPM decoder is a genuine contribution — previous implementations were the bottleneck, not the physics.',
    timestamp: '3h ago',
    votes: 36,
    userVote: null,
    replies: [
      {
        id: '2-1',
        author: { name: 'rust_qc', avatar: 'RQ', color: '#555555' },
        content:
          'What hardware? We\'re seeing similar gains on H100s but the decoder latency is still too high for real-time feedback at d>7. Curious if you tested higher distances.',
        timestamp: '2h ago',
        votes: 12,
        userVote: null,
        replies: [],
      },
    ],
  },
  {
    id: '3',
    author: { name: 'paper_audit', avatar: 'PA', color: '#888888' },
    content:
      'The API design choices in the SDK are... interesting. Why expose the syndrome extraction cycle as a blocking call? Should be event-driven. Also the default decoder config silently falls back to a less accurate algorithm if you don\'t explicitly set the code distance. Found that out the hard way.',
    timestamp: '5h ago',
    votes: 28,
    userVote: null,
    replies: [],
  },
  {
    id: '4',
    author: { name: 'tensor_wd', avatar: 'TW', color: '#555555' },
    content:
      'Memory overhead is the elephant in the room nobody wants to talk about. Our benchmarks show 15-18% more memory consumption vs. baseline at scale. The syndrome history buffer grows faster than O(d²) in practice because of the way they handle correlated errors.',
    timestamp: '6h ago',
    votes: 19,
    userVote: null,
    replies: [
      {
        id: '4-1',
        author: { name: 'cache_miss', avatar: 'CM', color: '#C7FF3F' },
        content:
          'Set history_window to the minimum and you drop to ~6%. The default is 10x what you need for d=5. It\'s documented but buried in the advanced config section. Agree it should be the default.',
        timestamp: '5h ago',
        votes: 15,
        userVote: null,
        replies: [
          {
            id: '4-1-1',
            author: { name: 'tensor_wd', avatar: 'TW', color: '#555555' },
            content:
              'That worked, down to 5.8%. Thanks. They should really surface that config better — wasted two days profiling this.',
            timestamp: '4h ago',
            votes: 6,
            userVote: null,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: '5',
    author: { name: 'neil_g', avatar: 'NG', color: '#888888' },
    content:
      'The visualization layer is the best part of this release. Finally someone built a proper Pauli frame visualizer that doesn\'t require importing into some janky MATLAB script. The timeline view alone saves hours of debugging. More of this please.',
    timestamp: '8h ago',
    votes: 22,
    userVote: null,
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
      author: { name: 'you', avatar: 'YU', color: '#C7FF3F' },
      content: newComment,
      timestamp: 'Just now',
      votes: 0,
      userVote: null,
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
                author: { name: 'you', avatar: 'YU', color: '#C7FF3F' },
                content,
                timestamp: 'Just now',
                votes: 0,
                userVote: null,
                replies: [],
              },
            ],
          }
        }
        return { ...c, replies: addReply(c.replies) }
      })

    setComments(addReply(comments))
  }

  const commentCount = (() => {
    const count = (cs: Comment[]): number =>
      cs.reduce((acc, c) => acc + 1 + count(c.replies), 0)
    return count(comments)
  })()

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2
          className="font-semibold"
          style={{
            fontFamily: 'var(--font-display)',
            color: '#F5F5F5',
            fontSize: '1rem',
          }}
        >
          Discussion
        </h2>
        <span
          className="accent-bg-subtle text-xs px-2 py-0.5 rounded-full tabular-nums"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {commentCount}
        </span>
      </div>

      {/* Comment input */}
      <div
        className="surface rounded-lg p-4 mb-6"
      >
        <textarea
          className="w-full rounded-md p-3 text-sm resize-none border transition-colors duration-200 focus:outline-none"
          style={{
            background: '#1A1A1A',
            borderColor: 'rgba(255,255,255,0.06)',
            color: '#F5F5F5',
            minHeight: '80px',
            fontFamily: 'var(--font-inter)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(199,255,63,0.3)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
          }}
          placeholder="Add to discussion..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            className="accent-bg text-xs px-4 py-1.5 rounded-md font-medium disabled:opacity-30 transition-opacity duration-200"
            style={{
              fontFamily: 'var(--font-inter)',
            }}
            onClick={handleSubmit}
            disabled={!newComment.trim()}
          >
            Post
          </button>
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-0.5">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onVote={handleVote}
            onReply={handleReply}
          />
        ))}
      </div>
    </div>
  )
}
