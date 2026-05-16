'use client'

import { useCallback, useEffect } from 'react'
import { Search, Bell, Plus, Menu } from 'lucide-react'
import { useAppStore, type ViewType } from '@/stores/app-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const viewLabels: Record<ViewType, string> = {
  landing: 'Home',
  feed: 'Feed',
  explore: 'Explore',
  community: 'Community',
  messages: 'Messages',
  saved: 'Saved',
  profile: 'Profile',
  settings: 'Settings',
  comments: 'Comments',
  'post-detail': 'Post',
}

export default function Navbar() {
  const {
    currentView,
    setView,
    searchOpen,
    setSearchOpen,
    setCreatePostOpen,
    setSidebarExpanded,
    isMobile,
  } = useAppStore()

  // ⌘K shortcut to toggle search
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

  const viewLabel = viewLabels[currentView] || 'Feed'

  return (
    <nav
      className="sticky top-0 z-50 h-12 flex items-center px-4 lg:px-6"
      style={{
        background: '#0D0D0D',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center justify-between w-full">
        {/* Left section */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setSidebarExpanded(true)}
              className="flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-150 hover:text-[#F5F5F5]"
              style={{ color: '#555555' }}
              aria-label="Open navigation"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          {/* Logo */}
          <button
            onClick={() => setView('feed')}
            className="font-display font-semibold text-sm tracking-tight transition-colors duration-150 hover:opacity-80"
            style={{ color: '#F5F5F5' }}
          >
            Nebula
          </button>

          {/* Breadcrumb — hidden on mobile */}
          {!isMobile && currentView !== 'landing' && (
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: '#555555' }}>
                /
              </span>
              <span className="text-xs font-medium" style={{ color: '#888888' }}>
                {viewLabel}
              </span>
            </div>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1.5 h-7 px-2 rounded-md transition-colors duration-150 hover:text-[#F5F5F5]"
            style={{ color: '#555555' }}
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[10px] font-mono" style={{ color: '#555555' }}>
              ⌘K
            </span>
          </button>

          {/* Notifications */}
          <button
            className="relative flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-150 hover:text-[#F5F5F5]"
            style={{ color: '#555555' }}
            aria-label="Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            {/* Accent notification dot */}
            <span
              className="absolute top-1.5 right-1.5 w-[3px] h-[3px] rounded-full"
              style={{ background: '#C7FF3F' }}
            />
          </button>

          {/* Create button */}
          <button
            onClick={() => setCreatePostOpen(true)}
            className="flex items-center justify-center h-7 px-3 rounded-md text-xs font-medium transition-opacity duration-150 hover:opacity-90 accent-bg"
          >
            <Plus className="w-3 h-3 mr-1" />
            Create
          </button>

          {/* Avatar */}
          <button
            onClick={() => setView('profile')}
            className="flex items-center justify-center transition-opacity duration-150 hover:opacity-80"
            aria-label="Profile"
          >
            <Avatar className="w-6 h-6">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback
                className="text-[9px] font-semibold"
                style={{
                  background: '#1A1A1A',
                  color: '#888888',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                N
              </AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </nav>
  )
}
