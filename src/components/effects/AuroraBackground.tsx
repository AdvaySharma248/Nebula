'use client'

import { motion } from 'framer-motion'

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary aurora - purple */}
      <motion.div
        className="absolute -top-1/2 -left-1/4 w-[80%] h-[80%] rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(ellipse at center, #7C4DFF 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary aurora - cyan */}
      <motion.div
        className="absolute -bottom-1/3 -right-1/4 w-[70%] h-[70%] rounded-full opacity-[0.05]"
        style={{
          background: 'radial-gradient(ellipse at center, #00E5FF 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Tertiary aurora - pink */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-[50%] h-[50%] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(ellipse at center, #FF4DA6 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.05, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />
    </div>
  )
}
