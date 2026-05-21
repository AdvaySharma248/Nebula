'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share2, Shield } from 'lucide-react'
import { useAppStore } from '@/stores/app-store'
import { useAuthStore } from '@/stores/auth-store'
import { toast } from 'sonner'

type TabType = 'posts' | 'about' | 'members'

const communityInfo = {
  name: 'Quantum Devs',
  description: 'A community for quantum computing enthusiasts, researchers, and developers. Share breakthroughs, discuss algorithms, and build the future of computation.',
  members: 12847,
  online: 342,
  rules: [
    'Be respectful and constructive in discussions',
    'Cite sources for scientific claims',
    'No spam or self-promotion without context',
    'Use appropriate tags for your posts',
    'Help newcomers learn and grow',
  ],
  moderators: [
    { name: 'Dr. Quantum', role: 'Lead Mod' },
    { name: 'NeuraNode', role: 'Mod' },
    { name: 'QbitMaster', role: 'Mod' },
  ],
}

interface Post {
  id: string
  author: string
  time: string
  content: string
  likes: number
  comments: number
  pinned?: boolean
}

const posts: Post[] = [
  {
    id: '1',
    author: 'Dr. Quantum',
    time: '2h ago',
    content: 'Just published our latest paper on topological qubits! The error correction rates are looking promising. Check it out in the research thread.',
    likes: 234,
    comments: 45,
    pinned: true,
  },
  {
    id: '2',
    author: 'NeuraNode',
    time: '4h ago',
    content: 'Anyone else experimenting with quantum machine learning on the new IBM processors? The gate fidelity improvements are incredible.',
    likes: 189,
    comments: 32,
  },
  {
    id: '3',
    author: 'QbitMaster',
    time: '6h ago',
    content: 'Tutorial: Building your first quantum circuit with Qiskit. Link in comments!',
    likes: 312,
    comments: 67,
  },
  {
    id: '4',
    author: 'WaveFunction',
    time: '8h ago',
    content: 'New benchmark results comparing superconducting vs trapped-ion qubits for NISQ applications. The data suggests hybrid approaches may be optimal.',
    likes: 156,
    comments: 28,
  },
]

const members = [
  { name: 'Dr. Quantum', role: 'Lead Mod' },
  { name: 'NeuraNode', role: 'Mod' },
  { name: 'QbitMaster', role: 'Mod' },
  { name: 'QuantumLeap', role: 'Member' },
  { name: 'WaveFunction', role: 'Member' },
  { name: 'EntangledBit', role: 'Member' },
]

const tabs: { key: TabType; label: string }[] = [
  { key: 'posts', label: 'Posts' },
  { key: 'about', label: 'About' },
  { key: 'members', label: 'Members' },
]

function CommunityPost({ post }: { post: Post }) {
  return (
    <div className="py-3 px-1">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-sm text-[#F5F5F5]">{post.author}</span>
        {post.pinned && (
          <span className="text-[10px] accent-text px-1.5 py-0.5 rounded" style={{ background: 'rgba(199,255,63,0.08)' }}>
            Pinned
          </span>
        )}
        <span className="text-xs text-tertiary">{post.time}</span>
      </div>
      <p className="text-sm text-secondary leading-relaxed">{post.content}</p>
      <div className="flex items-center gap-4 mt-2.5">
        <button className="flex items-center gap-1.5 text-xs text-tertiary hover:text-[#F5F5F5] transition-colors">
          <Heart className="w-3.5 h-3.5" />
          <span className="tabular-nums">{post.likes}</span>
        </button>
        <button className="flex items-center gap-1.5 text-xs text-tertiary hover:text-[#F5F5F5] transition-colors">
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="tabular-nums">{post.comments}</span>
        </button>
        <button className="flex items-center gap-1.5 text-xs text-tertiary hover:text-[#F5F5F5] transition-colors">
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>
      </div>
    </div>
  )
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabType>('posts')
  const { user, setAuthModalOpen } = useAuthStore()
  const [joined, setJoined] = useState(false)

  const handleJoin = () => {
    if (!user) {
      toast.error("Authentication required", {
        description: "Please sign in to join communities."
      })
      setAuthModalOpen(true, 'login')
      return
    }
    const nextJoinedState = !joined
    setJoined(nextJoinedState)
    toast.success(nextJoinedState ? "Successfully joined Quantum Devs!" : "Left Quantum Devs community.")
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pb-8">
      {/* Header — editorial, no gradient banner */}
      <motion.div
        className="pt-8 pb-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-start gap-5">
          {/* Community initial square */}
          <div
            className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(199,255,63,0.08)' }}
          >
            <span
              className="text-3xl font-bold accent-text"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Q
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1
                  className="text-2xl font-bold text-[#F5F5F5]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {communityInfo.name}
                </h1>
                <p className="text-secondary text-sm mt-1 max-w-lg leading-relaxed">
                  {communityInfo.description}
                </p>
              </div>
              <button 
                onClick={handleJoin}
                className="flex-shrink-0 px-4 py-1.5 rounded text-xs font-medium transition-colors duration-150 cursor-pointer hover:opacity-90"
                style={{
                  background: joined ? 'rgba(255,255,255,0.06)' : '#C7FF3F',
                  color: joined ? '#888888' : '#0D0D0D',
                  border: joined ? '1px solid rgba(255,255,255,0.08)' : 'none'
                }}
              >
                {joined ? 'Joined' : 'Join'}
              </button>
            </div>

            {/* Members / online */}
            <p className="text-sm mt-2">
              <span className="text-[#F5F5F5] tabular-nums">{communityInfo.members.toLocaleString()}</span>{' '}
              <span className="text-tertiary">members</span>
              <span className="text-tertiary mx-1.5">·</span>
              <span className="accent-text tabular-nums">{communityInfo.online}</span>{' '}
              <span className="text-tertiary">online</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs — thin bottom border, accent for active */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`relative px-4 py-3 text-sm transition-colors ${
                activeTab === tab.key
                  ? 'accent-text'
                  : 'text-tertiary hover:text-secondary'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: '#C7FF3F' }}
                  layoutId="community-tab-underline"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'posts' && (
          <motion.div
            key="posts"
            className="divide-y"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.04 }}
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <CommunityPost post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'about' && (
          <motion.div
            key="about"
            className="space-y-4 mt-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Rules */}
            <div className="surface rounded-lg p-4">
              <h3
                className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Rules
              </h3>
              <div className="space-y-2">
                {communityInfo.rules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-xs text-tertiary mt-0.5 tabular-nums flex-shrink-0">{index + 1}.</span>
                    <span className="text-sm text-secondary">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Moderators */}
            <div className="surface rounded-lg p-4">
              <h3
                className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Moderators
              </h3>
              <div className="space-y-1">
                {communityInfo.moderators.map((mod) => (
                  <div key={mod.name} className="flex items-center gap-2.5 py-1.5 px-1 rounded transition-colors hover:bg-white/[0.02] cursor-pointer">
                    <Shield className="w-3.5 h-3.5 text-tertiary flex-shrink-0" />
                    <span className="text-sm text-[#F5F5F5]">{mod.name}</span>
                    <span className="text-[10px] text-tertiary ml-auto">{mod.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'members' && (
          <motion.div
            key="members"
            className="mt-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="surface rounded-lg p-4">
              <h3
                className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Members
              </h3>
              <div>
                {members.map((member, index) => (
                  <div key={member.name}>
                    <div className="flex items-center justify-between py-2.5 px-1 rounded transition-colors hover:bg-white/[0.02] cursor-pointer">
                      <span className="text-sm text-[#F5F5F5]">{member.name}</span>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded text-tertiary"
                        style={{ background: '#1A1A1A' }}
                      >
                        {member.role}
                      </span>
                    </div>
                    {index < members.length - 1 && <div className="editorial-line" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
