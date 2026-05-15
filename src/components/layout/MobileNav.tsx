'use client'

import { motion } from 'framer-motion'
import { Home, Compass, Plus, MessageCircle, User } from 'lucide-react'
import { useAppStore, type ViewType } from '@/stores/app-store'

interface MobileNavItem {
  icon: React.ElementType
  label: string
  view: ViewType
  isCreate?: boolean
}

const mobileNavItems: MobileNavItem[] = [
  { icon: Home, label: 'Home', view: 'feed' },
  { icon: Compass, label: 'Explore', view: 'explore' },
  { icon: Plus, label: 'Create', view: 'feed', isCreate: true },
  { icon: MessageCircle, label: 'Messages', view: 'messages' },
  { icon: User, label: 'Profile', view: 'profile' },
]

export default function MobileNav() {
  const { currentView, setView, setCreatePostOpen } = useAppStore()

  const handleNavClick = (item: MobileNavItem) => {
    if (item.isCreate) {
      setCreatePostOpen(true)
    } else {
      setView(item.view)
    }
  }

  const isActive = (item: MobileNavItem) => {
    if (item.isCreate) return false
    return currentView === item.view
  }

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
      className="fixed bottom-4 left-4 right-4 z-50 lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div
        className="flex items-center justify-around rounded-2xl py-2 px-2"
        style={{
          background: 'rgba(6,8,22,0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {mobileNavItems.map((item) => {
          const active = isActive(item)

          if (item.isCreate) {
            return (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleNavClick(item)}
                className="flex items-center justify-center -mt-5 relative"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #7C4DFF, #00E5FF)',
                    boxShadow: '0 4px 20px rgba(124,77,255,0.4)',
                  }}
                >
                  <Plus className="w-6 h-6 text-white" />
                </div>
              </motion.button>
            )
          }

          return (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleNavClick(item)}
              className="flex flex-col items-center justify-center gap-0.5 py-1.5 px-3 relative"
            >
              <motion.div
                animate={{
                  scale: active ? 1.1 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <item.icon
                  className="w-5 h-5 transition-colors duration-200"
                  style={{
                    color: active ? '#7C4DFF' : '#94A3B8',
                    filter: active
                      ? 'drop-shadow(0 0 8px rgba(124,77,255,0.5))'
                      : 'none',
                  }}
                />
              </motion.div>

              {/* Active glow dot indicator */}
              {active && (
                <motion.div
                  layoutId="mobileActiveDot"
                  className="w-1 h-1 rounded-full mt-0.5"
                  style={{
                    background: '#7C4DFF',
                    boxShadow: '0 0 6px rgba(124,77,255,0.6)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Placeholder for spacing when not active */}
              {!active && <div className="w-1 h-1 mt-0.5" />}

              <span
                className="text-[10px] font-medium"
                style={{ color: active ? '#7C4DFF' : '#94A3B8' }}
              >
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
