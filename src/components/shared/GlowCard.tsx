'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'purple' | 'cyan' | 'pink'
  hoverable?: boolean
}

const glowColors = {
  purple: {
    border: 'rgba(124,77,255,0.3)',
    shadow: '0 0 15px rgba(124,77,255,0.2), 0 4px 20px rgba(0,0,0,0.3)',
    hoverBorder: 'rgba(124,77,255,0.6)',
    hoverShadow: '0 0 25px rgba(124,77,255,0.35), 0 8px 32px rgba(0,0,0,0.4)',
  },
  cyan: {
    border: 'rgba(0,229,255,0.3)',
    shadow: '0 0 15px rgba(0,229,255,0.2), 0 4px 20px rgba(0,0,0,0.3)',
    hoverBorder: 'rgba(0,229,255,0.6)',
    hoverShadow: '0 0 25px rgba(0,229,255,0.35), 0 8px 32px rgba(0,0,0,0.4)',
  },
  pink: {
    border: 'rgba(255,77,166,0.3)',
    shadow: '0 0 15px rgba(255,77,166,0.2), 0 4px 20px rgba(0,0,0,0.3)',
    hoverBorder: 'rgba(255,77,166,0.6)',
    hoverShadow: '0 0 25px rgba(255,77,166,0.35), 0 8px 32px rgba(0,0,0,0.4)',
  },
}

export function GlowCard({
  children,
  className = '',
  glowColor = 'purple',
  hoverable = true,
}: GlowCardProps) {
  const colors = glowColors[glowColor]

  return (
    <motion.div
      className={`rounded-xl backdrop-blur-xl border transition-shadow duration-300 ${hoverable ? 'group' : ''} ${className}`}
      style={{
        background: 'rgba(15,18,40,0.6)',
        borderColor: colors.border,
        boxShadow: colors.shadow,
      }}
      whileHover={
        hoverable
          ? {
              y: -2,
              transition: { duration: 0.2 },
            }
          : undefined
      }
    >
      {/* Hover glow overlay */}
      {hoverable && (
        <style>{`
          .glow-card-hover-${glowColor}:hover {
            border-color: ${colors.hoverBorder} !important;
            box-shadow: ${colors.hoverShadow} !important;
          }
        `}</style>
      )}
      <div className={`h-full ${hoverable ? `glow-card-hover-${glowColor}` : ''}`}>
        {children}
      </div>
    </motion.div>
  )
}
