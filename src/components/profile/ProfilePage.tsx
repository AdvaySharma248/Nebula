'use client'

import { motion } from 'framer-motion'
import {
  Star,
  Zap,
  Trophy,
  Target,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Heart,
  Bookmark,
} from 'lucide-react'
import { useAppStore } from '@/stores/app-store'

const weeklyActivity = [
  { day: 'Mon', value: 65 },
  { day: 'Tue', value: 45 },
  { day: 'Wed', value: 80 },
  { day: 'Thu', value: 55 },
  { day: 'Fri', value: 90 },
  { day: 'Sat', value: 70 },
  { day: 'Sun', value: 40 },
]

const achievements = [
  { icon: Star, label: 'Pioneer' },
  { icon: Zap, label: 'Lightning' },
  { icon: Trophy, label: 'Champion' },
  { icon: Target, label: 'Precision' },
]

const metrics = [
  { label: 'New today', value: 47, trend: 'up' as const },
  { label: 'This week', value: 312, trend: 'up' as const },
  { label: 'This month', value: 1247, trend: 'down' as const },
]

const recentPosts = [
  { id: '1', title: 'Quantum Entanglement in Neural Networks', time: '2h ago', likes: 234, comments: 45 },
  { id: '2', title: 'Building Holographic UIs with WebGPU', time: '5h ago', likes: 189, comments: 32 },
  { id: '3', title: 'The Future of Brain-Computer Interfaces', time: '1d ago', likes: 312, comments: 67 },
  { id: '4', title: 'Meta-Reality Design Principles', time: '2d ago', likes: 156, comments: 28 },
]

const savedItems = [
  { id: '1', title: 'Advanced Quantum Algorithms Guide', type: 'Post' },
  { id: '2', title: 'Cyber Security Best Practices 2026', type: 'Article' },
  { id: '3', title: 'Holo Dev Community', type: 'Community' },
]

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

export default function ProfilePage() {
  const setSelectedPost = useAppStore((s) => s.setSelectedPost)

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
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: '#151515',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span
              className="text-xl font-bold text-[#F5F5F5]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              NV
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1
                  className="text-2xl font-bold text-[#F5F5F5]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Nova Vanguard
                </h1>
                <p className="text-secondary text-sm">@novavanguard</p>
              </div>
              <button
                className="flex-shrink-0 px-3 py-1.5 rounded text-xs text-secondary transition-colors hover:text-[#F5F5F5]"
                style={{ background: '#151515' }}
              >
                Edit
              </button>
            </div>

            <p className="text-secondary text-sm mt-2 max-w-md leading-relaxed">
              Quantum engineer & holographic architect. Building the future, one thread at a time. Exploring the intersection of AI and reality.
            </p>

            {/* Stats inline */}
            <p className="text-sm mt-3">
              <span className="text-[#F5F5F5] tabular-nums">247</span>{' '}
              <span className="text-tertiary">posts</span>
              <span className="text-tertiary mx-1.5">·</span>
              <span className="text-[#F5F5F5] tabular-nums">12.8K</span>{' '}
              <span className="text-tertiary">followers</span>
              <span className="text-tertiary mx-1.5">·</span>
              <span className="text-[#F5F5F5] tabular-nums">562</span>{' '}
              <span className="text-tertiary">following</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Activity — col-span-2 */}
        <motion.div
          className="col-span-2 surface rounded-lg p-4"
          variants={fadeUp}
        >
          <h3
            className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Activity
          </h3>
          <div className="flex items-end gap-2 h-24">
            {weeklyActivity.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-sm relative"
                  style={{ background: '#1A1A1A', height: '100%' }}
                >
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 rounded-sm"
                    style={{
                      background: 'rgba(199,255,63,0.08)',
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${day.value}%` }}
                    transition={{ delay: 0.3 + index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 accent-text text-[9px] text-center font-medium tabular-nums">
                      {day.value}
                    </div>
                  </motion.div>
                </div>
                <span className="text-[10px] text-tertiary">{day.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements — 1 col */}
        <motion.div
          className="surface rounded-lg p-4"
          variants={fadeUp}
        >
          <h3
            className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Achievements
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.label}
                className="flex items-center gap-1.5 p-1.5 rounded"
                style={{ background: '#1A1A1A' }}
              >
                <achievement.icon className="w-3.5 h-3.5 text-tertiary flex-shrink-0" />
                <span className="text-[10px] text-secondary truncate">{achievement.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Metrics — 1 col */}
        <motion.div
          className="surface rounded-lg p-4"
          variants={fadeUp}
        >
          <h3
            className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Metrics
          </h3>
          <div className="space-y-2.5">
            {metrics.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between">
                <span className="text-xs text-tertiary">{metric.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-[#F5F5F5] tabular-nums">{metric.value.toLocaleString()}</span>
                  {metric.trend === 'up' ? (
                    <ArrowUp className="w-3 h-3 accent-text" />
                  ) : (
                    <ArrowDown className="w-3 h-3" style={{ color: '#FF4444' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Posts — col-span-2 */}
        <motion.div
          className="col-span-2 surface rounded-lg p-4"
          variants={fadeUp}
        >
          <h3
            className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Recent
          </h3>
          <div>
            {recentPosts.map((post, index) => (
              <div key={post.id}>
                <button
                  className="w-full flex items-center gap-3 py-2.5 px-1 rounded transition-colors duration-200 hover:bg-white/[0.02] text-left group"
                  onClick={() => setSelectedPost(post.id)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#F5F5F5] truncate group-hover:text-[#C7FF3F] transition-colors">
                      {post.title}
                    </p>
                    <span className="text-[10px] text-tertiary">{post.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-tertiary flex-shrink-0">
                    <span className="flex items-center gap-1 text-xs">
                      <Heart className="w-3 h-3" />
                      <span className="tabular-nums">{post.likes}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs">
                      <MessageCircle className="w-3 h-3" />
                      <span className="tabular-nums">{post.comments}</span>
                    </span>
                  </div>
                </button>
                {index < recentPosts.length - 1 && <div className="editorial-line" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Saved — col-span-2 */}
        <motion.div
          className="col-span-2 surface rounded-lg p-4"
          variants={fadeUp}
        >
          <h3
            className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Saved
          </h3>
          <div>
            {savedItems.map((item, index) => (
              <div key={item.id}>
                <div className="flex items-center justify-between py-2.5 px-1 rounded transition-colors duration-200 hover:bg-white/[0.02] cursor-pointer group">
                  <span className="text-sm text-[#F5F5F5] truncate group-hover:text-[#C7FF3F] transition-colors">
                    {item.title}
                  </span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 ml-2 text-tertiary"
                    style={{ background: '#1A1A1A' }}
                  >
                    {item.type}
                  </span>
                </div>
                {index < savedItems.length - 1 && <div className="editorial-line" />}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
