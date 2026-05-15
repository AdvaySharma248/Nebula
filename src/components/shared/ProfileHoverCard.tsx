'use client'

import { useState, useRef, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProfileHoverCardProps {
  children: ReactNode
  name: string
  username: string
  avatar: string
  color: string
  karma: number
  joinDate: string
}

export function ProfileHoverCard({
  children,
  name,
  username,
  avatar,
  color,
  karma,
  joinDate,
}: ProfileHoverCardProps) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [arrowLeft, setArrowLeft] = useState(0)
  const triggerRef = useRef<HTMLDivElement>(null)
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = useCallback(() => {
    if (showTimerRef.current) clearTimeout(showTimerRef.current)
    showTimerRef.current = setTimeout(() => {
      if (!triggerRef.current) return
      const rect = triggerRef.current.getBoundingClientRect()
      const cardWidth = 260
      const cardHeight = 180

      let top = rect.bottom + 8
      let left = rect.left + rect.width / 2 - cardWidth / 2

      // Keep within viewport
      if (left < 8) left = 8
      if (left + cardWidth > window.innerWidth - 8) left = window.innerWidth - cardWidth - 8
      if (top + cardHeight > window.innerHeight - 8) {
        top = rect.top - cardHeight - 8
      }

      setArrowLeft(rect.left + rect.width / 2 - left)
      setPosition({ top, left })
      setVisible(true)
    }, 300)
  }, [])

  const hide = useCallback(() => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current)
      showTimerRef.current = null
    }
    setVisible(false)
  }, [])

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        className="inline-block"
      >
        {children}
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              zIndex: 9999,
            }}
            className="w-[260px]"
            onMouseEnter={show}
            onMouseLeave={hide}
          >
            {/* Arrow */}
            <div
              className="absolute -top-[6px] w-3 h-3 rotate-45 border-l border-t"
              style={{
                left: Math.max(12, Math.min(arrowLeft - 6, 240)),
                borderColor: 'rgba(124,77,255,0.3)',
                background: 'rgba(15,18,40,0.95)',
              }}
            />
            {/* Card */}
            <div
              className="rounded-xl p-4 backdrop-blur-xl border"
              style={{
                background: 'rgba(15,18,40,0.95)',
                borderColor: 'rgba(124,77,255,0.3)',
                boxShadow: `0 0 20px rgba(124,77,255,0.15), 0 8px 32px rgba(0,0,0,0.4)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                    border: `2px solid ${color}`,
                    color: '#fff',
                  }}
                >
                  {avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-medium text-sm truncate">{name}</p>
                  <p className="text-xs truncate" style={{ color: '#94A3B8' }}>
                    @{username}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-4">
                <div>
                  <p className="text-white text-sm font-semibold">{karma.toLocaleString()}</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>Karma</p>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{joinDate}</p>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>Joined</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
