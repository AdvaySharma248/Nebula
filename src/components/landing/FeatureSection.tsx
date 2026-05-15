'use client'

import { motion } from 'framer-motion'
import {
  Brain,
  MessageCircle,
  Search,
  User,
  Vote,
  Network,
  Sparkles,
} from 'lucide-react'
import { useAppStore } from '@/stores/app-store'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  accentColor: string
  glowClass: string
}

const features: Feature[] = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Neural Communities',
    description: 'AI-powered community recommendations that learn your interests and connect you with like-minded creators.',
    accentColor: 'text-[#7C4DFF]',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(124,77,255,0.15)]',
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: 'Real-time Threads',
    description: 'Instant discussions with live updates. See responses stream in as they happen, no refresh needed.',
    accentColor: 'text-[#00E5FF]',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]',
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Quantum Search',
    description: 'Find anything across the nebula instantly. Our quantum-indexed search delivers results in milliseconds.',
    accentColor: 'text-[#7C4DFF]',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(124,77,255,0.15)]',
  },
  {
    icon: <User className="w-6 h-6" />,
    title: 'Holographic Profiles',
    description: 'Immersive creator dashboards with 3D elements and dynamic visualizations that bring your identity to life.',
    accentColor: 'text-[#FF4DA6]',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(255,77,166,0.15)]',
  },
  {
    icon: <Vote className="w-6 h-6" />,
    title: 'Quantum Voting',
    description: 'Animated voting with pulse effects that make every vote feel impactful. See community sentiment shift in real-time.',
    accentColor: 'text-[#00E5FF]',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]',
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: 'Neural Network',
    description: 'Deep social connections that go beyond followers. Build meaningful relationships through shared neural pathways.',
    accentColor: 'text-[#FF4DA6]',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(255,77,166,0.15)]',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function FeatureSection() {
  const setView = useAppStore((s) => s.setView)

  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7C4DFF]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00E5FF]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="gradient-text">Built for the Future</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Powered by next-gen technology, Nebula Threads redefines what a social platform can be.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group glass-card p-6 md:p-7 rounded-2xl cursor-default transition-shadow duration-500"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -4 }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl glass flex items-center justify-center mb-4 ${feature.accentColor}`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow line */}
              <div className="mt-4 h-px w-0 group-hover:w-full bg-gradient-to-r from-[#7C4DFF] to-[#00E5FF] transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Components Demo CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={() => setView('comments')}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white border transition-all"
            style={{
              background: 'rgba(124,77,255,0.1)',
              borderColor: 'rgba(124,77,255,0.3)',
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 0 25px rgba(124,77,255,0.2)',
              borderColor: 'rgba(124,77,255,0.6)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-4 h-4 text-[#7C4DFF] group-hover:text-[#00E5FF] transition-colors" />
            View Components Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
