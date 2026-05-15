'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/stores/app-store'
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
import AuroraBackground from '@/components/effects/AuroraBackground'
import GlowOrbs from '@/components/effects/GlowOrbs'
import {
  Compass,
  MessageSquare,
  Bookmark,
  Settings,
  MessageCircle,
  ArrowLeft,
} from 'lucide-react'

// Placeholder views for simple pages
function PlaceholderView({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8" style={{ color: '#7C4DFF' }} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-[#94A3B8] text-sm max-w-sm">{description}</p>
      </motion.div>
    </div>
  )
}

// Post detail view with comments
function PostDetailView() {
  const { setSelectedPost } = useAppStore()

  return (
    <div className="max-w-3xl mx-auto px-4 pb-8">
      <motion.button
        className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white transition-colors mb-6"
        onClick={() => setSelectedPost(null)}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.97 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to feed
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-card p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-white mb-3">
          Quantum Error Correction Achieves 99.9% Fidelity
        </h2>
        <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
          Just witnessed the new quantum error correction protocol from IBM achieve 99.9% fidelity
          in their latest benchmark. This changes everything for practical quantum computing. The
          surface code implementation they demonstrated could scale to thousands of logical qubits
          much sooner than expected. Full paper dropped on arXiv last night.
        </p>
        <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
          <span className="px-2 py-1 rounded-full" style={{ background: 'rgba(124,77,255,0.15)', color: '#7C4DFF' }}>
            r/QuantumDev
          </span>
          <span>quantum_coder</span>
          <span>2h ago</span>
        </div>
      </motion.div>

      <CommentSection postId="1" />
    </div>
  )
}

export default function Home() {
  const {
    currentView,
    setView,
    sidebarCollapsed,
    selectedPost,
    isMobile,
    setIsMobile,
  } = useAppStore()

  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [setIsMobile])

  const isLanding = currentView === 'landing'
  const showWidgets = ['feed', 'community', 'explore'].includes(currentView) && !selectedPost
  const sidebarWidth = isLanding ? 0 : (sidebarCollapsed ? 80 : 256)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#060816' }}>
      {/* Landing page - full cinematic experience */}
      {isLanding ? (
        <LandingPage />
      ) : (
        <>
          {/* Cursor glow effect */}
          <CursorGlow />

          {/* Background effects for app */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <AuroraBackground />
            <GlowOrbs />
          </div>

          {/* Navbar */}
          <Navbar />

          {/* Main app layout */}
          <div className="flex flex-1 relative z-10">
            {/* Sidebar - desktop only */}
            <Sidebar />

            {/* Main content area */}
            <main
              className="flex-1 min-w-0 transition-all duration-300"
              style={{
                marginLeft: isMobile ? 0 : sidebarWidth,
              }}
            >
              <AnimatePresence mode="wait">
                {/* Post detail view (overlay on top of current view) */}
                {selectedPost && (
                  <motion.div
                    key="post-detail"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PostDetailView />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'feed' && (
                  <motion.div
                    key="feed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FeedContent />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'community' && (
                  <motion.div
                    key="community"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CommunityPage />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProfilePage />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'explore' && (
                  <motion.div
                    key="explore"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PlaceholderView
                      icon={Compass}
                      title="Explore"
                      description="Discover trending content, communities, and creators across the nebula"
                    />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'messages' && (
                  <motion.div
                    key="messages"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PlaceholderView
                      icon={MessageSquare}
                      title="Messages"
                      description="Real-time neural messaging with end-to-end quantum encryption"
                    />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'saved' && (
                  <motion.div
                    key="saved"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PlaceholderView
                      icon={Bookmark}
                      title="Saved"
                      description="Your bookmarked threads and saved content from across the nebula"
                    />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'settings' && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PlaceholderView
                      icon={Settings}
                      title="Settings"
                      description="Customize your nebula experience and manage your account"
                    />
                  </motion.div>
                )}

                {!selectedPost && currentView === 'comments' && (
                  <motion.div
                    key="comments"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="py-8"
                  >
                    <CommentSection postId="demo" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <footer className="border-t border-white/[0.04] py-6 px-4 mt-auto">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-gradient-to-br from-[#7C4DFF] to-[#00E5FF] flex items-center justify-center">
                      <span className="text-[8px] font-black text-white">N</span>
                    </div>
                    <span className="text-xs text-[#94A3B8]">Nebula Threads &copy; 2032</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-xs text-[#94A3B8] hover:text-white transition-colors">Privacy</button>
                    <button className="text-xs text-[#94A3B8] hover:text-white transition-colors">Terms</button>
                    <button className="text-xs text-[#94A3B8] hover:text-white transition-colors">Help</button>
                  </div>
                </div>
              </footer>
            </main>

            {/* Right sidebar widgets */}
            {showWidgets && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="hidden lg:block"
              >
                <WidgetPanel />
              </motion.div>
            )}
          </div>

          {/* Mobile bottom nav */}
          <MobileNav />
        </>
      )}
    </div>
  )
}
