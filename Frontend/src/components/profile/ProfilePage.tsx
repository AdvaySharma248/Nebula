'use client'

import { useEffect, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Activity, Bookmark, MessageCircle, Star } from 'lucide-react'
import { useAppStore } from '@/stores/app-store'
import { apiRequest, initialsFor, timeAgo, type BackendPost, type BackendUser } from '@/lib/api'
import { useAuthStore } from '@/stores/auth-store'
import EditProfileModal from './EditProfileModal'

const ease = [0.16, 1, 0.3, 1] as const

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
} satisfies Variants

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
} satisfies Variants

function EmptyBlock({ icon: Icon, title, detail }: { icon: React.ElementType; title: string; detail: string }) {
  return (
    <div className="rounded p-5 text-center" style={{ background: '#1A1A1A' }}>
      <Icon className="w-5 h-5 text-tertiary mx-auto mb-2" />
      <p className="text-sm text-[#F5F5F5]">{title}</p>
      <p className="text-xs text-tertiary mt-1">{detail}</p>
    </div>
  )
}

export default function ProfilePage() {
  const setSelectedPost = useAppStore((s) => s.setSelectedPost)
  const user = useAuthStore((state) => state.user)
  const [profile, setProfile] = useState<BackendUser | null>(null)
  const [posts, setPosts] = useState<BackendPost[]>([])
  const [saved, setSaved] = useState<BackendPost[]>([])
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)

  const loadProfile = async () => {
    if (!user?.username) return
    setLoading(true)
    try {
      const [profileResponse, postsResponse, savedResponse] = await Promise.all([
        apiRequest<BackendUser>('/api/users/me/profile'),
        apiRequest<BackendPost[]>(`/api/users/${user.username}/posts?limit=6`),
        apiRequest<BackendPost[]>('/api/users/me/saved-posts?limit=6'),
      ])
      setProfile(profileResponse.data)
      setPosts(postsResponse.data)
      setSaved(savedResponse.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadProfile()
  }, [user?.username])

  const displayUser = profile || {
    id: user?.backendId || user?.uid || '',
    username: user?.username || '',
    displayName: user?.displayName || user?.username || '',
    bio: user?.bio || null,
    avatarUrl: user?.photoURL || null,
    _count: { posts: posts.length, comments: 0, followers: 0, following: 0 },
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pb-8">
      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onSaved={() => void loadProfile()}
      />

      <motion.div className="pt-8 pb-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: '#151515', border: '1px solid rgba(255,255,255,0.1)' }}>
            {displayUser.avatarUrl ? (
              <img src={displayUser.avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-[#F5F5F5] font-display">{initialsFor(displayUser)}</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-[#F5F5F5] font-display">
                  {displayUser.displayName || displayUser.username}
                </h1>
                <p className="text-secondary text-sm">@{displayUser.username}</p>
              </div>
              <motion.button
                onClick={() => setEditOpen(true)}
                className="flex-shrink-0 px-3 py-1.5 rounded text-xs text-secondary transition-colors hover:text-[#F5F5F5] cursor-pointer"
                style={{ background: '#151515' }}
                whileHover={{ background: '#1A1A1A' }}
                whileTap={{ scale: 0.97 }}
              >
                Edit
              </motion.button>
            </div>

            <p className="text-secondary text-sm mt-2 max-w-md leading-relaxed">
              {displayUser.bio || 'No bio yet.'}
            </p>

            <p className="text-sm mt-3">
              <span className="text-[#F5F5F5] tabular-nums">{displayUser._count?.posts ?? posts.length}</span>{' '}
              <span className="text-tertiary">posts</span>
              <span className="text-tertiary mx-1.5">·</span>
              <span className="text-[#F5F5F5] tabular-nums">{displayUser._count?.followers ?? 0}</span>{' '}
              <span className="text-tertiary">followers</span>
              <span className="text-tertiary mx-1.5">·</span>
              <span className="text-[#F5F5F5] tabular-nums">{displayUser._count?.following ?? 0}</span>{' '}
              <span className="text-tertiary">following</span>
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-2 gap-3" variants={stagger} initial="hidden" animate="show">
        <motion.div className="col-span-2 surface rounded-lg p-4" variants={fadeUp}>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3 font-display">Activity</h3>
          {loading ? (
            <div className="h-24 rounded animate-pulse" style={{ background: '#1A1A1A' }} />
          ) : posts.length === 0 ? (
            <EmptyBlock icon={Activity} title="No activity yet" detail="Your posts and replies will appear here." />
          ) : (
            <div className="space-y-2">
              {posts.slice(0, 4).map((post) => (
                <button key={post.id} className="w-full text-left text-sm text-[#F5F5F5] hover:text-[#C7FF3F] transition-colors truncate" onClick={() => setSelectedPost(post.id)}>
                  {post.title}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div className="surface rounded-lg p-4" variants={fadeUp}>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3 font-display">Achievements</h3>
          <EmptyBlock icon={Star} title="No achievements yet" detail="Milestones unlock from real activity." />
        </motion.div>

        <motion.div className="surface rounded-lg p-4" variants={fadeUp}>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3 font-display">Metrics</h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-tertiary">Posts</span>
              <span className="text-sm text-[#F5F5F5] tabular-nums">{displayUser._count?.posts ?? posts.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-tertiary">Comments</span>
              <span className="text-sm text-[#F5F5F5] tabular-nums">{displayUser._count?.comments ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-tertiary">Saved</span>
              <span className="text-sm text-[#F5F5F5] tabular-nums">{saved.length}</span>
            </div>
          </div>
        </motion.div>

        <motion.div className="col-span-2 surface rounded-lg p-4" variants={fadeUp}>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3 font-display">Recent</h3>
          {posts.length === 0 ? (
            <EmptyBlock icon={MessageCircle} title="No threads yet" detail="Create a post to start building your profile." />
          ) : (
            <div>
              {posts.slice(0, 5).map((post, index) => (
                <div key={post.id}>
                  <button className="w-full flex items-center gap-3 py-2.5 px-1 rounded hover:bg-white/[0.02] text-left group" onClick={() => setSelectedPost(post.id)}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#F5F5F5] truncate group-hover:text-[#C7FF3F] transition-colors">{post.title}</p>
                      <span className="text-[10px] text-tertiary">{timeAgo(post.createdAt)}</span>
                    </div>
                    <span className="text-xs text-tertiary tabular-nums">{post._count?.comments ?? post.commentCount}</span>
                  </button>
                  {index < posts.length - 1 && <div className="editorial-line" />}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div className="col-span-2 surface rounded-lg p-4" variants={fadeUp}>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-tertiary mb-3 font-display">Saved</h3>
          {saved.length === 0 ? (
            <EmptyBlock icon={Bookmark} title="No saved posts yet" detail="Save posts to view them later." />
          ) : (
            <div>
              {saved.slice(0, 5).map((post, index) => (
                <div key={post.id}>
                  <button className="w-full py-2.5 px-1 rounded hover:bg-white/[0.02] text-left group" onClick={() => setSelectedPost(post.id)}>
                    <span className="text-sm text-[#F5F5F5] truncate group-hover:text-[#C7FF3F] transition-colors block">{post.title}</span>
                  </button>
                  {index < saved.length - 1 && <div className="editorial-line" />}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
