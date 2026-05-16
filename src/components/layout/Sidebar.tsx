'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Compass,
  Users,
  MessageCircle,
  Bookmark,
  User,
  Settings,
} from 'lucide-react'
import { useAppStore, type ViewType } from '@/stores/app-store'
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface NavItem {
  icon: React.ElementType
  label: string
  view: ViewType
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', view: 'feed' },
  { icon: Compass, label: 'Explore', view: 'explore' },
  { icon: Users, label: 'Communities', view: 'community' },
  { icon: MessageCircle, label: 'Messages', view: 'messages' },
  { icon: Bookmark, label: 'Saved', view: 'saved' },
  { icon: User, label: 'Profile', view: 'profile' },
  { icon: Settings, label: 'Settings', view: 'settings' },
]

const TRANSITION = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
}

/* ─── Desktop sidebar ─── */
function DesktopSidebar() {
  const { currentView, setView } = useAppStore()
  const [expanded, setExpanded] = useState(false)
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (collapseTimer.current) {
      clearTimeout(collapseTimer.current)
      collapseTimer.current = null
    }
    setExpanded(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    collapseTimer.current = setTimeout(() => {
      setExpanded(false)
    }, 300)
  }, [])

  return (
    <motion.aside
      initial={false}
      animate={{ width: expanded ? 208 : 48 }}
      transition={TRANSITION}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed left-3 top-16 bottom-16 z-40 overflow-hidden rounded-2xl"
      style={{
        background: '#151515',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Navigation items */}
        <nav className="flex-1 py-3 px-1.5 space-y-0.5" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = currentView === item.view
            return (
              <button
                key={item.label}
                onClick={() => setView(item.view)}
                className={`
                  relative flex items-center w-full rounded-lg transition-colors duration-150
                  ${expanded ? 'gap-3 px-3 py-2' : 'justify-center px-2 py-2.5'}
                `}
                style={{
                  background: isActive ? 'rgba(199,255,63,0.08)' : 'transparent',
                  borderLeft: isActive && expanded ? '2px solid #C7FF3F' : '2px solid transparent',
                }}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon
                  className="w-[18px] h-[18px] shrink-0"
                  style={{ color: isActive ? '#C7FF3F' : '#555555' }}
                />

                {/* Label — visible when expanded */}
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-xs font-medium whitespace-nowrap overflow-hidden"
                      style={{ color: isActive ? '#C7FF3F' : '#888888' }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active indicator for collapsed state */}
                {isActive && !expanded && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-full"
                    style={{ background: '#C7FF3F' }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom user section */}
        <div
          className="px-2 pb-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className={`flex items-center rounded-lg py-2 ${
              expanded ? 'gap-2.5 px-2' : 'justify-center px-1'
            }`}
          >
            <Avatar className="w-6 h-6 shrink-0">
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

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <p className="text-xs font-medium" style={{ color: '#F5F5F5' }}>
                    Nebula User
                  </p>
                  <p className="text-[10px]" style={{ color: '#555555' }}>
                    @nebulauser
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

/* ─── Mobile sidebar (Sheet) ─── */
function MobileSidebar() {
  const { currentView, setView, sidebarExpanded, setSidebarExpanded } = useAppStore()

  return (
    <Sheet open={sidebarExpanded} onOpenChange={setSidebarExpanded}>
      <SheetContent
        side="left"
        className="w-64 p-0 border-none rounded-r-2xl"
        style={{
          background: '#151515',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex flex-col h-full pt-12">
          {/* Navigation items */}
          <nav className="flex-1 py-4 px-3 space-y-0.5" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = currentView === item.view
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setView(item.view)
                    setSidebarExpanded(false)
                  }}
                  className="relative flex items-center w-full gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150"
                  style={{
                    background: isActive ? 'rgba(199,255,63,0.08)' : 'transparent',
                    borderLeft: isActive ? '2px solid #C7FF3F' : '2px solid transparent',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon
                    className="w-[18px] h-[18px] shrink-0"
                    style={{ color: isActive ? '#C7FF3F' : '#555555' }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: isActive ? '#C7FF3F' : '#888888' }}
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Bottom user section */}
          <div
            className="px-3 pb-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-2.5 rounded-lg py-2 px-2">
              <Avatar className="w-6 h-6 shrink-0">
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
              <div>
                <p className="text-xs font-medium" style={{ color: '#F5F5F5' }}>
                  Nebula User
                </p>
                <p className="text-[10px]" style={{ color: '#555555' }}>
                  @nebulauser
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/* ─── Main export ─── */
export default function Sidebar() {
  const { isMobile } = useAppStore()

  if (isMobile) {
    return <MobileSidebar />
  }

  return <DesktopSidebar />
}
