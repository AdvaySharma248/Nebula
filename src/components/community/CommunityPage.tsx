'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Circle,
  Heart,
  MessageCircle,
  Share2,
  Shield,
  BookOpen,
  Calendar,
  Clock,
  Pin,
} from 'lucide-react'

type TabType = 'posts' | 'about' | 'members' | 'events'

interface Post {
  id: string
  author: string
  avatar: string
  time: string
  content: string
  likes: number
  comments: number
  pinned?: boolean
}

const communityInfo = {
  name: 'Quantum Devs',
  description: 'A community for quantum computing enthusiasts, researchers, and developers. Share breakthroughs, discuss algorithms, and build the future of computation.',
  members: 12847,
  online: 342,
  color: '#7C4DFF',
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

const posts: Post[] = [
  {
    id: '1',
    author: 'Dr. Quantum',
    avatar: 'DQ',
    time: '2h ago',
    content: 'Just published our latest paper on topological qubits! The error correction rates are looking promising. Check it out in the research thread.',
    likes: 234,
    comments: 45,
    pinned: true,
  },
  {
    id: '2',
    author: 'NeuraNode',
    avatar: 'NN',
    time: '4h ago',
    content: 'Anyone else experimenting with quantum machine learning on the new IBM processors? The gate fidelity improvements are incredible.',
    likes: 189,
    comments: 32,
  },
  {
    id: '3',
    author: 'QbitMaster',
    avatar: 'QM',
    time: '6h ago',
    content: 'Tutorial: Building your first quantum circuit with Qiskit. Link in comments! 🚀',
    likes: 312,
    comments: 67,
  },
]

const members = [
  { name: 'Dr. Quantum', role: 'Lead Mod', color: '#7C4DFF' },
  { name: 'NeuraNode', role: 'Mod', color: '#00E5FF' },
  { name: 'QbitMaster', role: 'Mod', color: '#FF4DA6' },
  { name: 'QuantumLeap', role: 'Member', color: '#00FFB2' },
  { name: 'WaveFunction', role: 'Member', color: '#7C4DFF' },
  { name: 'EntangledBit', role: 'Member', color: '#00E5FF' },
]

const events = [
  { name: 'Quantum Computing AMA', date: 'Mar 15, 2026', time: '3:00 PM UTC', attendees: 234 },
  { name: 'Hackathon: Quantum Algorithms', date: 'Mar 22-24, 2026', time: 'All Day', attendees: 456 },
  { name: 'Paper Reading Club', date: 'Mar 28, 2026', time: '5:00 PM UTC', attendees: 89 },
]

const tabs: { key: TabType; label: string }[] = [
  { key: 'posts', label: 'Posts' },
  { key: 'about', label: 'About' },
  { key: 'members', label: 'Members' },
  { key: 'events', label: 'Events' },
]

function CommunityPost({ post }: { post: Post }) {
  return (
    <motion.div
      className="glass-card p-4 hover:border-nebula-primary/20 transition-all duration-200"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -1 }}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nebula-primary/30 to-nebula-secondary/30 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
          {post.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-white">{post.author}</span>
            {post.pinned && (
              <span className="flex items-center gap-0.5 text-[10px] text-nebula-primary px-1.5 py-0.5 rounded-full bg-nebula-primary/10">
                <Pin className="w-2.5 h-2.5" />
                Pinned
              </span>
            )}
            <span className="text-xs text-nebula-text-secondary">{post.time}</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">{post.content}</p>
          <div className="flex items-center gap-4 mt-3">
            <button className="flex items-center gap-1.5 text-xs text-nebula-text-secondary hover:text-nebula-highlight transition-colors group">
              <Heart className="w-3.5 h-3.5 group-hover:fill-nebula-highlight/20" />
              {post.likes}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-nebula-text-secondary hover:text-nebula-secondary transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />
              {post.comments}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-nebula-text-secondary hover:text-nebula-primary transition-colors">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabType>('posts')

  return (
    <div className="max-w-4xl mx-auto px-4 pb-8">
      {/* Banner Section */}
      <div className="relative mb-16">
        <motion.div
          className="h-44 sm:h-56 rounded-2xl overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${communityInfo.color}, #00E5FF, ${communityInfo.color})`,
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 0%', '100% 100%', '0% 50%'],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nebula-bg via-nebula-bg/50 to-transparent" />

          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        </motion.div>

        {/* Community Avatar */}
        <div className="absolute -bottom-12 left-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="w-24 h-24 rounded-full p-[3px]" style={{
              background: `linear-gradient(135deg, ${communityInfo.color}, #00E5FF)`,
            }}>
              <div className="w-full h-full rounded-full bg-nebula-bg flex items-center justify-center">
                <span className="text-2xl font-bold" style={{ color: communityInfo.color }}>QD</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Community Info */}
      <motion.div
        className="mb-6 ml-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-white">{communityInfo.name}</h1>
        <p className="text-nebula-text-secondary text-sm mt-1 max-w-lg">{communityInfo.description}</p>
        <div className="flex items-center gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-xs text-nebula-text-secondary">
            <Users className="w-3.5 h-3.5" />
            {communityInfo.members.toLocaleString()} members
          </span>
          <span className="flex items-center gap-1.5 text-xs text-nebula-success">
            <Circle className="w-2 h-2 fill-nebula-success" />
            {communityInfo.online} online
          </span>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="relative mb-6">
        <div className="flex gap-0 border-b border-white/[0.06]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-white'
                  : 'text-nebula-text-secondary hover:text-white/70'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${communityInfo.color}, #00E5FF)`,
                  }}
                  layoutId="community-tab"
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
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CommunityPost post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'about' && (
          <motion.div
            key="about"
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Description */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-nebula-secondary" />
                About
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">{communityInfo.description}</p>
              <p className="text-sm text-white/70 leading-relaxed mt-2">
                We explore quantum algorithms, hardware developments, and the practical applications of quantum computing in the modern world. Whether you&apos;re a seasoned researcher or just getting started, there&apos;s a place for you here.
              </p>
            </div>

            {/* Rules */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-nebula-highlight" />
                Community Rules
              </h3>
              <div className="space-y-2">
                {communityInfo.rules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-xs font-medium text-nebula-primary mt-0.5">{index + 1}.</span>
                    <span className="text-sm text-white/70">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Moderators */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-nebula-success" />
                Moderators
              </h3>
              <div className="space-y-2">
                {communityInfo.moderators.map((mod) => (
                  <div key={mod.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-nebula-primary/20 flex items-center justify-center text-xs font-bold text-nebula-primary">
                      {mod.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm text-white">{mod.name}</p>
                      <p className="text-[10px] text-nebula-text-secondary">{mod.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'members' && (
          <motion.div
            key="members"
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-nebula-primary" />
                Members ({communityInfo.members.toLocaleString()})
              </h3>
              <div className="space-y-2">
                {members.map((member, index) => (
                  <motion.div
                    key={member.name}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.02] transition-all cursor-pointer group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 2 }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: `${member.color}25`, border: `1px solid ${member.color}40` }}
                    >
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white group-hover:text-nebula-primary transition-colors">{member.name}</p>
                      <p className="text-[10px] text-nebula-text-secondary">{member.role}</p>
                    </div>
                    {member.role.includes('Mod') && (
                      <Shield className="w-3.5 h-3.5 text-nebula-primary" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'events' && (
          <motion.div
            key="events"
            className="space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {events.map((event, index) => (
              <motion.div
                key={event.name}
                className="glass-card p-4 hover:border-nebula-primary/20 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -1 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-nebula-primary/10 border border-nebula-primary/20 flex flex-col items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-nebula-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">{event.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-nebula-text-secondary flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="text-xs text-nebula-text-secondary flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Users className="w-3 h-3 text-nebula-primary" />
                      <span className="text-xs text-nebula-text-secondary">{event.attendees} attending</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
