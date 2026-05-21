'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/stores/app-store'
import { useAuthStore } from '@/stores/auth-store'
import { toast } from 'sonner'
import LandingPage from '@/components/landing/LandingPage'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import MobileNav from '@/components/layout/MobileNav'
import { FeedContent } from '@/components/feed/FeedContent'
import ProfilePage from '@/components/profile/ProfilePage'
import CommunityPage from '@/components/community/CommunityPage'
import WidgetPanel from '@/components/widgets/WidgetPanel'
import { CommentSection } from '@/components/comments/CommentSection'
import CursorGlow from '@/components/effects/CursorGlow'
import AmbientBackground from '@/components/effects/AmbientBackground'
import {
  Compass,
  MessageSquare,
  Bookmark,
  Settings,
  ArrowLeft,
} from 'lucide-react'

// Smooth page transition variant
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const pageTransition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1] as const,
}

// Placeholder view
function PlaceholderView({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
          style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Icon className="w-5 h-5" style={{ color: '#555555' }} />
        </div>
        <h2
          className="text-xl font-semibold mb-2"
          style={{ fontFamily: 'var(--font-display)', color: '#F5F5F5' }}
        >
          {title}
        </h2>
        <p className="text-sm max-w-xs" style={{ color: '#888888' }}>
          {description}
        </p>
      </motion.div>
    </div>
  )
}

// Post detail with comments
function PostDetailView() {
  const { setSelectedPost } = useAppStore()

  return (
    <div className="max-w-2xl mx-auto px-6 pb-8">
      <motion.button
        className="flex items-center gap-2 text-xs mb-8 cursor-pointer"
        style={{ color: '#888888' }}
        onClick={() => setSelectedPost(null)}
        whileHover={{ x: -3 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="surface rounded-lg p-5 sm:p-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-medium"
            style={{ color: '#C7FF3F' }}
          >
            r/qdev
          </span>
          <span className="text-xs" style={{ color: '#555555' }}>·</span>
          <span className="text-xs" style={{ color: '#555555' }}>tqbf</span>
          <span className="text-xs" style={{ color: '#555555' }}>·</span>
          <span className="text-xs" style={{ color: '#555555' }}>3h ago</span>
        </div>
        <h2
          className="text-lg font-semibold mb-3"
          style={{ fontFamily: 'var(--font-display)', color: '#F5F5F5' }}
        >
          Why we rewrote our entire compiler in Rust — and lived to tell about it
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
          After 18 months of incremental C++ patches that kept introducing subtle memory bugs,
          we made the call to rewrite from scratch. The result: 40% faster compile times,
          zero segfaults in production, and a team that actually enjoys working on the codebase again.
        </p>
      </motion.div>

      <CommentSection postId="detail" />
    </div>
  )
}

export default function Home() {
  const {
    currentView,
    setView,
    selectedPost,
    isMobile,
    setIsMobile,
  } = useAppStore()
  const { user, isGuest, setAuthModalOpen } = useAuthStore()

  // Guard protected routes / views
  useEffect(() => {
    const protectedViews = ['profile', 'settings', 'saved', 'messages']
    
    if (protectedViews.includes(currentView) && !user) {
      if (isGuest) {
        setView('feed')
        toast.error("Authentication required", {
          description: `Please sign in to access the ${currentView} section.`
        })
        setAuthModalOpen(true, 'login')
      } else {
        setView('landing')
        setAuthModalOpen(true, 'login')
      }
    }
  }, [currentView, user, isGuest, setView, setAuthModalOpen])

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [setIsMobile])

  const isLanding = currentView === 'landing'
  const showWidgets = ['feed', 'community', 'explore'].includes(currentView) && !selectedPost

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0D0D0D' }}>
      {isLanding ? (
        <LandingPage />
      ) : (
        <>
          {/* Subtle cursor effect */}
          <CursorGlow />

          {/* Ambient depth */}
          <AmbientBackground />

          {/* Navbar */}
          <Navbar />

          {/* Main layout */}
          <div className="w-full flex flex-1 relative lg:pl-16">
            {/* Sidebar — desktop dock */}
            <Sidebar />

            {/* Centered content container */}
            <div className="flex gap-6 lg:gap-8 max-w-[1020px] w-full mx-auto px-4 lg:px-6">
              {/* Content area */}
              <main className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                {selectedPost && (
                  <motion.div key="post-detail" {...pageVariants} transition={pageTransition}>
                    <PostDetailView />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'feed' && (
                  <motion.div key="feed" {...pageVariants} transition={pageTransition}>
                    <FeedContent />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'community' && (
                  <motion.div key="community" {...pageVariants} transition={pageTransition}>
                    <CommunityPage />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'profile' && (
                  <motion.div key="profile" {...pageVariants} transition={pageTransition}>
                    <ProfilePage />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'explore' && (
                  <motion.div key="explore" {...pageVariants} transition={pageTransition}>
                    <PlaceholderView
                      icon={Compass}
                      title="Explore"
                      description="Discover trending threads, communities, and voices across the network"
                    />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'messages' && (
                  <motion.div key="messages" {...pageVariants} transition={pageTransition}>
                    <PlaceholderView
                      icon={MessageSquare}
                      title="Messages"
                      description="Direct conversations with end-to-end encryption"
                    />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'saved' && (
                  <motion.div key="saved" {...pageVariants} transition={pageTransition}>
                    <PlaceholderView
                      icon={Bookmark}
                      title="Saved"
                      description="Your bookmarked threads and saved content"
                    />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'settings' && (
                  <motion.div key="settings" {...pageVariants} transition={pageTransition}>
                    <PlaceholderView
                      icon={Settings}
                      title="Settings"
                      description="Customize your experience and manage your account"
                    />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'comments' && (
                  <motion.div key="comments" {...pageVariants} transition={pageTransition} className="py-8">
                    <CommentSection postId="demo" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <footer
                className="py-6 px-6 mt-auto"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#555555' }}>
                    Nebula © 2025
                  </span>
                  <div className="flex items-center gap-4">
                    {['Privacy', 'Terms', 'Docs'].map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="text-xs hover:underline underline-offset-4"
                        style={{ color: '#555555' }}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </footer>
            </main>

            {/* Right widgets */}
            {showWidgets && (
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block w-72 shrink-0"
              >
                <WidgetPanel />
              </motion.div>
            )}
            </div>
          </div>

          {/* Mobile nav */}
          <MobileNav />
        </>
      )}
    </div>
  )
}
