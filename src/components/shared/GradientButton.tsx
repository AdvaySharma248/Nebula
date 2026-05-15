'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GradientButtonProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const sizeClasses = {
  sm: 'px-4 py-1.5 text-sm rounded-lg',
  md: 'px-6 py-2.5 text-base rounded-xl',
  lg: 'px-8 py-3.5 text-lg rounded-xl',
}

export function GradientButton({
  children,
  className = '',
  variant = 'primary',
  onClick,
  size = 'md',
  disabled = false,
}: GradientButtonProps) {
  const isPrimary = variant === 'primary'

  return (
    <motion.button
      className={`
        relative overflow-hidden font-semibold text-white
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={
        isPrimary
          ? {
              background: 'linear-gradient(135deg, #7C4DFF, #00E5FF)',
            }
          : {
              background: 'rgba(15,18,40,0.6)',
              border: '1px solid rgba(0,229,255,0.4)',
              backdropFilter: 'blur(12px)',
            }
      }
      whileHover={
        disabled
          ? undefined
          : {
              scale: 1.02,
              boxShadow: isPrimary
                ? '0 0 30px rgba(124,77,255,0.4), 0 0 60px rgba(0,229,255,0.2)'
                : '0 0 20px rgba(0,229,255,0.3), 0 0 40px rgba(0,229,255,0.1)',
            }
      }
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Shimmer effect */}
      {isPrimary && !disabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
            width: '200%',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 3,
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
