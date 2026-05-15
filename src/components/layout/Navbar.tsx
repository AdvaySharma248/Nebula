'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Search, Plus, Bell, Menu, X } from 'lucide-react'
import { useAppStore } from '@/stores/app-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Navbar() {
  const { setView, searchOpen, setSearchOpen, setCreatePostOpen, setSidebarOpen, sidebarOpen, currentView } = useAppStore()
  const [searchFocused, setSearchFocused] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  // ⌘K shortcut to open search
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(!searchOpen)
      }
    },
    [setSearchOpen, searchOpen]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <nav
      className="sticky top-0 z-50 h-16 flex items-center px-4 lg:px-6"
      style={{
        background: 'rgba(6,8,22,0.8)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center justify-between w-full gap-4">
        {/* Left: Hamburger (mobile) + Logo */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile hamburger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg"
            style={{ color: '#94A3B8' }}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </motion.button>

          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView('feed')}
            className="flex items-center gap-2 shrink-0"
          >
            <Sparkles
              className="w-6 h-6"
              style={{ color: '#7C4DFF' }}
            />
            <span
              className="hidden sm:inline text-lg font-bold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #7C4DFF, #00E5FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Nebula Threads
            </span>
          </motion.button>
        </div>

        {/* Center: AI Search Bar */}
        <div className="flex-1 flex justify-center max-w-md mx-auto">
          {/* Desktop Search */}
          <motion.div
            className="hidden sm:flex items-center relative w-full"
            initial={false}
            animate={{
              boxShadow: searchFocused
                ? '0 0 0 2px #7C4DFF, 0 0 20px rgba(124,77,255,0.3)'
                : '0 0 0 1px rgba(255,255,255,0.08)',
            }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '12px',
            }}
          >
            <div className="flex items-center w-full px-4 py-2.5 gap-3">
              <Search className="w-4 h-4 shrink-0" style={{ color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search the nebula..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#94A3B8]"
                style={{ color: '#FFFFFF' }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onClick={() => setSearchOpen(true)}
                readOnly
              />
              <kbd
                className="hidden md:flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded-md"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: '#94A3B8',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                ⌘K
              </kbd>
            </div>
          </motion.div>

          {/* Mobile Search Icon */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg"
            style={{ color: '#94A3B8' }}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Create Post Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 16px rgba(124,77,255,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCreatePostOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-white"
            style={{
              background: 'linear-gradient(135deg, #7C4DFF, #00E5FF)',
            }}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Create</span>
          </motion.button>

          {/* Notifications Bell */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center justify-center w-9 h-9 rounded-lg"
            style={{
              color: '#94A3B8',
              background: 'rgba(255,255,255,0.04)',
            }}
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {/* Pink notification dot */}
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{
                background: '#FF4DA6',
                boxShadow: '0 0 6px rgba(255,77,166,0.6)',
              }}
            />
          </motion.button>

          {/* Profile Avatar */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 12px rgba(124,77,255,0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('profile')}
            className="relative"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback
                className="text-xs font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #7C4DFF, #00E5FF)',
                  color: '#FFFFFF',
                }}
              >
                NT
              </AvatarFallback>
            </Avatar>
            {/* Neon border on hover */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-0 hover:opacity-100 transition-opacity"
              style={{
                border: '2px solid #7C4DFF',
                boxShadow: '0 0 8px rgba(124,77,255,0.4)',
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Search Expanded Overlay */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-0 h-16 flex items-center px-4 gap-3 sm:hidden"
            style={{
              background: 'rgba(6,8,22,0.95)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <Search className="w-4 h-4 shrink-0" style={{ color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search the nebula..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-[#94A3B8]"
              style={{ color: '#FFFFFF' }}
              autoFocus
              onFocus={() => setSearchOpen(true)}
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileSearchOpen(false)}
              className="flex items-center justify-center w-9 h-9"
              style={{ color: '#94A3B8' }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
