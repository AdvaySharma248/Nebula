'use client'

import { motion } from 'framer-motion'
import {
  Edit3,
  Star,
  Zap,
  Trophy,
  Target,
  TrendingUp,
  TrendingDown,
  Bookmark,
  MessageCircle,
  Heart,
  Award,
} from 'lucide-react'

interface StatItem {
  label: string
  value: number
  suffix?: string
}

const stats: StatItem[] = [
  { label: 'Posts', value: 247 },
  { label: 'Followers', value: 12847 },
  { label: 'Following', value: 562 },
  { label: 'Karma', value: 9850 },
]

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
  { icon: Star, label: 'Pioneer', color: '#7C4DFF' },
  { icon: Zap, label: 'Lightning', color: '#00E5FF' },
  { icon: Trophy, label: 'Champion', color: '#FF4DA6' },
  { icon: Target, label: 'Precision', color: '#00FFB2' },
]

const recentPosts = [
  { id: '1', title: 'Quantum Entanglement in Neural Networks', likes: 234, comments: 45, time: '2h ago' },
  { id: '2', title: 'Building Holographic UIs with WebGPU', likes: 189, comments: 32, time: '5h ago' },
  { id: '3', title: 'The Future of Brain-Computer Interfaces', likes: 312, comments: 67, time: '1d ago' },
  { id: '4', title: 'Meta-Reality Design Principles', likes: 156, comments: 28, time: '2d ago' },
]

const savedItems = [
  { id: '1', title: 'Advanced Quantum Algorithms Guide', type: 'Post' },
  { id: '2', title: 'Cyber Security Best Practices 2026', type: 'Article' },
  { id: '3', title: 'Holo Dev Community', type: 'Community' },
]

const followerMetrics = [
  { label: 'New Today', value: 47, trend: 'up' as const, change: 12 },
  { label: 'This Week', value: 312, trend: 'up' as const, change: 8 },
  { label: 'This Month', value: 1247, trend: 'down' as const, change: 3 },
]

function AnimatedNumber({ value }: { value: number }) {
  return (
    <motion.span
      className="text-xl font-bold text-white"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {value.toLocaleString()}
    </motion.span>
  )
}

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-8">
      {/* Header Section */}
      <div className="relative mb-16">
        {/* Animated gradient banner */}
        <motion.div
          className="h-40 sm:h-48 rounded-2xl overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #7C4DFF, #00E5FF, #FF4DA6, #7C4DFF)',
              backgroundSize: '300% 300%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nebula-bg/80 to-transparent" />
        </motion.div>

        {/* Avatar */}
        <div className="absolute -bottom-12 left-6">
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-nebula-primary via-nebula-secondary to-nebula-highlight p-[3px]">
              <div className="w-full h-full rounded-full bg-nebula-bg flex items-center justify-center">
                <span className="text-2xl font-bold gradient-text">NV</span>
              </div>
            </div>
            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-nebula-success border-2 border-nebula-bg" />
          </motion.div>
        </div>

        {/* Edit Profile button */}
        <motion.button
          className="absolute top-4 right-4 glass flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white hover:bg-white/[0.08] transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Edit3 className="w-3.5 h-3.5" />
          Edit Profile
        </motion.button>
      </div>

      {/* Profile Info */}
      <motion.div
        className="mb-6 ml-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-white">Nova Vanguard</h1>
        <p className="text-nebula-text-secondary text-sm">@novavanguard</p>
        <p className="text-white/70 text-sm mt-2 max-w-md">
          Quantum engineer & holographic architect. Building the future, one thread at a time. ✦ Exploring the intersection of AI and reality.
        </p>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        className="flex gap-6 mb-8 ml-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <AnimatedNumber value={stat.value} />
            <p className="text-xs text-nebula-text-secondary mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Activity Graph - spans 2 cols */}
        <motion.div
          className="col-span-2 glass-card p-4 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-nebula-primary" />
            Activity This Week
          </h3>
          <div className="flex items-end gap-2 sm:gap-3 h-32">
            {weeklyActivity.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  className="w-full rounded-t-md relative overflow-hidden"
                  style={{
                    height: `${day.value}%`,
                    background: `linear-gradient(180deg, rgba(124, 77, 255, 0.8), rgba(0, 229, 255, 0.4))`,
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${day.value}%` }}
                  transition={{ delay: 0.6 + index * 0.08, duration: 0.5, ease: 'easeOut' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
                </motion.div>
                <span className="text-[10px] text-nebula-text-secondary">{day.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="glass-card p-4 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-nebula-highlight" />
            Achievements
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-white/[0.02]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: `${achievement.color}15`,
                    border: `1px solid ${achievement.color}30`,
                  }}
                >
                  <achievement.icon className="w-5 h-5" style={{ color: achievement.color }} />
                </div>
                <span className="text-[10px] text-nebula-text-secondary">{achievement.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Follower Metrics */}
        <motion.div
          className="glass-card p-4 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <h3 className="text-sm font-semibold text-white mb-4">Follower Metrics</h3>
          <div className="space-y-3">
            {followerMetrics.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between">
                <span className="text-xs text-nebula-text-secondary">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{metric.value.toLocaleString()}</span>
                  <span
                    className={`flex items-center text-[10px] ${metric.trend === 'up' ? 'text-nebula-success' : 'text-nebula-error'}`}
                  >
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {metric.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Posts - spans 2 cols */}
        <motion.div
          className="col-span-2 glass-card p-4 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-sm font-semibold text-white mb-4">Recent Posts</h3>
          <div className="space-y-2">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-nebula-primary/20 transition-all cursor-pointer group"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                whileHover={{ x: 2 }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate group-hover:text-nebula-primary transition-colors">
                    {post.title}
                  </p>
                  <span className="text-[10px] text-nebula-text-secondary">{post.time}</span>
                </div>
                <div className="flex items-center gap-3 text-nebula-text-secondary">
                  <span className="flex items-center gap-1 text-xs">
                    <Heart className="w-3 h-3" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <MessageCircle className="w-3 h-3" />
                    {post.comments}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Saved Content */}
        <motion.div
          className="col-span-2 glass-card p-4 sm:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-nebula-secondary" />
            Saved Content
          </h3>
          <div className="space-y-2">
            {savedItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-nebula-secondary/20 transition-all cursor-pointer group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.05 }}
              >
                <span className="text-sm text-white group-hover:text-nebula-secondary transition-colors truncate">
                  {item.title}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.04] text-nebula-text-secondary ml-2 flex-shrink-0">
                  {item.type}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
