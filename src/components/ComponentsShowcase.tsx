'use client'

import { CommentSection } from '@/components/comments/CommentSection'
import { MagneticButton } from '@/components/shared/MagneticButton'
import { GlowCard } from '@/components/shared/GlowCard'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { GradientButton } from '@/components/shared/GradientButton'
import { ProfileHoverCard } from '@/components/shared/ProfileHoverCard'
import { Sparkles, Zap, Star, Rocket, Heart, ArrowLeft } from 'lucide-react'
import { useAppStore } from '@/stores/app-store'

export default function ComponentsShowcase() {
  const setView = useAppStore((s) => s.setView)

  return (
    <div className="min-h-screen" style={{ background: '#060816' }}>
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, #7C4DFF, #00E5FF, #7C4DFF, transparent)',
        }}
      />

      {/* Back button */}
      <div className="max-w-5xl mx-auto px-4 pt-4">
        <button
          onClick={() => setView('landing')}
          className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition-colors hover:bg-white/5"
          style={{ color: '#94A3B8' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Landing
        </button>
      </div>

      {/* Hero Header */}
      <header className="pt-8 pb-6 text-center px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8" style={{ color: '#7C4DFF' }} />
          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF, #7C4DFF, #00E5FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Nebula Threads
          </h1>
        </div>
        <p className="text-sm max-w-md mx-auto" style={{ color: '#94A3B8' }}>
          Shared UI Components &amp; Comment System
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-20 space-y-16">
        {/* ─── Shared Components Showcase ─── */}
        <section>
          <h2
            className="text-xl font-semibold mb-6 flex items-center gap-2"
            style={{ color: '#FFFFFF' }}
          >
            <Zap className="w-5 h-5" style={{ color: '#00E5FF' }} />
            Shared Components
          </h2>

          {/* Gradient Buttons */}
          <div className="mb-10">
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider" style={{ color: '#94A3B8' }}>
              GradientButton
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <GradientButton variant="primary" size="lg">
                <span className="flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Launch Primary
                </span>
              </GradientButton>
              <GradientButton variant="secondary" size="md">
                Secondary
              </GradientButton>
              <GradientButton variant="primary" size="sm">
                Small
              </GradientButton>
              <GradientButton variant="primary" size="md" disabled>
                Disabled
              </GradientButton>
            </div>
          </div>

          {/* Magnetic Buttons */}
          <div className="mb-10">
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider" style={{ color: '#94A3B8' }}>
              MagneticButton
            </h3>
            <div className="flex flex-wrap gap-4">
              <MagneticButton
                className="px-6 py-2.5 rounded-xl text-white font-medium border"
                style={{
                  background: 'rgba(124,77,255,0.15)',
                  borderColor: 'rgba(124,77,255,0.4)',
                }}
                onClick={() => console.log('Magnetic clicked!')}
              >
                ✨ Hover Me
              </MagneticButton>
              <MagneticButton
                className="px-6 py-2.5 rounded-xl text-white font-medium border"
                style={{
                  background: 'rgba(0,229,255,0.15)',
                  borderColor: 'rgba(0,229,255,0.4)',
                }}
              >
                🧲 Magnetic
              </MagneticButton>
            </div>
          </div>

          {/* GlowCards */}
          <div className="mb-10">
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider" style={{ color: '#94A3B8' }}>
              GlowCard
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <GlowCard glowColor="purple" hoverable>
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4" style={{ color: '#7C4DFF' }} />
                    <span className="text-white font-medium text-sm">Purple Glow</span>
                  </div>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>
                    Hover to see the purple neon glow effect with subtle lift animation.
                  </p>
                </div>
              </GlowCard>
              <GlowCard glowColor="cyan" hoverable>
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4" style={{ color: '#00E5FF' }} />
                    <span className="text-white font-medium text-sm">Cyan Glow</span>
                  </div>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>
                    Cybernetic cyan glow with glassmorphism backdrop blur.
                  </p>
                </div>
              </GlowCard>
              <GlowCard glowColor="pink" hoverable>
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4" style={{ color: '#FF4DA6' }} />
                    <span className="text-white font-medium text-sm">Pink Glow</span>
                  </div>
                  <p className="text-xs" style={{ color: '#94A3B8' }}>
                    Vibrant pink glow effect perfect for highlighted content.
                  </p>
                </div>
              </GlowCard>
            </div>
          </div>

          {/* AnimatedCounter */}
          <div className="mb-10">
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider" style={{ color: '#94A3B8' }}>
              AnimatedCounter
            </h3>
            <div
              className="flex flex-wrap gap-8 rounded-xl p-6 border backdrop-blur-xl"
              style={{
                background: 'rgba(15,18,40,0.6)',
                borderColor: 'rgba(124,77,255,0.2)',
              }}
            >
              <div className="text-center">
                <AnimatedCounter
                  value={1247}
                  className="text-3xl font-bold text-[#7C4DFF]"
                />
                <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
                  Stars
                </p>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  value={52300}
                  className="text-3xl font-bold text-[#00E5FF]"
                />
                <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
                  Downloads
                </p>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  value={1200}
                  className="text-3xl font-bold text-[#FF4DA6]"
                />
                <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
                  Contributors
                </p>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  value={89}
                  className="text-3xl font-bold text-white"
                />
                <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
                  Projects
                </p>
              </div>
            </div>
          </div>

          {/* ProfileHoverCard */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider" style={{ color: '#94A3B8' }}>
              ProfileHoverCard
            </h3>
            <div className="flex flex-wrap gap-6">
              <ProfileHoverCard
                name="Nova Sterling"
                username="novasterling"
                avatar="NS"
                color="#7C4DFF"
                karma={4250}
                joinDate="Jan 2024"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #7C4DFF40, #7C4DFF20)',
                    border: '2px solid #7C4DFF',
                    color: '#fff',
                  }}
                >
                  NS
                </div>
              </ProfileHoverCard>
              <ProfileHoverCard
                name="Kai Nexus"
                username="kainexus"
                avatar="KN"
                color="#00E5FF"
                karma={8920}
                joinDate="Mar 2023"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #00E5FF40, #00E5FF20)',
                    border: '2px solid #00E5FF',
                    color: '#fff',
                  }}
                >
                  KN
                </div>
              </ProfileHoverCard>
              <ProfileHoverCard
                name="Zara Flux"
                username="zaraflux"
                avatar="ZF"
                color="#FF4DA6"
                karma={2100}
                joinDate="Sep 2024"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #FF4DA640, #FF4DA620)',
                    border: '2px solid #FF4DA6',
                    color: '#fff',
                  }}
                >
                  ZF
                </div>
              </ProfileHoverCard>
            </div>
            <p className="text-xs mt-3" style={{ color: '#94A3B8' }}>
              Hover over an avatar to see the profile card
            </p>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(124,77,255,0.3), transparent)',
          }}
        />

        {/* ─── Comment System ─── */}
        <section>
          <h2
            className="text-xl font-semibold mb-6 flex items-center gap-2"
            style={{ color: '#FFFFFF' }}
          >
            <Sparkles className="w-5 h-5" style={{ color: '#FF4DA6' }} />
            Comment System
          </h2>
          <CommentSection postId="demo-post-001" />
        </section>
      </main>

      {/* Footer */}
      <footer
        className="border-t py-6 text-center"
        style={{ borderColor: 'rgba(124,77,255,0.15)' }}
      >
        <p className="text-xs" style={{ color: '#94A3B8' }}>
          Nebula Threads · Built with Next.js 16 &amp; Framer Motion
        </p>
      </footer>
    </div>
  )
}
