'use client'

import { motion } from 'framer-motion'
import HeroSection from './HeroSection'
import FeatureSection from './FeatureSection'
import ParticleField from '@/components/effects/ParticleField'
import AuroraBackground from '@/components/effects/AuroraBackground'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background effects layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AuroraBackground />
        <ParticleField />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1">
        <HeroSection />
        <FeatureSection />
      </main>

      {/* Footer */}
      <motion.footer
        className="relative z-10 border-t border-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C4DFF] to-[#00E5FF] flex items-center justify-center">
              <span className="text-white font-black text-sm">N</span>
            </div>
            <span className="text-sm font-semibold gradient-text">Nebula Threads</span>
          </div>
          <p className="text-xs text-[#94A3B8]">
            &copy; 2032 Nebula Threads. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[#94A3B8] hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-xs text-[#94A3B8] hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-xs text-[#94A3B8] hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
