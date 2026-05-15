'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Users, TrendingUp, Heart, Zap, ChevronRight } from 'lucide-react'

export default function FloatingPreview() {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
    >
      {/* Main preview card */}
      <motion.div
        className="glass-card p-4 md:p-5 rounded-2xl relative overflow-hidden"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Inner glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C4DFF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mini sidebar */}
        <div className="flex gap-3">
          <div className="hidden md:flex flex-col gap-2 w-12 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#7C4DFF]/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#7C4DFF]" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <Users className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#94A3B8]" />
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 space-y-3">
            {/* Post card 1 */}
            <div className="glass p-3 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7C4DFF] to-[#00E5FF]" />
                <div>
                  <div className="text-xs font-semibold text-white">NovaStar</div>
                  <div className="text-[10px] text-[#94A3B8]">in Quantum Physics</div>
                </div>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Just discovered a new quantum entanglement pattern that could revolutionize communication...
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[#FF4DA6]">
                  <Heart className="w-3 h-3 fill-current" />
                  <span className="text-[10px]">2.4k</span>
                </div>
                <div className="flex items-center gap-1 text-[#94A3B8]">
                  <MessageSquare className="w-3 h-3" />
                  <span className="text-[10px]">182</span>
                </div>
              </div>
            </div>

            {/* Post card 2 */}
            <div className="glass p-3 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF4DA6] to-[#FF5C7A]" />
                <div>
                  <div className="text-xs font-semibold text-white">CyberPulse</div>
                  <div className="text-[10px] text-[#94A3B8]">in Neural Networks</div>
                </div>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                The new holographic profile features are incredible. My dashboard feels alive!
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[#FF4DA6]">
                  <Heart className="w-3 h-3 fill-current" />
                  <span className="text-[10px]">891</span>
                </div>
                <div className="flex items-center gap-1 text-[#94A3B8]">
                  <MessageSquare className="w-3 h-3" />
                  <span className="text-[10px]">56</span>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="glass p-2.5 rounded-xl flex items-center justify-between">
              <div className="text-center">
                <div className="text-[11px] font-bold gradient-text">12.4K</div>
                <div className="text-[9px] text-[#94A3B8]">Online</div>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="text-center">
                <div className="text-[11px] font-bold text-[#00E5FF]">847</div>
                <div className="text-[9px] text-[#94A3B8]">Threads</div>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex items-center gap-1 text-[#7C4DFF]">
                <ChevronRight className="w-3 h-3" />
                <span className="text-[10px] font-medium">Explore</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating accent cards */}
      <motion.div
        className="absolute -top-4 -right-4 glass p-2.5 rounded-xl neon-glow-cyan"
        animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span className="text-[10px] font-semibold text-[#00E5FF]">Trending</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-3 -left-3 glass p-2.5 rounded-xl neon-glow"
        animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[#7C4DFF]" />
          <span className="text-[10px] font-semibold text-[#7C4DFF]">+1.2K today</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
