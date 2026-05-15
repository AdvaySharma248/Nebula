'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useAppStore } from '@/stores/app-store'
import StatsCounter from './StatsCounter'
import FloatingPreview from './FloatingPreview'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function HeroSection() {
  const setView = useAppStore((s) => s.setView)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient opacity-80" />

      {/* Radial glow accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7C4DFF]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00E5FF]/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-[#FF4DA6]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left side - Text content */}
          <motion.div
            className="flex flex-col gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span className="text-xs font-medium text-[#00E5FF]">Next-Gen Social Platform</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight"
            >
              <span className="gradient-text">Join The Future</span>
              <br />
              <span className="text-white">of Digital </span>
              <span className="gradient-text-pink">Communities</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[#94A3B8] max-w-lg leading-relaxed"
            >
              Discover immersive discussions, futuristic communities, and real-time social experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              {/* Primary CTA - gradient button */}
              <motion.button
                onClick={() => useAppStore.getState().setView('feed')}
                className="group relative px-8 py-4 rounded-xl font-bold text-white text-base overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] rounded-xl" />
                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] rounded-xl opacity-0 group-hover:opacity-100"
                  animate={false}
                  style={{ filter: 'blur(20px)', transform: 'scale(1.2)', zIndex: -1 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>

              {/* Secondary CTA - glass outlined */}
              <motion.button
                className="group glass px-8 py-4 rounded-xl font-bold text-white text-base border border-[#7C4DFF]/30 hover:border-[#7C4DFF]/60 transition-colors"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(124, 77, 255, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span className="flex items-center gap-2">
                  Explore Communities
                  <Sparkles className="w-4 h-4 text-[#7C4DFF] group-hover:text-[#00E5FF] transition-colors" />
                </span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-8 md:gap-12 pt-4"
            >
              <StatsCounter label="Communities" value={10} suffix="K+" />
              <StatsCounter label="Members" value={500} suffix="K+" />
              <StatsCounter label="Threads" value={1} suffix="M+" />
            </motion.div>
          </motion.div>

          {/* Right side - Floating preview */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          >
            <FloatingPreview />
          </motion.div>
        </div>

        {/* Mobile floating preview (shown below hero text on small screens) */}
        <motion.div
          className="lg:hidden mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <FloatingPreview />
        </motion.div>
      </div>
    </section>
  )
}
